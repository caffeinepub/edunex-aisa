import { useState, useMemo } from 'react';
import { FileText, Plus, Search, Filter, ExternalLink, Calendar, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { PaperType, type Paper } from '../backend';
import { useGetAllPapers } from '../hooks/useQueries';
import PaperForm from '../components/PaperForm';

function PaperCard({ paper }: { paper: Paper }) {
  const isPYQ = paper.type === PaperType.pyq;

  return (
    <Card className="border border-border/60 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-0.5 overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="font-display font-semibold text-base leading-snug line-clamp-2">
            {paper.title}
          </CardTitle>
          <Badge
            className="flex-shrink-0 text-xs font-semibold border-0"
            style={
              isPYQ
                ? { background: 'oklch(0.93 0.04 195)', color: 'oklch(0.35 0.1 195)' }
                : { background: 'oklch(0.93 0.08 78)', color: 'oklch(0.50 0.14 55)' }
            }
          >
            {isPYQ ? 'PYQ' : 'Sample'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex flex-wrap gap-2 mb-4">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <BookOpen className="w-3 h-3" />
            {paper.subject}
          </div>
          <div className="text-xs text-muted-foreground">•</div>
          <div className="text-xs text-muted-foreground">{paper.classOrGrade}</div>
          <div className="text-xs text-muted-foreground">•</div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Calendar className="w-3 h-3" />
            {paper.year.toString()}
          </div>
        </div>

        {paper.fileUrl ? (
          <a
            href={paper.fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg transition-colors"
            style={{ background: 'oklch(0.93 0.04 195)', color: 'oklch(0.35 0.1 195)' }}
          >
            <ExternalLink className="w-3 h-3" />
            Open Paper
          </a>
        ) : (
          <span className="text-xs text-muted-foreground italic">No file attached</span>
        )}
      </CardContent>
    </Card>
  );
}

export default function PYQ() {
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [yearFilter, setYearFilter] = useState('');

  const { data: papers = [], isLoading } = useGetAllPapers();

  const years = useMemo(() => {
    const set = new Set(papers.map((p) => p.year.toString()));
    return Array.from(set).sort((a, b) => parseInt(b) - parseInt(a));
  }, [papers]);

  const subjects = useMemo(() => {
    const set = new Set(papers.map((p) => p.subject));
    return Array.from(set).sort();
  }, [papers]);

  const filteredPapers = useMemo(() => {
    return papers.filter((paper) => {
      const matchesSearch =
        !searchQuery ||
        paper.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        paper.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        paper.classOrGrade.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType =
        typeFilter === 'all' ||
        (typeFilter === 'pyq' && paper.type === PaperType.pyq) ||
        (typeFilter === 'sample' && paper.type === PaperType.sample);
      const matchesYear = !yearFilter || paper.year.toString() === yearFilter;
      return matchesSearch && matchesType && matchesYear;
    });
  }, [papers, searchQuery, typeFilter, yearFilter]);

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl gradient-amber flex items-center justify-center shadow-amber">
            <FileText className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-display font-bold text-2xl sm:text-3xl text-foreground">PYQ & Sample Papers</h1>
            <p className="text-muted-foreground text-sm">
              {papers.length} paper{papers.length !== 1 ? 's' : ''} available
            </p>
          </div>
        </div>
        <Button
          onClick={() => setShowForm(true)}
          className="gradient-amber text-white border-0 shadow-amber hover:opacity-90 transition-opacity"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Paper
        </Button>
      </div>

      {/* Filters */}
      <Card className="border border-border/60 shadow-xs mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by title, subject, or class..."
                className="pl-9"
              />
            </div>
            <div className="flex gap-3 flex-wrap">
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[140px]">
                  <Filter className="w-4 h-4 mr-2 text-muted-foreground" />
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="pyq">PYQ</SelectItem>
                  <SelectItem value="sample">Sample Paper</SelectItem>
                </SelectContent>
              </Select>
              <Select value={yearFilter} onValueChange={setYearFilter}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Years</SelectItem>
                  {years.map((y) => (
                    <SelectItem key={y} value={y}>{y}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Papers Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="border border-border/60">
              <CardContent className="p-5">
                <Skeleton className="h-5 w-3/4 mb-3" />
                <Skeleton className="h-4 w-1/2 mb-4" />
                <Skeleton className="h-8 w-24" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : filteredPapers.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center mx-auto mb-4">
            <FileText className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="font-display font-semibold text-lg text-foreground mb-2">
            {papers.length === 0 ? 'No papers yet' : 'No papers match your filters'}
          </h3>
          <p className="text-muted-foreground text-sm mb-6">
            {papers.length === 0
              ? 'Add the first PYQ or sample paper to the library!'
              : 'Try adjusting your search or filter criteria.'}
          </p>
          {papers.length === 0 && (
            <Button
              onClick={() => setShowForm(true)}
              className="gradient-amber text-white border-0 shadow-amber hover:opacity-90"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add First Paper
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredPapers.map((paper) => (
            <PaperCard key={paper.title} paper={paper} />
          ))}
        </div>
      )}

      <PaperForm open={showForm} onClose={() => setShowForm(false)} />
    </div>
  );
}

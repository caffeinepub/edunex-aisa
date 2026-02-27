import { useState, useMemo } from 'react';
import { BookOpen, Plus, Search, Filter, Calendar, GraduationCap, School, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { Level, type Note } from '../backend';
import { useGetAllNotes } from '../hooks/useQueries';
import NoteForm from '../components/NoteForm';

function NoteCard({ note }: { note: Note }) {
  const [expanded, setExpanded] = useState(false);
  const date = new Date(Number(note.createdAt) / 1_000_000);

  return (
    <Card className="border border-border/60 shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="font-display font-semibold text-base leading-snug line-clamp-2">
            {note.title}
          </CardTitle>
          <Badge
            variant="secondary"
            className="flex-shrink-0 text-xs font-semibold"
            style={
              note.level === Level.school
                ? { background: 'oklch(0.93 0.04 195)', color: 'oklch(0.35 0.1 195)' }
                : { background: 'oklch(0.93 0.08 78)', color: 'oklch(0.50 0.14 55)' }
            }
          >
            {note.level === Level.school ? (
              <><School className="w-3 h-3 mr-1" />School</>
            ) : (
              <><GraduationCap className="w-3 h-3 mr-1" />University</>
            )}
          </Badge>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground font-medium">
            {note.subject}
          </span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground font-medium">
            {note.classOrGrade}
          </span>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <p className={`text-sm text-muted-foreground leading-relaxed ${expanded ? '' : 'line-clamp-3'}`}>
          {note.content}
        </p>
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Calendar className="w-3 h-3" />
            {date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
          </div>
          {note.content.length > 150 && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-xs font-medium flex items-center gap-1 hover:underline"
              style={{ color: 'oklch(0.42 0.12 195)' }}
            >
              {expanded ? <><ChevronUp className="w-3 h-3" />Less</> : <><ChevronDown className="w-3 h-3" />More</>}
            </button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default function Notes() {
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [levelFilter, setLevelFilter] = useState<string>('all');
  const [subjectFilter, setSubjectFilter] = useState('');

  const { data: notes = [], isLoading } = useGetAllNotes();

  const subjects = useMemo(() => {
    const set = new Set(notes.map((n) => n.subject));
    return Array.from(set).sort();
  }, [notes]);

  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      const matchesSearch =
        !searchQuery ||
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.classOrGrade.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.content.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesLevel =
        levelFilter === 'all' ||
        (levelFilter === 'school' && note.level === Level.school) ||
        (levelFilter === 'university' && note.level === Level.university);
      const matchesSubject = !subjectFilter || note.subject === subjectFilter;
      return matchesSearch && matchesLevel && matchesSubject;
    });
  }, [notes, searchQuery, levelFilter, subjectFilter]);

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl gradient-teal flex items-center justify-center shadow-teal">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-display font-bold text-2xl sm:text-3xl text-foreground">Notes Library</h1>
            <p className="text-muted-foreground text-sm">
              {notes.length} note{notes.length !== 1 ? 's' : ''} available
            </p>
          </div>
        </div>
        <Button
          onClick={() => setShowForm(true)}
          className="gradient-teal text-white border-0 shadow-teal hover:opacity-90 transition-opacity"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Note
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
                placeholder="Search notes by title, subject, or content..."
                className="pl-9"
              />
            </div>
            <div className="flex gap-3">
              <Select value={levelFilter} onValueChange={setLevelFilter}>
                <SelectTrigger className="w-[140px]">
                  <Filter className="w-4 h-4 mr-2 text-muted-foreground" />
                  <SelectValue placeholder="Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="school">School</SelectItem>
                  <SelectItem value="university">University</SelectItem>
                </SelectContent>
              </Select>
              <Select value={subjectFilter} onValueChange={setSubjectFilter}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Subjects</SelectItem>
                  {subjects.map((s) => (
                    <SelectItem key={s} value={s}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notes Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="border border-border/60">
              <CardContent className="p-5">
                <Skeleton className="h-5 w-3/4 mb-3" />
                <Skeleton className="h-4 w-1/2 mb-4" />
                <Skeleton className="h-16 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : filteredNotes.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="font-display font-semibold text-lg text-foreground mb-2">
            {notes.length === 0 ? 'No notes yet' : 'No notes match your filters'}
          </h3>
          <p className="text-muted-foreground text-sm mb-6">
            {notes.length === 0
              ? 'Be the first to add a note to the library!'
              : 'Try adjusting your search or filter criteria.'}
          </p>
          {notes.length === 0 && (
            <Button
              onClick={() => setShowForm(true)}
              className="gradient-teal text-white border-0 shadow-teal hover:opacity-90"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add First Note
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredNotes.map((note) => (
            <NoteCard key={note.title} note={note} />
          ))}
        </div>
      )}

      <NoteForm open={showForm} onClose={() => setShowForm(false)} />
    </div>
  );
}

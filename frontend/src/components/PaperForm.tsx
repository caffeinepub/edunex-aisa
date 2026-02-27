import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { PaperType } from '../backend';
import { useAddPaper } from '../hooks/useQueries';
import { toast } from 'sonner';

interface PaperFormProps {
  open: boolean;
  onClose: () => void;
}

export default function PaperForm({ open, onClose }: PaperFormProps) {
  const [title, setTitle] = useState('');
  const [type, setType] = useState<PaperType>(PaperType.pyq);
  const [subject, setSubject] = useState('');
  const [classOrGrade, setClassOrGrade] = useState('');
  const [year, setYear] = useState('');
  const [fileUrl, setFileUrl] = useState('');

  const addPaper = useAddPaper();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const yearNum = parseInt(year, 10);
    if (!title.trim() || !subject.trim() || !classOrGrade.trim() || !year || isNaN(yearNum)) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      await addPaper.mutateAsync({
        title: title.trim(),
        type,
        subject: subject.trim(),
        classOrGrade: classOrGrade.trim(),
        year: BigInt(yearNum),
        fileUrl: fileUrl.trim(),
      });
      toast.success('Paper added successfully!');
      setTitle('');
      setType(PaperType.pyq);
      setSubject('');
      setClassOrGrade('');
      setYear('');
      setFileUrl('');
      onClose();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to add paper';
      toast.error(message.includes('already exists') ? 'A paper with this title already exists.' : 'Failed to add paper. Please try again.');
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-display font-bold text-xl">Add New Paper</DialogTitle>
          <DialogDescription>Add a PYQ or sample paper to the library.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-2">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="paper-title">Title *</Label>
            <Input
              id="paper-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Mathematics Final Exam 2023"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label>Paper Type *</Label>
            <RadioGroup
              value={type}
              onValueChange={(v) => setType(v as PaperType)}
              className="flex gap-4"
            >
              <div className="flex items-center gap-2">
                <RadioGroupItem value={PaperType.pyq} id="type-pyq" />
                <Label htmlFor="type-pyq" className="cursor-pointer font-normal">Previous Year Question (PYQ)</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value={PaperType.sample} id="type-sample" />
                <Label htmlFor="type-sample" className="cursor-pointer font-normal">Sample Paper</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="paper-subject">Subject *</Label>
              <Input
                id="paper-subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g., Mathematics"
                required
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="paper-class">Class / Grade *</Label>
              <Input
                id="paper-class"
                value={classOrGrade}
                onChange={(e) => setClassOrGrade(e.target.value)}
                placeholder="e.g., Class 12"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="paper-year">Year *</Label>
              <Input
                id="paper-year"
                type="number"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder="e.g., 2023"
                min="1990"
                max="2030"
                required
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="paper-url">File URL</Label>
              <Input
                id="paper-url"
                value={fileUrl}
                onChange={(e) => setFileUrl(e.target.value)}
                placeholder="https://..."
              />
            </div>
          </div>

          <div className="flex gap-3 justify-end pt-2">
            <Button type="button" variant="outline" onClick={onClose} disabled={addPaper.isPending}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={addPaper.isPending}
              className="gradient-teal text-white border-0 shadow-teal hover:opacity-90"
            >
              {addPaper.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                'Add Paper'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

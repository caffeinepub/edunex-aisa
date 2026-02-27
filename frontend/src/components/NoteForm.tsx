import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Level } from '../backend';
import { useCreateNote } from '../hooks/useQueries';
import { toast } from 'sonner';

interface NoteFormProps {
  open: boolean;
  onClose: () => void;
}

export default function NoteForm({ open, onClose }: NoteFormProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [classOrGrade, setClassOrGrade] = useState('');
  const [subject, setSubject] = useState('');
  const [level, setLevel] = useState<Level>(Level.school);

  const createNote = useCreateNote();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim() || !classOrGrade.trim() || !subject.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      await createNote.mutateAsync({ title: title.trim(), content: content.trim(), classOrGrade: classOrGrade.trim(), subject: subject.trim(), level });
      toast.success('Note created successfully!');
      setTitle('');
      setContent('');
      setClassOrGrade('');
      setSubject('');
      setLevel(Level.school);
      onClose();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to create note';
      toast.error(message.includes('already exists') ? 'A note with this title already exists.' : 'Failed to create note. Please try again.');
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-display font-bold text-xl">Add New Note</DialogTitle>
          <DialogDescription>Create a new note for the library. Fill in all the details below.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-2">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="note-title">Title *</Label>
            <Input
              id="note-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Introduction to Calculus"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="note-subject">Subject *</Label>
              <Input
                id="note-subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g., Mathematics"
                required
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="note-class">Class / Grade *</Label>
              <Input
                id="note-class"
                value={classOrGrade}
                onChange={(e) => setClassOrGrade(e.target.value)}
                placeholder="e.g., Class 10 / Year 2"
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label>Level *</Label>
            <RadioGroup
              value={level}
              onValueChange={(v) => setLevel(v as Level)}
              className="flex gap-4"
            >
              <div className="flex items-center gap-2">
                <RadioGroupItem value={Level.school} id="level-school" />
                <Label htmlFor="level-school" className="cursor-pointer font-normal">School</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value={Level.university} id="level-university" />
                <Label htmlFor="level-university" className="cursor-pointer font-normal">University</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="note-content">Content *</Label>
            <Textarea
              id="note-content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write the note content here..."
              className="min-h-[140px] resize-none"
              required
            />
          </div>

          <div className="flex gap-3 justify-end pt-2">
            <Button type="button" variant="outline" onClick={onClose} disabled={createNote.isPending}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={createNote.isPending}
              className="gradient-teal text-white border-0 shadow-teal hover:opacity-90"
            >
              {createNote.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                'Save Note'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

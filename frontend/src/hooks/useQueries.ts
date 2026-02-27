import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { Level, PaperType, type Note, type Paper, type Tool } from '../backend';

// ==================== Notes ====================

export function useGetAllNotes() {
  const { actor, isFetching } = useActor();
  return useQuery<Note[]>({
    queryKey: ['notes'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllNotes();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetNotesByLevel(level: Level | null) {
  const { actor, isFetching } = useActor();
  return useQuery<Note[]>({
    queryKey: ['notes', 'level', level],
    queryFn: async () => {
      if (!actor || !level) return [];
      return actor.getNotesByLevel(level);
    },
    enabled: !!actor && !isFetching && !!level,
  });
}

export function useGetNotesBySubject(subject: string) {
  const { actor, isFetching } = useActor();
  return useQuery<Note[]>({
    queryKey: ['notes', 'subject', subject],
    queryFn: async () => {
      if (!actor || !subject) return [];
      return actor.getNotesBySubject(subject);
    },
    enabled: !!actor && !isFetching && !!subject,
  });
}

export function useGetNotesByClassOrGrade(classOrGrade: string) {
  const { actor, isFetching } = useActor();
  return useQuery<Note[]>({
    queryKey: ['notes', 'class', classOrGrade],
    queryFn: async () => {
      if (!actor || !classOrGrade) return [];
      return actor.getNotesByClassOrGrade(classOrGrade);
    },
    enabled: !!actor && !isFetching && !!classOrGrade,
  });
}

export function useCreateNote() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      title,
      content,
      classOrGrade,
      subject,
      level,
    }: {
      title: string;
      content: string;
      classOrGrade: string;
      subject: string;
      level: Level;
    }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.createNote(title, content, classOrGrade, subject, level);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });
}

// ==================== Papers ====================

export function useGetAllPapers() {
  const { actor, isFetching } = useActor();
  return useQuery<Paper[]>({
    queryKey: ['papers'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllPapers();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddPaper() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      title,
      type,
      subject,
      classOrGrade,
      year,
      fileUrl,
    }: {
      title: string;
      type: PaperType;
      subject: string;
      classOrGrade: string;
      year: bigint;
      fileUrl: string;
    }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.addPaper(title, type, subject, classOrGrade, year, fileUrl);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['papers'] });
    },
  });
}

// ==================== Tools ====================

export function useGetAllTools() {
  const { actor, isFetching } = useActor();
  return useQuery<Tool[]>({
    queryKey: ['tools'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllTools();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useInitializeTools() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.initializeTools();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tools'] });
    },
  });
}

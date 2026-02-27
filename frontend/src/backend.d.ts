import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Paper {
    title: string;
    subject: string;
    type: PaperType;
    year: bigint;
    classOrGrade: string;
    fileUrl: string;
}
export interface Tool {
    url: string;
    icon: string;
    name: string;
    description: string;
}
export interface Note {
    title: string;
    content: string;
    subject: string;
    createdAt: bigint;
    level: Level;
    classOrGrade: string;
}
export enum Level {
    school = "school",
    university = "university"
}
export enum PaperType {
    pyq = "pyq",
    sample = "sample"
}
export interface backendInterface {
    addPaper(title: string, type: PaperType, subject: string, classOrGrade: string, year: bigint, fileUrl: string): Promise<void>;
    createNote(title: string, content: string, classOrGrade: string, subject: string, level: Level): Promise<void>;
    getAllNotes(): Promise<Array<Note>>;
    getAllPapers(): Promise<Array<Paper>>;
    getAllTools(): Promise<Array<Tool>>;
    getNotesByClassOrGrade(classOrGrade: string): Promise<Array<Note>>;
    getNotesByLevel(level: Level): Promise<Array<Note>>;
    getNotesBySubject(subject: string): Promise<Array<Note>>;
    getPapersBySubject(subject: string): Promise<Array<Paper>>;
    getPapersByType(type: PaperType): Promise<Array<Paper>>;
    getPapersByYear(year: bigint): Promise<Array<Paper>>;
    initializeTools(): Promise<void>;
}

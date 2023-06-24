export interface Subject {
    title: string;
    ue: string;
    notes: Note[];
}

export interface Note {
    title?: string;
    comment?: string;
    note: number;
    teacherName: string;
    date: Date | null;
    stats: Stats;
}

export interface Stats {
    statsGroup?: StatsGroup;
    statsPromo?: StatsPromo;
    average?: number;
    mediane?: number;
}

export interface StatsGroup {
    students?: number;
    rank?: number;
}

export interface StatsPromo {
    students?: number;
    rank?: number;
}
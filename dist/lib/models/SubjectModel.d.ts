export interface Subject {
    title: string;
    ue: string;
    notes: Grade[];
}
export interface Grade {
    title?: string;
    comment?: string;
    mark: {
        value: number;
        on: number;
    };
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

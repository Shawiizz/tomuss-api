import { TomussSemester } from "../../util/Semester";
export interface GradeElement {
    rounding: number;
    contains_users: number;
    modifiable: number;
    default_sort_column: number[];
    table_title: string;
    popup_on_red_line: number;
    managers?: string[];
    bookmark: number;
    dates: number[];
    official_ue: number;
    masters: Array<string[]>;
    ue: string;
    year: number;
    semester: TomussSemester;
    columns: Column[];
    line_id: string;
    line: Array<Array<number | null | string>>;
    stats: any;
    code?: number;
}
export interface Column {
    type: Type;
    author: string;
    comment?: string;
    freezed?: Freezed;
    position: number;
    repetition?: number;
    title: string;
    the_id: string;
    width?: number;
    hidden?: number;
    incomplete?: number;
    visibility_date?: string;
    rounding?: string;
    minmax?: string;
    columns?: string;
    url_import?: string;
    weight?: string;
    abi_is?: number;
    enumeration?: string;
}
export declare enum Freezed {
    C = "C",
    F = "F"
}
export declare enum Type {
    Bool = "Bool",
    Enumeration = "Enumeration",
    Max = "Max",
    Moy = "Moy",
    Note = "Note",
    Text = "Text",
    UeGrade = "Ue_Grade"
}
export interface Stats {
    nr: number;
    nr_in_grp: number;
    rank?: number;
    rank_grp?: number;
    average?: number;
    mediane?: number;
}

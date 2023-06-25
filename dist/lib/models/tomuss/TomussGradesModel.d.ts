import { TomussSemester } from "../../util/Semester";
export interface TomussGradeElement {
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
    columns: TomussColumn[];
    line_id: string;
    line: Array<Array<number | null | string>>;
    stats: any;
    code?: number;
}
export interface TomussColumn {
    type: TomussType;
    author: string;
    comment?: string;
    freezed?: TomussFreezed;
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
export declare enum TomussFreezed {
    C = "C",
    F = "F"
}
export declare enum TomussType {
    Bool = "Bool",
    Enumeration = "Enumeration",
    Max = "Max",
    Moy = "Moy",
    Note = "Note",
    Text = "Text",
    UeGrade = "Ue_Grade"
}
export interface TomussStats {
    nr: number;
    nr_in_grp: number;
    rank?: number;
    rank_grp?: number;
    average?: number;
    mediane?: number;
}

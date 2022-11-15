export type Template = {
    name: string;
    present: boolean;
    x: number;
    y: number;
    width: number;
    height: number;
};

export type Site = {
    id: number;
    name: string;
    opus?: Array<OPU>;
};

export type OPU = {
    id: number;
    name: string;
};

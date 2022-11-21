export type Template = {
    name: string;
    present: boolean;
    x: number;
    y: number;
    width: number;
    height: number;
};

export type CompanyHierarchyNode = {
    id: number;
    name: string;
};

export type Site = CompanyHierarchyNode & {
    opus: Array<OPU>;
};

export type OPU = CompanyHierarchyNode & {
    lines: Array<Line>;
};

export type Line = CompanyHierarchyNode & {
    stations: Array<Station>;
};

export type Station = CompanyHierarchyNode & {
    locations: Array<Location>;
};

export type Location = CompanyHierarchyNode & {
    detector?: Detector;
};

export type Detector = {
    id: number;
    name: string;
    macAddress: string;
    state: "Off" | "Standby" | "Streaming" | "Monitoring" | "Locating";
};

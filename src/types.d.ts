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
    opus?: Array<OPU>;
};

export type OPU = CompanyHierarchyNode & {
    lines?: Array<Line>;
};

export type Line = CompanyHierarchyNode;

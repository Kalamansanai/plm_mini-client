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

export type Site = CompanyHierarchyNode;
export type OPU = CompanyHierarchyNode;
export type Line = CompanyHierarchyNode;
export type Station = CompanyHierarchyNode & {
    locations: Array<Location>;
};

export type Location = CompanyHierarchyNode & {
    detector?: Detector;
};

export const DetectorState = {
    Off: "Off",
    Standby: "Standby",
    Streaming: "Streaming",
    Monitoring: "Monitoring",
    Locating: "Locating",
} as const;

export type DetectorState = typeof DetectorState[keyof typeof DetectorState];

export type Detector = {
    id: number;
    name: string;
    macAddress: string;
    state: Array<DetectorState>;
};

export const parseDetectorState = (state: string): Array<DetectorState> => {
    const parsedState = state
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s in DetectorState)
        .map((s) => s as DetectorState);

    return parsedState;
};

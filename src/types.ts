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

export const TaskState = {
    Active: "Active",
    Paused: "Paused",
    Inactive: "Inactive",
} as const;

export type TaskState = typeof TaskState[keyof typeof TaskState];

export const TaskInstanceFinalState = {
    Completed: "Completed",
    Abandoned: "Abandoned",
} as const;

export type TaskInstanceFinalState =
    typeof TaskInstanceFinalState[keyof typeof TaskInstanceFinalState];

export const ObjectState = {
    Present: "Present",
    Missing: "Missing",
    Uncertain: "Uncertain",
    UnknownObject: "UnknownObject",
} as const;

export type ObjectState = typeof ObjectState[keyof typeof ObjectState];

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

export type TaskInstance = {
    id: number;
    finalState?: TaskInstanceFinalState;
    events: Array<Event>;
};

export type Event = {
    id: number;
    timestamp: Date;
    success: boolean;
    failureReason?: string;
    step: Step;
};

export type Step = {
    id: number;
    orderNum?: number;
    exInitState: ObjectState;
    exSubsState: ObjectState;
    object: Object;
};

export type Object = {
    id: number;
    name: string;
    x: number;
    y: number;
    width: number;
    height: number;
};

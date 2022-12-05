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
    hasSnapshot: boolean;
    ongoingTask: OngoingTask | null;
};

export const DetectorState = {
    Off: "Off",
    Standby: "Standby",
    Streaming: "Streaming",
    Monitoring: "Monitoring",
    Locating: "Locating",
} as const;

export type DetectorState = typeof DetectorState[keyof typeof DetectorState];

export const TaskType = {
    ToolKit: "ToolKit",
    ItemKit: "ItemKit",
    QA: "QA",
} as const;

export type TaskType = typeof TaskType[keyof typeof TaskType];

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

export type Job = {
    id: number;
    name: string;
};

export type OngoingTask = {
    id: number;
    name: string;
    type: TaskType;
    state: TaskState;
    job: Job;
    taskInstance: OngoingTaskInstance;
    steps: Array<Step>;
    maxOrderNum: number;
};

export type OngoingTaskInstance = {
    id: number;
    finalState?: TaskInstanceFinalState;
    events: Array<Event>;
    currentOrderNum: number;
    currentOrderNumRemainingSteps: Array<Step>;
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

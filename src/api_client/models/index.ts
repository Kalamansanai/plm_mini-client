/* tslint:disable */
/* eslint-disable */
/**
 * 
 * @export
 * @interface DetectorCommandDetectorCommand
 */
export interface DetectorCommandDetectorCommand {
    /**
     * 
     * @type {boolean}
     * @memberof DetectorCommandDetectorCommand
     */
    isRestart?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof DetectorCommandDetectorCommand
     */
    isStartDetection?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof DetectorCommandDetectorCommand
     */
    isStopDetection?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof DetectorCommandDetectorCommand
     */
    isResumeDetection?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof DetectorCommandDetectorCommand
     */
    isPauseDetection?: boolean;
}
/**
 * 
 * @export
 * @interface DetectorsCommandReq
 */
export interface DetectorsCommandReq {
    /**
     * 
     * @type {DetectorCommandDetectorCommand}
     * @memberof DetectorsCommandReq
     */
    command?: DetectorCommandDetectorCommand;
}
/**
 * 
 * @export
 * @interface DetectorsHeartBeatReq
 */
export interface DetectorsHeartBeatReq {
    /**
     * 
     * @type {number}
     * @memberof DetectorsHeartBeatReq
     */
    temperature?: number;
    /**
     * 
     * @type {number}
     * @memberof DetectorsHeartBeatReq
     */
    freeStoragePercentage?: number;
    /**
     * 
     * @type {number}
     * @memberof DetectorsHeartBeatReq
     */
    uptime?: number;
}
/**
 * 
 * @export
 * @interface DetectorsIdentifyReq
 */
export interface DetectorsIdentifyReq {
    /**
     * 
     * @type {string}
     * @memberof DetectorsIdentifyReq
     */
    macAddress?: string;
    /**
     * 
     * @type {Array<DetectorsIdentifyReqCalibrationCoordsReq>}
     * @memberof DetectorsIdentifyReq
     */
    coordinates?: Array<DetectorsIdentifyReqCalibrationCoordsReq>;
}
/**
 * 
 * @export
 * @interface DetectorsIdentifyReqCalibrationCoordsReq
 */
export interface DetectorsIdentifyReqCalibrationCoordsReq {
    /**
     * 
     * @type {number}
     * @memberof DetectorsIdentifyReqCalibrationCoordsReq
     */
    x?: number;
    /**
     * 
     * @type {number}
     * @memberof DetectorsIdentifyReqCalibrationCoordsReq
     */
    y?: number;
}
/**
 * 
 * @export
 * @interface EventsCreateReq
 */
export interface EventsCreateReq {
    /**
     * 
     * @type {number}
     * @memberof EventsCreateReq
     */
    taskId?: number;
    /**
     * 
     * @type {number}
     * @memberof EventsCreateReq
     */
    stepId?: number;
    /**
     * 
     * @type {boolean}
     * @memberof EventsCreateReq
     */
    eventResult?: boolean;
    /**
     * 
     * @type {string}
     * @memberof EventsCreateReq
     */
    failureReason?: string;
}
/**
 * 
 * @export
 * @interface JobsCreateReq
 */
export interface JobsCreateReq {
    /**
     * 
     * @type {string}
     * @memberof JobsCreateReq
     */
    name?: string;
}
/**
 * 
 * @export
 * @interface JobsCreateRes
 */
export interface JobsCreateRes {
    /**
     * 
     * @type {number}
     * @memberof JobsCreateRes
     */
    id?: number;
    /**
     * 
     * @type {string}
     * @memberof JobsCreateRes
     */
    name?: string;
}
/**
 * 
 * @export
 * @interface JobsGetByIdRes
 */
export interface JobsGetByIdRes {
    /**
     * 
     * @type {number}
     * @memberof JobsGetByIdRes
     */
    id?: number;
    /**
     * 
     * @type {string}
     * @memberof JobsGetByIdRes
     */
    name?: string;
    /**
     * 
     * @type {Array<JobsGetByIdResResTask>}
     * @memberof JobsGetByIdRes
     */
    tasks?: Array<JobsGetByIdResResTask>;
}
/**
 * 
 * @export
 * @interface JobsGetByIdResResTask
 */
export interface JobsGetByIdResResTask {
    /**
     * 
     * @type {number}
     * @memberof JobsGetByIdResResTask
     */
    id?: number;
    /**
     * 
     * @type {string}
     * @memberof JobsGetByIdResResTask
     */
    name?: string | null;
}
/**
 * 
 * @export
 * @interface JobsListRes
 */
export interface JobsListRes {
    /**
     * 
     * @type {number}
     * @memberof JobsListRes
     */
    id?: number;
    /**
     * 
     * @type {string}
     * @memberof JobsListRes
     */
    name?: string;
}
/**
 * 
 * @export
 * @interface JobsRenameReq
 */
export interface JobsRenameReq {
    /**
     * 
     * @type {string}
     * @memberof JobsRenameReq
     */
    name?: string;
}
/**
 * 
 * @export
 * @interface LinesCreateReq
 */
export interface LinesCreateReq {
    /**
     * 
     * @type {string}
     * @memberof LinesCreateReq
     */
    name?: string;
    /**
     * 
     * @type {number}
     * @memberof LinesCreateReq
     */
    opuId?: number;
}
/**
 * 
 * @export
 * @interface LinesCreateRes
 */
export interface LinesCreateRes {
    /**
     * 
     * @type {number}
     * @memberof LinesCreateRes
     */
    id?: number;
    /**
     * 
     * @type {string}
     * @memberof LinesCreateRes
     */
    name?: string;
}
/**
 * 
 * @export
 * @interface LinesGetByIdRes
 */
export interface LinesGetByIdRes {
    /**
     * 
     * @type {number}
     * @memberof LinesGetByIdRes
     */
    id?: number;
    /**
     * 
     * @type {string}
     * @memberof LinesGetByIdRes
     */
    name?: string;
    /**
     * 
     * @type {Array<LinesGetByIdResResStation>}
     * @memberof LinesGetByIdRes
     */
    stations?: Array<LinesGetByIdResResStation>;
}
/**
 * 
 * @export
 * @interface LinesGetByIdResResStation
 */
export interface LinesGetByIdResResStation {
    /**
     * 
     * @type {number}
     * @memberof LinesGetByIdResResStation
     */
    id?: number;
    /**
     * 
     * @type {string}
     * @memberof LinesGetByIdResResStation
     */
    name?: string | null;
}
/**
 * 
 * @export
 * @interface LinesRenameReq
 */
export interface LinesRenameReq {
    /**
     * 
     * @type {string}
     * @memberof LinesRenameReq
     */
    name?: string;
}
/**
 * 
 * @export
 * @interface LocationsCreateReq
 */
export interface LocationsCreateReq {
    /**
     * 
     * @type {number}
     * @memberof LocationsCreateReq
     */
    parentStationId?: number;
    /**
     * 
     * @type {string}
     * @memberof LocationsCreateReq
     */
    name?: string;
}
/**
 * 
 * @export
 * @interface LocationsCreateRes
 */
export interface LocationsCreateRes {
    /**
     * 
     * @type {number}
     * @memberof LocationsCreateRes
     */
    id?: number;
    /**
     * 
     * @type {string}
     * @memberof LocationsCreateRes
     */
    name?: string;
}
/**
 * 
 * @export
 * @interface LocationsGetByIdRes
 */
export interface LocationsGetByIdRes {
    /**
     * 
     * @type {number}
     * @memberof LocationsGetByIdRes
     */
    id?: number;
    /**
     * 
     * @type {string}
     * @memberof LocationsGetByIdRes
     */
    name?: string;
    /**
     * 
     * @type {LocationsGetByIdResDetector}
     * @memberof LocationsGetByIdRes
     */
    detector?: LocationsGetByIdResDetector | null;
}
/**
 * @type LocationsGetByIdResDetector
 * 
 * @export
 */
export type LocationsGetByIdResDetector = LocationsGetByIdResDetectorRes;
/**
 * 
 * @export
 * @interface LocationsGetByIdResDetectorRes
 */
export interface LocationsGetByIdResDetectorRes {
    /**
     * 
     * @type {number}
     * @memberof LocationsGetByIdResDetectorRes
     */
    id?: number;
    /**
     * 
     * @type {string}
     * @memberof LocationsGetByIdResDetectorRes
     */
    name?: string | null;
}
/**
 * 
 * @export
 * @interface LocationsRenameReq
 */
export interface LocationsRenameReq {
    /**
     * 
     * @type {string}
     * @memberof LocationsRenameReq
     */
    name?: string;
}
/**
 * 
 * @export
 * @interface OPUsCreateReq
 */
export interface OPUsCreateReq {
    /**
     * 
     * @type {number}
     * @memberof OPUsCreateReq
     */
    parentSiteId?: number;
    /**
     * 
     * @type {string}
     * @memberof OPUsCreateReq
     */
    name?: string;
}
/**
 * 
 * @export
 * @interface OPUsCreateRes
 */
export interface OPUsCreateRes {
    /**
     * 
     * @type {number}
     * @memberof OPUsCreateRes
     */
    id?: number;
    /**
     * 
     * @type {string}
     * @memberof OPUsCreateRes
     */
    name?: string;
}
/**
 * 
 * @export
 * @interface OPUsGetByIdRes
 */
export interface OPUsGetByIdRes {
    /**
     * 
     * @type {number}
     * @memberof OPUsGetByIdRes
     */
    id?: number;
    /**
     * 
     * @type {string}
     * @memberof OPUsGetByIdRes
     */
    name?: string;
    /**
     * 
     * @type {Array<OPUsGetByIdResLineRes>}
     * @memberof OPUsGetByIdRes
     */
    lines?: Array<OPUsGetByIdResLineRes>;
}
/**
 * 
 * @export
 * @interface OPUsGetByIdResLineRes
 */
export interface OPUsGetByIdResLineRes {
    /**
     * 
     * @type {number}
     * @memberof OPUsGetByIdResLineRes
     */
    id?: number;
    /**
     * 
     * @type {string}
     * @memberof OPUsGetByIdResLineRes
     */
    name?: string | null;
}
/**
 * 
 * @export
 * @interface OPUsRenameReq
 */
export interface OPUsRenameReq {
    /**
     * 
     * @type {string}
     * @memberof OPUsRenameReq
     */
    name?: string;
}
/**
 * 
 * @export
 * @interface ObjectCoordinates
 */
export interface ObjectCoordinates {
    /**
     * 
     * @type {number}
     * @memberof ObjectCoordinates
     */
    x?: number;
    /**
     * 
     * @type {number}
     * @memberof ObjectCoordinates
     */
    y?: number;
    /**
     * 
     * @type {number}
     * @memberof ObjectCoordinates
     */
    width?: number;
    /**
     * 
     * @type {number}
     * @memberof ObjectCoordinates
     */
    height?: number;
}
/**
 * 
 * @export
 * @interface SitesCreateReq
 */
export interface SitesCreateReq {
    /**
     * 
     * @type {string}
     * @memberof SitesCreateReq
     */
    name?: string;
}
/**
 * 
 * @export
 * @interface SitesCreateRes
 */
export interface SitesCreateRes {
    /**
     * 
     * @type {number}
     * @memberof SitesCreateRes
     */
    id?: number;
    /**
     * 
     * @type {string}
     * @memberof SitesCreateRes
     */
    name?: string;
}
/**
 * 
 * @export
 * @interface SitesGetByIdRes
 */
export interface SitesGetByIdRes {
    /**
     * 
     * @type {number}
     * @memberof SitesGetByIdRes
     */
    id?: number;
    /**
     * 
     * @type {string}
     * @memberof SitesGetByIdRes
     */
    name?: string;
    /**
     * 
     * @type {Array<SitesGetByIdResResOPU>}
     * @memberof SitesGetByIdRes
     */
    opus?: Array<SitesGetByIdResResOPU>;
}
/**
 * 
 * @export
 * @interface SitesGetByIdResResOPU
 */
export interface SitesGetByIdResResOPU {
    /**
     * 
     * @type {number}
     * @memberof SitesGetByIdResResOPU
     */
    id?: number;
    /**
     * 
     * @type {string}
     * @memberof SitesGetByIdResResOPU
     */
    name?: string | null;
}
/**
 * 
 * @export
 * @interface SitesListRes
 */
export interface SitesListRes {
    /**
     * 
     * @type {number}
     * @memberof SitesListRes
     */
    id?: number;
    /**
     * 
     * @type {string}
     * @memberof SitesListRes
     */
    name?: string;
}
/**
 * 
 * @export
 * @interface SitesRenameReq
 */
export interface SitesRenameReq {
    /**
     * 
     * @type {string}
     * @memberof SitesRenameReq
     */
    name?: string;
}
/**
 * 
 * @export
 * @interface StationsCreateReq
 */
export interface StationsCreateReq {
    /**
     * 
     * @type {number}
     * @memberof StationsCreateReq
     */
    parentLineId?: number;
    /**
     * 
     * @type {string}
     * @memberof StationsCreateReq
     */
    name?: string;
}
/**
 * 
 * @export
 * @interface StationsCreateRes
 */
export interface StationsCreateRes {
    /**
     * 
     * @type {number}
     * @memberof StationsCreateRes
     */
    id?: number;
    /**
     * 
     * @type {string}
     * @memberof StationsCreateRes
     */
    name?: string;
}
/**
 * 
 * @export
 * @interface StationsGetByIdRes
 */
export interface StationsGetByIdRes {
    /**
     * 
     * @type {number}
     * @memberof StationsGetByIdRes
     */
    id?: number;
    /**
     * 
     * @type {string}
     * @memberof StationsGetByIdRes
     */
    name?: string;
    /**
     * 
     * @type {Array<StationsGetByIdResLocationRes>}
     * @memberof StationsGetByIdRes
     */
    locations?: Array<StationsGetByIdResLocationRes>;
}
/**
 * 
 * @export
 * @interface StationsGetByIdResLocationRes
 */
export interface StationsGetByIdResLocationRes {
    /**
     * 
     * @type {number}
     * @memberof StationsGetByIdResLocationRes
     */
    id?: number;
    /**
     * 
     * @type {string}
     * @memberof StationsGetByIdResLocationRes
     */
    name?: string | null;
}
/**
 * 
 * @export
 * @interface StationsRenameReq
 */
export interface StationsRenameReq {
    /**
     * 
     * @type {string}
     * @memberof StationsRenameReq
     */
    name?: string;
}

/**
 * 
 * @export
 */
export const TaskInstanceFinalState = {
    Completed: 'Completed',
    Abandoned: 'Abandoned'
} as const;
export type TaskInstanceFinalState = typeof TaskInstanceFinalState[keyof typeof TaskInstanceFinalState];


/**
 * 
 * @export
 */
export const TaskState = {
    Active: 'Active',
    Paused: 'Paused',
    Inactive: 'Inactive'
} as const;
export type TaskState = typeof TaskState[keyof typeof TaskState];


/**
 * 
 * @export
 */
export const TaskType = {
    ToolKit: 'ToolKit',
    ItemKit: 'ItemKit',
    Qa: 'QA'
} as const;
export type TaskType = typeof TaskType[keyof typeof TaskType];

/**
 * 
 * @export
 * @interface TasksCreateReq
 */
export interface TasksCreateReq {
    /**
     * 
     * @type {number}
     * @memberof TasksCreateReq
     */
    parentJobId?: number;
    /**
     * 
     * @type {string}
     * @memberof TasksCreateReq
     */
    name?: string;
    /**
     * 
     * @type {number}
     * @memberof TasksCreateReq
     */
    locationId?: number;
}
/**
 * 
 * @export
 * @interface TasksCreateRes
 */
export interface TasksCreateRes {
    /**
     * 
     * @type {number}
     * @memberof TasksCreateRes
     */
    id?: number;
    /**
     * 
     * @type {string}
     * @memberof TasksCreateRes
     */
    name?: string;
}
/**
 * 
 * @export
 * @interface TasksDeleteReq
 */
export interface TasksDeleteReq {
    /**
     * 
     * @type {number}
     * @memberof TasksDeleteReq
     */
    parentJobId?: number;
}
/**
 * 
 * @export
 * @interface TasksGetByIdRes
 */
export interface TasksGetByIdRes {
    /**
     * 
     * @type {number}
     * @memberof TasksGetByIdRes
     */
    id?: number;
    /**
     * 
     * @type {string}
     * @memberof TasksGetByIdRes
     */
    name?: string;
    /**
     * 
     * @type {TaskState}
     * @memberof TasksGetByIdRes
     */
    state?: TaskState;
}
/**
 * 
 * @export
 * @interface TasksGetInstanceRes
 */
export interface TasksGetInstanceRes {
    /**
     * 
     * @type {TasksGetInstanceResResTaskInstance}
     * @memberof TasksGetInstanceRes
     */
    instance?: TasksGetInstanceResResTaskInstance;
}
/**
 * 
 * @export
 * @interface TasksGetInstanceResResEvent
 */
export interface TasksGetInstanceResResEvent {
    /**
     * 
     * @type {number}
     * @memberof TasksGetInstanceResResEvent
     */
    id?: number;
    /**
     * 
     * @type {string}
     * @memberof TasksGetInstanceResResEvent
     */
    timeStamp?: string;
    /**
     * 
     * @type {boolean}
     * @memberof TasksGetInstanceResResEvent
     */
    eventResultSuccess?: boolean;
    /**
     * 
     * @type {string}
     * @memberof TasksGetInstanceResResEvent
     */
    failureReason?: string | null;
    /**
     * 
     * @type {number}
     * @memberof TasksGetInstanceResResEvent
     */
    stepId?: number;
    /**
     * 
     * @type {number}
     * @memberof TasksGetInstanceResResEvent
     */
    taskInstanceId?: number;
}
/**
 * 
 * @export
 * @interface TasksGetInstanceResResTaskInstance
 */
export interface TasksGetInstanceResResTaskInstance {
    /**
     * 
     * @type {number}
     * @memberof TasksGetInstanceResResTaskInstance
     */
    id?: number;
    /**
     * 
     * @type {TasksGetInstanceResResTaskInstanceFinalState}
     * @memberof TasksGetInstanceResResTaskInstance
     */
    finalState?: TasksGetInstanceResResTaskInstanceFinalState | null;
    /**
     * 
     * @type {Array<TasksGetInstanceResResEvent>}
     * @memberof TasksGetInstanceResResTaskInstance
     */
    events?: Array<TasksGetInstanceResResEvent> | null;
    /**
     * 
     * @type {number}
     * @memberof TasksGetInstanceResResTaskInstance
     */
    taskId?: number;
}
/**
 * @type TasksGetInstanceResResTaskInstanceFinalState
 * 
 * @export
 */
export type TasksGetInstanceResResTaskInstanceFinalState = TaskInstanceFinalState;
/**
 * 
 * @export
 * @interface TasksGetObjectsAndStepsRes
 */
export interface TasksGetObjectsAndStepsRes {
    /**
     * 
     * @type {Array<TasksGetObjectsAndStepsResResObject>}
     * @memberof TasksGetObjectsAndStepsRes
     */
    objects?: Array<TasksGetObjectsAndStepsResResObject>;
    /**
     * 
     * @type {Array<TasksGetObjectsAndStepsResResStep>}
     * @memberof TasksGetObjectsAndStepsRes
     */
    steps?: Array<TasksGetObjectsAndStepsResResStep>;
}
/**
 * 
 * @export
 * @interface TasksGetObjectsAndStepsResResObject
 */
export interface TasksGetObjectsAndStepsResResObject {
    /**
     * 
     * @type {number}
     * @memberof TasksGetObjectsAndStepsResResObject
     */
    id?: number;
    /**
     * 
     * @type {string}
     * @memberof TasksGetObjectsAndStepsResResObject
     */
    name?: string | null;
    /**
     * 
     * @type {TasksGetObjectsAndStepsResResObjectCoordinates}
     * @memberof TasksGetObjectsAndStepsResResObject
     */
    coordinates?: TasksGetObjectsAndStepsResResObjectCoordinates | null;
}
/**
 * @type TasksGetObjectsAndStepsResResObjectCoordinates
 * 
 * @export
 */
export type TasksGetObjectsAndStepsResResObjectCoordinates = ObjectCoordinates;
/**
 * 
 * @export
 * @interface TasksGetObjectsAndStepsResResStep
 */
export interface TasksGetObjectsAndStepsResResStep {
    /**
     * 
     * @type {number}
     * @memberof TasksGetObjectsAndStepsResResStep
     */
    id?: number;
    /**
     * 
     * @type {number}
     * @memberof TasksGetObjectsAndStepsResResStep
     */
    orderNum?: number | null;
    /**
     * 
     * @type {TemplateState}
     * @memberof TasksGetObjectsAndStepsResResStep
     */
    expectedInitialState?: TemplateState;
    /**
     * 
     * @type {TemplateState}
     * @memberof TasksGetObjectsAndStepsResResStep
     */
    expectedSubsequentState?: TemplateState;
    /**
     * 
     * @type {number}
     * @memberof TasksGetObjectsAndStepsResResStep
     */
    objectId?: number;
}
/**
 * 
 * @export
 * @interface TasksUpdateReq
 */
export interface TasksUpdateReq {
    /**
     * 
     * @type {string}
     * @memberof TasksUpdateReq
     */
    newName?: string | null;
    /**
     * 
     * @type {TasksUpdateReqNewType}
     * @memberof TasksUpdateReq
     */
    newType?: TasksUpdateReqNewType | null;
    /**
     * 
     * @type {number}
     * @memberof TasksUpdateReq
     */
    parentJobId?: number;
    /**
     * 
     * @type {Array<TasksUpdateReqNewObjectReq>}
     * @memberof TasksUpdateReq
     */
    newObjects?: Array<TasksUpdateReqNewObjectReq> | null;
    /**
     * 
     * @type {Array<TasksUpdateReqModObjectReq>}
     * @memberof TasksUpdateReq
     */
    modifiedObjects?: Array<TasksUpdateReqModObjectReq> | null;
    /**
     * 
     * @type {Array<number>}
     * @memberof TasksUpdateReq
     */
    deletedObjects?: Array<number> | null;
    /**
     * 
     * @type {Array<TasksUpdateReqNewStepReq>}
     * @memberof TasksUpdateReq
     */
    newSteps?: Array<TasksUpdateReqNewStepReq> | null;
    /**
     * 
     * @type {Array<TasksUpdateReqModStepReq>}
     * @memberof TasksUpdateReq
     */
    modifiedSteps?: Array<TasksUpdateReqModStepReq> | null;
    /**
     * 
     * @type {Array<number>}
     * @memberof TasksUpdateReq
     */
    deletedSteps?: Array<number> | null;
}
/**
 * 
 * @export
 * @interface TasksUpdateReqModObjectReq
 */
export interface TasksUpdateReqModObjectReq {
    /**
     * 
     * @type {number}
     * @memberof TasksUpdateReqModObjectReq
     */
    id?: number;
    /**
     * 
     * @type {string}
     * @memberof TasksUpdateReqModObjectReq
     */
    name?: string;
    /**
     * 
     * @type {ObjectCoordinates}
     * @memberof TasksUpdateReqModObjectReq
     */
    coordinates?: ObjectCoordinates;
}
/**
 * 
 * @export
 * @interface TasksUpdateReqModStepReq
 */
export interface TasksUpdateReqModStepReq {
    /**
     * 
     * @type {number}
     * @memberof TasksUpdateReqModStepReq
     */
    id?: number;
    /**
     * 
     * @type {number}
     * @memberof TasksUpdateReqModStepReq
     */
    orderNum?: number;
    /**
     * 
     * @type {TemplateState}
     * @memberof TasksUpdateReqModStepReq
     */
    expectedInitialState?: TemplateState;
    /**
     * 
     * @type {TemplateState}
     * @memberof TasksUpdateReqModStepReq
     */
    expectedSubsequentState?: TemplateState;
    /**
     * 
     * @type {string}
     * @memberof TasksUpdateReqModStepReq
     */
    objectName?: string;
}
/**
 * 
 * @export
 * @interface TasksUpdateReqNewObjectReq
 */
export interface TasksUpdateReqNewObjectReq {
    /**
     * 
     * @type {string}
     * @memberof TasksUpdateReqNewObjectReq
     */
    name?: string;
    /**
     * 
     * @type {ObjectCoordinates}
     * @memberof TasksUpdateReqNewObjectReq
     */
    coordinates?: ObjectCoordinates;
}
/**
 * 
 * @export
 * @interface TasksUpdateReqNewStepReq
 */
export interface TasksUpdateReqNewStepReq {
    /**
     * 
     * @type {number}
     * @memberof TasksUpdateReqNewStepReq
     */
    orderNum?: number;
    /**
     * 
     * @type {TemplateState}
     * @memberof TasksUpdateReqNewStepReq
     */
    expectedInitialState?: TemplateState;
    /**
     * 
     * @type {TemplateState}
     * @memberof TasksUpdateReqNewStepReq
     */
    expectedSubsequentState?: TemplateState;
    /**
     * 
     * @type {string}
     * @memberof TasksUpdateReqNewStepReq
     */
    objectName?: string;
}
/**
 * @type TasksUpdateReqNewType
 * 
 * @export
 */
export type TasksUpdateReqNewType = TaskType;

/**
 * 
 * @export
 */
export const TemplateState = {
    Present: 'Present',
    Missing: 'Missing',
    Uncertain: 'Uncertain',
    UnknownObject: 'UnknownObject'
} as const;
export type TemplateState = typeof TemplateState[keyof typeof TemplateState];


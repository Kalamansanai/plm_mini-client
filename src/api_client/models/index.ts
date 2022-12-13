/* tslint:disable */
/* eslint-disable */
/**
 * 
 * @export
 * @interface DetectorsCommandReq
 */
export interface DetectorsCommandReq {
    /**
     * 
     * @type {object}
     * @memberof DetectorsCommandReq
     */
    command?: object;
}
/**
 * 
 * @export
 * @interface DetectorsGetByIdRes
 */
export interface DetectorsGetByIdRes {
    /**
     * 
     * @type {number}
     * @memberof DetectorsGetByIdRes
     */
    id?: number;
    /**
     * 
     * @type {string}
     * @memberof DetectorsGetByIdRes
     */
    name?: string;
    /**
     * 
     * @type {string}
     * @memberof DetectorsGetByIdRes
     */
    macAddress?: string;
    /**
     * 
     * @type {string}
     * @memberof DetectorsGetByIdRes
     */
    ipAddress?: string;
    /**
     * 
     * @type {string}
     * @memberof DetectorsGetByIdRes
     */
    state?: string;
    /**
     * 
     * @type {DetectorsGetByIdResLocation}
     * @memberof DetectorsGetByIdRes
     */
    location?: DetectorsGetByIdResLocation | null;
}
/**
 * @type DetectorsGetByIdResLocation
 * 
 * @export
 */
export type DetectorsGetByIdResLocation = DetectorsGetByIdResResLocation;
/**
 * 
 * @export
 * @interface DetectorsGetByIdResResLocation
 */
export interface DetectorsGetByIdResResLocation {
    /**
     * 
     * @type {number}
     * @memberof DetectorsGetByIdResResLocation
     */
    id?: number;
    /**
     * 
     * @type {string}
     * @memberof DetectorsGetByIdResResLocation
     */
    name?: string | null;
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
     * @type {Array<number>}
     * @memberof DetectorsIdentifyReq
     */
    qrCoordinates?: Array<number>;
}
/**
 * 
 * @export
 * @interface DetectorsListRes
 */
export interface DetectorsListRes {
    /**
     * 
     * @type {number}
     * @memberof DetectorsListRes
     */
    id?: number;
    /**
     * 
     * @type {string}
     * @memberof DetectorsListRes
     */
    name?: string;
    /**
     * 
     * @type {string}
     * @memberof DetectorsListRes
     */
    macAddress?: string;
    /**
     * 
     * @type {string}
     * @memberof DetectorsListRes
     */
    ipAddress?: string;
    /**
     * 
     * @type {string}
     * @memberof DetectorsListRes
     */
    state?: string;
    /**
     * 
     * @type {DetectorsListResLocation}
     * @memberof DetectorsListRes
     */
    location?: DetectorsListResLocation | null;
}
/**
 * @type DetectorsListResLocation
 * 
 * @export
 */
export type DetectorsListResLocation = DetectorsListResResLocation;
/**
 * 
 * @export
 * @interface DetectorsListResResLocation
 */
export interface DetectorsListResResLocation {
    /**
     * 
     * @type {number}
     * @memberof DetectorsListResResLocation
     */
    id?: number;
    /**
     * 
     * @type {string}
     * @memberof DetectorsListResResLocation
     */
    name?: string | null;
}
/**
 * 
 * @export
 * @interface ErrorResponse
 */
export interface ErrorResponse {
    /**
     * 
     * @type {number}
     * @memberof ErrorResponse
     */
    statusCode?: number;
    /**
     * 
     * @type {string}
     * @memberof ErrorResponse
     */
    message?: string;
    /**
     * 
     * @type {{ [key: string]: Array<string>; }}
     * @memberof ErrorResponse
     */
    errors?: { [key: string]: Array<string>; };
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
    success?: boolean;
    /**
     * 
     * @type {string}
     * @memberof EventsCreateReq
     */
    failureReason?: string | null;
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
     * @type {boolean}
     * @memberof LocationsGetByIdRes
     */
    hasSnapshot?: boolean;
    /**
     * 
     * @type {LocationsGetByIdResDetector}
     * @memberof LocationsGetByIdRes
     */
    detector?: LocationsGetByIdResDetector | null;
    /**
     * 
     * @type {LocationsGetByIdResOngoingTask}
     * @memberof LocationsGetByIdRes
     */
    ongoingTask?: LocationsGetByIdResOngoingTask | null;
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
    /**
     * 
     * @type {string}
     * @memberof LocationsGetByIdResDetectorRes
     */
    state?: string;
}
/**
 * 
 * @export
 * @interface LocationsGetByIdResEventRes
 */
export interface LocationsGetByIdResEventRes {
    /**
     * 
     * @type {number}
     * @memberof LocationsGetByIdResEventRes
     */
    id?: number;
    /**
     * 
     * @type {string}
     * @memberof LocationsGetByIdResEventRes
     */
    timestamp?: string;
    /**
     * 
     * @type {boolean}
     * @memberof LocationsGetByIdResEventRes
     */
    success?: boolean;
    /**
     * 
     * @type {string}
     * @memberof LocationsGetByIdResEventRes
     */
    failureReason?: string | null;
    /**
     * 
     * @type {LocationsGetByIdResEventResStep}
     * @memberof LocationsGetByIdResEventRes
     */
    step?: LocationsGetByIdResEventResStep | null;
}
/**
 * @type LocationsGetByIdResEventResStep
 * 
 * @export
 */
export type LocationsGetByIdResEventResStep = LocationsGetByIdResStepRes;
/**
 * 
 * @export
 * @interface LocationsGetByIdResObjectRes
 */
export interface LocationsGetByIdResObjectRes {
    /**
     * 
     * @type {number}
     * @memberof LocationsGetByIdResObjectRes
     */
    id?: number;
    /**
     * 
     * @type {string}
     * @memberof LocationsGetByIdResObjectRes
     */
    name?: string | null;
    /**
     * 
     * @type {TasksGetObjectsAndStepsResResObjectCoordinates}
     * @memberof LocationsGetByIdResObjectRes
     */
    coords?: TasksGetObjectsAndStepsResResObjectCoordinates | null;
}
/**
 * 
 * @export
 * @interface LocationsGetByIdResOngoingJobRes
 */
export interface LocationsGetByIdResOngoingJobRes {
    /**
     * 
     * @type {number}
     * @memberof LocationsGetByIdResOngoingJobRes
     */
    id?: number;
    /**
     * 
     * @type {string}
     * @memberof LocationsGetByIdResOngoingJobRes
     */
    name?: string | null;
}
/**
 * @type LocationsGetByIdResOngoingTask
 * 
 * @export
 */
export type LocationsGetByIdResOngoingTask = LocationsGetByIdResOngoingTaskRes;
/**
 * 
 * @export
 * @interface LocationsGetByIdResOngoingTaskInstanceRes
 */
export interface LocationsGetByIdResOngoingTaskInstanceRes {
    /**
     * 
     * @type {number}
     * @memberof LocationsGetByIdResOngoingTaskInstanceRes
     */
    id?: number;
    /**
     * 
     * @type {TaskInstanceState}
     * @memberof LocationsGetByIdResOngoingTaskInstanceRes
     */
    state?: TaskInstanceState;
    /**
     * 
     * @type {Array<LocationsGetByIdResEventRes>}
     * @memberof LocationsGetByIdResOngoingTaskInstanceRes
     */
    events?: Array<LocationsGetByIdResEventRes> | null;
    /**
     * 
     * @type {number}
     * @memberof LocationsGetByIdResOngoingTaskInstanceRes
     */
    currentOrderNum?: number;
    /**
     * 
     * @type {Array<LocationsGetByIdResStepRes>}
     * @memberof LocationsGetByIdResOngoingTaskInstanceRes
     */
    currentOrderNumRemainingSteps?: Array<LocationsGetByIdResStepRes> | null;
}
/**
 * 
 * @export
 * @interface LocationsGetByIdResOngoingTaskRes
 */
export interface LocationsGetByIdResOngoingTaskRes {
    /**
     * 
     * @type {number}
     * @memberof LocationsGetByIdResOngoingTaskRes
     */
    id?: number;
    /**
     * 
     * @type {string}
     * @memberof LocationsGetByIdResOngoingTaskRes
     */
    name?: string | null;
    /**
     * 
     * @type {TaskType}
     * @memberof LocationsGetByIdResOngoingTaskRes
     */
    type?: TaskType;
    /**
     * 
     * @type {LocationsGetByIdResOngoingTaskResJob}
     * @memberof LocationsGetByIdResOngoingTaskRes
     */
    job?: LocationsGetByIdResOngoingTaskResJob | null;
    /**
     * 
     * @type {LocationsGetByIdResOngoingTaskResOngoingInstance}
     * @memberof LocationsGetByIdResOngoingTaskRes
     */
    ongoingInstance?: LocationsGetByIdResOngoingTaskResOngoingInstance | null;
    /**
     * 
     * @type {Array<LocationsGetByIdResStepRes>}
     * @memberof LocationsGetByIdResOngoingTaskRes
     */
    steps?: Array<LocationsGetByIdResStepRes> | null;
    /**
     * 
     * @type {number}
     * @memberof LocationsGetByIdResOngoingTaskRes
     */
    maxOrderNum?: number;
}
/**
 * @type LocationsGetByIdResOngoingTaskResJob
 * 
 * @export
 */
export type LocationsGetByIdResOngoingTaskResJob = LocationsGetByIdResOngoingJobRes;
/**
 * @type LocationsGetByIdResOngoingTaskResOngoingInstance
 * 
 * @export
 */
export type LocationsGetByIdResOngoingTaskResOngoingInstance = LocationsGetByIdResOngoingTaskInstanceRes;
/**
 * 
 * @export
 * @interface LocationsGetByIdResStepRes
 */
export interface LocationsGetByIdResStepRes {
    /**
     * 
     * @type {number}
     * @memberof LocationsGetByIdResStepRes
     */
    id?: number;
    /**
     * 
     * @type {number}
     * @memberof LocationsGetByIdResStepRes
     */
    orderNum?: number | null;
    /**
     * 
     * @type {TemplateState}
     * @memberof LocationsGetByIdResStepRes
     */
    exInitState?: TemplateState;
    /**
     * 
     * @type {TemplateState}
     * @memberof LocationsGetByIdResStepRes
     */
    exSubsState?: TemplateState;
    /**
     * 
     * @type {LocationsGetByIdResStepResObject}
     * @memberof LocationsGetByIdResStepRes
     */
    object?: LocationsGetByIdResStepResObject | null;
}
/**
 * @type LocationsGetByIdResStepResObject
 * 
 * @export
 */
export type LocationsGetByIdResStepResObject = LocationsGetByIdResObjectRes;
/**
 * 
 * @export
 * @interface LocationsGetTasksRes
 */
export interface LocationsGetTasksRes {
    /**
     * 
     * @type {Array<LocationsGetTasksResTaskRes>}
     * @memberof LocationsGetTasksRes
     */
    tasks?: Array<LocationsGetTasksResTaskRes>;
}
/**
 * 
 * @export
 * @interface LocationsGetTasksResTaskRes
 */
export interface LocationsGetTasksResTaskRes {
    /**
     * 
     * @type {number}
     * @memberof LocationsGetTasksResTaskRes
     */
    id?: number;
    /**
     * 
     * @type {string}
     * @memberof LocationsGetTasksResTaskRes
     */
    name?: string | null;
    /**
     * 
     * @type {string}
     * @memberof LocationsGetTasksResTaskRes
     */
    jobName?: string | null;
    /**
     * 
     * @type {boolean}
     * @memberof LocationsGetTasksResTaskRes
     */
    active?: boolean;
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
 * @interface StationsGetByIdResDetectorRes
 */
export interface StationsGetByIdResDetectorRes {
    /**
     * 
     * @type {number}
     * @memberof StationsGetByIdResDetectorRes
     */
    id?: number;
    /**
     * 
     * @type {string}
     * @memberof StationsGetByIdResDetectorRes
     */
    name?: string | null;
    /**
     * 
     * @type {string}
     * @memberof StationsGetByIdResDetectorRes
     */
    macAddress?: string | null;
    /**
     * 
     * @type {string}
     * @memberof StationsGetByIdResDetectorRes
     */
    state?: string;
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
    /**
     * 
     * @type {boolean}
     * @memberof StationsGetByIdResLocationRes
     */
    hasSnapshot?: boolean;
    /**
     * 
     * @type {StationsGetByIdResLocationResDetector}
     * @memberof StationsGetByIdResLocationRes
     */
    detector?: StationsGetByIdResLocationResDetector | null;
}
/**
 * @type StationsGetByIdResLocationResDetector
 * 
 * @export
 */
export type StationsGetByIdResLocationResDetector = StationsGetByIdResDetectorRes;
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
export const TaskInstanceState = {
    Completed: 'Completed',
    Abandoned: 'Abandoned',
    InProgress: 'InProgress',
    Paused: 'Paused'
} as const;
export type TaskInstanceState = typeof TaskInstanceState[keyof typeof TaskInstanceState];


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
    /**
     * 
     * @type {TaskType}
     * @memberof TasksCreateReq
     */
    taskType?: TaskType;
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
     * @type {number}
     * @memberof TasksGetByIdRes
     */
    maxOrderNum?: number;
    /**
     * 
     * @type {TaskType}
     * @memberof TasksGetByIdRes
     */
    taskType?: TaskType;
    /**
     * 
     * @type {TasksGetByIdResResLocation}
     * @memberof TasksGetByIdRes
     */
    location?: TasksGetByIdResResLocation;
    /**
     * 
     * @type {TasksGetByIdResResJob}
     * @memberof TasksGetByIdRes
     */
    job?: TasksGetByIdResResJob;
    /**
     * 
     * @type {TasksGetByIdResOngoingInstance}
     * @memberof TasksGetByIdRes
     */
    ongoingInstance?: TasksGetByIdResOngoingInstance | null;
}
/**
 * @type TasksGetByIdResOngoingInstance
 * 
 * @export
 */
export type TasksGetByIdResOngoingInstance = TasksGetByIdResResInstance;
/**
 * 
 * @export
 * @interface TasksGetByIdResResEvent
 */
export interface TasksGetByIdResResEvent {
    /**
     * 
     * @type {string}
     * @memberof TasksGetByIdResResEvent
     */
    timestamp?: string;
    /**
     * 
     * @type {boolean}
     * @memberof TasksGetByIdResResEvent
     */
    success?: boolean;
    /**
     * 
     * @type {string}
     * @memberof TasksGetByIdResResEvent
     */
    failureReason?: string | null;
}
/**
 * 
 * @export
 * @interface TasksGetByIdResResInstance
 */
export interface TasksGetByIdResResInstance {
    /**
     * 
     * @type {number}
     * @memberof TasksGetByIdResResInstance
     */
    id?: number;
    /**
     * 
     * @type {TaskInstanceState}
     * @memberof TasksGetByIdResResInstance
     */
    state?: TaskInstanceState;
    /**
     * 
     * @type {Array<TasksGetByIdResResEvent>}
     * @memberof TasksGetByIdResResInstance
     */
    events?: Array<TasksGetByIdResResEvent> | null;
}
/**
 * 
 * @export
 * @interface TasksGetByIdResResJob
 */
export interface TasksGetByIdResResJob {
    /**
     * 
     * @type {number}
     * @memberof TasksGetByIdResResJob
     */
    id?: number;
    /**
     * 
     * @type {string}
     * @memberof TasksGetByIdResResJob
     */
    name?: string | null;
}
/**
 * 
 * @export
 * @interface TasksGetByIdResResLocation
 */
export interface TasksGetByIdResResLocation {
    /**
     * 
     * @type {number}
     * @memberof TasksGetByIdResResLocation
     */
    id?: number;
    /**
     * 
     * @type {string}
     * @memberof TasksGetByIdResResLocation
     */
    name?: string | null;
}
/**
 * 
 * @export
 * @interface TasksGetCurrentInstanceRes
 */
export interface TasksGetCurrentInstanceRes {
    /**
     * 
     * @type {TasksGetCurrentInstanceResResTaskInstance}
     * @memberof TasksGetCurrentInstanceRes
     */
    instance?: TasksGetCurrentInstanceResResTaskInstance;
}
/**
 * 
 * @export
 * @interface TasksGetCurrentInstanceResResEvent
 */
export interface TasksGetCurrentInstanceResResEvent {
    /**
     * 
     * @type {number}
     * @memberof TasksGetCurrentInstanceResResEvent
     */
    id?: number;
    /**
     * 
     * @type {string}
     * @memberof TasksGetCurrentInstanceResResEvent
     */
    timeStamp?: string;
    /**
     * 
     * @type {boolean}
     * @memberof TasksGetCurrentInstanceResResEvent
     */
    eventResultSuccess?: boolean;
    /**
     * 
     * @type {string}
     * @memberof TasksGetCurrentInstanceResResEvent
     */
    failureReason?: string | null;
    /**
     * 
     * @type {number}
     * @memberof TasksGetCurrentInstanceResResEvent
     */
    stepId?: number;
    /**
     * 
     * @type {number}
     * @memberof TasksGetCurrentInstanceResResEvent
     */
    taskInstanceId?: number;
}
/**
 * 
 * @export
 * @interface TasksGetCurrentInstanceResResTaskInstance
 */
export interface TasksGetCurrentInstanceResResTaskInstance {
    /**
     * 
     * @type {number}
     * @memberof TasksGetCurrentInstanceResResTaskInstance
     */
    id?: number;
    /**
     * 
     * @type {TasksGetCurrentInstanceResResTaskInstanceFinalState}
     * @memberof TasksGetCurrentInstanceResResTaskInstance
     */
    finalState?: TasksGetCurrentInstanceResResTaskInstanceFinalState | null;
    /**
     * 
     * @type {Array<TasksGetCurrentInstanceResResEvent>}
     * @memberof TasksGetCurrentInstanceResResTaskInstance
     */
    events?: Array<TasksGetCurrentInstanceResResEvent> | null;
    /**
     * 
     * @type {number}
     * @memberof TasksGetCurrentInstanceResResTaskInstance
     */
    taskId?: number;
}
/**
 * @type TasksGetCurrentInstanceResResTaskInstanceFinalState
 * 
 * @export
 */
export type TasksGetCurrentInstanceResResTaskInstanceFinalState = TaskInstanceState;
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


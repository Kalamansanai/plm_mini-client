/* tslint:disable */
/* eslint-disable */
/**
 * 
 * @export
 * @interface ApiEndpointsDetectorsCommandReq
 */
export interface ApiEndpointsDetectorsCommandReq {
    /**
     * 
     * @type {DomainCommonDetectorCommandDetectorCommand}
     * @memberof ApiEndpointsDetectorsCommandReq
     */
    command?: DomainCommonDetectorCommandDetectorCommand;
}
/**
 * 
 * @export
 * @interface ApiEndpointsDetectorsHeartBeatReq
 */
export interface ApiEndpointsDetectorsHeartBeatReq {
    /**
     * 
     * @type {number}
     * @memberof ApiEndpointsDetectorsHeartBeatReq
     */
    temperature?: number;
    /**
     * 
     * @type {number}
     * @memberof ApiEndpointsDetectorsHeartBeatReq
     */
    freeStoragePercentage?: number;
    /**
     * 
     * @type {number}
     * @memberof ApiEndpointsDetectorsHeartBeatReq
     */
    uptime?: number;
}
/**
 * 
 * @export
 * @interface ApiEndpointsDetectorsIdentifyReq
 */
export interface ApiEndpointsDetectorsIdentifyReq {
    /**
     * 
     * @type {string}
     * @memberof ApiEndpointsDetectorsIdentifyReq
     */
    macAddress?: string;
    /**
     * 
     * @type {Array<ApiEndpointsDetectorsIdentifyReqCalibrationCoordsReq>}
     * @memberof ApiEndpointsDetectorsIdentifyReq
     */
    coordinates?: Array<ApiEndpointsDetectorsIdentifyReqCalibrationCoordsReq>;
}
/**
 * 
 * @export
 * @interface ApiEndpointsDetectorsIdentifyReqCalibrationCoordsReq
 */
export interface ApiEndpointsDetectorsIdentifyReqCalibrationCoordsReq {
    /**
     * 
     * @type {number}
     * @memberof ApiEndpointsDetectorsIdentifyReqCalibrationCoordsReq
     */
    x?: number;
    /**
     * 
     * @type {number}
     * @memberof ApiEndpointsDetectorsIdentifyReqCalibrationCoordsReq
     */
    y?: number;
}
/**
 * 
 * @export
 * @interface ApiEndpointsEventsCreateReq
 */
export interface ApiEndpointsEventsCreateReq {
    /**
     * 
     * @type {number}
     * @memberof ApiEndpointsEventsCreateReq
     */
    taskId?: number;
    /**
     * 
     * @type {number}
     * @memberof ApiEndpointsEventsCreateReq
     */
    stepId?: number;
    /**
     * 
     * @type {boolean}
     * @memberof ApiEndpointsEventsCreateReq
     */
    eventResult?: boolean;
    /**
     * 
     * @type {string}
     * @memberof ApiEndpointsEventsCreateReq
     */
    failureReason?: string;
}
/**
 * 
 * @export
 * @interface ApiEndpointsJobsCreateReq
 */
export interface ApiEndpointsJobsCreateReq {
    /**
     * 
     * @type {string}
     * @memberof ApiEndpointsJobsCreateReq
     */
    name?: string;
}
/**
 * 
 * @export
 * @interface ApiEndpointsJobsCreateRes
 */
export interface ApiEndpointsJobsCreateRes {
    /**
     * 
     * @type {number}
     * @memberof ApiEndpointsJobsCreateRes
     */
    id?: number;
    /**
     * 
     * @type {string}
     * @memberof ApiEndpointsJobsCreateRes
     */
    name?: string;
}
/**
 * 
 * @export
 * @interface ApiEndpointsJobsGetByIdRes
 */
export interface ApiEndpointsJobsGetByIdRes {
    /**
     * 
     * @type {number}
     * @memberof ApiEndpointsJobsGetByIdRes
     */
    id?: number;
    /**
     * 
     * @type {string}
     * @memberof ApiEndpointsJobsGetByIdRes
     */
    name?: string;
    /**
     * 
     * @type {Array<ApiEndpointsJobsGetByIdResResTask>}
     * @memberof ApiEndpointsJobsGetByIdRes
     */
    tasks?: Array<ApiEndpointsJobsGetByIdResResTask>;
}
/**
 * 
 * @export
 * @interface ApiEndpointsJobsGetByIdResResTask
 */
export interface ApiEndpointsJobsGetByIdResResTask {
    /**
     * 
     * @type {number}
     * @memberof ApiEndpointsJobsGetByIdResResTask
     */
    id?: number;
    /**
     * 
     * @type {string}
     * @memberof ApiEndpointsJobsGetByIdResResTask
     */
    name?: string | null;
}
/**
 * 
 * @export
 * @interface ApiEndpointsJobsListRes
 */
export interface ApiEndpointsJobsListRes {
    /**
     * 
     * @type {number}
     * @memberof ApiEndpointsJobsListRes
     */
    id?: number;
    /**
     * 
     * @type {string}
     * @memberof ApiEndpointsJobsListRes
     */
    name?: string;
}
/**
 * 
 * @export
 * @interface ApiEndpointsJobsRenameReq
 */
export interface ApiEndpointsJobsRenameReq {
    /**
     * 
     * @type {string}
     * @memberof ApiEndpointsJobsRenameReq
     */
    name?: string;
}
/**
 * 
 * @export
 * @interface ApiEndpointsLinesCreateReq
 */
export interface ApiEndpointsLinesCreateReq {
    /**
     * 
     * @type {string}
     * @memberof ApiEndpointsLinesCreateReq
     */
    name?: string;
    /**
     * 
     * @type {number}
     * @memberof ApiEndpointsLinesCreateReq
     */
    oPUId?: number;
}
/**
 * 
 * @export
 * @interface ApiEndpointsLinesCreateRes
 */
export interface ApiEndpointsLinesCreateRes {
    /**
     * 
     * @type {number}
     * @memberof ApiEndpointsLinesCreateRes
     */
    id?: number;
    /**
     * 
     * @type {string}
     * @memberof ApiEndpointsLinesCreateRes
     */
    name?: string;
}
/**
 * 
 * @export
 * @interface ApiEndpointsLinesGetByIdRes
 */
export interface ApiEndpointsLinesGetByIdRes {
    /**
     * 
     * @type {number}
     * @memberof ApiEndpointsLinesGetByIdRes
     */
    id?: number;
    /**
     * 
     * @type {string}
     * @memberof ApiEndpointsLinesGetByIdRes
     */
    name?: string;
    /**
     * 
     * @type {Array<ApiEndpointsLinesGetByIdResResStation>}
     * @memberof ApiEndpointsLinesGetByIdRes
     */
    stations?: Array<ApiEndpointsLinesGetByIdResResStation>;
}
/**
 * 
 * @export
 * @interface ApiEndpointsLinesGetByIdResResStation
 */
export interface ApiEndpointsLinesGetByIdResResStation {
    /**
     * 
     * @type {number}
     * @memberof ApiEndpointsLinesGetByIdResResStation
     */
    id?: number;
    /**
     * 
     * @type {string}
     * @memberof ApiEndpointsLinesGetByIdResResStation
     */
    name?: string | null;
}
/**
 * 
 * @export
 * @interface ApiEndpointsLinesRenameReq
 */
export interface ApiEndpointsLinesRenameReq {
    /**
     * 
     * @type {string}
     * @memberof ApiEndpointsLinesRenameReq
     */
    name?: string;
}
/**
 * 
 * @export
 * @interface ApiEndpointsLocationsCreateReq
 */
export interface ApiEndpointsLocationsCreateReq {
    /**
     * 
     * @type {number}
     * @memberof ApiEndpointsLocationsCreateReq
     */
    parentStationId?: number;
    /**
     * 
     * @type {string}
     * @memberof ApiEndpointsLocationsCreateReq
     */
    name?: string;
}
/**
 * 
 * @export
 * @interface ApiEndpointsLocationsCreateRes
 */
export interface ApiEndpointsLocationsCreateRes {
    /**
     * 
     * @type {number}
     * @memberof ApiEndpointsLocationsCreateRes
     */
    id?: number;
    /**
     * 
     * @type {string}
     * @memberof ApiEndpointsLocationsCreateRes
     */
    name?: string;
}
/**
 * 
 * @export
 * @interface ApiEndpointsLocationsGetByIdRes
 */
export interface ApiEndpointsLocationsGetByIdRes {
    /**
     * 
     * @type {number}
     * @memberof ApiEndpointsLocationsGetByIdRes
     */
    id?: number;
    /**
     * 
     * @type {string}
     * @memberof ApiEndpointsLocationsGetByIdRes
     */
    name?: string;
    /**
     * 
     * @type {ApiEndpointsLocationsGetByIdResDetector}
     * @memberof ApiEndpointsLocationsGetByIdRes
     */
    detector?: ApiEndpointsLocationsGetByIdResDetector | null;
}
/**
 * @type ApiEndpointsLocationsGetByIdResDetector
 * 
 * @export
 */
export type ApiEndpointsLocationsGetByIdResDetector = ApiEndpointsLocationsGetByIdResDetectorRes;
/**
 * 
 * @export
 * @interface ApiEndpointsLocationsGetByIdResDetectorRes
 */
export interface ApiEndpointsLocationsGetByIdResDetectorRes {
    /**
     * 
     * @type {number}
     * @memberof ApiEndpointsLocationsGetByIdResDetectorRes
     */
    id?: number;
    /**
     * 
     * @type {string}
     * @memberof ApiEndpointsLocationsGetByIdResDetectorRes
     */
    name?: string | null;
}
/**
 * 
 * @export
 * @interface ApiEndpointsLocationsRenameReq
 */
export interface ApiEndpointsLocationsRenameReq {
    /**
     * 
     * @type {string}
     * @memberof ApiEndpointsLocationsRenameReq
     */
    name?: string;
}
/**
 * 
 * @export
 * @interface ApiEndpointsOPUsCreateReq
 */
export interface ApiEndpointsOPUsCreateReq {
    /**
     * 
     * @type {number}
     * @memberof ApiEndpointsOPUsCreateReq
     */
    parentSiteId?: number;
    /**
     * 
     * @type {string}
     * @memberof ApiEndpointsOPUsCreateReq
     */
    name?: string;
}
/**
 * 
 * @export
 * @interface ApiEndpointsOPUsCreateRes
 */
export interface ApiEndpointsOPUsCreateRes {
    /**
     * 
     * @type {number}
     * @memberof ApiEndpointsOPUsCreateRes
     */
    id?: number;
    /**
     * 
     * @type {string}
     * @memberof ApiEndpointsOPUsCreateRes
     */
    name?: string;
}
/**
 * 
 * @export
 * @interface ApiEndpointsOPUsGetByIdRes
 */
export interface ApiEndpointsOPUsGetByIdRes {
    /**
     * 
     * @type {number}
     * @memberof ApiEndpointsOPUsGetByIdRes
     */
    id?: number;
    /**
     * 
     * @type {string}
     * @memberof ApiEndpointsOPUsGetByIdRes
     */
    name?: string;
    /**
     * 
     * @type {Array<ApiEndpointsOPUsGetByIdResLineRes>}
     * @memberof ApiEndpointsOPUsGetByIdRes
     */
    lines?: Array<ApiEndpointsOPUsGetByIdResLineRes>;
}
/**
 * 
 * @export
 * @interface ApiEndpointsOPUsGetByIdResLineRes
 */
export interface ApiEndpointsOPUsGetByIdResLineRes {
    /**
     * 
     * @type {number}
     * @memberof ApiEndpointsOPUsGetByIdResLineRes
     */
    id?: number;
    /**
     * 
     * @type {string}
     * @memberof ApiEndpointsOPUsGetByIdResLineRes
     */
    name?: string | null;
}
/**
 * 
 * @export
 * @interface ApiEndpointsOPUsRenameReq
 */
export interface ApiEndpointsOPUsRenameReq {
    /**
     * 
     * @type {string}
     * @memberof ApiEndpointsOPUsRenameReq
     */
    name?: string;
}
/**
 * 
 * @export
 * @interface ApiEndpointsSitesCreateReq
 */
export interface ApiEndpointsSitesCreateReq {
    /**
     * 
     * @type {string}
     * @memberof ApiEndpointsSitesCreateReq
     */
    name?: string;
}
/**
 * 
 * @export
 * @interface ApiEndpointsSitesCreateRes
 */
export interface ApiEndpointsSitesCreateRes {
    /**
     * 
     * @type {number}
     * @memberof ApiEndpointsSitesCreateRes
     */
    id?: number;
    /**
     * 
     * @type {string}
     * @memberof ApiEndpointsSitesCreateRes
     */
    name?: string;
}
/**
 * 
 * @export
 * @interface ApiEndpointsSitesGetByIdRes
 */
export interface ApiEndpointsSitesGetByIdRes {
    /**
     * 
     * @type {number}
     * @memberof ApiEndpointsSitesGetByIdRes
     */
    id?: number;
    /**
     * 
     * @type {string}
     * @memberof ApiEndpointsSitesGetByIdRes
     */
    name?: string;
    /**
     * 
     * @type {Array<ApiEndpointsSitesGetByIdResResOPU>}
     * @memberof ApiEndpointsSitesGetByIdRes
     */
    opus?: Array<ApiEndpointsSitesGetByIdResResOPU>;
}
/**
 * 
 * @export
 * @interface ApiEndpointsSitesGetByIdResResOPU
 */
export interface ApiEndpointsSitesGetByIdResResOPU {
    /**
     * 
     * @type {number}
     * @memberof ApiEndpointsSitesGetByIdResResOPU
     */
    id?: number;
    /**
     * 
     * @type {string}
     * @memberof ApiEndpointsSitesGetByIdResResOPU
     */
    name?: string | null;
}
/**
 * 
 * @export
 * @interface ApiEndpointsSitesListRes
 */
export interface ApiEndpointsSitesListRes {
    /**
     * 
     * @type {number}
     * @memberof ApiEndpointsSitesListRes
     */
    id?: number;
    /**
     * 
     * @type {string}
     * @memberof ApiEndpointsSitesListRes
     */
    name?: string;
}
/**
 * 
 * @export
 * @interface ApiEndpointsSitesRenameReq
 */
export interface ApiEndpointsSitesRenameReq {
    /**
     * 
     * @type {string}
     * @memberof ApiEndpointsSitesRenameReq
     */
    name?: string;
}
/**
 * 
 * @export
 * @interface ApiEndpointsStationsCreateReq
 */
export interface ApiEndpointsStationsCreateReq {
    /**
     * 
     * @type {number}
     * @memberof ApiEndpointsStationsCreateReq
     */
    parentLineId?: number;
    /**
     * 
     * @type {string}
     * @memberof ApiEndpointsStationsCreateReq
     */
    name?: string;
}
/**
 * 
 * @export
 * @interface ApiEndpointsStationsCreateRes
 */
export interface ApiEndpointsStationsCreateRes {
    /**
     * 
     * @type {number}
     * @memberof ApiEndpointsStationsCreateRes
     */
    id?: number;
    /**
     * 
     * @type {string}
     * @memberof ApiEndpointsStationsCreateRes
     */
    name?: string;
}
/**
 * 
 * @export
 * @interface ApiEndpointsStationsGetByIdRes
 */
export interface ApiEndpointsStationsGetByIdRes {
    /**
     * 
     * @type {number}
     * @memberof ApiEndpointsStationsGetByIdRes
     */
    id?: number;
    /**
     * 
     * @type {string}
     * @memberof ApiEndpointsStationsGetByIdRes
     */
    name?: string;
    /**
     * 
     * @type {Array<ApiEndpointsStationsGetByIdResLocationRes>}
     * @memberof ApiEndpointsStationsGetByIdRes
     */
    locations?: Array<ApiEndpointsStationsGetByIdResLocationRes>;
}
/**
 * 
 * @export
 * @interface ApiEndpointsStationsGetByIdResLocationRes
 */
export interface ApiEndpointsStationsGetByIdResLocationRes {
    /**
     * 
     * @type {number}
     * @memberof ApiEndpointsStationsGetByIdResLocationRes
     */
    id?: number;
    /**
     * 
     * @type {string}
     * @memberof ApiEndpointsStationsGetByIdResLocationRes
     */
    name?: string | null;
}
/**
 * 
 * @export
 * @interface ApiEndpointsStationsRenameReq
 */
export interface ApiEndpointsStationsRenameReq {
    /**
     * 
     * @type {string}
     * @memberof ApiEndpointsStationsRenameReq
     */
    name?: string;
}
/**
 * 
 * @export
 * @interface ApiEndpointsTasksCreateReq
 */
export interface ApiEndpointsTasksCreateReq {
    /**
     * 
     * @type {number}
     * @memberof ApiEndpointsTasksCreateReq
     */
    parentJobId?: number;
    /**
     * 
     * @type {string}
     * @memberof ApiEndpointsTasksCreateReq
     */
    name?: string;
    /**
     * 
     * @type {number}
     * @memberof ApiEndpointsTasksCreateReq
     */
    locationId?: number;
}
/**
 * 
 * @export
 * @interface ApiEndpointsTasksCreateRes
 */
export interface ApiEndpointsTasksCreateRes {
    /**
     * 
     * @type {number}
     * @memberof ApiEndpointsTasksCreateRes
     */
    id?: number;
    /**
     * 
     * @type {string}
     * @memberof ApiEndpointsTasksCreateRes
     */
    name?: string;
}
/**
 * 
 * @export
 * @interface ApiEndpointsTasksDeleteReq
 */
export interface ApiEndpointsTasksDeleteReq {
    /**
     * 
     * @type {number}
     * @memberof ApiEndpointsTasksDeleteReq
     */
    parentJobId?: number;
}
/**
 * 
 * @export
 * @interface ApiEndpointsTasksGetByIdRes
 */
export interface ApiEndpointsTasksGetByIdRes {
    /**
     * 
     * @type {number}
     * @memberof ApiEndpointsTasksGetByIdRes
     */
    id?: number;
    /**
     * 
     * @type {string}
     * @memberof ApiEndpointsTasksGetByIdRes
     */
    name?: string;
    /**
     * 
     * @type {DomainCommonTaskState}
     * @memberof ApiEndpointsTasksGetByIdRes
     */
    state?: DomainCommonTaskState;
}
/**
 * 
 * @export
 * @interface ApiEndpointsTasksGetInstanceRes
 */
export interface ApiEndpointsTasksGetInstanceRes {
    /**
     * 
     * @type {ApiEndpointsTasksGetInstanceResResTaskInstance}
     * @memberof ApiEndpointsTasksGetInstanceRes
     */
    instance?: ApiEndpointsTasksGetInstanceResResTaskInstance;
}
/**
 * 
 * @export
 * @interface ApiEndpointsTasksGetInstanceResResEvent
 */
export interface ApiEndpointsTasksGetInstanceResResEvent {
    /**
     * 
     * @type {number}
     * @memberof ApiEndpointsTasksGetInstanceResResEvent
     */
    id?: number;
    /**
     * 
     * @type {string}
     * @memberof ApiEndpointsTasksGetInstanceResResEvent
     */
    timeStamp?: string;
    /**
     * 
     * @type {boolean}
     * @memberof ApiEndpointsTasksGetInstanceResResEvent
     */
    eventResultSuccess?: boolean;
    /**
     * 
     * @type {string}
     * @memberof ApiEndpointsTasksGetInstanceResResEvent
     */
    failureReason?: string | null;
    /**
     * 
     * @type {number}
     * @memberof ApiEndpointsTasksGetInstanceResResEvent
     */
    stepId?: number;
    /**
     * 
     * @type {number}
     * @memberof ApiEndpointsTasksGetInstanceResResEvent
     */
    taskInstanceId?: number;
}
/**
 * 
 * @export
 * @interface ApiEndpointsTasksGetInstanceResResTaskInstance
 */
export interface ApiEndpointsTasksGetInstanceResResTaskInstance {
    /**
     * 
     * @type {number}
     * @memberof ApiEndpointsTasksGetInstanceResResTaskInstance
     */
    id?: number;
    /**
     * 
     * @type {ApiEndpointsTasksGetInstanceResResTaskInstanceFinalState}
     * @memberof ApiEndpointsTasksGetInstanceResResTaskInstance
     */
    finalState?: ApiEndpointsTasksGetInstanceResResTaskInstanceFinalState | null;
    /**
     * 
     * @type {Array<ApiEndpointsTasksGetInstanceResResEvent>}
     * @memberof ApiEndpointsTasksGetInstanceResResTaskInstance
     */
    events?: Array<ApiEndpointsTasksGetInstanceResResEvent> | null;
    /**
     * 
     * @type {number}
     * @memberof ApiEndpointsTasksGetInstanceResResTaskInstance
     */
    taskId?: number;
}
/**
 * @type ApiEndpointsTasksGetInstanceResResTaskInstanceFinalState
 * 
 * @export
 */
export type ApiEndpointsTasksGetInstanceResResTaskInstanceFinalState = DomainCommonTaskInstanceFinalState;
/**
 * 
 * @export
 * @interface ApiEndpointsTasksGetObjectsAndStepsRes
 */
export interface ApiEndpointsTasksGetObjectsAndStepsRes {
    /**
     * 
     * @type {Array<ApiEndpointsTasksGetObjectsAndStepsResResObject>}
     * @memberof ApiEndpointsTasksGetObjectsAndStepsRes
     */
    objects?: Array<ApiEndpointsTasksGetObjectsAndStepsResResObject>;
    /**
     * 
     * @type {Array<ApiEndpointsTasksGetObjectsAndStepsResResStep>}
     * @memberof ApiEndpointsTasksGetObjectsAndStepsRes
     */
    steps?: Array<ApiEndpointsTasksGetObjectsAndStepsResResStep>;
}
/**
 * 
 * @export
 * @interface ApiEndpointsTasksGetObjectsAndStepsResResObject
 */
export interface ApiEndpointsTasksGetObjectsAndStepsResResObject {
    /**
     * 
     * @type {number}
     * @memberof ApiEndpointsTasksGetObjectsAndStepsResResObject
     */
    id?: number;
    /**
     * 
     * @type {string}
     * @memberof ApiEndpointsTasksGetObjectsAndStepsResResObject
     */
    name?: string | null;
    /**
     * 
     * @type {ApiEndpointsTasksGetObjectsAndStepsResResObjectCoordinates}
     * @memberof ApiEndpointsTasksGetObjectsAndStepsResResObject
     */
    coordinates?: ApiEndpointsTasksGetObjectsAndStepsResResObjectCoordinates | null;
}
/**
 * @type ApiEndpointsTasksGetObjectsAndStepsResResObjectCoordinates
 * 
 * @export
 */
export type ApiEndpointsTasksGetObjectsAndStepsResResObjectCoordinates = DomainCommonObjectCoordinates;
/**
 * 
 * @export
 * @interface ApiEndpointsTasksGetObjectsAndStepsResResStep
 */
export interface ApiEndpointsTasksGetObjectsAndStepsResResStep {
    /**
     * 
     * @type {number}
     * @memberof ApiEndpointsTasksGetObjectsAndStepsResResStep
     */
    id?: number;
    /**
     * 
     * @type {number}
     * @memberof ApiEndpointsTasksGetObjectsAndStepsResResStep
     */
    orderNum?: number | null;
    /**
     * 
     * @type {DomainCommonTemplateState}
     * @memberof ApiEndpointsTasksGetObjectsAndStepsResResStep
     */
    expectedInitialState?: DomainCommonTemplateState;
    /**
     * 
     * @type {DomainCommonTemplateState}
     * @memberof ApiEndpointsTasksGetObjectsAndStepsResResStep
     */
    expectedSubsequentState?: DomainCommonTemplateState;
    /**
     * 
     * @type {number}
     * @memberof ApiEndpointsTasksGetObjectsAndStepsResResStep
     */
    objectId?: number;
}
/**
 * 
 * @export
 * @interface ApiEndpointsTasksUpdateReq
 */
export interface ApiEndpointsTasksUpdateReq {
    /**
     * 
     * @type {string}
     * @memberof ApiEndpointsTasksUpdateReq
     */
    newName?: string | null;
    /**
     * 
     * @type {ApiEndpointsTasksUpdateReqNewType}
     * @memberof ApiEndpointsTasksUpdateReq
     */
    newType?: ApiEndpointsTasksUpdateReqNewType | null;
    /**
     * 
     * @type {number}
     * @memberof ApiEndpointsTasksUpdateReq
     */
    parentJobId?: number;
    /**
     * 
     * @type {Array<ApiEndpointsTasksUpdateReqNewObjectReq>}
     * @memberof ApiEndpointsTasksUpdateReq
     */
    newObjects?: Array<ApiEndpointsTasksUpdateReqNewObjectReq> | null;
    /**
     * 
     * @type {Array<ApiEndpointsTasksUpdateReqModObjectReq>}
     * @memberof ApiEndpointsTasksUpdateReq
     */
    modifiedObjects?: Array<ApiEndpointsTasksUpdateReqModObjectReq> | null;
    /**
     * 
     * @type {Array<number>}
     * @memberof ApiEndpointsTasksUpdateReq
     */
    deletedObjects?: Array<number> | null;
    /**
     * 
     * @type {Array<ApiEndpointsTasksUpdateReqNewStepReq>}
     * @memberof ApiEndpointsTasksUpdateReq
     */
    newSteps?: Array<ApiEndpointsTasksUpdateReqNewStepReq> | null;
    /**
     * 
     * @type {Array<ApiEndpointsTasksUpdateReqModStepReq>}
     * @memberof ApiEndpointsTasksUpdateReq
     */
    modifiedSteps?: Array<ApiEndpointsTasksUpdateReqModStepReq> | null;
    /**
     * 
     * @type {Array<number>}
     * @memberof ApiEndpointsTasksUpdateReq
     */
    deletedSteps?: Array<number> | null;
}
/**
 * 
 * @export
 * @interface ApiEndpointsTasksUpdateReqModObjectReq
 */
export interface ApiEndpointsTasksUpdateReqModObjectReq {
    /**
     * 
     * @type {number}
     * @memberof ApiEndpointsTasksUpdateReqModObjectReq
     */
    id?: number;
    /**
     * 
     * @type {string}
     * @memberof ApiEndpointsTasksUpdateReqModObjectReq
     */
    name?: string;
    /**
     * 
     * @type {DomainCommonObjectCoordinates}
     * @memberof ApiEndpointsTasksUpdateReqModObjectReq
     */
    coordinates?: DomainCommonObjectCoordinates;
}
/**
 * 
 * @export
 * @interface ApiEndpointsTasksUpdateReqModStepReq
 */
export interface ApiEndpointsTasksUpdateReqModStepReq {
    /**
     * 
     * @type {number}
     * @memberof ApiEndpointsTasksUpdateReqModStepReq
     */
    id?: number;
    /**
     * 
     * @type {number}
     * @memberof ApiEndpointsTasksUpdateReqModStepReq
     */
    orderNum?: number;
    /**
     * 
     * @type {DomainCommonTemplateState}
     * @memberof ApiEndpointsTasksUpdateReqModStepReq
     */
    expectedInitialState?: DomainCommonTemplateState;
    /**
     * 
     * @type {DomainCommonTemplateState}
     * @memberof ApiEndpointsTasksUpdateReqModStepReq
     */
    expectedSubsequentState?: DomainCommonTemplateState;
    /**
     * 
     * @type {string}
     * @memberof ApiEndpointsTasksUpdateReqModStepReq
     */
    objectName?: string;
}
/**
 * 
 * @export
 * @interface ApiEndpointsTasksUpdateReqNewObjectReq
 */
export interface ApiEndpointsTasksUpdateReqNewObjectReq {
    /**
     * 
     * @type {string}
     * @memberof ApiEndpointsTasksUpdateReqNewObjectReq
     */
    name?: string;
    /**
     * 
     * @type {DomainCommonObjectCoordinates}
     * @memberof ApiEndpointsTasksUpdateReqNewObjectReq
     */
    coordinates?: DomainCommonObjectCoordinates;
}
/**
 * 
 * @export
 * @interface ApiEndpointsTasksUpdateReqNewStepReq
 */
export interface ApiEndpointsTasksUpdateReqNewStepReq {
    /**
     * 
     * @type {number}
     * @memberof ApiEndpointsTasksUpdateReqNewStepReq
     */
    orderNum?: number;
    /**
     * 
     * @type {DomainCommonTemplateState}
     * @memberof ApiEndpointsTasksUpdateReqNewStepReq
     */
    expectedInitialState?: DomainCommonTemplateState;
    /**
     * 
     * @type {DomainCommonTemplateState}
     * @memberof ApiEndpointsTasksUpdateReqNewStepReq
     */
    expectedSubsequentState?: DomainCommonTemplateState;
    /**
     * 
     * @type {string}
     * @memberof ApiEndpointsTasksUpdateReqNewStepReq
     */
    objectName?: string;
}
/**
 * @type ApiEndpointsTasksUpdateReqNewType
 * 
 * @export
 */
export type ApiEndpointsTasksUpdateReqNewType = DomainCommonTaskType;
/**
 * 
 * @export
 * @interface DomainCommonDetectorCommandDetectorCommand
 */
export interface DomainCommonDetectorCommandDetectorCommand {
    /**
     * 
     * @type {boolean}
     * @memberof DomainCommonDetectorCommandDetectorCommand
     */
    isRestart?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof DomainCommonDetectorCommandDetectorCommand
     */
    isStartDetection?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof DomainCommonDetectorCommandDetectorCommand
     */
    isStopDetection?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof DomainCommonDetectorCommandDetectorCommand
     */
    isResumeDetection?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof DomainCommonDetectorCommandDetectorCommand
     */
    isPauseDetection?: boolean;
}
/**
 * 
 * @export
 * @interface DomainCommonObjectCoordinates
 */
export interface DomainCommonObjectCoordinates {
    /**
     * 
     * @type {number}
     * @memberof DomainCommonObjectCoordinates
     */
    x?: number;
    /**
     * 
     * @type {number}
     * @memberof DomainCommonObjectCoordinates
     */
    y?: number;
    /**
     * 
     * @type {number}
     * @memberof DomainCommonObjectCoordinates
     */
    width?: number;
    /**
     * 
     * @type {number}
     * @memberof DomainCommonObjectCoordinates
     */
    height?: number;
}

/**
 * 
 * @export
 */
export const DomainCommonTaskInstanceFinalState = {
    Completed: 'Completed',
    Abandoned: 'Abandoned'
} as const;
export type DomainCommonTaskInstanceFinalState = typeof DomainCommonTaskInstanceFinalState[keyof typeof DomainCommonTaskInstanceFinalState];


/**
 * 
 * @export
 */
export const DomainCommonTaskState = {
    Active: 'Active',
    Paused: 'Paused',
    Inactive: 'Inactive'
} as const;
export type DomainCommonTaskState = typeof DomainCommonTaskState[keyof typeof DomainCommonTaskState];


/**
 * 
 * @export
 */
export const DomainCommonTaskType = {
    ToolKit: 'ToolKit',
    ItemKit: 'ItemKit',
    Qa: 'QA'
} as const;
export type DomainCommonTaskType = typeof DomainCommonTaskType[keyof typeof DomainCommonTaskType];


/**
 * 
 * @export
 */
export const DomainCommonTemplateState = {
    Present: 'Present',
    Missing: 'Missing',
    Uncertain: 'Uncertain',
    UnknownObject: 'UnknownObject'
} as const;
export type DomainCommonTemplateState = typeof DomainCommonTemplateState[keyof typeof DomainCommonTemplateState];


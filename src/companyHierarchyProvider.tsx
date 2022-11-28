import { config as apiConfig } from "api";
import { OPUsApi } from "api_client/apis/OPUsApi";
import { SitesApi } from "api_client/apis/SitesApi";
import { createContext, useContext, useReducer } from "react";
import { NavigateFunction, SubmitFunction } from "react-router-dom";
import { CompanyHierarchyNode as CHNode, Site } from "types";

import { LinesApi, LocationsApi, StationsApi } from "./api_client";

export const Level = {
    Site: 0,
    OPU: 1,
    Line: 2,
    Station: 3,
    Location: 4,
} as const;

export type Level = typeof Level[keyof typeof Level];

export type LevelDescriptor = {
    level: Level;
    label: string;
    labelSingular: string;
    addFn: (name: string, parentId?: number) => Promise<CHNode>;
    getFn: (id?: number) => Promise<CHNode[]>;
    renameFn: (id: number, name: string) => Promise<void>;
    deleteFn: (id: number) => Promise<void>;
};

export const descriptors: LevelDescriptor[] = [
    {
        level: Level.Site,
        label: "Sites",
        labelSingular: "Site",
        addFn: async (name) => {
            const site = await new SitesApi(apiConfig).apiEndpointsSitesCreate({
                sitesCreateReq: { name },
            });
            return { id: site.id!, name: site.name! };
        },
        getFn: async () => {
            const sites = await new SitesApi(apiConfig).apiEndpointsSitesList();
            return sites.map<Site>((s) => ({ id: s.id!, name: s.name! }));
        },
        renameFn: async (id, name) => {
            await new SitesApi(apiConfig).apiEndpointsSitesRename({ id, sitesRenameReq: { name } });
        },
        deleteFn: async (id) => {
            await new SitesApi(apiConfig).apiEndpointsSitesDelete({ id });
        },
    },
    {
        level: Level.OPU,
        label: "OPUs",
        labelSingular: "OPU",
        addFn: async (name, parentId) => {
            const opu = await new OPUsApi(apiConfig).apiEndpointsOPUsCreate({
                oPUsCreateReq: { parentSiteId: parentId, name },
            });
            return { id: opu.id!, name: opu.name! };
        },
        getFn: async (id) => {
            const parentSite = await new SitesApi(apiConfig).apiEndpointsSitesGetById({
                id: id!,
            });
            return parentSite.opus!.map((o) => ({ id: o.id!, name: o.name! }));
        },
        renameFn: async (id, name) => {
            await new OPUsApi(apiConfig).apiEndpointsOPUsRename({ id, oPUsRenameReq: { name } });
        },
        deleteFn: async (id) => {
            await new OPUsApi(apiConfig).apiEndpointsOPUsDelete({ id });
        },
    },
    {
        level: Level.Line,
        label: "Lines",
        labelSingular: "Line",
        addFn: async (name, parentId) => {
            const line = await new LinesApi(apiConfig).apiEndpointsLinesCreate({
                linesCreateReq: { opuId: parentId, name },
            });
            return { id: line.id!, name: line.name! };
        },
        getFn: async (id) => {
            const parentOpu = await new OPUsApi(apiConfig).apiEndpointsOPUsGetById({ id: id! });
            return parentOpu.lines!.map((l) => ({ id: l.id!, name: l.name! }));
        },
        renameFn: async (id, name) => {
            await new LinesApi(apiConfig).apiEndpointsLinesRename({ id, linesRenameReq: { name } });
        },
        deleteFn: async (id) => {
            await new LinesApi(apiConfig).apiEndpointsLinesDelete({ id });
        },
    },
    {
        level: Level.Station,
        label: "Stations",
        labelSingular: "Station",
        addFn: async (name, parentId) => {
            const station = await new StationsApi(apiConfig).apiEndpointsStationsCreate({
                stationsCreateReq: { parentLineId: parentId, name },
            });
            return { id: station.id!, name: station.name! };
        },
        getFn: async (id) => {
            const parentLine = await new LinesApi(apiConfig).apiEndpointsLinesGetById({ id: id! });
            return parentLine.stations!.map((s) => ({ id: s.id!, name: s.name! }));
        },
        renameFn: async (id, name) => {
            await new StationsApi(apiConfig).apiEndpointsStationsRename({
                id,
                stationsRenameReq: { name },
            });
        },
        deleteFn: async (id) => {
            await new StationsApi(apiConfig).apiEndpointsStationsDelete({ id });
        },
    },
    {
        level: Level.Location,
        label: "Locations",
        labelSingular: "Location",
        addFn: async (name, parentId) => {
            const location = await new LocationsApi(apiConfig).apiEndpointsLocationsCreate({
                locationsCreateReq: { parentStationId: parentId, name },
            });
            return { id: location.id!, name: location.name! };
        },
        getFn: async (id) => {
            const parentStation = await new StationsApi(apiConfig).apiEndpointsStationsGetById({
                id: id!,
            });
            return parentStation.locations!.map((l) => ({ id: l.id!, name: l.name! }));
        },
        renameFn: async (id, name) => {
            await new LocationsApi(apiConfig).apiEndpointsLocationsRename({
                id,
                locationsRenameReq: { name },
            });
        },
        deleteFn: async (id) => {
            await new LocationsApi(apiConfig).apiEndpointsLocationsDelete({ id });
        },
    },
];

export type State = {
    nodes: Array<CHNode[]>;
    selectedIds: Array<number | null>;
    highestShownLevel: number;
};

const initialState: State = {
    nodes: Array(descriptors.length).fill([]),
    selectedIds: Array(descriptors.length).fill(null),
    highestShownLevel: 0,
};

export const decodeSelectedIds = (selectedIdsString: string | null): Array<number> | null => {
    if (selectedIdsString === null || selectedIdsString.length === 0)
        return Array(descriptors.length).fill(null);

    let extractedIds = selectedIdsString.split(".").map((n) => Number(n));

    // Array length should always equal to the number of level descriptors (for consistency)
    const padding = Array(descriptors.length - extractedIds.length).fill(null);
    extractedIds.push(...padding);

    return extractedIds;
};

export const encodeSelectedIds = (selectedIds: Array<number | null>): string => {
    // We're not encoding Stations and Locations into the query string
    // (they belong to the Dashboard)
    const selectedIdsUntilStation = selectedIds.slice(0, Level.Location);

    let firstNullIndex = selectedIdsUntilStation.indexOf(null);
    if (firstNullIndex === -1) firstNullIndex = Level.Location;

    return selectedIdsUntilStation
        .slice(0, firstNullIndex)
        .map((n) => n!.toString())
        .join(".");
};

export type Action =
    | { type: "Initialize"; state: State }
    | {
          type: "Select";
          level: number;
          id: number;
          submitFn?: SubmitFunction;
          navFn?: NavigateFunction;
      }
    | { type: "Reset" };

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case "Initialize": {
            return action.state;
        }
        case "Select": {
            const newState = { ...state };

            const sameIdSelected =
                state.selectedIds[action.level] === action.id && action.level !== Level.Station;

            newState.highestShownLevel = sameIdSelected
                ? action.level
                : Math.min(action.level + 1, descriptors.length);
            newState.selectedIds[action.level] = sameIdSelected ? null : action.id;

            for (let i = action.level + 1; i < descriptors.length; i++) {
                newState.selectedIds[i] = null;
            }

            if (action.level < Level.Station) {
                let formData = new FormData();
                formData.append("sel", encodeSelectedIds(newState.selectedIds));
                action.submitFn!(formData);
            } else if (action.level === Level.Station) {
                action.navFn!("/dashboard/" + action.id);
            } else if (action.level === Level.Location) {
                if (sameIdSelected) {
                    action.navFn!("..", { relative: "path" });
                } else {
                    action.navFn!(action.id.toString());
                }
            }

            return newState;
        }
        case "Reset": {
            return initialState;
        }
        default:
            return state;
    }
}

const Context = createContext<{ state: State; dispatch: React.Dispatch<Action> }>(null!);

export function CompanyHierarchyProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    return <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>;
}

export default function useCHState() {
    return useContext(Context);
}

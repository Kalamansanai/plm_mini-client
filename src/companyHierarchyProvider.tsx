import { config as apiConfig } from "api";
import { OPUsApi } from "api_client/apis/OPUsApi";
import { SitesApi } from "api_client/apis/SitesApi";
import { createContext, useContext, useReducer } from "react";
import { CompanyHierarchyNode as CHNode, Site } from "types";

import { LinesApi, StationsApi } from "./api_client";

export type LevelDescriptor = {
    level: number;
    label: string;
    labelSingular: string;
    addFn: (name: string, parentId?: number) => Promise<CHNode>;
    getFn: (id?: number) => Promise<CHNode[]>;
    renameFn: (id: number, name: string) => Promise<void>;
    deleteFn: (id: number) => Promise<void>;
};

export const descriptors: LevelDescriptor[] = [
    {
        level: 0,
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
        level: 1,
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
        level: 2,
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
        level: 3,
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
];

export type State = {
    items: Array<CHNode[]>;
    selectedIds: Array<number | null>;
    highestShownLevel: number;
    lastClickedId: number | null;
};

const initialState: State = {
    items: Array(descriptors.length).fill([]),
    selectedIds: Array(descriptors.length).fill(null),
    highestShownLevel: 0,
    lastClickedId: null,
};

export type Action =
    | { type: "SetItems"; level: number; items: CHNode[] }
    | { type: "AddItem"; level: number; item: CHNode }
    | { type: "RenameItem"; level: number; id: number; name: string }
    | { type: "DeleteItem"; level: number; id: number }
    | { type: "SetSelectedId"; level: number; id: number | null }
    | { type: "Reset" };

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case "SetItems": {
            const newState = { ...state };
            newState.items[action.level] = action.items;
            return newState;
        }
        case "AddItem": {
            const newState = { ...state };
            newState.items[action.level] = [...newState.items[action.level]!, action.item];
            return newState;
        }
        case "RenameItem": {
            const newItems = [...state.items[action.level]!];
            const renamedItem = newItems.find((i) => i.id === action.id)!;
            renamedItem.name = action.name;

            const newState = { ...state };
            newState.items[action.level] = newItems;
            return newState;
        }
        case "DeleteItem": {
            const newItems = [
                ...state.items[action.level]!.filter((item) => item.id !== action.id),
            ];
            const newState = { ...state };
            newState.items[action.level] = newItems;

            if (action.id === state.selectedIds[action.level]) {
                newState.highestShownLevel = action.level;
            }

            return newState;
        }
        case "SetSelectedId": {
            const newState = { ...state };

            const sameIdSelected = state.selectedIds[action.level] === action.id;

            // on Station level, we don't want to deselect the Station when we click on one the
            // second time (which means we don't want to do anything)
            if (sameIdSelected && action.level == descriptors.length - 1) return newState;

            if (action.id !== null) {
                newState.highestShownLevel = sameIdSelected
                    ? action.level
                    : Math.min(action.level + 1, descriptors.length);
            }
            newState.selectedIds[action.level] = sameIdSelected ? null : action.id;

            for (let i = action.level + 1; i < descriptors.length; i++) {
                newState.selectedIds[i] = null;
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

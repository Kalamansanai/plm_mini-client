import { OPUsApi } from "api_client/apis/OPUsApi";
import { SitesApi } from "api_client/apis/SitesApi";
import { Configuration } from "api_client/runtime";
import { CompanyHierarchyNode as CHNode, Site } from "types";
import {LinesApi, StationsApi} from "./api_client";

export type LevelDescriptor = {
    index: number;
    label: string;
    addFn: (name: string, parentId?: number) => Promise<CHNode>;
    getFn: (id?: number) => Promise<CHNode[]>;
    // updateFn: () => void,
    // deleteFn: () => void
};

const defaultConfig = new Configuration({ basePath: "https://localhost:9696" });

export const descriptors: LevelDescriptor[] = [
    {
        index: 0,
        label: "Sites",
        addFn : async (name) => {
            const site = await new SitesApi(defaultConfig).apiEndpointsSitesCreate({ sitesCreateReq: { name }});
            return { id: site.id!, name: site.name! };
        },
        getFn: async () => {
            const sites = await new SitesApi(defaultConfig).apiEndpointsSitesList();
            return sites.map<Site>((s) => ({ id: s.id!, name: s.name! }));
        },
    },
    {
        index: 1,
        label: "OPUs",
        addFn : async (name, parentId) => {
            const opu = await new OPUsApi(defaultConfig)
                .apiEndpointsOPUsCreate({ oPUsCreateReq: { parentSiteId: parentId, name }});
            return { id: opu.id!, name: opu.name! };
        },
        getFn: async (id) => {
            const parentSite = await new SitesApi(defaultConfig).apiEndpointsSitesGetById({
                id: id!,
            });
            return parentSite.opus!.map((o) => ({ id: o.id!, name: o.name! }));
        },
    },
    {
        index: 2,
        label: "Lines",
        addFn : async (name, parentId) => {
            const line = await new LinesApi(defaultConfig)
                .apiEndpointsLinesCreate({ linesCreateReq: { opuId: parentId, name }});
            return { id: line.id!, name: line.name! };
        },
        getFn: async (id) => {
            const parentOpu = await new OPUsApi(defaultConfig).apiEndpointsOPUsGetById({ id: id! });
            return parentOpu.lines!.map((l) => ({ id: l.id!, name: l.name! }));
        },
    },
    {
        index: 3,
        label: "Stations",
        addFn : async (name, parentId) => {
            const station = await new StationsApi(defaultConfig)
                .apiEndpointsStationsCreate({ stationsCreateReq: { parentLineId: parentId, name }});
            return { id: station.id!, name: station.name! };
        },
        getFn: async (id) => {
            const parentLine = await new LinesApi(defaultConfig).apiEndpointsLinesGetById({ id: id! });
            return parentLine.stations!.map((s) => ({ id: s.id!, name: s.name! }));
        }
    }
];

export type State = {
    items: Array<CHNode[]>;
    selectedIds: Array<number | null>;
    highestShownLevel: number;
    lastClickedId: number | null;
};

export const initialState: State = {
    items: Array(descriptors.length).fill([]),
    selectedIds: Array(descriptors.length).fill(null),
    highestShownLevel: 0,
    lastClickedId: null,
};

export type Action =
    | { type: "AddItem"; level: number; item: CHNode }
    | { type: "SetItems"; level: number; items: CHNode[] }
    | { type: "SetSelectedId"; level: number; id: number | null }
    | { type: "Reset" };

export default function reducer(state: State, action: Action): State {
    switch (action.type) {
        case "AddItem": {
            const newState = { ...state };
            newState.items[action.level] = [...newState.items[action.level]!, action.item];
            return newState;
        }
        case "SetItems": {
            const newState = { ...state };
            newState.items[action.level] = action.items;
            return newState;
        }
        case "SetSelectedId": {
            const sameIdSelected = state.selectedIds[action.level] === action.id;

            const newState = { ...state };
            if (action.id !== null) {
                newState.highestShownLevel = sameIdSelected ? action.level : Math.min(action.level + 1, descriptors.length);
            }
            newState.selectedIds[action.level] = sameIdSelected ? null : action.id;

            console.log('================');
            console.log(`${JSON.stringify(action)}`);
            console.log(`${JSON.stringify(newState)}`);

            return newState;
        }
        case "Reset": {
            return initialState;
        }
        default:
            return state;
    }
}

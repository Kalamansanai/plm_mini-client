import { OPUsApi } from "api_client/apis/OPUsApi";
import { SitesApi } from "api_client/apis/SitesApi";
import { Configuration } from "api_client/runtime";
import { CompanyHierarchyNode as CHNode, Site } from "types";

export type LevelDescriptor = {
    index: number;
    label: string;
    getFn: (id?: number) => Promise<CHNode[]>;
    // updateFn: () => void,
    // deleteFn: () => void
};

const defaultConfig = new Configuration({ basePath: "https://localhost:9696" });

export const descriptors: LevelDescriptor[] = [
    {
        index: 0,
        label: "Sites",
        getFn: async () => {
            const sites = await new SitesApi(defaultConfig).apiEndpointsSitesList();
            return sites.map<Site>((s) => ({ id: s.id!, name: s.name! }));
        },
    },
    {
        index: 1,
        label: "OPUs",
        getFn: async (id) => {
            const parentSite = await new SitesApi(defaultConfig).apiEndpointsSitesGetById({
                id: id!,
            });
            return parentSite.oPUs!.map((o) => ({ id: o.id!, name: o.name! }));
        },
    },
    {
        index: 2,
        label: "Lines",
        getFn: async (id) => {
            const parentOpu = await new OPUsApi(defaultConfig).apiEndpointsOPUsGetById({ id: id! });
            return parentOpu.lines!.map((l) => ({ id: l.id!, name: l.name! }));
        },
    },
];

export type State = {
    items: Array<CHNode[]>;
    selectedIds: Array<number | null>;
    currentLevel: number;
    lastClickedId: number | null;
};

export const initialState: State = {
    items: Array(descriptors.length).fill([]),
    selectedIds: Array(descriptors.length).fill(null),
    currentLevel: 0,
    lastClickedId: null,
};

export type Action =
    | { type: "SetItems"; level: number; items: CHNode[] }
    | { type: "SetSelectedId"; level: number; id: number | null }
    | { type: "Reset" };

export default function reducer(state: State, action: Action): State {
    switch (action.type) {
        case "SetItems": {
            const newState = { ...state };
            newState.items[action.level] = action.items;
            return newState;
        }
        case "SetSelectedId": {
            const newState = { ...state };
            newState.selectedIds[action.level] = action.id;
            return newState;
        }
        case "Reset": {
            return initialState;
        }
        default:
            return state;
    }
}

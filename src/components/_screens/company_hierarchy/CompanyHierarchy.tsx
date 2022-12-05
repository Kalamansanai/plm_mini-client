import useCHState, {
    decodeSelectedIds,
    descriptors as chLevelDescriptors,
    encodeSelectedIds,
    Level,
    State,
} from "companyHierarchyProvider";
import { useEffect } from "react";
import { redirect, useLoaderData } from "react-router-dom";

import { Container } from "@mui/material";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

import { default as CHLevel } from "./CompanyHierarchyLevel";

// TODO(rg): some sort of caching? Currently we reload everything on a select, which feels kinda
// slow
export async function loader({ request }: { request: Request }) {
    const url = new URL(request.url);
    const selectedIdsString = url.searchParams.get("sel");
    let highestShownLevel = 0;

    const nodes = Array(chLevelDescriptors.length).fill([]);

    // We always have to load Sites regardless of what nodes are selected
    nodes[Level.Site] = await chLevelDescriptors[Level.Site]!.getFn();

    let selectedIds = decodeSelectedIds(selectedIdsString);

    if (selectedIds !== null) {
        // Load levels and select nodes below Site according to selectedIds
        for (let i = Level.OPU; i < Level.Location; i++) {
            const id = selectedIds[i - 1];

            if (id === undefined || id === null || isNaN(id)) break;

            try {
                nodes[i] = await chLevelDescriptors[i]!.getFn(id);
                highestShownLevel += 1;
            } catch (ex) {
                // If a node cannot be selected (because it doesn't exist), we need to:
                //  - only select up until the *previous* level
                //  - update the search string to reflect this
                selectedIds = selectedIds.slice(0, i - 1);
                const slicedSelectedIds = encodeSelectedIds(selectedIds);
                return redirect("/hierarchy?sel=" + slicedSelectedIds);
            }
        }
    }

    return { nodes, selectedIds, highestShownLevel };
}

// NOTE(rg): we have to manually fill in the "sel" search param when navigating here; using
// submit or setSearchParams doesn't seem to update the URL when used in an effect with an
// empty dependency array, which was my first attempt
export default function CompanyHierarchy() {
    const { dispatch } = useCHState();
    const loadedData = useLoaderData() as State;

    useEffect(() => {
        dispatch({ type: "Initialize", state: loadedData });
    }, [loadedData]);

    return (
        <Container sx={{ height: "100%" }}>
            <Paper elevation={8} sx={{ height: "calc(100% - 32px)", m: 2 }}>
                <Grid
                    container
                    alignItems="flex-start"
                    justifyContent="space-around"
                    sx={{ height: "100%" }}
                >
                    {chLevelDescriptors.slice(0, Level.Location).map((desc) => (
                        <CHLevel
                            key={desc.level}
                            level={desc.level}
                            label={desc.label}
                            labelSingular={desc.labelSingular}
                        />
                    ))}
                </Grid>
            </Paper>
        </Container>
    );
}

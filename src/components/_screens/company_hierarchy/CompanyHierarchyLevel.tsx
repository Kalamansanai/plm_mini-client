import { LevelDescriptor, State as CHState, Action as CHAction } from "companyHierarchy";
import { useEffect } from "react";

import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";

import { default as CHNode } from "./CompanyHierarchyNode";

type Props = LevelDescriptor & {
    state: CHState;
    dispatch: React.Dispatch<CHAction>;
};

export default function CompanyHierarchyLevel({ state, dispatch, index, label, getFn }: Props) {
    const ownSelectedId = state.selectedIds[index];

    const onNodeClick = (id: number) => {
        dispatch({ type: "SetSelectedId", level: index, id });
    };

    // fetch for first level
    useEffect(() => {
        const fetchData = async () => {
            if (index !== 0) return;

            const data = await getFn();
            console.log('Level 0 fetch');
            dispatch({ type: "SetItems", level: index, items: data });
        };

        fetchData();
    }, [index]);

    // fetch for all other levels
    useEffect(() => {
        const fetchData = async () => {
            const previousLevelId = state.selectedIds[index - 1];
            if (previousLevelId === null || previousLevelId === undefined) return;

            const data = await getFn(previousLevelId);
            console.log(`Level 1 fetch, data len: ${data.length}`);
            dispatch({ type: "SetItems", level: index, items: data});
        }

        if (index > state.highestShownLevel) {
            dispatch({type: "SetItems", level: index, items: []});
            dispatch({ type: "SetSelectedId", level: index, id: null});
        }

        if (index === state.highestShownLevel) {
            if (state.selectedIds[index - 1] !== null) {
                fetchData();
            }
        }
    }, [index, state.selectedIds[index - 1], state.highestShownLevel])

    return (
        <Grid
            item
            sx={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "stretch",
            }}
        >
            <Typography sx={{ display: "flex", justifyContent: "center" }} variant="button">
                {label}
            </Typography>
            <Divider />
            <Box sx={{ flexGrow: 1, height: 0 }} hidden={index > state.highestShownLevel}>
                <List sx={{ height: "100%", overflowY: "auto" }}>
                    {state.items[index]!.map((item, i) => (
                        <CHNode
                            key={i}
                            item={item}
                            selected={item.id === ownSelectedId}
                            clickHandler={onNodeClick}
                        />
                    ))}
                </List>
            </Box>
        </Grid>
    );
}

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

    useEffect(() => {
        const fetchData = async () => {
            if (index !== 0) return;

            const data = await getFn();
            dispatch({ type: "SetItems", level: index, items: data });
        };

        fetchData();
    }, [index]);

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
            <Box sx={{ flexGrow: 1, height: 0 }} hidden={index > state.currentLevel}>
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

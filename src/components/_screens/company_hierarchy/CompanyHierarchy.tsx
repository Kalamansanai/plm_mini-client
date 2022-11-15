import { SitesApi } from "api_client/apis/SitesApi";
import { Configuration } from "api_client/runtime";
import {
    descriptors as chLevelDescriptors,
    State as CHState,
    Action as CHAction,
} from "companyHierarchy";
import { useState, useEffect } from "react";
import { Site } from "types";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

import { default as CHLevel } from "./CompanyHierarchyLevel";

type Props = {
    state: CHState;
    dispatch: React.Dispatch<CHAction>;
};

export default function CompanyHierarchy({ state, dispatch }: Props) {
    return (
        <Grid
            sx={{ height: "100%" }}
            container
            alignItems="flex-start"
            justifyContent="space-around"
            flexGrow={1}
        >
            {chLevelDescriptors.map((desc, i) => (
                <CHLevel
                    key={i}
                    state={state}
                    dispatch={dispatch}
                    index={desc.index}
                    label={desc.label}
                    getFn={desc.getFn}
                />
            ))}
        </Grid>
    );
}

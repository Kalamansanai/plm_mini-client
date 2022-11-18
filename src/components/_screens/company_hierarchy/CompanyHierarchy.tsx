import { descriptors as chLevelDescriptors } from "companyHierarchyProvider";

import Grid from "@mui/material/Grid";

import { default as CHLevel } from "./CompanyHierarchyLevel";

export default function CompanyHierarchy() {
    return (
        <Grid
            sx={{ height: "100%" }}
            container
            alignItems="flex-start"
            justifyContent="space-around"
            flexGrow={1}
        >
            {chLevelDescriptors.map((desc, i) => (
                <CHLevel key={i} {...desc} />
            ))}
        </Grid>
    );
}

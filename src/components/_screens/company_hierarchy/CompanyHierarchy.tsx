import { descriptors as chLevelDescriptors } from "companyHierarchyProvider";

import { Container, useTheme } from "@mui/material";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

import { default as CHLevel } from "./CompanyHierarchyLevel";

export default function CompanyHierarchy() {
    const theme = useTheme();

    return (
        <Container sx={{ height: "100%" }}>
            <Paper elevation={8} sx={{ height: "calc(100% - 32px)", m: 2 }}>
                <Grid
                    container
                    alignItems="flex-start"
                    justifyContent="space-around"
                    sx={{ height: "100%" }}
                >
                    {chLevelDescriptors.map((desc, i) => (
                        <CHLevel key={i} {...desc} />
                    ))}
                </Grid>
            </Paper>
        </Container>
    );
}

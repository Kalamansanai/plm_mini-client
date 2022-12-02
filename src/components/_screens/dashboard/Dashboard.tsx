import { useState } from "react";

import { Box, Grid, useMediaQuery, useTheme } from "@mui/material";

import DetectionControls from "./DetectionControls";
import NextStepGuide from "./NextStepGuide";
import Stream from "./Stream";
import StreamControls from "./StreamControls";
import TaskInstance from "./TaskInstance";

export default function Dashboard() {
    const theme = useTheme();
    const [playing, setPlaying] = useState(false);

    const isBelowXl = useMediaQuery(theme.breakpoints.down("xl"));

    return (
        <Grid container spacing={2} height="100%">
            <Grid display="flex" flexDirection="column" gap={2} item xs={12} xl={9}>
                <Stream />
                <Grid container spacing={2} flexGrow={1}>
                    <Grid item xs={12} sm={12} md={12} lg={5}>
                        <StreamControls playing={playing} setPlaying={setPlaying} />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={7}>
                        <DetectionControls />
                    </Grid>
                </Grid>
                {isBelowXl ? (
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <NextStepGuide />
                        </Grid>
                        <Grid item xs={8}>
                            <TaskInstance />
                        </Grid>
                    </Grid>
                ) : null}
            </Grid>
            {!isBelowXl ? (
                <Grid display="flex" item xl={3} height="100%" flexDirection="column" gap={2}>
                    <NextStepGuide />
                    <Box flexGrow={1}>
                        <TaskInstance />
                    </Box>
                </Grid>
            ) : null}
        </Grid>
    );
}

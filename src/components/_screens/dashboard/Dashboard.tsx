import { useState } from "react";

import { Grid, useMediaQuery, useTheme } from "@mui/material";

import DetectionControls from "./DetectionControls";
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
                    <Grid item xs={12} sm={5}>
                        <StreamControls playing={playing} setPlaying={setPlaying} />
                    </Grid>
                    <Grid item xs={12} sm={7}>
                        <DetectionControls />
                    </Grid>
                </Grid>
                {isBelowXl ? <TaskInstance /> : null}
            </Grid>
            {!isBelowXl ? (
                <Grid item xl={3} sx={{ height: "100%" }}>
                    <TaskInstance />
                </Grid>
            ) : null}
        </Grid>
    );
}

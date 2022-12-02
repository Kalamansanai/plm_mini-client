import { useState } from "react";

import { Grid, useMediaQuery, useTheme } from "@mui/material";

import DetectionControls from "./DetectionControls";
import Stream from "./Stream";
import StreamControls from "./StreamControls";
import TaskInstance from "./TaskInstance";

export default function Dashboard() {
    const theme = useTheme();
    const [playing, setPlaying] = useState(false);

    const isMd = useMediaQuery(theme.breakpoints.down("lg"));

    return (
        <Grid container spacing={2} height="100%">
            <Grid display="flex" flexDirection="column" gap={2} item xs={12} md={12} lg={8}>
                <Stream />
                <Grid container spacing={2} flexGrow={1}>
                    <Grid item xs={12} sm={4} md={4} lg={12} xl={4}>
                        <StreamControls playing={playing} setPlaying={setPlaying} />
                    </Grid>
                    <Grid item xs={12} sm={8} md={8} lg={12} xl={8}>
                        <DetectionControls />
                    </Grid>
                </Grid>
                {isMd ? <TaskInstance /> : null}
            </Grid>
            {!isMd ? (
                <Grid item lg={4} sx={{ height: "100%" }}>
                    <TaskInstance />
                </Grid>
            ) : null}
        </Grid>
    );
}

import { backend } from "api";
import React, { useState } from "react";

import { Box, Button, Grid, Input, TextField, Typography } from "@mui/material";

async function startDetection(period: number) {
    const response = await fetch(`${backend}/api/v1/caa/mock`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
            period,
        }),
    });
}

async function stopDetection(setIterations: React.Dispatch<React.SetStateAction<number>>) {
    const response = await fetch(`${backend}/api/v1/caa/mock`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({}),
    });

    if (response.status != 400) {
        const iters = await response.json();
        console.log(iters);
        setIterations(iters.iterations);
    } else {
        return null;
    }
}

export default function CAAEmulator() {
    const [period, setPeriod] = useState<number | null>(1);
    const [active, setActive] = useState(false);
    const [iterations, setIterations] = useState(0);

    const handleStart = () => {
        if (period) {
            startDetection(period!);
            setActive(true);
        } else alert("period is null");
    };

    const handleStop = () => {
        setActive(false);
        console.log(active);
        stopDetection(setIterations);
    };

    const handleInputChange = (e: any) => {
        setPeriod(e.target.value);
    };

    return (
        <Grid
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{ height: "90vh", width: "100vw" }}
        >
            <Grid
                display="flex"
                flexDirection="column"
                alignItems="center"
                sx={{ backgroundColor: "white", borderRadius: 3, height: "80%", width: "80%" }}
            >
                <Typography variant="h3">CAA Emulator</Typography>
                <TextField value={period} onChange={handleInputChange}></TextField>
                {!active ? (
                    <Button onClick={handleStart} variant="contained" sx={{ mt: 1 }}>
                        Start
                    </Button>
                ) : (
                    <Button onClick={handleStop} variant="contained" color="error" sx={{ mt: 1 }}>
                        Stop
                    </Button>
                )}
                {/* <Box>{period}</Box> */}
                <Box>{iterations}</Box>
            </Grid>
        </Grid>
    );
}

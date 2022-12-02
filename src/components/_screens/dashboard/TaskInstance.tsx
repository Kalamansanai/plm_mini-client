import { LabeledValue } from "components/LabeledValue";
import { useEffect, useState } from "react";
import { randomBetween } from "utils/random";

import Grid3x3Icon from "@mui/icons-material/Grid3x3";
import { Box, Button, Divider, Paper, Typography } from "@mui/material";

function EventCard() {}

export default function TaskInstance() {
    return (
        <Paper sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
            <Box display="flex" flexDirection="column" flexGrow={1}>
                <Box sx={{ p: 2, pt: 0 }}>
                    <Typography fontSize="1.2em" variant="overline">
                        Current Task
                    </Typography>
                    <Box display="flex" gap={2}>
                        <LabeledValue
                            value="12"
                            label="Task instance ID"
                            icon={<Grid3x3Icon fontSize="large" />}
                        />
                    </Box>
                </Box>
                <Typography fontSize="1.2em" variant="overline" sx={{ px: 2 }}>
                    Events
                </Typography>
                <Divider flexItem />
                <Box flexGrow={1} sx={{ bgcolor: "background.subtle" }}></Box>
            </Box>
            <Divider />
            <Box display="flex" justifyContent="flex-end" p={1}>
                <Button variant="outlined" size="large">
                    List previous instances
                </Button>
            </Box>
        </Paper>
    );
}

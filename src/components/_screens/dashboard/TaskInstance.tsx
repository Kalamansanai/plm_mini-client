import { LabeledValue } from "components/LabeledValue";
import { useEffect, useState } from "react";
import { randomBetween } from "utils/random";

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { Box, Paper, Typography } from "@mui/material";

export default function TaskInstance() {
    // Testing LabeledValue flash animation with random changes
    const [value, setValue] = useState<number>(0);

    useEffect(() => {
        const nextDelay = randomBetween(1, 3);

        setTimeout(() => {
            setValue(value + 1);
        }, nextDelay * 1000);
    }, [value]);

    return (
        <Paper sx={{ p: 2, pt: 0, height: "100%", display: "flex", flexDirection: "column" }}>
            <Typography fontSize="1.2em" variant="overline">
                Current Task
            </Typography>
            <Box display="flex" gap={2} flexWrap="wrap">
                <LabeledValue value={value} label="Step" animate />
                <LabeledValue value="00:49" label="Total time" icon={<AccessTimeIcon />} />
                <LabeledValue value="00:11" label="Current time" />
                <LabeledValue value="5 / 16" label="Progress" />
            </Box>
        </Paper>
    );
}

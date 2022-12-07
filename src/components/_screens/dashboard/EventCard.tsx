import { Event } from "types";

import { Box, Card } from "@mui/material";
import { blue, red } from "@mui/material/colors";

export default function EventCard({ event }: { event: Event }) {
    console.log(event);

    return (
        <Card
            elevation={1}
            sx={{
                display: "flex",
                height: "80px",
                p: 1,
                bgcolor: event.success ? blue[50] : red[200],
            }}
        >
            <Box>{event.success.toString()}</Box>
        </Card>
    );
}

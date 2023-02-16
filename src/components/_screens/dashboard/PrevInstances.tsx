import { backend, config as apiConfig, DetailedError } from "api";
import { LocationsApi, ResponseError } from "api_client";
import { Params, useLoaderData } from "react-router-dom";
import { parseDetectorState, Location } from "types";

import { Box, Container, CssBaseline, Typography } from "@mui/material";

export async function loader({ params }: { params: Params }) {
    const id = params["location_id"]! as any as number;
    let location = null;

    try {
        location = (await new LocationsApi(apiConfig).apiEndpointsLocationsGetById({
            id,
        })) as Location;

        if (location.detector) {
            location.detector.state = parseDetectorState(
                location.detector.state as unknown as string
            );
        }
    } catch (err) {
        if (err instanceof ResponseError) {
            throw new DetailedError(
                err,
                <Typography fontSize="1em">Location not found.</Typography>
            );
        }
    }
    return location;
}

export default function PrevInstances() {
    const temp = useLoaderData() as Location;

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Typography component="h1" variant="h5">
                    {temp.name}
                </Typography>
            </Box>
        </Container>
    );
}

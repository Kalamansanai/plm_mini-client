import { config as apiConfig, DetailedError } from "api";
import { LocationsApi, ResponseError } from "api_client";
import { Params } from "react-router-dom";
import { Location } from "types";

import { Typography } from "@mui/material";

export default async function loader({ params }: { params: Params }) {
    const id = params["location_id"]! as any as number;

    try {
        const location = await new LocationsApi(apiConfig).apiEndpointsLocationsGetTasks({ id });
        return location;
    } catch (err) {
        if (err instanceof ResponseError) {
            throw new DetailedError(
                err,
                <Typography fontSize="1em"> Location not found.</Typography>
            );
        }

        throw err;
    }
}

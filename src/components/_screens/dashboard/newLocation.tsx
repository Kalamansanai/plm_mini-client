import { config as apiConfig } from "api";
import { LocationsApi } from "api_client";
import { Params } from "react-router-dom";

// TODO(rg): nicer error handling
export default async function action({ request, params }: { request: any; params: Params }) {
    const stationId = params["station_id"] as any as number;
    const formData = await request.formData();

    const name = formData.get("name").toString();

    if (name === undefined) return;

    await new LocationsApi(apiConfig).apiEndpointsLocationsCreate({
        locationsCreateReq: { parentStationId: stationId, name },
    });
}

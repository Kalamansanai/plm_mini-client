import { config as apiConfig } from "api";
import { DetectorsApi } from "api_client";

export default async function action({ request }: { request: Request }) {
    const formData = await request.formData();

    const detector_id = formData.get("detector_id");
    const command = formData.get("command")?.toString();

    if (detector_id === null || command === undefined) return;

    try {
        await new DetectorsApi(apiConfig).apiEndpointsDetectorsCommand({
            id: Number(detector_id),
            detectorsCommandReq: { command: { msg: command } },
        });
    } catch (_err) {
        // noop
    }
}

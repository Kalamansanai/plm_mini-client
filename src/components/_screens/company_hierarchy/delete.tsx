import { descriptors } from "companyHierarchyProvider";

export default async function action({ request }: { request: Request }) {
    const formData = await request.formData();

    const level = formData.get("level");
    const id = formData.get("id");

    if (level === null || id === null) return;

    try {
        await descriptors[Number(level)]!.deleteFn(Number(id));
    } catch (_err) {
        // noop
    }
}

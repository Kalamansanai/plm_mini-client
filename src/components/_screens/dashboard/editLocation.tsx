import { descriptors, Level } from "companyHierarchyProvider";

export default async function action({ request }: { request: Request }) {
    const formData = await request.formData();

    const id = formData.get("id");
    const name = formData.get("name")?.toString();

    if (id === null || name === undefined) return;

    try {
        await descriptors[Level.Location]!.renameFn(Number(id), name);
    } catch (_err) {
        // noop
    }
}

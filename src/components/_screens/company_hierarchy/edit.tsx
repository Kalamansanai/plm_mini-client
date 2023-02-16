import { descriptors } from "companyHierarchyProvider";

// TODO(rg): nicer error handling
export default async function action({ request }: { request: Request }) {
    const formData = await request.formData();

    const level = formData.get("level");
    const id = formData.get("id");
    const name = formData.get("name")?.toString();

    if (level === null || id === null || name === undefined) return;

    try {
        await descriptors[Number(level)]!.renameFn(Number(id), name);
    } catch (_err) {
        // noop
    }
}

import { descriptors } from "companyHierarchyProvider";

export default async function action({ request }: { request: Request }) {
    const formData = await request.formData();

    const level = formData.get("level");
    const parentId = formData.get("parentId");
    const name = formData.get("name")?.toString();

    if (level === null || parentId === null || name === undefined) return;

    // try {
    await descriptors[Number(level)]!.addFn(name, Number(parentId));
    // } catch (_err) {
    //     // noop
    // }
}

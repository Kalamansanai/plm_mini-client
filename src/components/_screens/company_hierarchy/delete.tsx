import { descriptors } from "companyHierarchyProvider";

// TODO(rg): nicer error handling
export default async function action({ request }: { request: Request }) {
    const formData = await request.formData();

    const level = formData.get("level");
    const id = formData.get("id");

    console.log(level);
    console.log(id);

    if (level === null || id === null) return;

    await descriptors[Number(level)]!.deleteFn(Number(id));
}

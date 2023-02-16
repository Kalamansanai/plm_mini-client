import { descriptors, Level } from "companyHierarchyProvider";

export default async function action({ request }: { request: Request }) {
    const formData = await request.formData();

    const id = formData.get("id");

    if (id === null) return;

    await descriptors[Level.Location]!.deleteFn(Number(id));
}

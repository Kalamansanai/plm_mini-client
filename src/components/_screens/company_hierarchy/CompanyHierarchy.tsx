import { SitesApi } from "api_client/apis/SitesApi";
import { Configuration } from "api_client/runtime";
import { useState, useEffect } from "react";
import { Site } from "types";

const defaultConfig = new Configuration({ basePath: "https://localhost:9696" });

export default function CompanyHierarchy() {
    const [sites, setSites] = useState<Site[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const sites = await new SitesApi(defaultConfig).apiEndpointsSitesList();
            setSites(sites.map<Site>((s) => ({ id: s.id!, name: s.name! })));
        };

        fetchData();
    }, []);

    return (
        <ul>
            {sites.map((s, i) => (
                <li key={i}>{s.name}</li>
            ))}
        </ul>
    );
}

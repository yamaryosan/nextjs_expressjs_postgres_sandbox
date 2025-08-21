type Facet = {
    facet_kind: string;
    facet_value: string;
    cnt: number;
};

export async function fetchFacetResults(
    gender: string,
    department: string
): Promise<Facet[]> {
    const res = await fetch(
        `http://localhost:4000/facets?gender=${gender}&department=${department}`
    );
    const data = await res.json();
    return data;
}

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { fetchFacetResults } from "@/lib/fetchFacets";
import qs from "qs";
import { z } from "zod";

// 空文字列をundefinedに変換
const emptyToUndef = (v: unknown) => {
    if (v === "") {
        return undefined;
    }
    return v;
};

type Facet = {
    facet_kind: string;
    facet_value: string;
    cnt: number;
};

const FilterSchema = z.object({
    gender: z.preprocess(emptyToUndef, z.string().optional()),
    department: z.preprocess(emptyToUndef, z.string().optional()),
});

export default function FilterForm() {
    const [gender, setGender] = useState("");
    const [department, setDepartment] = useState("");
    const [facets, setFacets] = useState<Facet[]>([]);
    const router = useRouter();

    useEffect(() => {
        const fetchFacets = async () => {
            const facets = await fetchFacetResults(gender, department);
            setFacets(facets);
            console.log(facets);
        };
        fetchFacets();
        const query = qs.stringify(FilterSchema.parse({ gender, department }));
        router.push(`/?${query}`);
    }, [gender, department, router]);

    return (
        <>
            <div>
                <span>性別</span>
                <label>
                    <input
                        type="radio"
                        name="gender"
                        value=""
                        checked={gender === ""}
                        onChange={(e) => setGender(e.target.value)}
                    />
                    未選択(
                    {
                        facets.find(
                            (f) =>
                                f.facet_kind === "gender" &&
                                f.facet_value === "未選択"
                        )?.cnt
                    }
                    )
                </label>
                <label>
                    <input
                        type="radio"
                        name="gender"
                        value="男"
                        checked={gender === "男"}
                        onChange={(e) => setGender(e.target.value)}
                    />
                    男(
                    {
                        facets.find(
                            (f) =>
                                f.facet_kind === "gender" &&
                                f.facet_value === "男"
                        )?.cnt
                    }
                    )
                </label>
                <label>
                    <input
                        type="radio"
                        name="gender"
                        value="女"
                        checked={gender === "女"}
                        onChange={(e) => setGender(e.target.value)}
                    />
                    女(
                    {
                        facets.find(
                            (f) =>
                                f.facet_kind === "gender" &&
                                f.facet_value === "女"
                        )?.cnt
                    }
                    )
                </label>
            </div>
            <div>
                <span>部署</span>
                <label>
                    <input
                        type="radio"
                        name="department"
                        value=""
                        checked={department === ""}
                        onChange={(e) => setDepartment(e.target.value)}
                    />
                    未選択(
                    {
                        facets.find(
                            (f) =>
                                f.facet_kind === "department" &&
                                f.facet_value === "未選択"
                        )?.cnt
                    }
                    )
                </label>
                <label>
                    <input
                        type="radio"
                        name="department"
                        value="開発"
                        checked={department === "開発"}
                        onChange={(e) => setDepartment(e.target.value)}
                    />
                    開発(
                    {
                        facets.find(
                            (f) =>
                                f.facet_kind === "department" &&
                                f.facet_value === "開発"
                        )?.cnt
                    }
                    )
                </label>
                <label>
                    <input
                        type="radio"
                        name="department"
                        value="営業"
                        checked={department === "営業"}
                        onChange={(e) => setDepartment(e.target.value)}
                    />
                    営業(
                    {
                        facets.find(
                            (f) =>
                                f.facet_kind === "department" &&
                                f.facet_value === "営業"
                        )?.cnt
                    }
                    )
                </label>
            </div>
        </>
    );
}

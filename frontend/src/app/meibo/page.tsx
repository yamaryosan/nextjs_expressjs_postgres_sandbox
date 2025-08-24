"use client";
import { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";

export default function NameSearch() {
    const [name, setName] = useState("");
    const [debouncedName] = useDebounce(name, 500); // 500ms入力が止まったら更新

    useEffect(() => {
        if (!debouncedName) return;
        // ここでAPIを呼ぶ
        console.log("API call with:", debouncedName);
    }, [debouncedName]);

    return (
        <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="名前を入力"
        />
    );
}

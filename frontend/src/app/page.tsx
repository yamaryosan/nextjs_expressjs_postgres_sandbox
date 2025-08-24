import { parseAsString, useQueryState } from "nuqs";

export default function Page() {
    // URLクエリパラメータ `?name=ryo` をReact状態として使える
    const [name, setName] = useQueryState("name", parseAsString);

    return (
        <div>
            <p>Hello, {name ?? "Guest"}</p>
            <button onClick={() => setName("ryo")}>Set name=ryo</button>
        </div>
    );
}

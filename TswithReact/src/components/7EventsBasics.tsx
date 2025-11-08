import { useState, type ChangeEvent, type FormEvent } from "react";

export function FormExample() {
    const [name, setName] = useState<string>("");

    function handleNameChange(e: ChangeEvent<HTMLInputElement>) {
        setName(e.currentTarget.value);
    }

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        // replace with desired submit logic
        console.log("Submitted name:", name);
    }


    return (
        <form onSubmit={handleSubmit}>
            <input
                value={name}
                placeholder="Enter your name"
                onChange={handleNameChange}
            />
            <button type="submit">Submit</button>
            <p>Mera naam hai {name}</p>
        </form>
    );
}
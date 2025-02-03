"use client";

import { useEffect, useState } from "react";

export default function Message() {
    const [mess, setMess] = useState("");

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/message/`)
            .then((res) => res.json())
            .then((data) => setMess(data));
    }, []);

    return (
        <>
            <div>
                <h1 className="text-3xl font-bold">{mess}</h1>
            </div>
        </>
    );
}

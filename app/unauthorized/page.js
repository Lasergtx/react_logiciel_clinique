"use client"; // DYNAMIQUE

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Unauthorized() {
    const router = useRouter();
    const [countdown, setCountdown] = useState(3);

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prev) => (prev > 1 ? prev - 1 : 0));
        }, 1000);

        if (countdown === 0) {
            router.push("/dash-reunis");
        }

        return () => clearInterval(timer);
    }, [countdown, router]);

    return (
        <main className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
            <div className="bg-white shadow-md p-10 rounded-lg text-center">
                <h1 className="text-2xl font-bold text-red-600 mb-4">Accès refusé</h1>
                <p className="text-gray-600 mb-4">Vous n&apos;avez pas les permissions nécessaires pour accéder à cette page.</p>
                <p className="text-gray-500">Redirection en cours dans... {countdown}</p>
            </div>
        </main>
    );
}
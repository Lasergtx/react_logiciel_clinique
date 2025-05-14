"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * RoleGuard Component
 * @param {Array} allowedRoles - Les rôles autorisés pour accéder à la page
 * @param {React.ReactNode} children - Le contenu de la page protégée
 */
export default function RoleGuard({ allowedRoles, children }) {
    const router = useRouter();
    const userRole = sessionStorage.getItem("userRole");

    useEffect(() => {
        if (!allowedRoles.includes(userRole)) {
            router.push("/unauthorized");
        }
    }, [userRole, allowedRoles, router]);

    // Si l'utilisateur a le bon rôle, on affiche le contenu
    return allowedRoles.includes(userRole) ? children : null;
}

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function RoleGuard({ allowedRoles, children }) {
  const [isClient, setIsClient] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
    if (typeof window !== "undefined") {
      const role = sessionStorage.getItem("userRole");
      setUserRole(role);
    }
  }, []);

  if (!isClient) {
    return null; // Ou un loader si vous voulez indiquer le chargement
  }

  if (!userRole) {
    // Si le rôle n'est pas défini, redirigez vers une page de connexion ou d'erreur
    router.push("/login");
    return null;
  }

  if (!allowedRoles.includes(userRole)) {
    // Si le rôle n'est pas autorisé, redirigez vers une page non autorisée
    router.push("/unauthorized");
    return null;
  }

  return <>{children}</>;
}

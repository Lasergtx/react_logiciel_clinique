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
    return null; // Ou un loader si tu veux indiquer le chargement
  }

  if (!allowedRoles.includes(userRole)) {
    router.push("/unauthorized");
    return null;
  }

  return <>{children}</>;
}

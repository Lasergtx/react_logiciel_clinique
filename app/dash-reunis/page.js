"use client";  // rajouter toutes les fonctionnalités de chaque dashboard

import { useEffect, useState } from "react";
import Image from "next/image";
import left from "@/public/images/arrowleft.svg";
import right from "@/public/images/arrowright.svg";
import clientsIcone from "@/public/images/Icon.png";
import revenueIcone from "@/public/images/Icon-1.png";
import depenseIcone from "@/public/images/Icon-1.png";
import profitIcone from "@/public/images/Icon-1.png";
import meilleurIcone from "@/public/images/meilleur.png";
import pireIcone from "@/public/images/pire.png";

export default function Dashboard() {
  const [role, setRole] = useState(null);

  useEffect(() => {
    const userRole = sessionStorage.getItem("userRole");
    setRole(userRole);
  }, []);

  const personnelAppointments = [
    { id: 1, nom: "VOULZY Laurent", animal: "Jeanne", date: "2025-02-21", heure: "09:00", type: "Consultation" },
    { id: 2, nom: "PERMAN OVE Jean", animal: "Kenny", date: "2025-02-21", heure: "10:30", type: "Soin" }
  ];

  const veterinarianAppointments = [
  { id: 1, nom: "VOULZY Laurent", animal: "Jeanne", date: "2025-02-21", heure: "09:00", type: "Consultation", description: "Contrôle annuel de routine." },
  { id: 2, nom: "PERMAN OVE Jean", animal: "Kenny", date: "2025-02-21", heure: "10:30", type: "Soin", description: "Traitement contre les puces." },
  { id: 3, nom: "PAYET Dimitri", animal: "Pasok", date: "2025-04-21", heure: "11:00", type: "Vaccination", description: "Vaccination contre la rage." },
  { id: 4, nom: "BARAGOU TOU Tripathy", animal: "Caramel", date: "2025-04-04", heure: "13:30", type: "Opération", description: "Castration planifiée." },
  { id: 5, nom: "MAURICE Jean", animal: "Claudio", date: "2025-04-03", heure: "15:45", type: "Soin", description: "Problème digestif à surveiller." },
  { id: 6, nom: "BELMADI Djamel", animal: "Ryad", date: "2025-04-03", heure: "09:30", type: "Consultation", description: "Suivi après traitement." },
  { id: 7, nom: "MAURICE Florent", animal: "Claudio", date: "2025-04-03", heure: "11:00", type: "Vaccination", description: "Rappel de vaccin annuel." }
  ];

  return (
    <main className="p-6 xl:p-10 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Tableau de bord</h1>

      {role === "DIRECTEUR" && (
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-4">Dashboard Directeur</h2>
          <div className="bg-white rounded-xl shadow-md mb-6" style={{ width: "100%", height: "250px" }}></div>
          <div className="bg-white rounded-xl shadow-md" style={{ width: "100%", height: "250px" }}></div>
        </section>
      )}

      {role === "PERSONNEL" && (
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-4">Dashboard Personnel</h2>
          <table className="w-full bg-white rounded-lg shadow overflow-hidden text-sm">
            <thead className="bg-gray-100">
              <tr className="text-left">
                <th className="p-3">Nom et prénom</th>
                <th className="p-3">Animal</th>
                <th className="p-3">Date</th>
                <th className="p-3">Heure</th>
                <th className="p-3">Type</th>
              </tr>
            </thead>
            <tbody>
              {personnelAppointments.map(app => (
                <tr key={app.id} className="border-t">
                  <td className="p-3">{app.nom}</td>
                  <td className="p-3">{app.animal}</td>
                  <td className="p-3">{app.date}</td>
                  <td className="p-3">{app.heure}</td>
                  <td className="p-3">{app.type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      {role === "VETERINAIRE" && (
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-4">Dashboard Vétérinaire</h2>
          <table className="w-full bg-white rounded-lg shadow overflow-hidden text-sm">
            <thead className="bg-gray-100">
              <tr className="text-left">
                <th className="p-3">Nom et prénom</th>
                <th className="p-3">Animal</th>
                <th className="p-3">Date</th>
                <th className="p-3">Heure</th>
                <th className="p-3">Type</th>
              </tr>
            </thead>
            <tbody>
              {veterinarianAppointments.map(app => (
                <tr key={app.id} className="border-t">
                  <td className="p-3">{app.nom}</td>
                  <td className="p-3">{app.animal}</td>
                  <td className="p-3">{app.date}</td>
                  <td className="p-3">{app.heure}</td>
                  <td className="p-3">{app.type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

    </main>
  );
}

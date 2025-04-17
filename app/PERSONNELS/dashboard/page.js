"use client";

import { useEffect, useState } from "react";

const appointments = [
  { id: 1, nom: "VOULZY Laurent", animal: "Jeanne", date: "2025-02-21", heure: "09:00", type: "Consultation", description: "Contrôle annuel de routine." },
  { id: 2, nom: "PERMAN OVE Jean", animal: "Kenny", date: "2025-02-21", heure: "10:30", type: "Soin", description: "Traitement contre les puces." },
  { id: 3, nom: "PAYET Dimitri", animal: "Pasok", date: "2025-04-21", heure: "11:00", type: "Vaccination", description: "Vaccination contre la rage." },
  { id: 4, nom: "BARAGOU TOU Tripathy", animal: "Caramel", date: "2025-04-04", heure: "13:30", type: "Opération", description: "Castration planifiée." },
  { id: 5, nom: "MAURICE Jean", animal: "Claudio", date: "2025-04-03", heure: "15:45", type: "Soin", description: "Problème digestif à surveiller." },
  { id: 6, nom: "BELMADI Djamel", animal: "Ryad", date: "2025-04-03", heure: "09:30", type: "Consultation", description: "Suivi après traitement." },
  { id: 7, nom: "MAURICE Florent", animal: "Claudio", date: "2025-04-03", heure: "11:00", type: "Vaccination", description: "Rappel de vaccin annuel." }
];

export default function AccueilVeterinaire() {
  const [groupedAppointments, setGroupedAppointments] = useState({});

  useEffect(() => {
    const now = new Date();
    const upcoming = appointments.filter(app => {
      const appDate = new Date(`${app.date}T${app.heure}`);
      return appDate > now;
    }).sort((a, b) => new Date(`${a.date}T${a.heure}`) - new Date(`${b.date}T${b.heure}`));

    const groups = {};
    for (const app of upcoming) {
      const date = new Date(app.date);
      const today = new Date();
      const tomorrow = new Date();
      const afterTomorrow = new Date();
      tomorrow.setDate(today.getDate() + 1);
      afterTomorrow.setDate(today.getDate() + 2);

      let key = app.date;
      if (date.toDateString() === today.toDateString()) key = "Aujourd'hui";
      else if (date.toDateString() === tomorrow.toDateString()) key = "Demain";
      else if (date.toDateString() === afterTomorrow.toDateString()) key = "Après-demain";

      if (!groups[key]) groups[key] = [];
      groups[key].push(app);
    }
    setGroupedAppointments(groups);
  }, []);

  return (
    <>
      <h1 className="text-2xl font-bold px-10 pt-6">Tableau de bord</h1>
      <main className="flex flex-col lg:flex-row gap-8 p-10">
        {/* Tableau des patients à venir */}
        <div className="flex-1">
          <h2 className="text-xl font-semibold mb-4">Patients à venir :</h2>
          <table className="w-full bg-white rounded-lg shadow overflow-hidden text-sm">
            <thead className="bg-gray-100">
              <tr className="text-left">
                <th className="p-3">Nom et prénom</th>
                <th className="p-3">Animal</th>
                <th className="p-3">Date</th>
                <th className="p-3">Heure</th>
                <th className="p-3">Type</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
  {appointments.map(app => (
    <tr key={app.id} className="border-t">
      <td className="p-3">{app.nom}</td>
      <td className="p-3">{app.animal}</td>
      <td className="p-3">{app.date}</td>
      <td className="p-3">{app.heure}</td>
      <td className="p-3">{app.type}</td>
      <td className="p-3 space-x-2">
        <button className="text-green-600 bg-green-100 px-3 py-1 rounded text-xs">
          Détail
        </button>
        <button className="text-orange-600 bg-orange-100 px-3 py-1 rounded text-xs">
          Modifier
        </button>
        <button className="text-red-600 bg-red-100 px-3 py-1 rounded text-xs">
          Supprimer
        </button>
      </td>
    </tr>
  ))}
</tbody>

          </table>
          <div className="w-full flex justify-center mt-6">
            <button className="text-white bg-[#7D8AA7] px-5 py-2 rounded-full text-sm font-medium shadow">
              Voir la liste des Rendez-vous
            </button>
          </div>
        </div>

        {/* Bloc des 3 prochains RDV */}
        <div className="w-full lg:w-1/3">
          <h3 className="text-lg font-semibold mb-4">Les prochaines rendez-vous</h3>
          {
            (() => {
              const now = new Date();
              const upcoming = appointments
                .filter(app => new Date(`${app.date}T${app.heure}`) > now)
                .sort((a, b) => new Date(`${a.date}T${a.heure}`) - new Date(`${b.date}T${b.heure}`))
                .slice(0, 3);

              const grouped = {};
              const today = new Date();
              const tomorrow = new Date();
              const afterTomorrow = new Date();
              tomorrow.setDate(today.getDate() + 1);
              afterTomorrow.setDate(today.getDate() + 2);

              for (const app of upcoming) {
                const appDate = new Date(`${app.date}T${app.heure}`);
                let key = app.date;
                if (appDate.toDateString() === today.toDateString()) key = "Aujourd’hui";
                else if (appDate.toDateString() === tomorrow.toDateString()) key = "Demain";
                else if (appDate.toDateString() === afterTomorrow.toDateString()) key = "Après-demain";
                else key = app.date;

                if (!grouped[key]) grouped[key] = [];
                grouped[key].push(app);
              }

              return Object.entries(grouped).map(([label, apps], idx) => (
                <div key={idx} className="mb-4">
                  <h4 className="text-md font-bold text-gray-800 mb-2">{label}</h4>
                  {apps.map((app, i) => (
                    <div key={i} className="bg-white p-4 rounded-lg shadow-md mb-3 border border-gray-100">
                      <p className="font-bold text-sm text-gray-800">{app.nom}</p>
                      <p className="text-xs text-gray-600 mb-1">Pour {app.animal}</p>
                      <hr className="my-2 border-gray-300" />
                      <p className="text-xs text-gray-500">{app.description}</p>
                      <p className="text-sm font-semibold text-gray-700 mt-2">{app.date} à {app.heure}</p>
                    </div>
                  ))}
                </div>
              ));
            })()
          }
        </div>
      </main>
    </>
  );
}

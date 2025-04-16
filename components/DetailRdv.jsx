"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function DetailRdv() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [appointment, setAppointment] = useState(null);

  const appointmentsData = [
    {
      id: "00001",
      nom: "MARCHESSE",
      prenom: "Jean",
      genre: "Homme",
      telephone: "0601020304",
      animal: "Drizzy",
      espece: "Chien",
      dateNaissanceAnimal: "2018-06-15",
      sexeAnimal: "Mâle",
      type: "Soin",
      date: "2024-01-27T15:00",
      veterinaire: "Dr. Dupont",
      description: "Soin régulier - suivi des vaccins"
    },
    {
      id: "00002",
      nom: "MARCHESSE",
      prenom: "Jean",
      genre: "Homme",
      telephone: "0601020304",
      animal: "Morsay",
      espece: "Chat",
      dateNaissanceAnimal: "2021-02-10",
      sexeAnimal: "Femelle",
      type: "Consultation",
      date: "2024-01-27T17:00",
      veterinaire: "Dr. Durand",
      description: "Consultation générale"
    }
    // Ajoute ici les autres données si nécessaire
  ];

  useEffect(() => {
    const found = appointmentsData.find(app => app.id === id);
    setAppointment(found);
  }, [id]);

  if (!appointment) {
    return (
      <div className="p-10 text-center text-gray-500 animate-pulse">
        Chargement du rendez-vous...
      </div>
    );
  }

  return (
    <main className="p-10 max-w-4xl mx-auto">
      <button
        onClick={() => router.back()}
        className="text-sm mb-6 text-blue-600 hover:underline"
      >
        ← Retour
      </button>

      <div className="bg-white shadow-lg rounded-lg p-6 space-y-8">
        <h2 className="text-2xl font-bold">Détails du Rendez-vous</h2>

        {/* Infos Client / Vétérinaire */}
        <section>
          <h4 className="text-lg font-semibold text-gray-700 mb-4">Vétérinaire : </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <DetailItem label="Nom" value={appointment.nom} />
            <DetailItem label="Prénom" value={appointment.prenom} />
            <DetailItem label="Genre" value={appointment.genre} />
            <DetailItem label="Téléphone" value={appointment.telephone} />
          </div>
        </section>

        {/* Infos Animal */}
        <section>
          <h4 className="text-lg font-semibold text-gray-700 mb-4">Animal : </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <DetailItem label="Animal" value={appointment.espece} />
            <DetailItem label="Prénom animal" value={appointment.animal} />
            <DetailItem label="Date de naissance" value={appointment.dateNaissanceAnimal} />
            <DetailItem label="Sexe" value={appointment.sexeAnimal} />
          </div>
        </section>

        {/* Infos Rendez-vous */}
        <section>
          <h4 className="text-lg font-semibold text-gray-700 mb-4">Rendez-vous : </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <DetailItem label="Type" value={appointment.type} />
            <DetailItem label="Date" value={new Date(appointment.date).toLocaleDateString("fr-FR")} />
            <DetailItem label="Heure" value={`${new Date(appointment.date).getHours()}h`} />
            <DetailItem label="Nom vétérinaire" value={appointment.veterinaire} />
            <DetailItem label="Description" value={appointment.description} />
          </div>
        </section>

        <div className="flex justify-end gap-4">
          <button className="bg-blue-100 text-blue-700 px-4 py-2 rounded hover:bg-blue-200">
            Modifier
          </button>
          <button className="bg-red-100 text-red-700 px-4 py-2 rounded hover:bg-red-200">
            Supprimer
          </button>
        </div>
      </div>
    </main>
  );
}

function DetailItem({ label, value }) {
  return (
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-base font-medium text-gray-900">{value}</p>
    </div>
  );
}

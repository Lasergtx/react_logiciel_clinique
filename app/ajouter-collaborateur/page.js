"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AjouterCollaborateur() {
  const router = useRouter();

  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [role, setRole] = useState("");

  const handleSubmit = (e, ReactFormEvent) => {
    e.preventDefault();

    // Données simulées (pas de POST pour l'instant)
    console.log("Collaborateur ajouté :", { nom, prenom, role });

    // Redirection simulée
    router.push("/collaborateurs");
  };

  return (
    <main className="p-10 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Ajouter un collaborateur</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Nom</label>
          <input
            type="text"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            className="w-full border px-3 py-2 rounded text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Prénom</label>
          <input
            type="text"
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
            className="w-full border px-3 py-2 rounded text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Rôle</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full border px-3 py-2 rounded text-sm"
            required
          >
            <option value="">-- Sélectionner un rôle --</option>
            <option value="Vétérinaire">Vétérinaire</option>
            <option value="Assistant">Assistant</option>
            <option value="Secrétaire">Secrétaire</option>
          </select>
        </div>

        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded text-sm shadow hover:bg-blue-700 transition"
          >
            Valider
          </button>
        </div>
      </form>
    </main>
  );
}

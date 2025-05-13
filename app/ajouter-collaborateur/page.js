"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AjouterCollaborateur() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/users");
        const data = await response.json();
        const apiRoles = [...new Set(data.result.map((user) => user.role))];

        const allRoles = [...new Set([...roles, ...apiRoles])];
        setRoles(allRoles);
      } catch (error) {
        console.error("Erreur lors de la récupération des rôles :", error);
      }
    };

    fetchRoles();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:8000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userid: Date.now(),
          username,
          password,
          role
        })
      });

      if (response.ok) {
        console.log("Collaborateur ajouté avec succès");
        router.push("/collaborateurs");
      } else {
        const errorData = await response.json();
        console.error("Erreur lors de l'ajout du collaborateur :", errorData.message);
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi des données :", error);
    }
  };

  return (
    <main className="p-10 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Ajouter un collaborateur</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Nom d'utilisateur</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border px-3 py-2 rounded text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Mot de passe</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
            {roles.map((role, index) => (
              <option key={index} value={role}>{role}</option>
            ))}
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

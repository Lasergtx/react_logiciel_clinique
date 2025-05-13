"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function CollaborateursPage() {
  const [collaborators, setCollaborators] = useState([]);
  const [roleFilter, setRoleFilter] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedToDelete, setSelectedToDelete] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/users");
        const data = await response.json();
        setCollaborators(data.result);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    };
    fetchData();
  }, []);

  const handleDelete = () => {
    if (selectedToDelete) {
      setCollaborators((prev) => prev.filter((c) => c.userid !== selectedToDelete.userid));
      setSelectedToDelete(null);
      setShowModal(false);
    }
  };

  const filteredCollaborators = roleFilter
    ? collaborators.filter((c) => c.role === roleFilter)
    : collaborators;

  const roles = [...new Set(collaborators.map((c) => c.role))];

  return (
    <main className="min-h-screen p-10 bg-gray-50">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Collaborateurs</h1>
        <Link href="/ajouter-collaborateur" className="bg-blue-600 text-white px-4 py-2 rounded text-sm shadow hover:bg-blue-700 transition">
          + Ajouter un collaborateur
        </Link>
      </div>

      <div className="mb-4 flex items-center gap-4">
        <label className="text-sm font-medium">Filtrer par rôle :</label>
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="border p-1 rounded text-sm"
        >
          <option value="">Tous</option>
          {roles.map((role, i) => (
            <option key={i} value={role}>{role}</option>
          ))}
        </select>
      </div>

      <table className="w-full bg-white text-sm rounded-lg shadow-md">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-4 font-semibold text-gray-700">Nom</th>
            <th className="p-4 font-semibold text-gray-700">Prénom</th>
            <th className="p-4 font-semibold text-gray-700">Rôle</th>
            <th className="p-4 font-semibold text-gray-700 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredCollaborators.map((collab) => (
            <tr key={collab.userid} className="border-t hover:bg-gray-50 transition">
              <td className="p-4 text-gray-600 font-medium">{collab.username.split(" ")[0]}</td>
              <td className="p-4 text-gray-600 font-medium">{collab.username.split(" ")[1]}</td>
              <td className="p-4 text-gray-600 font-medium">{collab.role}</td>
              <td className="p-4 text-center space-x-2">
                <button className="bg-orange-100 text-orange-600 px-3 py-1 rounded text-xs hover:bg-orange-200">Modifier</button>
                <button
                  className="bg-red-100 text-red-600 px-3 py-1 rounded text-xs hover:bg-red-200"
                  onClick={() => {
                    setSelectedToDelete(collab);
                    setShowModal(true);
                  }}
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
          {filteredCollaborators.length === 0 && (
            <tr>
              <td colSpan={4} className="p-6 text-center text-gray-500">Aucun collaborateur trouvé pour ce rôle.</td>
            </tr>
          )}
        </tbody>
      </table>

      {showModal && selectedToDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md">
            <h2 className="text-lg font-bold mb-2">Confirmation</h2>
            <p className="mb-4">Êtes-vous sûr de vouloir supprimer ce collaborateur ?</p>
            <div className="flex justify-end space-x-3">
              <button onClick={() => setShowModal(false)} className="bg-gray-100 px-4 py-2 rounded text-sm">Annuler</button>
              <button onClick={handleDelete} className="bg-red-600 text-white px-4 py-2 rounded text-sm">Supprimer</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

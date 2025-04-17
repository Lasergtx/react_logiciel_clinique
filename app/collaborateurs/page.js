"use client";

import { useState } from "react";
import Link from "next/link";

const initialCollaborators = [
  { id: 1, nom: "Martin", prenom: "Julie", role: "Vétérinaire" },
  { id: 2, nom: "Lemoine", prenom: "Paul", role: "Assistant" },
  { id: 3, nom: "Nguyen", prenom: "Linh", role: "Réception" },
  { id: 4, nom: "Dubois", prenom: "Sarah", role: "Vétérinaire" },
  { id: 5, nom: "Durand", prenom: "Louis", role: "Assistant" }
];

export default function CollaborateursPage() {
  const [collaborators, setCollaborators] = useState(initialCollaborators);
  const [roleFilter, setRoleFilter] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [selectedToDelete, setSelectedToDelete] = useState(null);
  const roles = [...new Set(initialCollaborators.map((c) => c.role))];

  const filteredCollaborators = roleFilter
    ? collaborators.filter((c) => c.role === roleFilter)
    : collaborators;

  const handleDelete = () => {
    if (selectedToDelete) {
      setCollaborators(prev => prev.filter(c => c.id !== selectedToDelete.id));
      setSelectedToDelete(null);
      setShowModal(false);
    }
  };

  return (
    <main className="p-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Collaborateurs</h1>
        <Link
          href="/ajouter-collaborateur"
          className="bg-blue-600 text-white px-4 py-2 rounded text-sm shadow hover:bg-blue-700 transition"
        >
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
            <option key={i} value={role}>
              {role}
            </option>
          ))}
        </select>
        {roleFilter && (
          <button
            onClick={() => setRoleFilter("")}
            className="text-red-500 text-sm underline"
          >
            Réinitialiser
          </button>
        )}
      </div>

      <table className="w-full bg-white text-sm rounded shadow">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-3">Nom</th>
            <th className="p-3">Prénom</th>
            <th className="p-3">Rôle</th>
            <th className="p-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredCollaborators.map((collab) => (
            <tr key={collab.id} className="border-t">
              <td className="p-3">{collab.nom}</td>
              <td className="p-3">{collab.prenom}</td>
              <td className="p-3">{collab.role}</td>
              <td className="p-3 text-center space-x-2">
                <button
                  className="bg-orange-100 text-orange-600 px-3 py-1 rounded text-xs hover:bg-orange-200"
                  onClick={() => {}}
                >
                  Modifier
                </button>
                <button
                  className="bg-red-100 text-red-600 px-3 py-1 rounded text-xs hover:bg-red-200"
                  onClick={() => {
                    setSelectedToDelete({ id: collab.id, nom: collab.nom, prenom: collab.prenom });
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
              <td colSpan={4} className="p-4 text-center text-gray-500">
                Aucun collaborateur trouvé pour ce rôle.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal de confirmation */}
      {showModal && selectedToDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md relative">
            <h2 className="text-lg font-bold mb-2">Confirmation</h2>
            <p className="mb-4">
              Êtes-vous sûr de vouloir supprimer ce collaborateur :{" "}
              <strong>{selectedToDelete.prenom} {selectedToDelete.nom}</strong> ?
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowModal(false);
                  setSelectedToDelete(null);
                }}
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded text-sm hover:bg-gray-200"
              >
                Annuler
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-600 text-white px-4 py-2 rounded text-sm hover:bg-red-700"
              >
                Supprimer
              </button>
            </div>
            <button
              onClick={() => {
                setShowModal(false);
                setSelectedToDelete(null);
              }}
              className="absolute top-2 right-2 text-red-600 hover:text-red-800 text-xl"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

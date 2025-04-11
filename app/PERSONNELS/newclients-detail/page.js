"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";

const clientsData = [
  {
    id: "00001",
    nom: "AL-MARCHESSE",
    prenom: "Clément",
    email: "clement.marchesse@gmail.com",
    telephone: "07 78 55 40 99",
    adresse: "54 rue des Pruniers",
    ville: "Lyon",
    codePostal: "69000",
    genre: "Homme",
    animaux: [
      { nom: "Jinx", type: "Chien", espece: "Chihuahua", dateNaissance: "2005-05-09", genre: "Mâle", couleur: "Beige", identifiant: "1234567890" },
      { nom: "Luna", type: "Chat", espece: "Siamois", dateNaissance: "2017-12-17", genre: "Femelle", couleur: "Blanc", identifiant: "2345678901" },
      { nom: "Nala", type: "Chien", espece: "Pitbull", dateNaissance: "2022-02-19", genre: "Femelle", couleur: "Noir", identifiant: "3456789012" }
    ]
  }
];

export default function NewClientDetail() {
  const searchParams = useSearchParams();
  const clientId = searchParams.get("id");

  const [client, setClient] = useState(null);
  const [form, setForm] = useState(null);
  const [isEditingClient, setIsEditingClient] = useState(false);

  const [editAnimalIndex, setEditAnimalIndex] = useState(null);
  const [editAnimal, setEditAnimal] = useState(null);
  const [deleteAnimalIndex, setDeleteAnimalIndex] = useState(null);
  const [detailAnimal, setDetailAnimal] = useState(null);

  const detailModalRef = useRef(null);
  const editModalRef = useRef(null);
  const deleteModalRef = useRef(null);

  useEffect(() => {
    if (clientId) {
      const foundClient = clientsData.find((c) => c.id === clientId);
      setClient(foundClient);
      setForm(foundClient);
    }
  }, [clientId]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (detailAnimal && detailModalRef.current && !detailModalRef.current.contains(event.target)) {
        closeDetailModal();
      }
      if (editAnimal && editModalRef.current && !editModalRef.current.contains(event.target)) {
        closeEditAnimalModal();
      }
      if (deleteAnimalIndex !== null && deleteModalRef.current && !deleteModalRef.current.contains(event.target)) {
        closeDeleteModal();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [detailAnimal, editAnimal, deleteAnimalIndex]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleGenreChange = (value) => {
    setForm((prev) => ({ ...prev, genre: value }));
  };

  const handleClientSubmit = (e) => {
    e.preventDefault();
    setClient(form);
    setIsEditingClient(false);
  };

  const handleCancel = () => {
    setForm(client);
    setIsEditingClient(false);
  };

  const openEditAnimalModal = (index) => {
    setEditAnimalIndex(index);
    setEditAnimal(client.animaux[index]);
  };

  const closeEditAnimalModal = () => {
    setEditAnimalIndex(null);
    setEditAnimal(null);
  };

  const openDeleteModal = (index) => {
    setDeleteAnimalIndex(index);
  };

  const closeDeleteModal = () => {
    setDeleteAnimalIndex(null);
  };

  const handleAnimalChange = (e) => {
    const { name, value } = e.target;
    setEditAnimal((prev) => ({ ...prev, [name]: value }));
  };

  const handleAnimalGenreChange = (genre) => {
    setEditAnimal((prev) => ({ ...prev, genre }));
  };

  const handleUpdateAnimal = () => {
    const updatedClient = { ...client };
    updatedClient.animaux[editAnimalIndex] = editAnimal;
    setClient(updatedClient);
    setForm(updatedClient);
    closeEditAnimalModal();
  };

  const handleConfirmDelete = () => {
    const updatedClient = { ...client };
    updatedClient.animaux.splice(deleteAnimalIndex, 1);
    setClient(updatedClient);
    setForm(updatedClient);
    closeDeleteModal();
  };

  const openDetailModal = (animal) => {
    setDetailAnimal(animal);
  };

  const closeDetailModal = () => {
    setDetailAnimal(null);
  };

  if (!client) return <main className="p-10">Client introuvable.</main>;

  return (
    <main className="p-10">
      {!isEditingClient ? (
        <div className="flex justify-between items-start gap-10 bg-white rounded-lg shadow p-6">
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">M. {client.prenom} {client.nom}</h2>
            <p className="mb-2 text-gray-700 text-lg">{client.telephone}</p>
            <p className="mb-2 text-gray-700 text-lg">{client.email}</p>
            <p className="mb-2 text-gray-700 text-lg">Résident au {client.adresse}, {client.codePostal} {client.ville}</p>
            <p className="mb-4 text-gray-700 text-lg">Est propriétaire de {client.animaux.length} patient(s) de la clinique</p>
            <button onClick={() => setIsEditingClient(true)} className="bg-orange-400 hover:bg-orange-500 text-white px-6 py-2 rounded shadow transition-all duration-200 backdrop-blur-sm">Modifier</button>
          </div>
          <div className="w-40 h-40 bg-blue-700 rounded-full flex items-center justify-center shadow-md">
            <span className="text-white text-6xl">🐾</span>
          </div>
        </div>
      ) : (
        <form onSubmit={handleClientSubmit} className="bg-white rounded-lg shadow p-6 flex gap-10 items-start">
          <div className="flex-1 space-y-4">
            <div className="flex gap-4">
              <input type="text" name="prenom" value={form.prenom} onChange={handleFormChange} className="flex-1 p-2 border rounded" placeholder="Prénom" />
              <input type="text" name="nom" value={form.nom} onChange={handleFormChange} className="flex-1 p-2 border rounded" placeholder="Nom" />
            </div>
            <input type="email" name="email" value={form.email} onChange={handleFormChange} className="w-full p-2 border rounded" placeholder="Email" />
            <input type="text" name="adresse" value={form.adresse} onChange={handleFormChange} className="w-full p-2 border rounded" placeholder="Adresse" />
            <div className="flex gap-4">
              <input type="text" name="codePostal" value={form.codePostal} onChange={handleFormChange} className="w-1/3 p-2 border rounded" placeholder="Code postal" />
              <input type="text" name="ville" value={form.ville} onChange={handleFormChange} className="w-1/2 p-2 border rounded" placeholder="Ville" />
              <input type="text" name="telephone" value={form.telephone} onChange={handleFormChange} className="w-1/2 p-2 border rounded" placeholder="Téléphone" />
            </div>
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={form.genre === "Homme"} onChange={() => handleGenreChange("Homme")} />
                Homme
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={form.genre === "Femme"} onChange={() => handleGenreChange("Femme")} />
                Femme
              </label>
            </div>
            <div className="flex gap-4 pt-4">
              <button type="submit" className="bg-green-200 text-green-800 px-4 py-2 rounded hover:bg-green-300">Valider</button>
              <button type="button" onClick={handleCancel} className="bg-red-200 text-red-800 px-4 py-2 rounded hover:bg-red-300">Annuler</button>
            </div>
          </div>
          <div className="w-40 h-40 rounded-full bg-blue-700 flex items-center justify-center">
            <span className="text-6xl">🐾</span>
          </div>
        </form>
      )}

<div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-900">Liste des animaux</h3>
          <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded text-lg shadow-md transition-all duration-200">+</button>
        </div>
        <table className="w-full bg-white rounded-lg shadow overflow-hidden text-sm">
          <thead className="bg-gray-100">
            <tr className="text-left">
              <th className="p-3">Prénom</th>
              <th className="p-3">Type</th>
              <th className="p-3">Espèce</th>
              <th className="p-3">Date de naissance</th>
              <th className="p-3">Genre</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {client.animaux.map((animal, index) => (
              <tr key={index} className="border-t hover:bg-gray-50 transition-all">
                <td className="p-3 font-medium text-gray-800">{animal.nom}</td>
                <td className="p-3">{animal.type}</td>
                <td className="p-3">{animal.espece}</td>
                <td className="p-3">{animal.dateNaissance}</td>
                <td className="p-3">{animal.genre}</td>
                <td className="p-3 flex gap-2">
                  <button onClick={() => openDetailModal(animal)} className="bg-green-100 text-green-700 px-3 py-1 rounded hover:bg-green-200 transition">Détail</button>
                  <button onClick={() => openEditAnimalModal(index)} className="bg-orange-100 text-orange-700 px-3 py-1 rounded hover:bg-orange-200 transition">Modifier</button>
                  <button onClick={() => openDeleteModal(index)} className="bg-red-100 text-red-700 px-3 py-1 rounded hover:bg-red-200 transition">Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modales */}
      {detailAnimal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center">
          <div ref={detailModalRef} className="bg-white p-8 rounded-xl shadow-xl w-full max-w-lg relative">
            <button onClick={closeDetailModal} className="absolute top-4 right-4 text-white bg-blue-800 w-8 h-8 rounded-full text-center text-lg">×</button>
            <h2 className="text-2xl font-bold mb-4">Détails de l'animal</h2>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(detailAnimal).map(([key, value]) => (
                <div key={key} className="col-span-2 flex flex-col">
                  <label className="text-sm font-medium capitalize">{key}</label>
                  <input disabled className="bg-gray-100 p-2 rounded" value={value} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {editAnimal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center">
          <div ref={editModalRef} className="bg-white p-8 rounded-xl shadow-xl w-full max-w-lg relative">
            <button onClick={closeEditAnimalModal} className="absolute top-4 right-4 text-white bg-blue-800 w-8 h-8 rounded-full text-center text-lg">×</button>
            <h2 className="text-2xl font-bold mb-4">Modifier l'animal</h2>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(editAnimal).map(([key, value]) => (
                <div key={key} className="col-span-2 flex flex-col">
                  <label className="capitalize">{key}</label>
                  <input name={key} className="bg-gray-100 p-2 rounded" value={value} onChange={handleAnimalChange} />
                </div>
              ))}
            </div>
            <div className="mt-6">
              <button onClick={handleUpdateAnimal} className="bg-blue-700 text-white px-6 py-2 rounded hover:bg-blue-800 w-full">Valider</button>
            </div>
          </div>
        </div>
      )}

      {deleteAnimalIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center">
          <div ref={deleteModalRef} className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md relative">
            <button onClick={closeDeleteModal} className="absolute top-4 right-4 text-white bg-red-600 w-8 h-8 rounded-full text-center text-lg">×</button>
            <h2 className="text-xl font-semibold mb-4">Confirmation</h2>
            <p className="text-gray-800 mb-6">Êtes-vous sûr de vouloir supprimer cet animal : <strong>{client.animaux[deleteAnimalIndex].nom}</strong> ?</p>
            <div className="flex justify-end gap-4">
              <button onClick={closeDeleteModal} className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition">Annuler</button>
              <button onClick={handleConfirmDelete} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition">Supprimer</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}


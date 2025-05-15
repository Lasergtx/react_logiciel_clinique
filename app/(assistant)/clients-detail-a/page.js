"use client"; // Directive pour indiquer que ce code doit être exécuté côté client

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState, useRef } from "react";
import Image from "next/image";

function ClientDetailComponent({ clientId }) {
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
      fetchClient(clientId);
    }
  }, [clientId]);

  const fetchClient = async (clientId) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/clients/${clientId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Data received from API:", data); // Ajoutez cette ligne pour vérifier les données reçues
      setClient(data);
      setForm(data);
    } catch (error) {
      console.error("Erreur lors de la récupération du client :", error);
    }
  };

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
    setForm((prev) => ({ ...prev, gender: value }));
  };

  const handleClientSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://127.0.0.1:8000/clients/${clientId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setClient(data);
      setIsEditingClient(false);
    } catch (error) {
      console.error("Erreur lors de la mise à jour du client :", error);
    }
  };

  const handleCancel = () => {
    setForm(client);
    setIsEditingClient(false);
  };

  const openEditAnimalModal = (index) => {
    setEditAnimalIndex(index);
    setEditAnimal(client.patients[index]);
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

  const handleUpdateAnimal = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/patients/${editAnimal.patientid}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editAnimal),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const updatedClient = { ...client };
      updatedClient.patients[editAnimalIndex] = data;
      setClient(updatedClient);
      setForm(updatedClient);
      closeEditAnimalModal();
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'animal :", error);
    }
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/patients/${client.patients[deleteAnimalIndex].patientid}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const updatedClient = { ...client };
      updatedClient.patients.splice(deleteAnimalIndex, 1);
      setClient(updatedClient);
      setForm(updatedClient);
      closeDeleteModal();
    } catch (error) {
      console.error("Erreur lors de la suppression de l'animal :", error);
    }
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
            <h2 className="text-2xl font-bold mb-4 text-gray-900">
              {client.gender === "M" ? "M." : "Mme."} {client.firstname} {client.lastname}
            </h2>
            <p className="mb-2 text-gray-700 text-lg">{client.phonenumber}</p>
            <p className="mb-2 text-gray-700 text-lg">{client.email}</p>
            <p className="mb-2 text-gray-700 text-lg">
              Résident au {client.address}, {client.zipcode} {client.city}
            </p>
            <p className="mb-4 text-gray-700 text-lg">
              Est propriétaire de {client.patients ? client.patients.length : 0} patient(s)
            </p>
            <button
              onClick={() => setIsEditingClient(true)}
              className="bg-orange-400 hover:bg-orange-500 text-white px-6 py-2 rounded shadow transition-all"
            >
              Modifier
            </button>
          </div>
          <Image
            src="/mdi_paw.png"
            alt="Logo clinique"
            width={160}
            height={160}
            className="object-contain rounded-full shadow-md"
          />
        </div>
      ) : (
        <form onSubmit={handleClientSubmit} className="bg-white rounded-lg shadow p-6 flex gap-10 items-start">
          <div className="flex-1 space-y-4">
            <div className="flex gap-4">
              <input type="text" name="firstname" value={form.firstname} onChange={handleFormChange} className="flex-1 p-2 border rounded" placeholder="Prénom" />
              <input type="text" name="lastname" value={form.lastname} onChange={handleFormChange} className="flex-1 p-2 border rounded" placeholder="Nom" />
            </div>
            <input type="email" name="email" value={form.email} onChange={handleFormChange} className="w-full p-2 border rounded" placeholder="Email" />
            <input type="text" name="address" value={form.address} onChange={handleFormChange} className="w-full p-2 border rounded" placeholder="Adresse" />
            <div className="flex gap-4">
              <input type="text" name="zipcode" value={form.zipcode} onChange={handleFormChange} className="w-1/3 p-2 border rounded" placeholder="Code postal" />
              <input type="text" name="city" value={form.city} onChange={handleFormChange} className="w-1/2 p-2 border rounded" placeholder="Ville" />
              <input type="text" name="phonenumber" value={form.phonenumber} onChange={handleFormChange} className="w-1/2 p-2 border rounded" placeholder="Téléphone" />
            </div>
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={form.gender === "M"} onChange={() => handleGenreChange("M")} />
                Homme
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={form.gender === "F"} onChange={() => handleGenreChange("F")} />
                Femme
              </label>
            </div>
            <div className="flex gap-4 pt-4">
              <button type="submit" className="bg-green-200 text-green-800 px-4 py-2 rounded hover:bg-green-300">Valider</button>
              <button type="button" onClick={handleCancel} className="bg-red-200 text-red-800 px-4 py-2 rounded hover:bg-red-300">Annuler</button>
            </div>
          </div>
          <Image
            src="/mdi_paw.png"
            alt="Logo clinique"
            width={160}
            height={160}
            className="object-contain rounded-full shadow-md"
          />
        </form>
      )}

      {/* Liste des animaux */}
      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-4">Liste des animaux</h3>
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
            {client.patients && client.patients.map((animal, index) => (
              <tr key={index} className="border-t hover:bg-gray-50 transition-all">
                <td className="p-3 font-medium text-gray-800">{animal.name}</td>
                <td className="p-3">{animal.type}</td>
                <td className="p-3">{animal.species}</td>
                <td className="p-3">{animal.birthdate}</td>
                <td className="p-3">{animal.gender}</td>
                <td className="p-3 flex gap-2">
                  <button onClick={() => openDetailModal(animal)} className="bg-green-100 text-green-700 px-3 py-1 rounded hover:bg-green-200">Détail</button>
                  <button onClick={() => openEditAnimalModal(index)} className="bg-orange-100 text-orange-700 px-3 py-1 rounded hover:bg-orange-200">Modifier</button>
                  <button onClick={() => openDeleteModal(index)} className="bg-red-100 text-red-700 px-3 py-1 rounded hover:bg-red-200">Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODALES */}
      {detailAnimal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
          <div ref={detailModalRef} className="bg-white p-8 rounded-xl shadow-xl w-full max-w-lg relative">
            <button onClick={closeDetailModal} className="absolute top-4 right-4 text-white bg-blue-800 w-8 h-8 rounded-full text-lg">×</button>
            <h2 className="text-2xl font-bold mb-4">Détails de l&apos;animal</h2>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(detailAnimal).map(([key, value]) =>
                key !== "antecedents" ? (
                  <div key={key} className="col-span-2 flex flex-col">
                    <label className="text-sm font-medium capitalize">{key}</label>
                    <input disabled className="bg-gray-100 p-2 rounded" value={value} />
                  </div>
                ) : null
              )}
            </div>
            <h3 className="text-lg font-semibold mt-6 mb-2">Antécédents</h3>
            <ul className="space-y-2">
              {detailAnimal.antecedents?.length > 0 ? (
                detailAnimal.antecedents.map((a, idx) => (
                  <li key={idx} className="bg-gray-100 p-2 rounded">{a}</li>
                ))
              ) : (
                <li className="text-gray-500">Aucun enregistré</li>
              )}
            </ul>
          </div>
        </div>
      )}

      {editAnimal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
          <div ref={editModalRef} className="bg-white p-8 rounded-xl shadow-xl w-full max-w-lg relative">
            <button onClick={closeEditAnimalModal} className="absolute top-4 right-4 text-white bg-blue-800 w-8 h-8 rounded-full text-lg">×</button>
            <h2 className="text-2xl font-bold mb-4">Modifier l&apos;animal</h2>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(editAnimal).map(([key, value]) =>
                key !== "antecedents" ? (
                  <div key={key} className="col-span-2 flex flex-col">
                    <label className="capitalize">{key}</label>
                    <input name={key} className="bg-gray-100 p-2 rounded" value={value} onChange={handleAnimalChange} />
                  </div>
                ) : null
              )}
            </div>
            <div className="mt-6">
              <button onClick={handleUpdateAnimal} className="bg-blue-700 text-white px-6 py-2 rounded hover:bg-blue-800 w-full">Valider</button>
            </div>
          </div>
        </div>
      )}

      {deleteAnimalIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
          <div ref={deleteModalRef} className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md relative">
            <button onClick={closeDeleteModal} className="absolute top-4 right-4 text-white bg-red-600 w-8 h-8 rounded-full text-lg">×</button>
            <h2 className="text-xl font-semibold mb-4">Confirmation</h2>
            <p className="text-gray-800 mb-6">Supprimer <strong>{client.patients[deleteAnimalIndex].name}</strong> ?</p>
            <div className="flex justify-end gap-4">
              <button onClick={closeDeleteModal} className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300">Annuler</button>
              <button onClick={handleConfirmDelete} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">Supprimer</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

function ClientDetailPage() {
  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <ClientDetailComponentWrapper />
    </Suspense>
  );
}

function ClientDetailComponentWrapper() {
  const searchParams = useSearchParams();
  const clientId = searchParams.get('id');

  return <ClientDetailComponent clientId={clientId} />;
}

export default ClientDetailPage;

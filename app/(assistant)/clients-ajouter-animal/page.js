"use client"; // DYNAMIQUE

import RoleGuard from "@/components/RoleGuard";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AjouterAnimal() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [type, setType] = useState("");
  const [species, setSpecies] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [numberid, setNumberid] = useState("");
  const [color, setColor] = useState("");
  const [clientid, setClientid] = useState("");
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/clients", { cache: 'no-store' });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (Array.isArray(data.result)) {
          setClients(data.result);
        } else {
          console.error("Les données des clients ne sont pas un tableau :", data);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des clients :", error);
      }
    };

    fetchClients();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:8000/patients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          gender,
          type,
          species,
          birthdate,
          numberid,
          color,
          clientid
        })
      });

      if (response.ok) {
        console.log("Animal ajouté avec succès");
        router.push("/patients-liste");
      } else {
        const errorData = await response.json();
        console.error("Erreur lors de l'ajout de l'animal :", errorData.message);
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi des données :", error);
    }
  };

  return (
    <main className="p-10 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Ajouter un animal</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Nom <span className="text-red-500">*</span></label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border px-3 py-2 rounded text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Genre <span className="text-red-500">*</span></label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full border px-3 py-2 rounded text-sm"
            required
          >
            <option value="">-- Sélectionner un genre --</option>
            <option value="M">Masculin</option>
            <option value="F">Féminin</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Type <span className="text-red-500">*</span></label>
          <input
            type="text"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full border px-3 py-2 rounded text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Espèce <span className="text-red-500">*</span></label>
          <input
            type="text"
            value={species}
            onChange={(e) => setSpecies(e.target.value)}
            className="w-full border px-3 py-2 rounded text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Date de naissance <span className="text-red-500">*</span></label>
          <input
            type="date"
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
            className="w-full border px-3 py-2 rounded text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Numéro d&apos;identification <span className="text-red-500">*</span></label>
          <input
            type="text"
            value={numberid}
            onChange={(e) => setNumberid(e.target.value)}
            className="w-full border px-3 py-2 rounded text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Couleur (facultatif)</label>
          <input
            type="text"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-full border px-3 py-2 rounded text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Client <span className="text-red-500">*</span></label>
          <select
            value={clientid}
            onChange={(e) => setClientid(e.target.value)}
            className="w-full border px-3 py-2 rounded text-sm"
            required
          >
            <option value="">-- Sélectionner un client --</option>
            {clients.map((client) => (
              <option key={client.clientid} value={client.clientid}>
                {client.lastname} {client.firstname}
              </option>
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

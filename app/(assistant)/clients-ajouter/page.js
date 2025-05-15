"use client"; // DYNAMIQUE

import RoleGuard from "@/components/RoleGuard";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AjouterClient() {
  const router = useRouter();

  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [gender, setGender] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [address, setAddress] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [city, setCity] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:8000/clients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          clientid: Date.now(),
          lastname,
          firstname,
          gender,
          phonenumber,
          address,
          zipcode,
          city
        })
      });

      if (response.ok) {
        console.log("Client ajouté avec succès");
        router.push("/clients-liste");
      } else {
        const errorData = await response.json();
        console.error("Erreur lors de l'ajout du client :", errorData.message);
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi des données :", error);
    }
  };

  return (
      <main className="p-10 max-w-xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Ajouter un client</h1>

        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nom de famille <span className="text-red-500">*</span></label>
            <input
              type="text"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              className="w-full border px-3 py-2 rounded text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Prénom <span className="text-red-500">*</span></label>
            <input
              type="text"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
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
            <label className="block text-sm font-medium mb-1">Numéro de téléphone <span className="text-red-500">*</span> (format : 07xxxxxxxx)</label>
            <input
              type="text"
              value={phonenumber}
              onChange={(e) => setPhonenumber(e.target.value)}
              className="w-full border px-3 py-2 rounded text-sm"
              placeholder="07xxxxxxxx"
              maxLength="10"
              pattern="07[0-9]{8}"
              title="Le numéro doit commencer par 07 et contenir 10 chiffres"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Adresse (facultatif)</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full border px-3 py-2 rounded text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Code Postal (facultatif)</label>
            <input
              type="text"
              value={zipcode}
              onChange={(e) => setZipcode(e.target.value)}
              className="w-full border px-3 py-2 rounded text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Ville (facultatif)</label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full border px-3 py-2 rounded text-sm"
            />
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

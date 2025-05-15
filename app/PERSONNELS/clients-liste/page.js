"use client"; // a rendre dynamique (recuperer sur veterinaire)

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

const clientsData = [
  { id: "00001", nom: "AL-MAHCHESE", prenom: "Clément", animaux: 1, telephone: "06728455" },
  { id: "00002", nom: "RAMA", prenom: "Raoul", animaux: 2, telephone: "0744588952" },
  { id: "00003", nom: "HETZEL", prenom: "Mael", animaux: 3, telephone: "0654123589" },
  { id: "00004", nom: "FERNANDES", prenom: "David", animaux: 2, telephone: "0635478900" },
  { id: "00005", nom: "BARAGOUTOU", prenom: "Tripathy", animaux: 1, telephone: "0641235478" },
];

export default function Clients() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [closing, setClosing] = useState(false);
  const modalRef = useRef(null);
  const [newClient, setNewClient] = useState({
    nom: "",
    prenom: "",
    genre: "",
    numero: "",
    email: "",
    adresse: "",
    ville: "",
    codePostal: ""
  });

  const filteredClients = clientsData.filter(client =>
    `${client.nom} ${client.prenom}`.toLowerCase().includes(search.toLowerCase())
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewClient(prev => ({ ...prev, [name]: value }));
  };

  const handleGenreChange = (genre) => {
    setNewClient(prev => ({ ...prev, genre }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Client ajouté :", newClient);
    closeModal();
  };

  const closeModal = () => {
    setClosing(true);
    setTimeout(() => {
      setShowModal(false);
      setClosing(false);
    }, 200);
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        closeModal();
      }
    };
    if (showModal) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showModal]);

  return (
    <main className="p-10">
      <h1 className="text-2xl font-semibold mb-6">Clients :</h1>

      <div className="flex items-center mb-4 gap-2">
        <input
          type="text"
          placeholder="Rechercher un client..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border p-2 rounded w-72"
        />
        <button 
          onClick={() => setShowModal(true)} 
          className="bg-blue-700 text-white px-4 py-2 rounded h-fit transition-all duration-200 hover:bg-blue-800 hover:scale-105 animate-bounce-once"
        >Ajouter un client</button>
      </div>

      <table className="w-full text-sm text-left bg-white rounded shadow">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2">ID</th>
            <th className="p-2">Nom et prénom</th>
            <th className="p-2">Nombre d'animaux</th>
            <th className="p-2">Numéro de téléphone</th>
            <th className="p-2"></th>
          </tr>
        </thead>
        <tbody>
          {filteredClients.map(client => (
            <tr key={client.id} className="border-t">
              <td className="p-2">{client.id}</td>
              <td className="p-2">{client.nom} {client.prenom}</td>
              <td className="p-2">{client.animaux}</td>
              <td className="p-2">{client.telephone}</td>
              <td className="p-2">
                <button
                  className="text-green-600 bg-green-100 px-3 py-1 rounded text-xs"
                  onClick={() => router.push(`/PERSONNELS/newclients-detail?id=${client.id}`)}
                >Détail</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className={`fixed inset-0 backdrop-blur-sm bg-black/50 flex items-center justify-center z-50 ${closing ? 'animate-fadeOut' : 'animate-fadeIn'}`}>
          <div ref={modalRef} className={`bg-white rounded-xl shadow-xl w-full max-w-md p-6 relative ${closing ? 'animate-slideOutDown' : 'animate-slideInUp'}`}>
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-red-600 text-xl"
            >×</button>
            <h2 className="text-xl font-bold mb-4 text-center">Ajouter un client</h2>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <div>
                <label className="text-sm">Nom :</label>
                <input name="nom" className="bg-gray-100 p-2 rounded w-full" value={newClient.nom} onChange={handleInputChange} />
              </div>
              <div>
                <label className="text-sm">Prénom :</label>
                <input name="prenom" className="bg-gray-100 p-2 rounded w-full" value={newClient.prenom} onChange={handleInputChange} />
              </div>
              <div>
                <label className="text-sm">Genre :</label>
                <div className="flex gap-4 mt-1">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" checked={newClient.genre === "Homme"} onChange={() => handleGenreChange("Homme")} /> Homme
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" checked={newClient.genre === "Femme"} onChange={() => handleGenreChange("Femme")} /> Femme
                  </label>
                </div>
              </div>
              <div>
                <label className="text-sm">Numéro :</label>
                <input name="numero" className="bg-gray-100 p-2 rounded w-full" value={newClient.numero} onChange={handleInputChange} />
              </div>
              <div>
                <label className="text-sm">Email :</label>
                <input name="email" className="bg-gray-100 p-2 rounded w-full" value={newClient.email} onChange={handleInputChange} />
              </div>
              <div>
                <label className="text-sm">Adresse :</label>
                <input name="adresse" className="bg-gray-100 p-2 rounded w-full" value={newClient.adresse} onChange={handleInputChange} />
              </div>
              <div>
                <label className="text-sm">Ville :</label>
                <input name="ville" className="bg-gray-100 p-2 rounded w-full" value={newClient.ville} onChange={handleInputChange} />
              </div>
              <div>
                <label className="text-sm">Code postal :</label>
                <input name="codePostal" className="bg-gray-100 p-2 rounded w-full" value={newClient.codePostal} onChange={handleInputChange} />
              </div>
              <div className="flex justify-end mt-4">
                <button
                  type="submit"
                  className="bg-blue-700 text-white px-6 py-2 rounded transition-all duration-200 hover:bg-blue-800 hover:scale-105 animate-bounce-once"
                >Enregistrer</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}

"use client"; // DYNAMIQUE

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export default function Clients() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [closing, setClosing] = useState(false);
  const [clientsData, setClientsData] = useState([]);
  const modalRef = useRef(null);

  const fetchClients = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/clients", { cache: 'no-store' });
      const data = await response.json();
      setClientsData(data.result);
    } catch (error) {
      console.error("Erreur lors de la récupération des clients :", error);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const filteredClients = clientsData.filter(client =>
    `${client.lastname} ${client.firstname}`.toLowerCase().includes(search.toLowerCase())
  );

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
          onClick={() => router.push("./clients-ajouter")}
          className="bg-blue-700 text-white px-4 py-2 rounded h-fit transition-all duration-200 hover:bg-blue-800 hover:scale-105 animate-bounce-once"
        >Ajouter un client</button>
      </div>

      <table className="w-full text-sm text-left bg-white rounded shadow">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2">ID</th>
            <th className="p-2">Nom et prénom</th>
            <th className="p-2">Genre</th>
            <th className="p-2">Numéro de téléphone</th>
            <th className="p-2"></th>
          </tr>
        </thead>
        <tbody>
          {filteredClients.map(client => (
            <tr key={client.clientid} className="border-t">
              <td className="p-2">{client.clientid}</td>
              <td className="p-2">{client.lastname} {client.firstname}</td>
              <td className="p-2">{client.gender}</td>
              <td className="p-2">{client.phonenumber}</td>
              <td className="p-2">
                <button
                  className="text-green-600 bg-green-100 px-3 py-1 rounded text-xs"
                  onClick={() => router.push(`/clients-detail-a?id=${client.clientid}`)}
                >Détail</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}

"use client";

import { useState, useEffect, useRef } from "react";

const appointmentsData = [
  { id: "00001", nom: "MARCHESSE", animal: "Drizzy", espece: "Chien", type: "Soin", date: "2024-01-27T15:00" },
  { id: "00002", nom: "MARCHESSE", animal: "Morsay", espece: "Chat", type: "Consultation", date: "2024-01-27T17:00" },
  { id: "00003", nom: "RAMA", animal: "Clément", espece: "Chat", type: "Consultation", date: "2024-01-27T08:00" },
  { id: "00004", nom: "HETZEL", animal: "Tounsy", espece: "Chien", type: "Opération", date: "2024-01-28T12:00" },
  { id: "00005", nom: "FERNANDES", animal: "Richard", espece: "Chat", type: "Soin", date: "2024-01-28T15:00" },
  { id: "00006", nom: "FERNANDES", animal: "Paulo", espece: "Chat", type: "Opération", date: "2024-01-29T14:00" },
  { id: "00007", nom: "BARAGOUTOU", animal: "Caramel", espece: "Chien", type: "Consultation", date: "2024-01-29T17:00" },
  { id: "00008", nom: "MAURICE", animal: "Claudio", espece: "Chien", type: "Soin", date: "2024-01-30T08:00" },
  { id: "00009", nom: "BELMADI", animal: "Ryad", espece: "Chien", type: "Opération", date: "2024-01-30T10:00" }
];

export default function RendezVous() {
  const [nomFilter, setNomFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [searchNom, setSearchNom] = useState("");
  const [showNomDropdown, setShowNomDropdown] = useState(false);
  const nomRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (nomRef.current && !nomRef.current.contains(event.target)) {
        setShowNomDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredAppointments = appointmentsData.filter(app => {
    const matchNom = nomFilter ? app.nom === nomFilter : true;
    const matchType = typeFilter ? app.type === typeFilter : true;
    const matchDate = dateFilter ? app.date.startsWith(dateFilter) : true;
    return matchNom && matchType && matchDate;
  });

  const resetFilters = () => {
    setNomFilter("");
    setSearchNom("");
    setTypeFilter("");
    setDateFilter("");
  };

  const uniqueNoms = [...new Set(appointmentsData.map(app => app.nom))];
  const uniqueTypes = [...new Set(appointmentsData.map(app => app.type))];

  const filteredNomOptions = uniqueNoms.filter(nom => nom.toLowerCase().includes(searchNom.toLowerCase()));

  return (
    <main className="p-10">
      <h1 className="text-2xl font-semibold mb-6">Rendez-vous :</h1>

      {/* Filtres */}
      <div className="bg-white p-4 rounded-lg shadow mb-6 flex flex-wrap gap-4 items-end">
        <div className="relative flex flex-col" ref={nomRef}>
          <label className="text-sm font-medium">Nom</label>
          <input
            type="text"
            value={searchNom}
            onFocus={() => setShowNomDropdown(true)}
            onChange={e => {
              setSearchNom(e.target.value);
              setShowNomDropdown(true);
            }}
            placeholder="Rechercher un nom..."
            className="border p-1 rounded"
          />
          {showNomDropdown && (
            <ul className="absolute top-full left-0 right-0 bg-white border rounded shadow z-10 max-h-40 overflow-y-auto">
              {filteredNomOptions.map(nom => (
                <li
                  key={nom}
                  onClick={() => {
                    setNomFilter(nom);
                    setSearchNom(nom);
                    setShowNomDropdown(false);
                  }}
                  className="px-2 py-1 hover:bg-gray-100 cursor-pointer"
                >
                  {nom}
                </li>
              ))}
              {filteredNomOptions.length === 0 && (
                <li className="px-2 py-1 text-gray-400">Aucun résultat</li>
              )}
            </ul>
          )}
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium">Type RDV</label>
          <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)} className="border p-1 rounded">
            <option value="">Tous</option>
            {uniqueTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium">Date</label>
          <input type="date" value={dateFilter} onChange={e => setDateFilter(e.target.value)} className="border p-1 rounded" />
        </div>

        <button onClick={resetFilters} className="text-red-500 text-sm h-8 mt-auto">Reset Filter</button>
      </div>

      {/* Tableau */}
      <table className="w-full text-sm text-left bg-white rounded shadow">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2">ID</th>
            <th className="p-2">Nom</th>
            <th className="p-2">Prénom animal</th>
            <th className="p-2">Espèce</th>
            <th className="p-2">Type RDV</th>
            <th className="p-2">Date</th>
            <th className="p-2"></th>
          </tr>
        </thead>
        <tbody>
          {filteredAppointments.map(app => (
            <tr key={app.id} className="border-t">
              <td className="p-2">{app.id}</td>
              <td className="p-2">{app.nom}</td>
              <td className="p-2">{app.animal}</td>
              <td className="p-2">{app.espece}</td>
              <td className="p-2">{app.type}</td>
              <td className="p-2">{new Date(app.date).toLocaleDateString()} - {new Date(app.date).getHours()}h</td>
              <td className="p-2">
                <button className="text-green-600 bg-green-100 px-3 py-1 rounded text-xs">Détail</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
"use client";

import { useState } from "react";
import Image from "next/image";
import left from "@/public/images/arrowleft.svg";
import right from "@/public/images/arrowright.svg";
import filterIcon from "@/public/images/filter.svg";

const dataPages = [
  {
    date: "21/02/2025",
    client: "Jean Lagache",
    produits: [
      { nom: "Croquettes chien 5kg", prix: 25 },
      { nom: "Vaccin rage", prix: 30 }
    ]
  },
  {
    date: "21/02/2025",
    client: "Clément Al-Mahchese",
    produits: [
      { nom: "Antipuces chat", prix: 15 },
      { nom: "Consultation", prix: 50 },
      { nom: "Nettoyage oreilles", prix: 12 }
    ]
  },
  {
    date: "20/02/2025",
    client: "Alice Martin",
    produits: [
      { nom: "Vermifuge", prix: 20 },
      { nom: "Analyse sanguine", prix: 60 }
    ]
  },
  {
    date: "19/02/2025",
    client: "Paul Nilon",
    produits: [
      { nom: "Consultation", prix: 50 }
    ]
  },
  {
    date: "18/02/2025",
    client: "Samuel Gigoto",
    produits: [
      { nom: "Laisse cuir", prix: 22 },
      { nom: "Shampoing hypoallergénique", prix: 18 }
    ]
  },
  {
    date: "17/02/2025",
    client: "Emma Lefevre",
    produits: [
      { nom: "Carnet de santé", prix: 5 },
      { nom: "Consultation", prix: 50 },
      { nom: "Vaccin", prix: 30 }
    ]
  },
  {
    date: "17/02/2025",
    client: "Nicolas Bertin",
    produits: [
      { nom: "Croquettes chat", prix: 22 },
      { nom: "Nettoyant yeux", prix: 14 }
    ]
  },
  {
    date: "16/02/2025",
    client: "Léa Dupuis",
    produits: [
      { nom: "Consultation", prix: 50 }
    ]
  },
  {
    date: "16/02/2025",
    client: "David Morel",
    produits: [
      { nom: "Coupe griffes", prix: 10 },
      { nom: "Shampoing", prix: 15 },
      { nom: "Peigne", prix: 8 }
    ]
  },
  {
    date: "15/02/2025",
    client: "Chloé Robert",
    produits: [
      { nom: "Vaccin", prix: 30 },
      { nom: "Analyse sanguine", prix: 60 }
    ]
  },
  {
    date: "15/02/2025",
    client: "Julien Garnier",
    produits: [
      { nom: "Consultation", prix: 50 },
      { nom: "Vermifuge", prix: 20 }
    ]
  }
];

export default function Ventes() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDate, setSelectedDate] = useState("");

  const itemsPerPage = 10;

  const filteredData = selectedDate
    ? dataPages.filter((item) => item.date === selectedDate)
    : dataPages;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTickets = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const resetFilters = () => {
    setSelectedDate("");
  };

  return (
    <main className="min-h-screen p-6 xl:p-10 bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Historique des ventes :</h1>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-white px-4 py-2 border border-gray-300 rounded-md shadow-sm">
            <Image src={filterIcon} alt="filter" width={16} height={16} />
            <span className="text-sm text-gray-700">Filtrer par date :</span>
          </div>
          <input
            type="date"
            className="border border-gray-300 rounded-md px-3 py-2 text-sm"
            onChange={(e) => setSelectedDate(e.target.value.split("-").reverse().join("/"))}
          />
        </div>
        {selectedDate && (
          <button
            className="text-sm text-blue-600 underline"
            onClick={resetFilters}
          >
            Réinitialiser les filtres
          </button>
        )}
      </div>

      <div className="bg-white border rounded-xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100 text-gray-600 text-sm">
            <tr>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Client</th>
              <th className="py-3 px-4">Produits</th>
              <th className="py-3 px-4">Total</th>
            </tr>
          </thead>
          <tbody>
            {currentTickets.map((ticket, index) => (
              <tr key={index} className="border-t">
                <td className="py-3 px-4 align-top whitespace-nowrap">{ticket.date}</td>
                <td className="py-3 px-4 align-top whitespace-nowrap">{ticket.client}</td>
                <td className="py-3 px-4">
                  <ul className="list-disc pl-4">
                    {ticket.produits.map((prod, idx) => (
                      <li key={idx}>{prod.nom} — {prod.prix}€</li>
                    ))}
                  </ul>
                </td>
                <td className="py-3 px-4 font-semibold text-green-600">
                  {ticket.produits.reduce((total, p) => total + p.prix, 0)}€
                </td>
              </tr>
            ))}
            {currentTickets.length === 0 && (
              <tr>
                <td colSpan={4} className="py-4 text-center text-gray-500">
                  Aucune vente trouvée avec ce filtre.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {filteredData.length > itemsPerPage && (
        <div className="flex justify-between items-center mt-6">
          <p className="text-sm text-gray-500">
            Page {currentPage} sur {totalPages}
          </p>
          <div className="flex">
            <button
              className="bg-white py-1 px-2 rounded-l-lg border border-gray-300 disabled:opacity-50"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <Image src={left} alt="left arrow" className="w-5" />
            </button>
            <button
              className="bg-white py-1 px-2 rounded-r-lg border-y border-r border-gray-300 disabled:opacity-50"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <Image src={right} alt="right arrow" className="w-5" />
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

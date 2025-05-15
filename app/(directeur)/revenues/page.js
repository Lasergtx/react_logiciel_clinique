"use client"; // a rendre dynamique une fois la base prête

import { useState, useEffect } from "react";
import Image from "next/image";
import left from "@/public/images/arrowleft.svg";
import right from "@/public/images/arrowright.svg";
import filterIcon from "@/public/images/filter.svg";
import { useRouter } from "next/navigation";
import RoleGuard from "@/components/RoleGuard";

const dataPages = [
    {
        date: "17/02/2025",
        debiteur: "Jean Lagache",
        total: "+ 200€",
        raison: "Paiement facture",
    },
    {
        date: "17/02/2025",
        debiteur: "Clément Al-Mahchese",
        total: "+ 250€",
        raison: "Paiement en plusieurs fois",
    },
    {
        date: "18/02/2025",
        debiteur: "Paul Nilon",
        total: "+ 400€",
        raison: "Facturation services",
    },
    {
        date: "18/02/2025",
        debiteur: "Alice Martin",
        total: "+ 150€",
        raison: "Paiement abonnement",
    },
    {
        date: "18/02/2025",
        debiteur: "Théo Dupont",
        total: "+ 90€",
        raison: "Paiement en attente",
    },
    {
        date: "19/02/2025",
        debiteur: "Samuel Gigoto",
        total: "+ 90€",
        raison: "Paiement en attente",
    },
    {
        date: "19/02/2025",
        debiteur: "Théo Lavia",
        total: "+ 90€",
        raison: "Paiement en attente",
    },
    {
        date: "19/02/2025",
        debiteur: "Raoul Rama",
        total: "+ 150€",
        raison: "Paiement abonnement",
    },
    {
        date: "19/02/2025",
        debiteur: "Lucas Bernard",
        total: "+ 75€",
        raison: "Paiement facture",
    },
    {
        date: "20/02/2025",
        debiteur: "Emma Lefevre",
        total: "+ 320€",
        raison: "Vente de produits",
    },
    {
        date: "20/02/2025",
        debiteur: "Jérémie Morel",
        total: "+ 500€",
        raison: "Paiement en plusieurs fois",
    },
    {
        date: "20/02/2025",
        debiteur: "David Manone",
        total: "+ 500€",
        raison: "Paiement en plusieurs fois",
    },
    {
        date: "21/02/2025",
        debiteur: "Santiago Alavez",
        total: "+ 90€",
        raison: "Paiement en attente",
    },
    {
        date: "21/02/2025",
        debiteur: "Nabil Dupont",
        total: "+ 90€",
        raison: "Paiement en attente",
    },
];

export default function Dashboard() {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedDate, setSelectedDate] = useState("");
    const [sortAmount, setSortAmount] = useState(null);
    const [earnings, setEarnings] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const fetchEarnings = async () => {
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/earnings`
                );
                const data = await response.json();
                setEarnings(data.result);
            } catch (error) {
                console.error("Erreur lors du chargement des revenus :", error);
            }
        };

        fetchEarnings();
    }, []);

    const itemsPerPage = 7;

    let filteredData = selectedDate
        ? earnings.filter((item) => {
              const createdDate = new Date(item.created_at);
              const [day, month, year] = selectedDate.split("/");
              const selected = new Date(`${year}-${month}-${day}`);

              return (
                  createdDate.getDate() === selected.getDate() &&
                  createdDate.getMonth() === selected.getMonth() &&
                  createdDate.getFullYear() === selected.getFullYear()
              );
          })
        : earnings;

    if (sortAmount) {
        filteredData = [...filteredData].sort((a, b) => {
            return sortAmount === "asc"
                ? a.amount - b.amount
                : b.amount - a.amount;
        });
    }

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentContracts = filteredData.slice(
        indexOfFirstItem,
        indexOfLastItem
    );
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    const resetFilters = () => {
        setSelectedDate("");
        setSortAmount(null);
    };

    function formatDateToDDMMYYYY(dateString) {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, "0"); // '15' → '15'
        const month = String(date.getMonth() + 1).padStart(2, "0"); // 0-based → add 1
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
    }

    return (
        <RoleGuard allowedRoles={["DIRECTEUR"]}>
            <main className="min-h-screen p-6 xl:p-10 bg-gray-50">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">
                    Revenus :
                </h1>

                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 bg-white px-4 py-2 border border-gray-300 rounded-md shadow-sm">
                            <Image
                                src={filterIcon}
                                alt="filter"
                                width={16}
                                height={16}
                            />
                            <span className="text-sm text-gray-700">
                                Filtrer par date :
                            </span>
                        </div>
                        <input
                            type="date"
                            className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                            onChange={(e) =>
                                setSelectedDate(
                                    e.target.value
                                        .split("-")
                                        .reverse()
                                        .join("/")
                                )
                            }
                        />
                        <div className="flex items-center gap-2">
                            <select
                                className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                                onChange={(e) => setSortAmount(e.target.value)}
                                value={sortAmount || ""}
                            >
                                <option value="">Montant</option>
                                <option value="asc">Croissant</option>
                                <option value="desc">Décroissant</option>
                            </select>
                        </div>
                    </div>
                    {(selectedDate || sortAmount) && (
                        <button
                            className="text-sm text-blue-600 underline"
                            onClick={resetFilters}
                        >
                            Réinitialiser les filtres
                        </button>
                    )}
                </div>

                <div className="bg-white border rounded-xl overflow-hidden">
                    <table className="w-full text-center">
                        <thead>
                            <tr className="bg-gray-100 text-gray-600 text-sm">
                                <th className="py-3 px-4">Date</th>
                                <th className="py-3 px-4">Débiteur</th>
                                <th className="py-3 px-4">Montant</th>
                                <th className="py-3 px-4">Raison</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentContracts.map((earning, index) => (
                                <tr key={index} className="border-t">
                                    <td className="py-3 px-4">
                                        {formatDateToDDMMYYYY(
                                            earning.created_at
                                        )}
                                    </td>
                                    <td className="py-3 px-4">
                                        {earning.clients.firstname +
                                            " " +
                                            earning.clients.lastname}
                                    </td>
                                    <td className="py-3 px-4 text-green-500">
                                        {earning.amount} €
                                    </td>
                                    <td className="py-3 px-4">
                                        {earning.description
                                            ? earning.description
                                            : "N/A"}
                                    </td>
                                    <td className="py-3 px-4">
                                        <button
                                            className="bg-[#4AD991] bg-opacity-20 text-[#4AD991] text-sm py-1 px-4 rounded-lg"
                                            onClick={() =>
                                                router.push("/details")
                                            }
                                        >
                                            Détails
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {currentContracts.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={5}
                                        className="py-4 text-gray-500"
                                    >
                                        Aucune donnée trouvée avec ces filtres.
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
                                onClick={() =>
                                    handlePageChange(currentPage - 1)
                                }
                                disabled={currentPage === 1}
                            >
                                <Image
                                    src={left}
                                    alt="left arrow"
                                    className="w-5"
                                />
                            </button>
                            <button
                                className="bg-white py-1 px-2 rounded-r-lg border-y border-r border-gray-300 disabled:opacity-50"
                                onClick={() =>
                                    handlePageChange(currentPage + 1)
                                }
                                disabled={currentPage === totalPages}
                            >
                                <Image
                                    src={right}
                                    alt="right arrow"
                                    className="w-5"
                                />
                            </button>
                        </div>
                    </div>
                )}
            </main>
        </RoleGuard>
    );
}

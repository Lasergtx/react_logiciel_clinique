"use client";

import { useState } from "react";
import Image from "next/image";
import left from "@/public/images/arrowleft.svg";
import right from "@/public/images/arrowright.svg";
import { useRouter } from "next/navigation";

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
    const [currentPage, setCurrentPage] = useState(1); // État pour la page actuelle
    const itemsPerPage = 7; // Nombre d'éléments par page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentContracts = dataPages.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(dataPages.length / itemsPerPage);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };
    const router = useRouter();
    return (
        <main className="h-[100vh] flex flex-col items-center px-14">
            <h1 className="text-3xl w-full text-strat mt-10">Revenus</h1>
            <div className="flex justify-center mt-5 w-full bg-white border-[1px] rounded-xl border-[#D5D5D5] overflow-hidden">
                <table className="w-full text-center">
                    <thead>
                        <tr className="bg-[#FCFDFD] border-b-[1px] border-[#D5D5D5]">
                            <th className="py-2">Date</th>
                            <th className="py-2">Débiteur</th>
                            <th className="py-2">Montant</th>
                            <th className="py-2">Raison</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        {currentContracts.map((client, index) => (
                            <tr key={index}>
                                <td className="py-3 border-b-[1px] border-[#D5D5D5]">
                                    {client.date}
                                </td>
                                <td className="py-3 border-b-[1px] border-[#D5D5D5]">
                                    {client.debiteur}
                                </td>
                                <td className="py-3 text-green-500 border-b-[1px] border-[#D5D5D5]">
                                    {client.total}
                                </td>
                                <td className="py-3 border-b-[1px] border-[#D5D5D5]">
                                    {client.raison}
                                </td>
                                <td className="border-b-[1px] border-[#D5D5D5]">
                                    <button
                                        className="bg-[#4AD991] bg-opacity-20 text-[#4AD991] text-sm py-1 px-4 rounded-lg"
                                        onClick={() => router.push("/details")}
                                    >
                                        Détails
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-between w-full mt-5">
                <p className="text-sm text-gray-500">
                    Page {currentPage} sur {totalPages}
                </p>
                <div className="flex">
                    <button
                        className="bg-white py-1 px-2 rounded-l-lg border-[1px] border-[#D5D5D5] disabled:opacity-50"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        <Image src={left} alt="left arrow" className="w-5" />
                    </button>
                    <button
                        className="bg-white py-1 px-2 rounded-r-lg border-y-[1px] border-r-[1px] border-[#D5D5D5] disabled:opacity-50"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        <Image src={right} alt="right arrow" className="w-5" />
                    </button>
                </div>
            </div>
        </main>
    );
}

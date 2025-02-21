"use client";

import { useState } from "react";
import Image from "next/image";
import left from "@/public/images/arrowleft.svg";
import right from "@/public/images/arrowright.svg";

const dataPages = [
    [
        { date: "30/01/2025", description: "Achat de fournitures médicales", amount: "- 20€" },
        { date: "30/01/2025", description: "Commande de médicaments", amount: "- 50€" },
        { date: "31/01/2025", description: "Achat de nouveaux PC Fixe", amount: "- 120€" },
        { date: "03/02/2025", description: "Nettoyage et désinfection des locaux", amount: "- 90€" },
        { date: "06/02/2025", description: "Achat d'un nouvel équipement vétérinaire", amount: "- 400€" },
        { date: "07/02/2025", description: "Achat de matériel de soins", amount: "- 200€" },
        { date: "10/02/2025", description: "Réparation d'un appareil de diagnostic", amount: "- 40€" },
    ],
    [
        { date: "10/02/2025", description: "Frais de déplacement pour visite à domicile", amount: "- 70€" },
        { date: "12/02/2025", description: "Campagne de sensibilisation en ligne", amount: "- 90€" },
        { date: "13/02/2025", description: "Remboursement prêt pour équipement", amount: "- 320€" },
        { date: "17/02/2025", description: "Stock de vaccins et médicaments", amount: "- 500€" },
        { date: "19/02/2025", description: "Formation du personnel sur nouvelles techniques", amount: "- 250€" },
        { date: "19/02/2025", description: "Frais administratifs de la clinique", amount: "- 60€" },
        { date: "20/02/2025", description: "Réparation du matériel chirurgical", amount: "- 180€" },
    ],
];

export default function Spendings() {
    const [currentPage, setCurrentPage] = useState(0);

    return (
        <main className="h-[100vh] flex flex-col items-center px-14">
            <h1 className="text-3xl w-full text-strat mt-10">Dépenses</h1>
            <div className="flex justify-center mt-5 w-full bg-white border-[1px] rounded-xl border-[#D5D5D5] overflow-hidden">
                <table className="w-full text-center">
                    <thead>
                        <tr className="bg-[#FCFDFD] border-b-[1px] border-[#D5D5D5]">
                            <th className="py-2">Date</th>
                            <th className="py-2">Description</th>
                            <th className="py-2">Montant</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        {dataPages[currentPage].map((item, index) => (
                            <tr key={index}>
                                <td className="py-3 border-b-[1px] border-[#D5D5D5]">{item.date}</td>
                                <td className="py-3 border-b-[1px] border-[#D5D5D5]">{item.description}</td>
                                <td className="py-3 text-red-500 border-b-[1px] border-[#D5D5D5]">{item.amount}</td>
                                <td className="border-b-[1px] border-[#D5D5D5]">
                                    <button className="bg-[#4AD991] bg-opacity-20 text-[#4AD991] text-sm py-1 px-4 rounded-lg">
                                        Détails
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-between w-full mt-5">
                <p className="text-sm text-gray-500">Page {currentPage + 1} sur {dataPages.length}</p>
                <div className="flex">
                    <button 
                        className="bg-white py-1 px-2 rounded-l-lg border-[1px] border-[#D5D5D5] disabled:opacity-50" 
                        onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
                        disabled={currentPage === 0}
                    >
                        <Image src={left} alt="left arrow" className="w-5" />
                    </button>
                    <button 
                        className="bg-white py-1 px-2 rounded-r-lg border-y-[1px] border-r-[1px] border-[#D5D5D5] disabled:opacity-50" 
                        onClick={() => setCurrentPage(prev => Math.min(dataPages.length - 1, prev + 1))}
                        disabled={currentPage === dataPages.length - 1}
                    >
                        <Image src={right} alt="right arrow" className="w-5" />
                    </button>
                </div>
            </div>
        </main>
    );
}

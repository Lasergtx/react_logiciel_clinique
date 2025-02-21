"use client";

import { useState } from "react";
import Image from "next/image";
import left from "@/public/images/arrowleft.svg";
import right from "@/public/images/arrowright.svg";

const dataPages = [
    [
        { product: "Croquettes Royal Canin (chien adulte)", quantity: 32, price: 25 },
        { product: "Litière agglomérante premium", quantity: 15, price: 10 },
        { product: "Antiparasitaire Frontline (chat)", quantity: 27, price: 18 },
        { product: "Complément articulaire pour chien", quantity: 18, price: 30 },
    ],
    [
        { product: "Shampooing dermatologique hypoallergénique", quantity: 22, price: 12 },
        { product: "Os à mâcher pour l’hygiène dentaire", quantity: 40, price: 5 },
        { product: "Seringues stériles 5ml", quantity: 60, price: 1 },
        { product: "Vitamine liquide pour animaux", quantity: 25, price: 20 },
    ]
];

export default function VenteProduits() {
    const [currentPage, setCurrentPage] = useState(0);
    return (
        <main className="h-[100vh] flex flex-col items-center px-14">
            <h1 className="text-3xl w-full text-strat mt-10">Tableau des ventes produits</h1>
            <div className="flex justify-center mt-5 w-full bg-white border-[1px] rounded-xl border-[#D5D5D5] overflow-hidden">
                <table className="w-full text-center">
                    <thead>
                        <tr className="bg-[#FCFDFD] border-b-[1px] border-[#D5D5D5]">
                            <th className="py-2">Produit</th>
                            <th className="py-2">Quantité vendue</th>
                            <th className="py-2">Prix unitaire (€)</th>
                            <th className="py-2">Total (€)</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        {dataPages[currentPage].map((item, index) => (
                            <tr key={index}>
                                <td className="py-3 border-b-[1px] border-[#D5D5D5]">{item.product}</td>
                                <td className="py-3 border-b-[1px] border-[#D5D5D5]">{item.quantity}</td>
                                <td className="py-3 border-b-[1px] border-[#D5D5D5]">{item.price}</td>
                                <td className="py-3 border-b-[1px] border-[#D5D5D5]">{item.quantity * item.price}</td>
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

"use client";

import { useState } from "react";
import Image from "next/image";
import left from "@/public/images/arrowleft.svg";
import right from "@/public/images/arrowright.svg";

const dataPages = [
    [
        { nom: "Jean Lagache", telephone: "0744512399", date: "17/02/2025"},
        { nom: "Dilan Poity", telephone: "0741235896", date: "17/02/2025"},
        { nom: "Clément Al-Mahchese", telephone: "0652341789", date: "17/02/2025"},
        { nom: "David Fernandes", telephone: "0633214598", date: "17/02/2025"},
        { nom: "Paul Nilon", telephone: "07442214589", date: "17/02/2025"},
        { nom: "Rafael Toloi", telephone: "0749748348", date: "17/02/2025"},
        { nom: "Théo Dupont", telephone: "07224415698", date: "18/02/2025"},
    ],
    [
        { nom: "Khashimov Sherzod", telephone: "0678123456", date: "18/02/2025"},
        { nom: "Estebanne Zermi", telephone: "0745123986", date: "18/02/2025"},
        { nom: "Jean-Louis David", telephone: "0689345678", date: "18/02/2025"},
        { nom: "Patrik da Silva Santos Júnior", telephone: "0789632145", date: "18/02/2025"},
        { nom: "Julian ", telephone: "0778965432", date: "18/02/2025"},
        { nom: "Samuel Gigoto", telephone: "0654893214", date: "18/02/2025"},
        { nom: "Xavier Dupont", telephone: "0754789631", date: "18/02/2025"},
    ],
    [
        { nom: "David Nehess", telephone: "0622412333", date: "18/02/2025"},
        { nom: "Théo Lavia", telephone: "0787451263", date: "19/02/2025"},
        { nom: "Raoul Rama", telephone: "0765894123", date: "19/02/2025"},
        { nom: "Emma Lefévre", telephone: "0685741236", date: "19/02/2025"},
        { nom: "Marie O'jack", telephone: "0698745632", date: "19/02/2025"},
        { nom: "Santiago Alavez", telephone: "0698452314", date: "19/02/2025"},
        { nom: "David Manone", telephone: "0667845123", date: "19/02/2025"},
    ],
    [
        { nom: "Patrice Clous", telephone: "0678123456", date: "20/02/2025"},
        { nom: "Lucas Bernard", telephone: "0798745632", date: "20/02/2025"},
        { nom: "Luis Fernandes", telephone: "0689345678", date: "20/02/2025"},
        { nom: "Pierre-émile Carotte", telephone: "0667845123", date: "20/02/2025"},
        { nom: "Raoul Rama", telephone: "0654893214", date: "20/02/2025"},
        { nom: "Emma Lefevre", telephone: "0765894123", date: "21/02/2025"},
        { nom: "Jérémie Morel", telephone: "0723148965", date: "21/02/2025"},
    ]
];

export default function Trafic() {
    const [currentPage, setCurrentPage] = useState(0);
    return (
        <main className="h-[100vh] flex flex-col items-center px-14">
            <h1 className="text-3xl w-full text-strat mt-10">Trafic</h1>
            <div className="flex justify-center mt-5 w-full bg-white border-[1px] rounded-xl border-[#D5D5D5] overflow-hidden">
                <table className="w-full text-center">
                    <thead>
                        <tr className="bg-[#FCFDFD] border-b-[1px] border-[#D5D5D5]">
                            <th className="py-2">Nom Prénom</th>
                            <th className="py-2">Numéro</th>
                            <th className="py-2">Date de passage</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        {dataPages[currentPage].map((item, index) => (
                            <tr key={index}>
                                <td className="py-3 border-b-[1px] border-[#D5D5D5]">{item.nom}</td>
                                <td className="py-3 border-b-[1px] border-[#D5D5D5]">{item.telephone}</td>
                                <td className="py-3 border-b-[1px] border-[#D5D5D5]">{item.date}</td>
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

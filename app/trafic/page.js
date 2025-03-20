"use client";

import { useState } from "react";
import Image from "next/image";
import left from "@/public/images/arrowleft.svg";
import right from "@/public/images/arrowright.svg";

const dataPages = [
    { clients: "35 clients", patients: "30 patients", date: "30/01/2025" },
    { clients: "42 clients", patients: "19 patients", date: "29/01/2025" },
    { clients: "45 clients", patients: "22 patients", date: "28/01/2025" },
    { clients: "28 clients", patients: "13 patients", date: "27/01/2025" },
    { clients: "33 clients", patients: "19 patients", date: "26/01/2025" },
    { clients: "29 clients", patients: "16 patients", date: "25/01/2025" },
    { clients: "36 clients", patients: "20 patients", date: "24/01/2025" },
    { clients: "27 clients", patients: "17 patients", date: "23/01/2025" },
    { clients: "45 clients", patients: "22 patients", date: "22/01/2025" },
];

export default function Trafic() {
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
    return (
        <main className="h-[100vh] flex flex-col items-center px-14">
            <h1 className="text-3xl w-full text-strat mt-10">Trafic</h1>
            <div className="flex justify-center mt-5 w-full bg-white border-[1px] rounded-xl border-[#D5D5D5] overflow-hidden">
                <table className="w-full text-center">
                    <thead>
                        <tr className="bg-[#FCFDFD] border-b-[1px] border-[#D5D5D5]">
                            <th className="py-2">Date</th>
                            <th className="py-2">Nombre de passage</th>
                            <th className="py-2">Nombre de prise en charge</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        {currentContracts.map((item, index) => (
                            <tr key={index}>
                                <td className="py-3 border-b-[1px] border-[#D5D5D5]">
                                    {item.date}
                                </td>
                                <td className="py-3 border-b-[1px] border-[#D5D5D5]">
                                    {item.clients}
                                </td>
                                <td className="py-3 border-b-[1px] border-[#D5D5D5]">
                                    {item.patients}
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

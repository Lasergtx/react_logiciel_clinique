"use client"; // a rendre dynamique

import { useState } from "react";
import Image from "next/image";
import left from "@/public/images/arrowleft.svg";
import right from "@/public/images/arrowright.svg";
import filterIcon from "@/public/images/filter.svg";

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
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedDate, setSelectedDate] = useState("");

    const itemsPerPage = 7;

    const filteredData = selectedDate
        ? dataPages.filter((item) => item.date === selectedDate)
        : dataPages;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentContracts = filteredData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    return (
        <main className="min-h-screen p-6 xl:p-10 bg-gray-50">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Fréquentation :</h1>

            {/* Filtre */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 bg-white px-4 py-2 border border-gray-300 rounded-md shadow-sm">
                        <Image src={filterIcon} alt="filter" width={16} height={16} />
                        <span className="text-sm text-gray-700">Filtrer par date :</span>
                    </div>
                    <input
                        type="date"
                        className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                        onChange={(e) => setSelectedDate(
                          e.target.value.split("-").reverse().join("/")
                        )}
                    />
                </div>
                {selectedDate && (
                    <button
                        className="text-sm text-blue-600 underline"
                        onClick={() => setSelectedDate("")}
                    >
                        Réinitialiser le filtre
                    </button>
                )}
            </div>

            {/* Table */}
            <div className="bg-white border rounded-xl overflow-hidden">
                <table className="w-full text-center">
                    <thead>
                        <tr className="bg-gray-100 text-gray-600 text-sm">
                            <th className="py-3 px-4">Date</th>
                            <th className="py-3 px-4">Nombre de passage</th>
                            <th className="py-3 px-4">Nombre de prise en charge</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentContracts.map((item, index) => (
                            <tr key={index} className="border-t">
                                <td className="py-3 px-4">{item.date}</td>
                                <td className="py-3 px-4">{item.clients}</td>
                                <td className="py-3 px-4">{item.patients}</td>
                            </tr>
                        ))}
                        {currentContracts.length === 0 && (
                            <tr>
                                <td colSpan={3} className="py-4 text-gray-500">
                                    Aucune donnée trouvée pour cette date.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
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

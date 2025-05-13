"use client";

import Image from "next/image";
import { useState } from "react";

export default function AnimalDetail() {
    const [selectedTab, setSelectedTab] = useState("rappels");
    const [contraindications, setContraindications] = useState([
        {
            title: "Doramectine",
            description: "Provoque de fortes réactions allergiques. À ne surtout pas utiliser."
        },
        {
            title: "Lopéramide",
            description: "Dangereux pour les chiens."
        }
    ]);
    const [newContraTitle, setNewContraTitle] = useState("");
    const [newContraDesc, setNewContraDesc] = useState("");
    const [showForm, setShowForm] = useState(false);

    const handleAddContra = () => {
        if (!newContraTitle.trim()) return;
        setContraindications([...contraindications, { title: newContraTitle, description: newContraDesc }]);
        setNewContraTitle("");
        setNewContraDesc("");
        setShowForm(false);
    };

    const handleRemoveContra = (index) => {
        setContraindications(contraindications.filter((_, i) => i !== index));
    };

    return (
        <main className="h-full flex flex-col items-center px-10 py-10">
            <h1 className="text-3xl text-strat mb-6 w-full">Fiche Animal</h1>

            {/* Informations principales */}
            <div className="w-full flex flex-col md:flex-row gap-8 mb-10">
                <div className="bg-[#E6ECF4] rounded-xl p-6 w-full md:w-1/2">
                    <h2 className="text-2xl font-bold mb-2">JUMBO</h2>
                    <p className="mb-1">Colley (Chien) • Mâle • Pelage Noir</p>
                    <p className="mb-1">Né le 21/08/2018</p>
                    <p className="mb-1">ID : 250268731234567</p>
                    <p className="mb-3">Appartient à : Clément Marchesse</p>
                    <button className="bg-orange-400 text-white px-4 py-1 rounded hover:bg-orange-500">Modifier</button>
                </div>

                <div className="bg-[#E6ECF4] rounded-xl p-6 w-full md:w-1/2">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-lg font-semibold">Contre-indications</h3>
                        <button className="text-green-500 text-xl font-bold" onClick={() => setShowForm(!showForm)}>+</button>
                    </div>
                    <ul>
                        {contraindications.map((item, index) => (
                            <li key={index} className="mb-2 flex justify-between items-start">
                                <div>
                                    <span className="font-medium">{item.title} :</span>
                                    <span className="ml-2">{item.description}</span>
                                </div>
                                <button
                                    className="ml-4 text-red-500 font-bold"
                                    onClick={() => handleRemoveContra(index)}
                                >
                                    ✕
                                </button>
                            </li>
                        ))}
                    </ul>
                    {showForm && (
                        <div className="mt-4">
                            <input
                                type="text"
                                placeholder="Nom du médicament"
                                value={newContraTitle}
                                onChange={(e) => setNewContraTitle(e.target.value)}
                                className="w-full mb-2 p-2 rounded border border-gray-300"
                            />
                            <textarea
                                placeholder="Détails ou effets"
                                value={newContraDesc}
                                onChange={(e) => setNewContraDesc(e.target.value)}
                                className="w-full p-2 rounded border border-gray-300"
                            />
                            <button onClick={handleAddContra} className="mt-2 bg-blue-500 text-white px-4 py-1 rounded">Ajouter</button>
                        </div>
                    )}
                </div>
            </div>

            {/* Bloc Rappels & Antécédents */}
            <div className="w-full flex flex-col md:flex-row gap-8">
                {/* Bloc rappels */}
                <div className="flex-1 bg-white p-6 rounded-xl shadow-md">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold">Rappels</h3>
                        <button className="text-green-500 text-xl font-bold">+</button>
                    </div>
                    <div className="flex gap-4 mb-4">
                        <button onClick={() => setSelectedTab("rappels")} className={`px-3 py-1 rounded ${selectedTab === "rappels" ? "bg-[#3B4B60] text-white" : "bg-gray-200"}`}>À venir</button>
                        <button onClick={() => setSelectedTab("historique")} className={`px-3 py-1 rounded ${selectedTab === "historique" ? "bg-[#3B4B60] text-white" : "bg-gray-200"}`}>Historique</button>
                    </div>
                    <ul>
                        <li className="mb-2">20/02/2025 : Vaccination contre la leptospirose</li>
                        <li className="mb-2">14/04/2025 : Vaccination contre la rage</li>
                        <li>14/04/2025 : Vaccination contre la piroplasmose</li>
                    </ul>
                </div>

                {/* Bloc antécédents */}
                <div className="flex-1 bg-white p-6 rounded-xl shadow-md">
                    <h3 className="text-lg font-semibold mb-4">Antécédents</h3>
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="text-gray-600 text-sm">
                                <th className="pb-2">Type</th>
                                <th className="pb-2">Description ou motif</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-t text-sm">
                                <td className="py-2">Soin</td>
                                <td>Grippe</td>
                                <td>
                                    <button className="text-green-600 bg-green-100 px-2 py-1 rounded text-sm">Voir l'ordonnance</button>
                                </td>
                            </tr>
                            <tr className="border-t text-sm">
                                <td className="py-2">Opération</td>
                                <td>Simple opération de castration à cause du comportement agité…</td>
                                <td>
                                    <button className="text-red-600 bg-red-100 px-2 py-1 rounded text-sm">Détails</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    );
}

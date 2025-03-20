"use client";

import { useState } from "react";
import Image from "next/image";
import left from "@/public/images/arrowleft.svg";
import right from "@/public/images/arrowright.svg";
import clientsIcone from "@/public/images/Icon.png";
import revenueIcone from "@/public/images/Icon-1.png";
import depenseIcone from "@/public/images/Icon-1.png";
import profitIcone from "@/public/images/Icon-1.png";
import meilleurIcone from "@/public/images/meilleur.png";
import pireIcone from "@/public/images/pire.png";
import revenueChart from "@/public/images/Component 19.png";
import clientChart from "@/public/images/Group 323.png";

export default function Dashboard() {
    return (
        <main className="h-[100vh] flex flex-col items-center px-14">
            <h1 className="text-3xl w-full text-strat mt-10">Dashboard</h1>
            
            {/* Cards Section */}
            <div className="flex justify-between w-full mt-5 gap-6">
                <div className="flex flex-col items-center gap-4">
                    {/* Nombre de clients */}
                    <div className="bg-white p-4 rounded-lg shadow-md w-64 flex items-center justify-between">
                        <div>
                            <p className="text-gray-500 text-sm">Nombres de clients aujourd&apos;hui</p>
                            <div className="text-xl font-semibold">21</div>
                            <p className="text-green-500 text-sm flex items-center">
                                <span className="mr-1">▲</span> 8.5% Depuis hier
                            </p>
                            <button className="mt-2 text-blue-600 bg-blue-100 px-3 py-1 rounded-md text-sm">
                                Voir l&apos;historique
                            </button>
                        </div>
                        <Image src={clientsIcone} alt="Clients Icone" className="w-10 h-10" />
                    </div>
                    {/* Meilleure vente */}
                    <div className="bg-white p-4 rounded-lg shadow-md w-64 flex flex-col items-center">
                        <div>
                        <Image src={meilleurIcone} alt="Meilleure vente icone" className="w-213 h-156" />
                        <p className="text-gray-500 text-sm mt-2 font-semibold">Meilleure vente</p>
                        <div className="text-md font-semibold">Dalféine 500mg</div>
                        </div>
                    </div>
                    {/* Revenus Chart */}
                    <div className="bg-white p-4 rounded-lg shadow-md w-80 flex flex-col items-start">
                        <div className="flex justify-between w-full">
                            <p className="text-gray-900 text-md font-semibold">Revenues</p>
                            <button className="text-blue-600 text-sm">Voir l&apos;historique</button>
                        </div>
                        <Image src={revenueChart} alt="Revenues Chart" className="w-full h-40 mt-2" />
                    </div>
                </div>

                <div className="flex flex-col items-center gap-4">
                    {/* Revenues */}
                    <div className="bg-white p-4 rounded-lg shadow-md w-64 flex items-center justify-between">
                        <div>
                            <p className="text-gray-500 text-sm">Revenues</p>
                            <div className="text-xl font-semibold">89000 €</div>
                            <p className="text-red-500 text-sm flex items-center">
                                <span className="mr-1">▼</span> 4.3% Depuis hier
                            </p>
                            <button className="mt-2 text-blue-600 bg-blue-100 px-3 py-1 rounded-md text-sm">
                                Voir l&apos;historique
                            </button>
                        </div>
                        <Image src={revenueIcone} alt="Revenues Icone" className="w-10 h-10" />
                    </div>
                </div>

                <div className="flex flex-col items-center gap-4">
                    {/* Dépenses */}
                    <div className="bg-white p-4 rounded-lg shadow-md w-64 flex items-center justify-between">
                        <div>
                            <p className="text-gray-500 text-sm">Dépenses</p>
                            <div className="text-xl font-semibold">89000 €</div>
                            <p className="text-red-500 text-sm flex items-center">
                                <span className="mr-1">▼</span> 4.3% Depuis hier
                            </p>
                            <button className="mt-2 text-blue-600 bg-blue-100 px-3 py-1 rounded-md text-sm">
                                Voir l&apos;historique
                            </button>
                        </div>
                        <Image src={depenseIcone} alt="Dépenses Icone" className="w-10 h-10" />
                    </div>
                </div>

                <div className="flex flex-col items-center gap-4">
                    {/* Bénéfice */}
                    <div className="bg-white p-4 rounded-lg shadow-md w-64 flex items-center justify-between">
                        <div>
                            <p className="text-gray-500 text-sm">Bénéfices</p>
                            <div className="text-xl font-semibold">+0 €</div>
                            <p className="text-red-500 text-sm flex items-center">
                                <span className="mr-1">▼</span> 4.3% Depuis hier
                            </p>
                            <button className="mt-2 text-blue-600 bg-blue-100 px-3 py-1 rounded-md text-sm">
                                Voir l&apos;historique
                            </button>
                        </div>
                        <Image src={profitIcone} alt="Profit Icone" className="w-213 h-10" />
                    </div>
                    {/* Pire vente */}
                    <div className="bg-white p-4 rounded-lg shadow-md w-64 flex flex-col items-center">
                        <div>
                        <Image src={pireIcone} alt="Pire vente icone" className="w-213 h-156" />
                        <p className="text-gray-500 text-sm mt-2 font-semibold">Pire vente</p>
                            <div className="text-md font-semibold">Frontpro : 3 comprimés anti-infection</div>
                        </div>
                    </div>
                    {/* Nombre de client Chart */}
                    <div className="bg-white p-4 rounded-lg shadow-md w-80 flex flex-col items-start">
                        <p className="text-gray-900 text-md font-semibold">Nombre de client</p>
                        <Image src={clientChart} alt="Nombre de client Chart" className="w-full h-40 mt-2" />
                    </div>
                </div>
            </div>
        </main>
    );
}

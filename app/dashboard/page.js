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
        <main className="p-6 xl:p-10 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Tableau de bord</h1>

            {/* Statistiques principales */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                <StatCard
                    title="Nombres de clients aujourd'hui"
                    value="21"
                    variation="+8.5% Depuis hier"
                    positive
                    icon={clientsIcone}
                />
                <StatCard
                    title="Dépenses"
                    value="89000 €"
                    variation="-4.3% Depuis hier"
                    icon={depenseIcone}
                />
                <StatCard
                    title="Revenues"
                    value="89000 €"
                    variation="-4.3% Depuis hier"
                    icon={revenueIcone}
                />
                <StatCard
                    title="Bénéfices"
                    value="+0 €"
                    variation="-4.3% Depuis hier"
                    icon={profitIcone}
                />
            </div>

            {/* Ligne ventes + graphiques */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-10">
                <ProductCard
                    title="Meilleure vente"
                    product="Dalféine 500mg"
                    image={meilleurIcone}
                />
                <ProductCard
                    title="Pire vente"
                    product="Frontpro : 3 comprimés anti-infection"
                    image={pireIcone}
                />
                <ChartCard
                    title="Revenues"
                    image={revenueChart}
                />
                <ChartCard
                    title="Nombre de client"
                    image={clientChart}
                />
            </div>
        </main>
    );
}

function StatCard({ title, value, variation, positive = false, icon }) {
    return (
        <div className="bg-white rounded-xl shadow-md p-5 flex justify-between items-start">
            <div>
                <p className="text-sm text-gray-500 mb-1">{title}</p>
                <p className="text-xl font-bold text-gray-800">{value}</p>
                <p className={`text-sm mt-1 ${positive ? 'text-green-500' : 'text-red-500'}`}>
                    {positive ? '▲' : '▼'} {variation}
                </p>
                <button className="mt-2 text-blue-600 bg-blue-100 px-3 py-1 rounded-md text-sm">
                    Voir l'historique
                </button>
            </div>
            <Image src={icon} alt="icon" className="w-10 h-10" />
        </div>
    );
}

function ProductCard({ title, product, image }) {
    return (
        <div className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center text-center">
            <Image src={image} alt={title} className="w-full h-40 object-contain" />
            <p className="text-sm text-gray-500 mt-3 font-semibold">{title}</p>
            <p className="text-md font-medium text-gray-800 mt-1">{product}</p>
        </div>
    );
}

function ChartCard({ title, image }) {
    return (
        <div className="bg-white rounded-xl shadow-md p-5 flex flex-col justify-between">
            <div className="flex justify-between items-center mb-3">
                <p className="text-md font-semibold text-gray-800">{title}</p>
                <button className="text-blue-600 text-sm">Voir l'historique</button>
            </div>
            <Image src={image} alt={`${title} Chart`} className="w-full h-40 object-contain" />
        </div>
    );
}

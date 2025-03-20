"use client";

import { useState } from "react";
import Link from "next/link";
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
    <main className="p-28 h-screen">
      <h1 className="text-3xl font-bold">Tableau de bord</h1>
      <div className="grid grid-cols-4 h-full">
        <div className="grid grid-rows-2">
          <div className="bg-white rounded-lg p-4 w-[80%] h-[80%]">
            <div className="grid grid-cols-3">
              <p className="col-span-2">Nombre de clients aujourd'hui :</p>
              <Image
                className="w-2/4"
                src={clientsIcone}
                alt="Picture of the author"
              />
            </div>

            <p className="text-3xl">21</p>
            <span className="text-green-500">▲ 8.5 %</span>
            <span> depuis hier</span>
            <div className="mt-2">
              <Link
                className="bg-blue-200 p-2 rounded-lg text-blue-600"
                href="/frequentation"
              >
                Voir l'historique
              </Link>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 w-[80%]">
            <p>Fréquentation dans la temps :</p>
            <Image className="" src={clientChart} alt="Picture of the author" />
          </div>
        </div>
        <div className="grid grid-rows-2">
          <div className="bg-white rounded-lg p-4 w-[80%] h-[80%]">
            <div className="grid grid-cols-3">
              <p className="col-span-2">Dépenses :</p>
              <Image
                className="w-2/4"
                src={depenseIcone}
                alt="Picture of the author"
              />
            </div>

            <p className="text-3xl">89000 €</p>
            <span className="text-red-500">▼ 4.3%</span>
            <span> depuis hier</span>
            <div className="mt-2">
              <Link
                className="bg-blue-200 p-2 rounded-lg text-blue-600"
                href="/depenses"
              >
                Voir l'historique
              </Link>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 w-[80%]">
            <p>Revenus dans le temps :</p>
            <Image
              className=""
              src={revenueChart}
              alt="Picture of the author"
            />
          </div>
        </div>
        <div className="grid grid-rows-2">
          <div className="bg-white rounded-lg p-4 w-[80%] h-[80%]">
            <div className="grid grid-cols-3">
              <p className="col-span-2">Revenus :</p>
              <Image
                className="w-2/4"
                src={revenueIcone}
                alt="Picture of the author"
              />
            </div>

            <p className="text-3xl">89000 €</p>
            <span className="text-red-500">▼ 4.3%</span>
            <span> depuis hier</span>
            <div className="mt-2">
              <Link
                className="bg-blue-200 p-2 rounded-lg text-blue-600"
                href="/revenus"
              >
                Voir l'historique
              </Link>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 w-[80%] h-[80%]">
            <p className="col-span-2">Meilleurs vente :</p>
            <Image
              className=""
              src={meilleurIcone}
              alt="Picture of the author"
            />
          </div>
        </div>
        <div className="grid grid-rows-2">
          <div className="bg-white rounded-lg p-4 w-[80%] h-[80%]">
            <div className="grid grid-cols-3">
              <p className="col-span-2">Bénéfices :</p>
              <Image
                className="w-2/4"
                src={profitIcone}
                alt="Picture of the author"
              />
            </div>

            <p className="text-3xl">+ 0</p>
            <span className="text-red-500">▼ 4.3 %</span>
            <span> depuis hier</span>
            <div className="mt-2">
              <Link
                className="bg-blue-200 p-2 rounded-lg text-blue-600"
                href="/benefices"
              >
                Voir l'historique
              </Link>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 w-[80%] h-[80%]">
            <p className="col-span-2">Pire vente :</p>
            <Image
              className=""
              src={pireIcone}
              alt="Picture of the author"
            />
          </div>
        </div>
      </div>
    </main>
  );
}

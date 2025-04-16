"use client";

import { useEffect } from "react";
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
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.gstatic.com/charts/loader.js";
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      google.charts.load("current", { packages: ["corechart"] });
      google.charts.setOnLoadCallback(drawCharts);
    };

    function drawCharts() {
      drawLineChart();
      drawAreaChart();
    }

    function drawLineChart() {
      var data = google.visualization.arrayToDataTable([
        ["Jour", "Indice de rentabilité"],
        ["01/01", 1],
        ["02/01", 1.05],
        ["03/01", 1],
        ["04/01", 0.95],
        ["05/01", 1],
      ]);

      var options = {
        title: "Economie de la clinique",
        curveType: "function",
        legend: { position: "bottom" },
      };

      var chart = new google.visualization.LineChart(
        document.getElementById("curve_chart")
      );
      chart.draw(data, options);
    }

    function drawAreaChart() {
      var data = google.visualization.arrayToDataTable([
        ["Date", "Passage"],
        ["01/2025", 47],
        ["02/2025", 24],
        ["03/2025", 30],
        ["04/2025", 45],
        ["05/2025", 40],
      ]);

      var options = {
        title: "Passage journalier",
        hAxis: { title: "", titleTextStyle: { color: "#333" } },
        vAxis: { minValue: 0 },
      };

      var chart = new google.visualization.AreaChart(
        document.getElementById("chart_div")
      );
      chart.draw(data, options);
    }
  }, []);

  return (
    <main className="p-6 xl:p-10 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Tableau de bord</h1>

      {/* Statistiques principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard
          title="Nombres de clients aujourd'hui"
          value="40"
          variation="-8.5% Depuis hier"
          negative
          icon={clientsIcone}
        />
        <StatCard
          title="Dépenses"
          value="4050 €"
          variation="+5% Depuis hier"
          icon={depenseIcone}
        />
        <StatCard
          title="Revenues"
          value="4050 €"
          variation="+5% Depuis hier"
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
        <div
          id="curve_chart"
          className="bg-white rounded-xl shadow-md"
          style={{ width: "auto", height: "250px" }}
        ></div>
        <div
          id="chart_div"
          className="bg-white rounded-xl shadow-md"
          style={{ width: "auto", height: "250px" }}
        ></div>
      </div>

      {/* Google Charts */}
      <div id="chart_div" style={{ width: "100%", height: "500px" }}></div>
    </main>
  );
}

function StatCard({ title, value, variation, positive = false, icon }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-5 flex justify-between items-start">
      <div>
        <p className="text-sm text-gray-500 mb-1">{title}</p>
        <p className="text-xl font-bold text-gray-800">{value}</p>
        <p
          className={`text-sm mt-1 ${
            positive ? "text-green-500" : "text-red-500"
          }`}
        >
          {positive ? "▲" : "▼"} {variation}
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

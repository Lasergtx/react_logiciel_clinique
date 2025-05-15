"use client";

import { useEffect, useState } from "react";
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
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [role, setRole] = useState(null);

  useEffect(() => {
    const userRole = sessionStorage.getItem("userRole");
    setRole(userRole);
  }, []);

  const assistantAppointments = [
    { id: 1, nom: "VOULZY Laurent", animal: "Jeanne", date: "2025-02-21", heure: "09:00", type: "Consultation", description: "Contrôle annuel de routine." },
    { id: 2, nom: "PERMAN OVE Jean", animal: "Kenny", date: "2025-02-21", heure: "10:30", type: "Soin", description: "Traitement contre les puces." },
    { id: 3, nom: "PAYET Dimitri", animal: "Pasok", date: "2025-04-21", heure: "11:00", type: "Vaccination", description: "Vaccination contre la rage." },
    { id: 4, nom: "BARAGOU TOU Tripathy", animal: "Caramel", date: "2025-04-04", heure: "13:30", type: "Opération", description: "Castration planifiée." },
    { id: 5, nom: "MAURICE Jean", animal: "Claudio", date: "2025-04-03", heure: "15:45", type: "Soin", description: "Problème digestif à surveiller." },
    { id: 6, nom: "BELMADI Djamel", animal: "Ryad", date: "2025-04-03", heure: "09:30", type: "Consultation", description: "Suivi après traitement." },
    { id: 7, nom: "MAURICE Florent", animal: "Claudio", date: "2025-04-03", heure: "11:00", type: "Vaccination", description: "Rappel de vaccin annuel." }
  ];

  const veterinarianAppointments = [
    { id: 1, nom: "VOULZY Laurent", animal: "Jeanne", date: "2025-02-21", heure: "09:00", type: "Consultation", description: "Contrôle annuel de routine." },
    { id: 2, nom: "PERMAN OVE Jean", animal: "Kenny", date: "2025-02-21", heure: "10:30", type: "Soin", description: "Traitement contre les puces." },
    { id: 3, nom: "PAYET Dimitri", animal: "Pasok", date: "2025-04-21", heure: "11:00", type: "Vaccination", description: "Vaccination contre la rage." },
    { id: 4, nom: "BARAGOU TOU Tripathy", animal: "Caramel", date: "2025-04-04", heure: "13:30", type: "Opération", description: "Castration planifiée." },
    { id: 5, nom: "MAURICE Jean", animal: "Claudio", date: "2025-04-03", heure: "15:45", type: "Soin", description: "Problème digestif à surveiller." },
    { id: 6, nom: "BELMADI Djamel", animal: "Ryad", date: "2025-04-03", heure: "09:30", type: "Consultation", description: "Suivi après traitement." },
    { id: 7, nom: "MAURICE Florent", animal: "Claudio", date: "2025-04-03", heure: "11:00", type: "Vaccination", description: "Rappel de vaccin annuel." }
  ];

  return (
    <main className="p-6 xl:p-10 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Tableau de bord</h1>

      {role === "DIRECTEUR" && (
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-4">Dashboard Directeur</h2>
          <DirectorDashboard />
        </section>
      )}

      {role === "VETERINAIRE" && (
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-4">Dashboard Vétérinaire</h2>
          <VeterinarianDashboard appointments={veterinarianAppointments} />
        </section>
      )}

      {role === "ASSISTANT" && (
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-4">Dashboard Assistant</h2>
          <AssistantDashboard appointments={assistantAppointments} />
        </section>
      )}
    </main>
  );
}

function DirectorDashboard() {
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
    <main className="p-6 xl:p-10 bg-gray-50 min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Tableau de bord</h1>

      {/* Statistiques principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
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

function VeterinarianDashboard({ appointments }) {
  const [groupedAppointments, setGroupedAppointments] = useState({});

  useEffect(() => {
    const now = new Date();
    const upcoming = appointments.filter(app => {
      const appDate = new Date(`${app.date}T${app.heure}`);
      return appDate > now;
    }).sort((a, b) => new Date(`${a.date}T${a.heure}`) - new Date(`${b.date}T${b.heure}`));

    const groups = {};
    for (const app of upcoming) {
      const date = new Date(app.date);
      const today = new Date();
      const tomorrow = new Date();
      const afterTomorrow = new Date();
      tomorrow.setDate(today.getDate() + 1);
      afterTomorrow.setDate(today.getDate() + 2);

      let key = app.date;
      if (date.toDateString() === today.toDateString()) key = "Aujourd'hui";
      else if (date.toDateString() === tomorrow.toDateString()) key = "Demain";
      else if (date.toDateString() === afterTomorrow.toDateString()) key = "Après-demain";

      if (!groups[key]) groups[key] = [];
      groups[key].push(app);
    }
    setGroupedAppointments(groups);
  }, [appointments]);

  return (
    <>
      <main className="flex flex-col lg:flex-row gap-8 p-10">
        {/* Tableau des patients à venir */}
        <div className="flex-1">
          <h2 className="text-xl font-semibold mb-4">Patients à venir :</h2>
          <table className="w-full bg-white rounded-lg shadow overflow-hidden text-sm">
            <thead className="bg-gray-100">
              <tr className="text-left">
                <th className="p-3">Nom et prénom</th>
                <th className="p-3">Animal</th>
                <th className="p-3">Date</th>
                <th className="p-3">Heure</th>
                <th className="p-3">Type</th>
                <th className="p-3"></th>
              </tr>
            </thead>
            <tbody>
              {appointments.map(app => (
                <tr key={app.id} className="border-t">
                  <td className="p-3">{app.nom}</td>
                  <td className="p-3">{app.animal}</td>
                  <td className="p-3">{app.date}</td>
                  <td className="p-3">{app.heure}</td>
                  <td className="p-3">{app.type}</td>
                  <td className="p-3">
                    <button className="text-green-600 bg-green-100 px-3 py-1 rounded text-xs">Détail</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="w-full flex justify-center mt-6">
            <button className="text-white bg-[#7D8AA7] px-5 py-2 rounded-full text-sm font-medium shadow">Voir la liste des Rendez-vous</button>
          </div>
        </div>

        {/* Bloc des 3 prochains RDV */}
        <div className="w-full lg:w-1/3">
          <h3 className="text-lg font-semibold mb-4">Les prochaines rendez-vous</h3>
          {
            (() => {
              const now = new Date();
              const upcoming = appointments
                .filter(app => new Date(`${app.date}T${app.heure}`) > now)
                .sort((a, b) => new Date(`${a.date}T${a.heure}`) - new Date(`${b.date}T${b.heure}`))
                .slice(0, 3);

              const grouped = {};
              const today = new Date();
              const tomorrow = new Date();
              const afterTomorrow = new Date();
              tomorrow.setDate(today.getDate() + 1);
              afterTomorrow.setDate(today.getDate() + 2);

              for (const app of upcoming) {
                const appDate = new Date(`${app.date}T${app.heure}`);
                let key = app.date;
                if (appDate.toDateString() === today.toDateString()) key = "Aujourd’hui";
                else if (appDate.toDateString() === tomorrow.toDateString()) key = "Demain";
                else if (appDate.toDateString() === afterTomorrow.toDateString()) key = "Après-demain";
                else key = app.date;

                if (!grouped[key]) grouped[key] = [];
                grouped[key].push(app);
              }

              return Object.entries(grouped).map(([label, apps], idx) => (
                <div key={idx} className="mb-4">
                  <h4 className="text-md font-bold text-gray-800 mb-2">{label}</h4>
                  {apps.map((app, i) => (
                    <div key={i} className="bg-white p-4 rounded-lg shadow-md mb-3 border border-gray-100">
                      <p className="font-bold text-sm text-gray-800">{app.nom}</p>
                      <p className="text-xs text-gray-600 mb-1">Pour {app.animal}</p>
                      <hr className="my-2 border-gray-300" />
                      <p className="text-xs text-gray-500">{app.description}</p>
                      <p className="text-sm font-semibold text-gray-700 mt-2">{app.date} à {app.heure}</p>
                    </div>
                  ))}
                </div>
              ));
            })()
          }
        </div>
      </main>
    </>
  );
}

function AssistantDashboard({ appointments }) {
  const [groupedAppointments, setGroupedAppointments] = useState({});

  useEffect(() => {
    const now = new Date();
    const upcoming = appointments.filter(app => {
      const appDate = new Date(`${app.date}T${app.heure}`);
      return appDate > now;
    }).sort((a, b) => new Date(`${a.date}T${a.heure}`) - new Date(`${b.date}T${b.heure}`));

    const groups = {};
    for (const app of upcoming) {
      const date = new Date(app.date);
      const today = new Date();
      const tomorrow = new Date();
      const afterTomorrow = new Date();
      tomorrow.setDate(today.getDate() + 1);
      afterTomorrow.setDate(today.getDate() + 2);

      let key = app.date;
      if (date.toDateString() === today.toDateString()) key = "Aujourd'hui";
      else if (date.toDateString() === tomorrow.toDateString()) key = "Demain";
      else if (date.toDateString() === afterTomorrow.toDateString()) key = "Après-demain";

      if (!groups[key]) groups[key] = [];
      groups[key].push(app);
    }
    setGroupedAppointments(groups);
  }, [appointments]);

  return (
    <>
      <main className="flex flex-col lg:flex-row gap-8 p-10">
        {/* Tableau des patients à venir */}
        <div className="flex-1">
          <h2 className="text-xl font-semibold mb-4">Patients à venir :</h2>
          <table className="w-full bg-white rounded-lg shadow overflow-hidden text-sm">
            <thead className="bg-gray-100">
              <tr className="text-left">
                <th className="p-3">Nom et prénom</th>
                <th className="p-3">Animal</th>
                <th className="p-3">Date</th>
                <th className="p-3">Heure</th>
                <th className="p-3">Type</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map(app => (
                <tr key={app.id} className="border-t">
                  <td className="p-3">{app.nom}</td>
                  <td className="p-3">{app.animal}</td>
                  <td className="p-3">{app.date}</td>
                  <td className="p-3">{app.heure}</td>
                  <td className="p-3">{app.type}</td>
                  <td className="p-3 space-x-2">
                    <button className="text-green-600 bg-green-100 px-3 py-1 rounded text-xs">
                      Détail
                    </button>
                    <button className="text-orange-600 bg-orange-100 px-3 py-1 rounded text-xs">
                      Modifier
                    </button>
                    <button className="text-red-600 bg-red-100 px-3 py-1 rounded text-xs">
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="w-full flex justify-center mt-6">
            <button className="text-white bg-[#7D8AA7] px-5 py-2 rounded-full text-sm font-medium shadow">
              Voir la liste des Rendez-vous
            </button>
          </div>
        </div>

        {/* Bloc des 3 prochains RDV */}
        <div className="w-full lg:w-1/3">
          <h3 className="text-lg font-semibold mb-4">Les prochaines rendez-vous</h3>
          {
            (() => {
              const now = new Date();
              const upcoming = appointments
                .filter(app => new Date(`${app.date}T${app.heure}`) > now)
                .sort((a, b) => new Date(`${a.date}T${a.heure}`) - new Date(`${b.date}T${b.heure}`))
                .slice(0, 3);

              const grouped = {};
              const today = new Date();
              const tomorrow = new Date();
              const afterTomorrow = new Date();
              tomorrow.setDate(today.getDate() + 1);
              afterTomorrow.setDate(today.getDate() + 2);

              for (const app of upcoming) {
                const appDate = new Date(`${app.date}T${app.heure}`);
                let key = app.date;
                if (appDate.toDateString() === today.toDateString()) key = "Aujourd’hui";
                else if (appDate.toDateString() === tomorrow.toDateString()) key = "Demain";
                else if (appDate.toDateString() === afterTomorrow.toDateString()) key = "Après-demain";
                else key = app.date;

                if (!grouped[key]) grouped[key] = [];
                grouped[key].push(app);
              }

              return Object.entries(grouped).map(([label, apps], idx) => (
                <div key={idx} className="mb-4">
                  <h4 className="text-md font-bold text-gray-800 mb-2">{label}</h4>
                  {apps.map((app, i) => (
                    <div key={i} className="bg-white p-4 rounded-lg shadow-md mb-3 border border-gray-100">
                      <p className="font-bold text-sm text-gray-800">{app.nom}</p>
                      <p className="text-xs text-gray-600 mb-1">Pour {app.animal}</p>
                      <hr className="my-2 border-gray-300" />
                      <p className="text-xs text-gray-500">{app.description}</p>
                      <p className="text-sm font-semibold text-gray-700 mt-2">{app.date} à {app.heure}</p>
                    </div>
                  ))}
                </div>
              ));
            })()
          }
        </div>
      </main>
    </>
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
        <Link href="/frequentation">
          <button className="mt-2 text-blue-600 bg-blue-100 px-3 py-1 rounded-md text-sm hover:bg-blue-200 transition">
            Voir l&apos;historique
          </button>
        </Link>
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

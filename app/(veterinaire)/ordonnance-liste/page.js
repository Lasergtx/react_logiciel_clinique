"use client"; // Directive pour indiquer que ce code doit être exécuté côté client

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import jsPDF from "jspdf";

const logoPath = "/images/logo_avec_titre.png";

export default function Ordonnances() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [prescriptionsData, setPrescriptionsData] = useState([]);
  const modalRef = useRef(null);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/prescriptions", { cache: 'no-store' });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setPrescriptionsData(data.result);
      } catch (error) {
        console.error("Erreur lors de la récupération des ordonnances :", error);
      }
    };

    fetchPrescriptions();
  }, []);

  const openModal = (prescription) => {
    setSelectedPrescription(prescription);
    setShowModal(true);
  };

  const handleDownloadPDF = (prescription) => {
    const { patient, type, initialdate, executiondate, status } = prescription;
    const doc = new jsPDF();
    const img = new Image();
    img.src = "/images/logo_avec_titre.png";
    const aspectRatio = 536 / 236;
    const logoWidth = 50;
    const logoHeight = logoWidth / aspectRatio;

    img.onload = () => {
      doc.addImage(img, "PNG", 15, 10, logoWidth, logoHeight);
      doc.setFontSize(22);
      doc.setTextColor("#333");
      doc.text("ORDONNANCE", 105, 20, { align: "center" });

      doc.setFontSize(14);
      doc.setTextColor("#555");
      doc.text(`Patient: ${patient || ''}`, 20, 50);
      doc.text(`Type: ${type || ''}`, 20, 60);
      doc.text(`Date initiale: ${initialdate || ''}`, 20, 70);
      doc.text(`Date d'exécution: ${executiondate || ''}`, 20, 80);
      doc.text(`Statut: ${status || ''}`, 20, 90);
      doc.line(20, 95, 190, 95);

      doc.save(`ordonnance_${prescription.id}.pdf`);
    };
  };

  const closeModal = () => {
    setClosing(true);
    setTimeout(() => {
      setShowModal(false);
      setSelectedPrescription(null);
      setClosing(false);
    }, 200);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        closeModal();
      }
    };
    if (showModal) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showModal]);

  return (
    <main className="p-10">
      <h1 className="text-2xl font-semibold mb-6">Ordonnances :</h1>

      <div className="flex justify-between mb-4">
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Rechercher un patient..."
            className="border p-2 rounded"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <input
            type="date"
            className="border p-2 rounded"
            onChange={(e) => setDateFilter(e.target.value)}
          />
        </div>
        <button
          onClick={() => router.push("ordonnance-creation")}
          className="bg-blue-600 text-white px-4 py-2 rounded text-sm shadow hover:bg-blue-700 transition"
        >
          + Créer une nouvelle ordonnance
        </button>
      </div>

      <table className="w-full text-sm text-left bg-white rounded shadow">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2">ID</th>
            <th className="p-2">Patient</th>
            <th className="p-2">Type</th>
            <th className="p-2">Date initiale</th>
            <th className="p-2">Date d&apos;exécution</th>
            <th className="p-2">Statut</th>
            <th className="p-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {prescriptionsData
            .filter((prescription) =>
              (prescription.patient || '').toLowerCase().includes(searchTerm.toLowerCase()) &&
              (dateFilter ? (prescription.initialdate || '').startsWith(dateFilter) : true)
            )
            .map((prescription) => (
              <tr key={prescription.id} className="border-t">
                <td className="p-2">{prescription.id}</td>
                <td className="p-2">{prescription.patient || ''}</td>
                <td className="p-2">{prescription.type || ''}</td>
                <td className="p-2">{prescription.initialdate || ''}</td>
                <td className="p-2">{prescription.executiondate || ''}</td>
                <td className="p-2">{prescription.status || ''}</td>
                <td className="p-2 flex gap-2 justify-center">
                  <button onClick={() => openModal(prescription)} className="text-green-600 bg-green-100 px-3 py-1 rounded text-xs">
                    Détail
                  </button>

                  <button className="text-blue-600 bg-blue-100 px-3 py-1 rounded text-xs" onClick={() => handleDownloadPDF(prescription)}>Télécharger</button>
                  <button className="text-red-600 bg-red-100 px-3 py-1 rounded text-xs">Supprimer</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {showModal && selectedPrescription && (
        <div className={`fixed inset-0 backdrop-blur-sm bg-black/50 flex items-center justify-center z-50 ${closing ? 'animate-fadeOut' : 'animate-fadeIn'}`}>
          <div ref={modalRef} className={`bg-white rounded-xl shadow-xl w-full max-w-md p-6 relative ${closing ? 'animate-slideOutDown' : 'animate-slideInUp'}`}>
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-red-600 text-xl"
            >×</button>
            <h2 className="text-xl font-bold mb-4">Détails de l&apos;Ordonnance</h2>
            <p className="mb-2">Patient : {selectedPrescription.patient || ''}</p>
            <p className="mb-2">Type : {selectedPrescription.type || ''}</p>
            <p className="mb-2">Date initiale : {selectedPrescription.initialdate || ''}</p>
            <p className="mb-2">Date d&apos;exécution : {selectedPrescription.executiondate || ''}</p>
            <p className="mb-2">Statut : {selectedPrescription.status || ''}</p>

            <div className="mt-6 text-right">
              <button onClick={closeModal} className="bg-blue-600 text-white px-4 py-2 rounded">
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

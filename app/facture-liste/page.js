"use client"; // a rendre dynamique

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import jsPDF from "jspdf";

const logoPath = "/images/logo_avec_titre.png";
const invoicesData = [
  {
    id: "001",
    date: "2024-01-15",
    patient: "Jean Dupont",
    pharmacien: "Dr. Lefevre",
    produits: [
      { name: "Antibiotique", price: 12.5 },
      { name: "Anti-inflammatoire", price: 8.0 }
    ],
    services: [
      { name: "Consultation", price: 35.0 },
      { name: "Soin rapide", price: 20.0 }
    ]
  },
  {
    id: "002",
    date: "2024-01-18",
    patient: "Marie Martin",
    pharmacien: "Dr. Durand",
    produits: [
      { name: "Vitamines", price: 15.0 },
      { name: "Désinfectant", price: 6.5 }
    ],
    services: [
      { name: "Opération mineure", price: 120.0 }
    ]
  },
  {
    id: "003",
    date: "2024-01-20",
    patient: "Luc Picard",
    pharmacien: "Dr. Dupont",
    produits: [
      { name: "Analgésique", price: 10.0 }
    ],
    services: [
      { name: "Soin de suivi", price: 25.0 }
    ]
  }
];

export default function Factures() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const modalRef = useRef(null);
  const [closing, setClosing] = useState(false);

  const calculateTotal = (produits, services) => {
    const produitsTotal = produits.reduce((acc, p) => acc + p.price, 0);
    const servicesTotal = services.reduce((acc, s) => acc + s.price, 0);
    return produitsTotal + servicesTotal;
  };

  const openModal = (invoice) => {
    setSelectedInvoice(invoice);
    setShowModal(true);
  };

  const handleDownloadPDF = (invoice) => {
    const { patient, pharmacien, date, produits, services } = invoice;
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
      doc.text("FACTURE", 105, 20, { align: "center" });

      doc.setFontSize(14);
      doc.setTextColor("#555");
      doc.text(`Patient: ${patient}`, 20, 50);
      doc.text(`Pharmacien: ${pharmacien}`, 20, 60);
      doc.text(`Date: ${date}`, 20, 70);
      doc.line(20, 75, 190, 75);

      doc.setFontSize(12);
      doc.setTextColor("#000");
      let y = 85;

      doc.text("Produits:", 20, y);
      y += 10;
      produits.forEach((prod, index) => {
        doc.text(`${index + 1}. ${prod.name} - ${prod.price} €`, 20, y);
        y += 10;
      });

      doc.text("Services:", 20, y);
      y += 10;
      services.forEach((serv, index) => {
        doc.text(`${index + 1}. ${serv.name} - ${serv.price} €`, 20, y);
        y += 10;
      });

      doc.setFontSize(14);
      doc.setTextColor("#333");
      doc.text(`Montant total: ${calculateTotal(produits, services)} €`, 20, y + 10);
      doc.text(`Signature : ______________________`, 110, y + 10);

      doc.save(`facture_${invoice.id}.pdf`);
    };
  };

  const closeModal = () => {
    setClosing(true);
    setTimeout(() => {
      setShowModal(false);
      setSelectedInvoice(null);
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
      <h1 className="text-2xl font-semibold mb-6">Factures :</h1>

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
          onClick={() => router.push("facture-creation")}
          className="bg-blue-600 text-white px-4 py-2 rounded text-sm shadow hover:bg-blue-700 transition"
        >
          + Créer une nouvelle facture
        </button>
      </div>

      <table className="w-full text-sm text-left bg-white rounded shadow">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2">ID</th>
            <th className="p-2">Patient</th>
            <th className="p-2">Pharmacien</th>
            <th className="p-2">Date</th>
            <th className="p-2">Total (€)</th>
            <th className="p-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {invoicesData
            .filter((invoice) =>
              invoice.patient.toLowerCase().includes(searchTerm.toLowerCase()) && (dateFilter ? invoice.date.startsWith(dateFilter) : true) &&
              (dateFilter ? invoice.date.startsWith(dateFilter) : true)
            )
            .map((invoice) => (
            <tr key={invoice.id} className="border-t">
              <td className="p-2">{invoice.id}</td>
              <td className="p-2">{invoice.patient}</td>
              <td className="p-2">{invoice.pharmacien}</td>
              <td className="p-2">{invoice.date}</td>
              <td className="p-2">{calculateTotal(invoice.produits, invoice.services)} €</td>
              <td className="p-2 flex gap-2 justify-center">
                <button onClick={() => openModal(invoice)} className="text-green-600 bg-green-100 px-3 py-1 rounded text-xs">
                  Détail
                </button>
                
                <button className="text-blue-600 bg-blue-100 px-3 py-1 rounded text-xs" onClick={() => handleDownloadPDF(invoice)}>Télécharger</button>
                                <button className="text-red-600 bg-red-100 px-3 py-1 rounded text-xs">Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && selectedInvoice && (
        <div className={`fixed inset-0 backdrop-blur-sm bg-black/50 flex items-center justify-center z-50 ${closing ? 'animate-fadeOut' : 'animate-fadeIn'}`}>
          <div ref={modalRef} className={`bg-white rounded-xl shadow-xl w-full max-w-md p-6 relative ${closing ? 'animate-slideOutDown' : 'animate-slideInUp'}`}>
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-red-600 text-xl"
            >×</button>
            <h2 className="text-xl font-bold mb-4">Détails de la Facture</h2>
            <p className="mb-2">Patient : {selectedInvoice.patient}</p>
            <p className="mb-2">Pharmacien : {selectedInvoice.pharmacien}</p>
            <h3 className="mt-4 font-semibold">Produits :</h3>
            {selectedInvoice.produits.map((prod, index) => (
              <p key={index}>{prod.name} - {prod.price} €</p>
            ))}

            <h3 className="mt-4 font-semibold">Services :</h3>
            {selectedInvoice.services.map((serv, index) => (
              <p key={index}>{serv.name} - {serv.price} €</p>
            ))}

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

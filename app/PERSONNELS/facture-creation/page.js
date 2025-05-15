"use client"; // a amérliorer sytylistiquement (uniquement si temps disponible)

import { useState } from "react";
import jsPDF from "jspdf";

const logoPath = "/images/logo_avec_titre.png";

const InvoiceCreator = () => {
    const [owner, setOwner] = useState('MARCHESSE Clément');
    const [medications, setMedications] = useState([{ name: '', price: '' }]);
    const [services, setServices] = useState([{ name: '', price: '' }]);
    const [paymentTimes, setPaymentTimes] = useState('');

    const handleMedicationChange = (index, field, value) => {
      const newMeds = [...medications];
      newMeds[index][field] = value;
      setMedications(newMeds);
    };

    const addMedication = () => {
      setMedications([...medications, { name: '', price: '' }]);
    };

    const removeMedication = (index) => {
      if (medications.length > 0) {
        const newMeds = medications.filter((_, i) => i !== index);
        setMedications(newMeds);
      }
    };

    const handleServiceChange = (index, field, value) => {
      const newServices = [...services];
      newServices[index][field] = value;
      setServices(newServices);
    };

    const addService = () => {
      setServices([...services, { name: '', price: '' }]);
    };

    const removeService = (index) => {
      if (services.length > 0) {
        const newServices = services.filter((_, i) => i !== index);
        setServices(newServices);
      }
    };

    const calculateTotal = () => {
      const medTotal = medications.reduce((acc, m) => acc + Number(m.price || 0), 0);
      const serviceTotal = services.reduce((acc, s) => acc + Number(s.price || 0), 0);
      return medTotal + serviceTotal;
    };

    const handleGenerate = () => {
      const doc = new jsPDF();
      const img = new Image();
      img.src = logoPath;
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
        doc.text(`Propriétaire: ${owner}`, 20, 50);
        doc.line(20, 55, 190, 55);

        doc.setFontSize(12);
        doc.setTextColor("#000");
        doc.text("Produits:", 20, 65);

        let y = 75;
        medications.forEach((med, index) => {
          doc.text(`${index + 1}. ${med.name} - ${med.price} €`, 20, y);
          y += 10;
        });

        doc.text("Services:", 20, y + 10);
        y += 20;
        services.forEach((service, index) => {
          doc.text(`${index + 1}. ${service.name} - ${service.price} €`, 20, y);
          y += 10;
        });

        doc.setFontSize(14);
        doc.setTextColor("#333");
        doc.text(`Montant total: ${calculateTotal()} €`, 20, y + 10);
        doc.text(`Signature : ______________________`, 110, y + 10);

        doc.save("facture.pdf");
      };
    };

    return (
      <div className="p-6 max-w-3xl mx-auto space-y-8">
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Facture</h2>

          <div className="mb-6">
            <label className="font-medium">Propriétaire :</label>
            <input
              type="text"
              className="w-full mt-2 p-2 border rounded-md"
              value={owner}
              onChange={(e) => setOwner(e.target.value)}
            />
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Produits :</h3>
            <div className="space-y-4">
              {medications.map((med, index) => (
                <div key={index} className="flex gap-4 items-center">
                  <input
                    type="text"
                    placeholder="Nom du médicament"
                    className="flex-1 p-2 border rounded-md"
                    value={med.name}
                    onChange={(e) => handleMedicationChange(index, 'name', e.target.value)}
                  />
                  <input
                    type="number"
                    placeholder="Prix"
                    className="w-24 p-2 border rounded-md"
                    value={med.price}
                    onChange={(e) => handleMedicationChange(index, 'price', e.target.value)}
                  />
                </div>
              ))}
<button onClick={addMedication} className="text-blue-600 text-sm font-medium hover:underline">+ Ajouter un médicament</button>
<button onClick={() => removeMedication(medications.length - 1)} className="text-red-600 text-sm font-medium hover:underline">- Enlever un médicament</button>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-medium mb-2">Services :</h3>
            <div className="space-y-4">
              {services.map((service, index) => (
                <div key={index} className="flex gap-4 items-center">
                  <input
                    type="text"
                    placeholder="Nom du service"
                    className="flex-1 p-2 border rounded-md"
                    value={service.name}
                    onChange={(e) => handleServiceChange(index, 'name', e.target.value)}
                  />
                  <input
                    type="number"
                    placeholder="Tarif"
                    className="w-24 p-2 border rounded-md"
                    value={service.price}
                    onChange={(e) => handleServiceChange(index, 'price', e.target.value)}
                  />
                </div>
              ))}
<div className="flex gap-4 mt-2"> </div><button onClick={addService} className="text-blue-600 text-sm font-medium hover:underline">+ Ajouter un service</button>
<button onClick={() => removeService(services.length - 1)} className="text-red-600 text-sm font-medium hover:underline">- Enlever un service</button>
            </div>
          </div>
          <button onClick={handleGenerate} className="mt-6 bg-green-100 text-green-800 font-semibold py-2 px-6 rounded-md hover:bg-green-200">Générer PDF</button>
        </div>
      </div>
    );
};

export default InvoiceCreator;

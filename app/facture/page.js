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

const InvoiceCreator = () => {
    const [owner, setOwner] = useState('MARCHESSE Clément');
    const [medications, setMedications] = useState([{ name: '', price: '' }]);
    const [services, setServices] = useState(['']);
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
      if (medications.length > 1) {
        const newMeds = medications.filter((_, i) => i !== index);
        setMedications(newMeds);
      }
    };
  
    const addService = () => {
      setServices([...services, '']);
    };
  
    const removeService = (index) => {
      if (services.length > 1) {
        const newServices = services.filter((_, i) => i !== index);
        setServices(newServices);
      }
    };
  
    const handleServiceChange = (index, value) => {
      const newServices = [...services];
      newServices[index] = value;
      setServices(newServices);
    };
  
    const calculateTotal = () => {
      const medTotal = medications.reduce((acc, m) => acc + Number(m.price || 0), 0);
      return medTotal; // You can add service prices later if needed
    };
  
    const handleGenerate = () => {
      // Logic for generating PDF here
      alert('PDF généré avec les infos saisies');
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
                  {medications.length > 1 && (
                    <button
                      onClick={() => removeMedication(index)}
                      className="text-red-500 text-sm hover:underline"
                    >
                      Enlever
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={addMedication}
                className="text-blue-600 text-sm font-medium hover:underline"
              >
                + Ajouter un médicament
              </button>
            </div>
  
            <div className="mt-6 space-y-4">
              {services.map((service, index) => (
                <div key={index} className="flex gap-4 items-center">
                  <select
                    className="flex-1 p-2 border rounded-md"
                    value={service}
                    onChange={(e) => handleServiceChange(index, e.target.value)}
                  >
                    <option value="">Nom du service</option>
                    <option value="Consultation">Consultation</option>
                    <option value="Soin">Soin</option>
                    <option value="Chirurgie">Chirurgie</option>
                  </select>
                  {services.length > 1 && (
                    <button
                      onClick={() => removeService(index)}
                      className="text-red-500 text-sm hover:underline"
                    >
                      Enlever
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={addService}
                className="text-blue-600 text-sm font-medium hover:underline"
              >
                + Ajouter un service
              </button>
            </div>
          </div>
  
          <div className="mt-6">
            <p className="text-gray-700 font-medium">Montant total : <span className="font-semibold">{calculateTotal()} €</span></p>
          </div>
  
          <div className="mt-4">
            <label className="font-medium">Règlement en :</label>
            <select
              className="w-full mt-2 p-2 border rounded-md"
              value={paymentTimes}
              onChange={(e) => setPaymentTimes(e.target.value)}
            >
              <option value="">Choisir...</option>
              <option value="1">1 fois</option>
              <option value="2">2 fois</option>
              <option value="3">3 fois</option>
            </select>
          </div>
  
          <button
            onClick={handleGenerate}
            className="mt-6 bg-green-100 text-green-800 font-semibold py-2 px-6 rounded-md hover:bg-green-200"
          >
            Générer
          </button>
        </div>
      </div>
    );
  };
  
  export default InvoiceCreator;

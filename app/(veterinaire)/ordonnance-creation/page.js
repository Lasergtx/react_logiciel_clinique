"use client";

import { useState, useEffect } from "react";
import jsPDF from "jspdf";

const PrescriptionCreator = () => {
  const [clients, setClients] = useState([]);
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [selectedClient, setSelectedClient] = useState('');
  const [selectedPatient, setSelectedPatient] = useState('');
  const [prescriptions, setPrescriptions] = useState([
    { name: '', quantity: '' }
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const clientsResponse = await fetch("http://127.0.0.1:8000/clients", { cache: 'no-store' });
        const patientsResponse = await fetch("http://127.0.0.1:8000/patients", { cache: 'no-store' });

        const clientsData = await clientsResponse.json();
        const patientsData = await patientsResponse.json();

        setClients(clientsData.result);
        setPatients(patientsData.result);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (selectedClient) {
      const client = clients.find(client => `${client.firstname} ${client.lastname}` === selectedClient);
      if (client) {
        const filtered = patients.filter(patient => patient.clientid === client.clientid);
        setFilteredPatients(filtered);
      }
    } else {
      setFilteredPatients([]);
    }
  }, [selectedClient, clients, patients]);

  const handlePrescriptionChange = (index, field, value) => {
    const updated = [...prescriptions];
    updated[index][field] = value;
    setPrescriptions(updated);
  };

  const addPrescription = () => {
    setPrescriptions([...prescriptions, { name: '', quantity: '' }]);
  };

  const removePrescription = (index) => {
    if (prescriptions.length > 1) {
      setPrescriptions(prescriptions.filter((_, i) => i !== index));
    }
  };

  const handleGenerate = async () => {
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
      doc.text(`Propriétaire: ${selectedClient}`, 20, 50);
      doc.text(`Animal: ${selectedPatient}`, 20, 60);
      doc.line(20, 65, 190, 65);

      doc.setFontSize(12);
      doc.setTextColor("#000");
      doc.text("Médicaments:", 20, 75);

      let y = 85;
      prescriptions.forEach((prescription, index) => {
        doc.text(`${index + 1}. ${prescription.name} - Quantité: ${prescription.quantity}`, 20, y);
        y += 10;
      });

      doc.setFontSize(14);
      doc.setTextColor("#333");
      doc.text(`Signature: ______________________`, 20, y + 20);

      doc.save("ordonnance.pdf");
    };

    // Envoyer les données à l'API
    try {
      const patient = patients.find(patient => patient.name === selectedPatient);
      const response = await fetch("http://127.0.0.1:8000/prescriptions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          motive: "Ordonnance pour " + selectedPatient,
          prescriptionlink: "link_to_prescription", // Remplacez par le lien réel si nécessaire
          patientid: patient?.patientid || 1
        })
      });

      if (response.ok) {
        console.log("Ordonnance créée avec succès");
      } else {
        const errorData = await response.json();
        console.error("Erreur lors de la création de l'ordonnance :", errorData.message);
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi des données :", error);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4">Création d&apos;ordonnance</h2>

        <div className="space-y-4">
          <div>
            <label className="font-medium">Propriétaire :</label>
            <select
              className="w-full mt-2 p-2 border rounded-md"
              value={selectedClient}
              onChange={(e) => setSelectedClient(e.target.value)}
              required
            >
              <option value="">Choisir un propriétaire</option>
              {clients.map((client, index) => (
                <option key={index} value={`${client.firstname} ${client.lastname}`}>
                  {client.firstname} {client.lastname}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="font-medium">Animal :</label>
            <select
              className="w-full mt-2 p-2 border rounded-md"
              value={selectedPatient}
              onChange={(e) => setSelectedPatient(e.target.value)}
              required
              disabled={!selectedClient}
            >
              <option value="">Choisir un animal</option>
              {filteredPatients.map((patient, index) => (
                <option key={index} value={patient.name}>
                  {patient.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Détail ordonnance :</h3>
            <div className="space-y-4">
              {prescriptions.map((p, index) => (
                <div key={index} className="flex gap-4 items-center">
                  <input
                    type="text"
                    placeholder="Nom du médicament"
                    className="flex-1 p-2 border rounded-md"
                    value={p.name}
                    onChange={(e) => handlePrescriptionChange(index, 'name', e.target.value)}
                  />
                  <input
                    type="number"
                    placeholder="Quantité"
                    className="w-24 p-2 border rounded-md"
                    value={p.quantity}
                    onChange={(e) => handlePrescriptionChange(index, 'quantity', e.target.value)}
                  />
                  {prescriptions.length > 1 && (
                    <button
                      onClick={() => removePrescription(index)}
                      className="text-red-500 text-sm hover:underline"
                    >
                      Enlever
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={addPrescription}
                className="text-blue-600 text-sm font-medium hover:underline"
              >
                + Ajouter un médicament
              </button>
            </div>
          </div>

          <button
            onClick={handleGenerate}
            className="mt-6 bg-green-100 text-green-800 font-semibold py-2 px-6 rounded-md hover:bg-green-200"
          >
            Générer PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrescriptionCreator;

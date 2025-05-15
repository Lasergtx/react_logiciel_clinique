"use client"; // a faire dynamiquement + avec jspdf comme avec les factures

import { useState } from "react";


const PrescriptionCreator = () => {
  const [owner, setOwner] = useState('');
  const [animal, setAnimal] = useState('');
  const [prescriptions, setPrescriptions] = useState([
    { name: '', quantity: '' }
  ]);

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

  const handleGenerate = () => {
    // Logique PDF ici
    alert('Ordonnance générée');
  };

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4">Création d&apos;ordonnance</h2>

        <div className="space-y-4">
          <div>
            <label className="font-medium">Propriétaire :</label>
            <input
              type="text"
              placeholder="Nom du client"
              className="w-full mt-2 p-2 border rounded-md"
              value={owner}
              onChange={(e) => setOwner(e.target.value)}
            />
          </div>

          <div>
            <label className="font-medium">Animal :</label>
            <select
              className="w-full mt-2 p-2 border rounded-md"
              value={animal}
              onChange={(e) => setAnimal(e.target.value)}
            >
              <option value="">Choisir un animal</option>
              <option value="Drizzy">Drizzy</option>
              <option value="Tigrou">Tigrou</option>
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
                    placeholder="Nombre"
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
            Générer
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrescriptionCreator;

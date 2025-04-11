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

const AppointmentCreator = () => {
    const [owner, setOwner] = useState('');
    const [animal, setAnimal] = useState('');
    const [type, setType] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [vet, setVet] = useState('');
    const [description, setDescription] = useState('');
  
    const handleSubmit = () => {
      // Logique d'enregistrement du rendez-vous ici
      alert('Rendez-vous créé avec succès');
    };
  
    return (
      <div className="p-6 max-w-2xl mx-auto space-y-6">
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Créer un rendez-vous</h2>
  
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
              <h3 className="text-lg font-medium">Détail rendez-vous :</h3>
              <div className="space-y-4 mt-2">
                <div>
                  <label className="font-medium">Type :</label>
                  <select
                    className="w-full mt-2 p-2 border rounded-md"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                  >
                    <option value="">Choisir un type</option>
                    <option value="Consultation">Consultation</option>
                    <option value="Vaccin">Vaccin</option>
                    <option value="Soin">Soin</option>
                  </select>
                </div>
  
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="font-medium">Date :</label>
                    <input
                      type="date"
                      className="w-full mt-2 p-2 border rounded-md"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </div>
                  <div className="flex-1">
                    <label className="font-medium">Heure :</label>
                    <input
                      type="time"
                      className="w-full mt-2 p-2 border rounded-md"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                    />
                  </div>
                </div>
  
                <div>
                  <label className="font-medium">Nom vétérinaire :</label>
                  <select
                    className="w-full mt-2 p-2 border rounded-md"
                    value={vet}
                    onChange={(e) => setVet(e.target.value)}
                  >
                    <option value="">Choisir un vétérinaire</option>
                    <option value="Dr. Martin">Dr. Martin</option>
                    <option value="Dr. Lefèvre">Dr. Lefèvre</option>
                  </select>
                </div>
  
                <div>
                  <label className="font-medium">Description :</label>
                  <textarea
                    className="w-full mt-2 p-2 border rounded-md"
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>
              </div>
            </div>
  
            <button
              onClick={handleSubmit}
              className="mt-4 bg-green-100 text-green-800 font-semibold py-2 px-6 rounded-md hover:bg-green-200"
            >
              Valider
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default AppointmentCreator;
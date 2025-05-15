"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const AppointmentCreator = () => {
    const router = useRouter();
    const [clients, setClients] = useState([]);
    const [patients, setPatients] = useState([]);
    const [vets, setVets] = useState([]);
    const [selectedClient, setSelectedClient] = useState('');
    const [selectedPatient, setSelectedPatient] = useState('');
    const [type, setType] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [selectedVet, setSelectedVet] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const clientsResponse = await fetch("http://127.0.0.1:8000/clients", { cache: 'no-store' });
                const patientsResponse = await fetch("http://127.0.0.1:8000/patients", { cache: 'no-store' });
                const vetsResponse = await fetch("http://127.0.0.1:8000/users", { cache: 'no-store' });

                const clientsData = await clientsResponse.json();
                const patientsData = await patientsResponse.json();
                const vetsData = await vetsResponse.json();

                setClients(clientsData.result);
                setPatients(patientsData.result);
                setVets(vetsData.result.filter(user => user.role === "VETERINAIRE"));
            } catch (error) {
                console.error("Erreur lors de la récupération des données :", error);
            }
        };

        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://127.0.0.1:8000/events", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title: `Rendez-vous pour ${selectedPatient}`,
                    description: description,
                    type: type,
                    eventdate: date,
                    starthour: time,
                    endhour: time,
                    status: "AVENIR",
                    userid: vets.find(vet => vet.username === selectedVet)?.userid || 1,
                    clientid: clients.find(client => `${client.firstname} ${client.lastname}` === selectedClient)?.clientid || 1,
                    patientid: patients.find(patient => patient.name === selectedPatient)?.patientid || 1
                })
            });

            if (response.ok) {
                console.log("Rendez-vous créé avec succès");
                router.push("/rendezvous");
            } else {
                const errorData = await response.json();
                console.error("Erreur lors de la création du rendez-vous :", errorData.message);
            }
        } catch (error) {
            console.error("Erreur lors de l'envoi des données :", error);
        }
    };

    return (
      <div className="p-6 max-w-2xl mx-auto space-y-6">
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Créer un rendez-vous</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
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
              >
                <option value="">Choisir un animal</option>
                {patients.map((patient, index) => (
                  <option key={index} value={patient.name}>
                    {patient.name}
                  </option>
                ))}
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
                    required
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
                      required
                    />
                  </div>
                  <div className="flex-1">
                    <label className="font-medium">Heure :</label>
                    <input
                      type="time"
                      className="w-full mt-2 p-2 border rounded-md"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="font-medium">Nom vétérinaire :</label>
                  <select
                    className="w-full mt-2 p-2 border rounded-md"
                    value={selectedVet}
                    onChange={(e) => setSelectedVet(e.target.value)}
                    required
                  >
                    <option value="">Choisir un vétérinaire</option>
                    {vets.map((vet, index) => (
                      <option key={index} value={vet.username}>
                        {vet.username}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-medium">Description :</label>
                  <textarea
                    className="w-full mt-2 p-2 border rounded-md"
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  ></textarea>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="mt-4 bg-green-100 text-green-800 font-semibold py-2 px-6 rounded-md hover:bg-green-200"
            >
              Valider
            </button>
          </form>
        </div>
      </div>
    );
  };

  export default AppointmentCreator;

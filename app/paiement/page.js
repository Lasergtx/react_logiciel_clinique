import React from 'react'; // je sais pas ce qu'il fout la sah, a voir

const PaymentDetails = () => {
  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
      {/* Propriétaire + Animal */}
      <div className="bg-white rounded-2xl shadow-md p-6 space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">Propriétaire</h2>
          <div className="space-y-2 text-gray-700">
            <p><strong>Nom :</strong> MARCHESSE</p>
            <p><strong>Prénom :</strong> Clément</p>
            <p><strong>Genre :</strong> Autre</p>
            <p><strong>Téléphone :</strong> 07 78 55 40 99</p>
          </div>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Animal</h2>
          <div className="space-y-2 text-gray-700">
            <p><strong>Prénom :</strong> DRIZZY</p>
            <p><strong>Date de naissance :</strong> 21/08/2018</p>
            <p><strong>Sexe :</strong> Mâle</p>
          </div>
        </div>
      </div>

      {/* Détails du rendez-vous */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Détails du rendez-vous</h2>
        <div className="space-y-2 text-gray-700">
          <p><strong>Type :</strong> 3x</p>
          <p><strong>Date :</strong> 27/01/2024</p>
          <p><strong>Tarif :</strong> 125€</p>
          <p><strong>Type :</strong> Soin</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetails;

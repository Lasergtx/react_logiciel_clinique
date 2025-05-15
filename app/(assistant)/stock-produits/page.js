"use client"; // dynamique

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import left from "@/public/images/arrowleft.svg";
import right from "@/public/images/arrowright.svg";

export default function Produits() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const router = useRouter();

  useEffect(() => {
    fetch("http://127.0.0.1:8000/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.result))
      .catch((err) => console.error("Erreur lors du chargement des produits :", err));
  }, []);

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const openEditModal = (index) => {
    console.log(`Modifier produit à l'index : ${index}`);
  };

  const openDeleteModal = (index) => {
    console.log(`Supprimer produit à l'index : ${index}`);
  };

  return (
    <main className="min-h-screen p-6 xl:p-10 bg-gray-50">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Stock des produits :</h1>
        <button
          onClick={() => router.push("produit-creation")}
          className="bg-blue-600 text-white px-4 py-2 rounded text-sm shadow hover:bg-blue-700 transition"
        >
          + Ajouter un produit
        </button>
      </div>

      <div className="bg-white border rounded-xl overflow-hidden shadow">
        <table className="w-full text-left">
          <thead className="bg-gray-100 text-gray-600 text-sm">
            <tr>
              <th className="py-3 px-4">PRODUIT</th>
              <th className="py-3 px-4">DESCRIPTION</th>
              <th className="py-3 px-4">QUANTITÉ</th>
              <th className="py-3 px-4">PRIX D’ACHAT (€)</th>
              <th className="py-3 px-4">PRIX DE VENTE (€)</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.length > 0 ? (
              currentProducts.map((product, index) => (
                <tr key={index} className="border-t">
                  <td className="py-3 px-4">{product.name}</td>
                  <td className="py-3 px-4">{product.description}</td>
                  <td className="py-3 px-4">{product.quantity}</td>
                  <td className="py-3 px-4">{parseFloat(product.cost).toFixed(2)}€</td>
                  <td className="py-3 px-4 text-green-600 font-semibold">
                    {parseFloat(product.sellingprice).toFixed(2)}€
                  </td>
                  <td className="py-3 px-4 flex justify-center space-x-2">
                    <button
                      onClick={() => openEditModal(index)}
                      className="text-orange-600 bg-orange-100 px-3 py-1 rounded text-sm"
                    >
                      Modifier
                    </button>
                    <button
                      onClick={() => openDeleteModal(index)}
                      className="text-red-600 bg-red-100 px-3 py-1 rounded text-sm"
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="py-4 text-center text-gray-500">
                  Aucun produit trouvé.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {products.length > itemsPerPage && (
        <div className="flex justify-between items-center mt-6">
          <p className="text-sm text-gray-500">
            Page {currentPage} sur {totalPages}
          </p>
          <div className="flex space-x-2">
            <button
              className="bg-white py-1 px-2 rounded-l-lg border border-gray-300 disabled:opacity-50"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <Image src={left} alt="left arrow" className="w-5" />
            </button>
            <button
              className="bg-white py-1 px-2 rounded-r-lg border-y border-r border-gray-300 disabled:opacity-50"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <Image src={right} alt="right arrow" className="w-5" />
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

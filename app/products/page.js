"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import left from "@/public/images/arrowleft.svg";
import right from "@/public/images/arrowright.svg";
import filterIcon from "@/public/images/filter.svg";

export default function Produits() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDate, setSelectedDate] = useState(""); // Pas utilisé ici mais conservé si besoin futur
  const itemsPerPage = 10;

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

  const handlePageChange = (newPage, number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <main className="min-h-screen p-6 xl:p-10 bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Liste des produits :</h1>

      <div className="bg-white border rounded-xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100 text-gray-600 text-sm">
            <tr>
              <th className="py-3 px-4">Produit</th>
              <th className="py-3 px-4">Description</th>
              <th className="py-3 px-4">Quantité</th>
              <th className="py-3 px-4">Prix d’achat (€)</th>
              <th className="py-3 px-4">Prix de vente (€)</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.map((product, index) => (
              <tr key={index} className="border-t">
                <td className="py-3 px-4">{product.name}</td>
                <td className="py-3 px-4">{product.description}</td>
                <td className="py-3 px-4">{product.quantity}</td>
                <td className="py-3 px-4">{parseFloat(product.cost).toFixed(2)}€</td>
                <td className="py-3 px-4 text-green-600 font-semibold">
                  {parseFloat(product.sellingprice).toFixed(2)}€
                </td>
              </tr>
            ))}
            {currentProducts.length === 0 && (
              <tr>
                <td colSpan={5} className="py-4 text-center text-gray-500">
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
          <div className="flex">
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

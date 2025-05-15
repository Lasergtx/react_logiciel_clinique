"use client"; // DYNAMIQUE

import { useEffect, useState } from "react";
import Image from "next/image";
import left from "@/public/images/arrowleft.svg";
import right from "@/public/images/arrowright.svg";
import RoleGuard from "@/components/RoleGuard";

export default function Produits() {
  const [products, setProducts] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortAmount, setSortAmount] = useState("");
  const itemsPerPage = 10;

  useEffect(() => {
    fetch("http://127.0.0.1:8000/products", { cache: 'no-store' })
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.result);
        setSortedProducts(data.result);
      })
      .catch((err) => console.error("Erreur lors du chargement des produits :", err));
  }, []);

  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortAmount(value);

    let sortedData = [...products];

    if (value === "asc") {
      sortedData.sort((a, b) => a.quantity - b.quantity);
    } else if (value === "desc") {
      sortedData.sort((a, b) => b.quantity - a.quantity);
    }

    setSortedProducts(sortedData);
  };

  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <RoleGuard allowedRoles={["DIRECTEUR"]}>
      <main className="min-h-screen p-6 xl:p-10 bg-gray-50">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Liste des produits :</h1>

        {/* Filtre de quantité placé juste en dessous du titre */}
        <div className="mb-6">
          <select
            className="border border-gray-300 rounded-md px-3 py-2 text-sm"
            onChange={handleSortChange}
            value={sortAmount}
          >
            <option value="">Quantité</option>
            <option value="asc">Croissant</option>
            <option value="desc">Décroissant</option>
          </select>
        </div>

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
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-4 text-center text-gray-500">
                    Aucun produit trouvé.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {sortedProducts.length > itemsPerPage && (
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
    </RoleGuard>
  );
}

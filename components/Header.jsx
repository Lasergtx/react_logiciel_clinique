"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import logo from "../public/images/logoHeader/logo_clinique.svg";
import dashb from "../public/images/logoHeader/dashboard-black.svg";
import dashw from "../public/images/logoHeader/dashboard-white.svg";
import freqb from "../public/images/logoHeader/frequentation-black.svg";
import freqw from "../public/images/logoHeader/frequentation-white.svg";
import spendb from "../public/images/logoHeader/incomes-spendings-black.svg";
import spendw from "../public/images/logoHeader/incomes-spendings-white.svg";
import prodb from "../public/images/logoHeader/product-box-black.svg";
import prodw from "../public/images/logoHeader/product-box-white.svg";
import logout from "../public/images/logoHeader/btn_deco.svg";
import collab from "../public/images/logoHeader/icon-collaborateur.png";

export default function Header() {
    const pathname = usePathname();
    const router = useRouter();
    const [userName, setUserName] = useState("Chargement...");

    useEffect(() => {
        const fetchUser = async () => {
    try {
        const userId = sessionStorage.getItem('userId');
        if (!userId) {
            setUserName("Utilisateur non connecté");
            return;
        }

        const response = await fetch("http://127.0.0.1:8000/users");
        const data = await response.json();
        const connectedUser = data.result.find(user => user.userid.toString() === userId);

        if (connectedUser && connectedUser.username) {
            setUserName(connectedUser.username);
        } else {
            setUserName("Utilisateur inconnu");
        }
    } catch (error) {
        console.error("Erreur lors de la récupération du nom d'utilisateur :", error);
        setUserName("Erreur de connexion");
    }
};
        fetchUser();
    }, []);

    const handleLogout = () => {
        console.log("Déconnexion");
        router.push("/login");
    };

    return (
        <header className="flex justify-between items-center text-black bg-white px-5 ">
            <div className="flex items-center space-x-6 w-[80%]">
                <div>
                    <Image src={logo} alt="Logo de la clinique" className="w-18" />
                </div>
                <div className="flex w-full space-x-4 h-full">
                    <div className="w-[0.4%] rounded-r-lg bg-[#374C78]"></div>
                    <div className="flex space-x-4 justify-between w-[98%]">
                        <Link href="/dashboard" className={pathname === "/dashboard" ? "flex space-x-2 items-center justify-center py-2 px-5 rounded-[0.225rem] text-white bg-[#374C78]" : "flex space-x-2 items-center justify-center py-2 px-5 rounded-[0.225rem]"}>
                            <Image src={pathname === "/dashboard" ? dashw : dashb} alt="Dashboard" className="w-5" />
                            <p>Dashboard</p>
                        </Link>
                        <Link href="/trafic" className={pathname === "/trafic" ? "flex space-x-2 items-center justify-center py-2 px-5 rounded-[0.225rem] text-white bg-[#374C78]" : "flex space-x-2 items-center justify-center py-2 px-5 rounded-[0.225rem]"}>
                            <Image src={pathname === "/trafic" ? freqw : freqb} alt="Fréquentation" className="w-5" />
                            <p>Fréquentation</p>
                        </Link>
                        <Link href="/spendings" className={pathname === "/spendings" ? "flex space-x-2 items-center justify-center py-2 px-5 rounded-[0.225rem] text-white bg-[#374C78]" : "flex space-x-2 items-center justify-center py-2 px-5 rounded-[0.225rem]"}>
                            <Image src={pathname === "/spendings" ? spendw : spendb} alt="Dépense" className="w-5" />
                            <p>Dépense</p>
                        </Link>
                        <Link href="/product-sales" className={pathname === "/product-sales" ? "flex space-x-2 items-center justify-center py-2 px-5 rounded-[0.225rem] text-white bg-[#374C78]" : "flex space-x-2 items-center justify-center py-2 px-5 rounded-[0.225rem]"}>
                            <Image src={pathname === "/product-sales" ? prodw : prodb} alt="Ventes produits" className="w-5" />
                            <p>Ventes produits</p>
                        </Link>
                        <Link href="/collaborateurs" className={pathname === "/collaborateurs" ? "flex space-x-2 items-center justify-center py-2 px-5 rounded-[0.225rem] text-white bg-[#374C78]" : "flex space-x-2 items-center justify-center py-2 px-5 rounded-[0.225rem]"}>
                            <Image src={collab} alt="Collaborateurs" className="w-5" />
                            <p>Collaborateurs</p>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-center text-sm my-2 space-y-1">
                <button onClick={handleLogout}> <Image src={logout} alt="Déconnexion" className="w-8" /> </button>
                <p>{userName}</p>
            </div>
        </header>
    );
}

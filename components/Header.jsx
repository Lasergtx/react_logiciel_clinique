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
import collabw from "../public/images/logoHeader/colaborator-white.svg";
import collabb from "../public/images/logoHeader/colaborator-black.svg";
import clientw from "../public/images/logoHeader/client-white.svg";
import clientb from "../public/images/logoHeader/client-black.svg";
import ordonancew from "../public/images/logoHeader/ordonance-white.svg";
import ordonanceb from "../public/images/logoHeader/ordonance-black.svg";
import rdvw from "../public/images/logoHeader/rdv-white.svg";
import rdvb from "../public/images/logoHeader/rdv-black.svg";

export default function Header() {
    const pathname = usePathname();
    const router = useRouter();
    const [userName, setUserName] = useState("Chargement...");
    const [role, setRole] = useState("");
    const [menu, setMenu] = useState([]);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userId = sessionStorage.getItem("userId");
                const role = sessionStorage.getItem("userRole");
                if (!userId) {
                    setUserName("Utilisateur non connecté");
                    return;
                }
                if (role) {
                    setRole(role);
                }

                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`
                );
                const data = await response.json();
                const connectedUser = data.result;

                if (connectedUser && connectedUser.username) {
                    setUserName(connectedUser.username);
                } else {
                    setUserName("Utilisateur inconnu");
                }
            } catch (error) {
                console.error(
                    "Erreur lors de la récupération du nom d'utilisateur :",
                    error
                );
                setUserName("Erreur de connexion");
            }
        };
        fetchUser();
    }, []);

    useEffect(() => {
        if (role === "DIRECTEUR") {
            setMenu([
                {
                    href: "/dashboard",
                    label: "Dashboard",
                    iconActive: dashw,
                    iconInactive: dashb,
                },
                {
                    href: "/trafic",
                    label: "Fréquentation",
                    iconActive: freqw,
                    iconInactive: freqb,
                },
                {
                    href: "/depenses",
                    label: "Dépense",
                    iconActive: spendw,
                    iconInactive: spendb,
                },
                {
                    href: "/revenues",
                    label: "Revenus",
                    iconActive: spendw,
                    iconInactive: spendb,
                },
                {
                    href: "/ventes",
                    label: "Ventes produits",
                    iconActive: prodw,
                    iconInactive: prodb,
                },
                {
                    href: "/collaborateurs",
                    label: "Collaborateurs",
                    iconActive: collabw,
                    iconInactive: collabb,
                },
            ]);
        } else if (role === "VETERINAIRE") {
            setMenu([
                {
                    href: "/dashboard-v",
                    label: "Dashboard",
                    iconActive: dashw,
                    iconInactive: dashb,
                },
                {
                    href: "/rdv-liste-v",
                    label: "Rendez-vous",
                    iconActive: rdvw,
                    iconInactive: rdvb,
                },
                {
                    href: "/ordonnance-liste",
                    label: "Ordonnances",
                    iconActive: ordonancew,
                    iconInactive: ordonanceb,
                },
                {
                    href: "/clients-liste-v",
                    label: "Clients",
                    iconActive: clientw,
                    iconInactive: clientb,
                },
            ]);
        } else if (role === "ASSISTANT") {
            setMenu([
                {
                    href: "/dashboard-a",
                    label: "Dashboard",
                    iconActive: dashw,
                    iconInactive: dashb,
                },
                {
                    href: "/rdv-liste-a",
                    label: "Rendez-vous",
                    iconActive: rdvw,
                    iconInactive: rdvb,
                },
                {
                    href: "/facture-liste",
                    label: "Factures",
                    iconActive: spendw,
                    iconInactive: spendb,
                },
                {
                    href: "/clients-liste-a",
                    label: "Clients",
                    iconActive: clientw,
                    iconInactive: clientb,
                },
                {
                    href: "/stock-produits",
                    label: "Stock",
                    iconActive: prodw,
                    iconInactive: prodb,
                },
            ]);
        }
    }, [role]);

    const handleLogout = () => {
        console.log("Déconnexion");
        router.push("/login");
    };

    return (
        <header className="flex justify-between items-center text-black bg-white px-5 ">
            <div className="flex items-center space-x-6">
                <div>
                    <Image
                        src={logo}
                        alt="Logo de la clinique"
                        className="w-18"
                    />
                </div>
                <div className="flex w-full space-x-4 h-full">
                    <div className="flex space-x-4 justify-between w-full">
                        {menu.map(
                            ({ href, label, iconActive, iconInactive }) => (
                                <Link
                                    key={href}
                                    href={href}
                                    className="flex items-center w-fit"
                                >
                                    {pathname === href && (
                                        <div className="h-full mr-2 w-[4px] bg-[#374C78] rounded-r-lg"></div>
                                    )}
                                    <div
                                        className={`flex space-x-2 items-center justify-center py-2 px-5 rounded-[0.225rem] w-full ${
                                            pathname === href
                                                ? "text-white bg-[#374C78]"
                                                : ""
                                        }`}
                                    >
                                        <Image
                                            src={
                                                pathname === href
                                                    ? iconActive
                                                    : iconInactive
                                            }
                                            alt={`logo ${label.toLowerCase()}`}
                                            className="w-5"
                                        />
                                        <p>{label}</p>
                                    </div>
                                </Link>
                            )
                        )}
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-center text-sm my-2 space-y-1">
                <button onClick={handleLogout}>
                    {" "}
                    <Image
                        src={logout}
                        alt="Déconnexion"
                        className="w-8"
                    />{" "}
                </button>
                <p>{userName}</p>
            </div>
        </header>
    );
}

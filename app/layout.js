"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import "./globals.css";

export default function RootLayout({ children }) {
    const pathname = usePathname();

    const hiddenpaths = ["/login"];

    return (
        <html lang="en">
            <body className={`bg-white`}>
                {!hiddenpaths.includes(pathname) && <Header />}
                {children}
            </body>
        </html>
    );
}

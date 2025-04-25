"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import "./globals.css";
import { AnimatePresence, motion } from "framer-motion";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const hiddenpaths = ["/login"];

  return (
    <html lang="fr">
      <body className="bg-[#F5F6FA]">
        {!hiddenpaths.includes(pathname) && <Header />}

          {/* 🔁 Animation TEST 1: Slide latéral */}
          <motion.div
  key={pathname}
  initial={{ x: 50, opacity: 0 }}
  animate={{ x: 0, opacity: 1 }}
  exit={{ x: -50, opacity: 0 }}
  transition={{
    duration: 0.5, // Smooth & slightly longer
    ease: [0.22, 1, 0.36, 1], // Custom cubic-bezier for a polished feel
  }}
>
  {children}
</motion.div>
      </body>
    </html>
  );
}
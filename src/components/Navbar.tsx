"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  // { href: '/', label: 'Home' },
  { href: "/photos", label: "Foto" },
  { href: "/videos", label: "Video" },
  { href: "/about", label: "Su di me" },
  { href: "/contact", label: "Contatti" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/70 backdrop-blur-xl z-50 px-6 py-4 shadow-sm border-b border-neutral-200">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link
          href="/"
          className="text-black font-extrabold text-2xl tracking-tight"
        >
          <motion.span whileHover={{ scale: 1.05 }}>J. Stortini 📸</motion.span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-10">
          {links.map(({ href, label }) => {
            const isActive = pathname === href;
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`text-neutral-800 text-lg font-medium hover:text-black transition ${
                    isActive ? "border-b-2 border-black pb-1" : ""
                  }`}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-black" onClick={() => setOpen(!open)}>
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.ul
            className="md:hidden flex flex-col items-center bg-white/90 backdrop-blur-xl w-full py-6 space-y-4 shadow-md border-t"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {links.map(({ href, label }) => (
              <motion.li
                key={href}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Link
                  href={href}
                  onClick={() => setOpen(false)}
                  className={`text-neutral-900 text-lg font-medium hover:text-black transition ${
                    pathname === href ? "border-b-2 border-black pb-1" : ""
                  }`}
                >
                  {label}
                </Link>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </nav>
  );
}

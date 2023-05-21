import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="w-full max-w-8xl">
      {/* Mobile Menu */}
      <div className="flex items-center border-y border-orange-400 py-2 justify-center md:hidden w-full">
        <button
          className="text-gray-900 hover:bg-orange-400 hover:text-white px-4 py-2 rounded-md text-sm font-medium w-full"
          onClick={handleMobileMenuToggle}
        >
          Menu
        </button>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center justify-center border-y border-orange-400 h-16">
        <Link href="/" className={`text-gray-900 px-6 mx-1 py-2 rounded-md text-sm font-medium ${router.pathname === "/" ? "bg-orange-400 text-white hover:bg-orange-400 hover:text-white" : "hover:bg-orange-400 hover:text-white"}`}>
          Início
        </Link>
        <Link href="/sobre" className={`text-gray-900 px-6 mx-1 py-2 rounded-md text-sm font-medium ${router.pathname === "/sobre" ? "bg-orange-400 text-white hover:bg-orange-400 hover:text-white" : "hover:bg-orange-400 hover:text-white"}`}>
          Sobre
        </Link>
        <Link href="/contato" className={`text-gray-900 px-6 mx-1 py-2 rounded-md text-sm font-medium ${router.pathname === "/contato" ? "bg-orange-400 text-white hover:bg-orange-400 hover:text-white" : "hover:bg-orange-400 hover:text-white"}`}>
          Contato
        </Link>
        <Link href="/financie" className={`text-gray-900 px-6 mx-1 py-2 rounded-md text-sm font-medium ${router.pathname === "/financie" ? "bg-orange-400 text-white hover:bg-orange-400 hover:text-white" : "hover:bg-orange-400 hover:text-white"}`}>
          Financie
        </Link>
        <Link href="/negocie" className={`text-gray-900 px-6 mx-1 py-2 rounded-md text-sm font-medium ${router.pathname === "/negocie" ? "bg-orange-400 text-white hover:bg-orange-400 hover:text-white" : "hover:bg-orange-400 hover:text-white"}`}>
          Negocie seu imóvel
        </Link>
        <Link href="#" className="text-gray-900 hover:bg-orange-400 hover:text-white px-6 mx-1 py-2 rounded-md text-sm font-medium">
          Imóveis Favoritos
        </Link>
      </div>

      {/* Mobile Menu Content */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <Link href="/" className="block text-gray-900 hover:bg-orange-400 hover:text-white px-4 py-2 rounded-md text-sm font-medium">
            Início
          </Link>
          <Link href="/sobre" className="block text-gray-900 hover:bg-orange-400 hover:text-white px-4 py-2 rounded-md text-sm font-medium">
            Sobre
          </Link>
          <Link href="/contato" className="block text-gray-900 hover:bg-orange-400 hover:text-white px-4 py-2 rounded-md text-sm font-medium">
            Contato
          </Link>
          <Link href="/financie" className="block text-gray-900 hover:bg-orange-400 hover:text-white px-4 py-2 rounded-md text-sm font-medium">
            Financie
          </Link>
          <Link href="/negocie" className="block text-gray-900 hover:bg-orange-400 hover:text-white px-4 py-2 rounded-md text-sm font-medium">
            Negocie seu imóvel
          </Link>
          <Link href="#" className="block text-gray-900 hover:bg-orange-400 hover:text-white px-4 py-2 rounded-md text-sm font-medium">
            Imóveis Favoritos
          </Link>
        </div>
      )}
    </nav>
  );
}

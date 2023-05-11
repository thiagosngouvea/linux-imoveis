import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export function Navbar() {
  const router = useRouter();

  return (
    <nav className="w-full max-w-8xl justify-center">
      <div className="justify-between w-full">
        <div className="flex items-center justify-center border-y border-orange-400 h-16">
          <Link href="/" className={`text-gray-900 px-6 mx-1 py-2 rounded-md text-sm font-medium ${router.pathname === "/" ? "bg-orange-400 text-white hover:bg-orange-400 hover:text-white" : "hover:bg-orange-400 hover:text-white"}`}>
            Início
          </Link>
          <Link href="/sobre" className={`text-gray-900 px-6 mx-1 py-2 rounded-md text-sm font-medium ${router.pathname === "/sobre" ? "bg-orange-400 text-white hover:bg-orange-400 hover:text-white" : "hover:bg-orange-400 hover:text-white"}`}>
            Sobre
          </Link>
          <Link href="#" className="text-gray-900 hover:bg-orange-400 hover:text-white px-6 mx-1 py-2 rounded-md text-sm font-medium">
            Contato
          </Link>
          <Link href="#" className="text-gray-900 hover:bg-orange-400 hover:text-white px-6 mx-1 py-2 rounded-md text-sm font-medium">
            Financie
          </Link>
          <Link href="#" className="text-gray-900 hover:bg-orange-400 hover:text-white px-6 mx-1 py-2 rounded-md text-sm font-medium">
            Negocie seu imóvel
          </Link>
          <Link href="#" className="text-gray-900 hover:bg-orange-400 hover:text-white px-6 mx-1 py-2 rounded-md text-sm font-medium">
            Imóveis Favoritos
          </Link>
        </div>
      </div>
    </nav>
  );
}

import React from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/assets/logo.png"
import { BsInstagram } from "react-icons/bs";
import { FaWhatsappSquare } from "react-icons/fa";
import { AiFillFacebook } from "react-icons/ai";

export function Header() {
  return (
    <header className="text-white">
      <nav className="max-w-8xl mx-auto px-2 sm:px-6 lg:px-4" aria-label="Top">
        <div className="w-full py-6 flex items-center justify-between border-b border-gray-800 sm:border-none">
          <Link href="https://api.whatsapp.com/send?phone=5581994764467" className="flex items-center">
            <button className="flex font-medium p-2 rounded-md text-gray-800 border border-gray-300 rounded-3xl px-4 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
            (81) 99476-4467
            <FaWhatsappSquare size={24} className="ml-2 text-green-500" />
            </button>
          </Link>
          <div className="flex items-center pr-20">
            <Link href="/">
                <Image
                    src={Logo}
                    alt="Workflow"
                    width={200}
                    quality={100}
                />
            </Link>
          </div>
          <div className="flex items-center">
            <Link href="https://www.facebook.com/linuximoveis" className="text-gray-800 mr-2" target="_blank">
                <AiFillFacebook size={30} />
            </Link>
            <Link href="https://www.instagram.com/linuximoveis/" className="text-gray-800" target="_blank">
                <BsInstagram size={24} />
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}

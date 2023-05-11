import React from "react";
import Image from "next/image";
import Logo from "@/assets/logo.png"
import FooterImg from "@/assets/footer_img.jpg"
import { useRouter } from "next/router";

export function Footer() {
    const router = useRouter();

    return (
        <footer className="bg-white">
            {/* <div className="grid grid-cols-4 max-w-8xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8"> */}
            {router.pathname === "/"  && (
                <Image
                    src={FooterImg}
                    alt="Workflow"
                    width={2000}
                    height={500}
                    quality={100}
                />
            )}
            <div className="container mx-auto py-12 px-4 grid grid-cols-5 gap-3">
                <div className="col-span-1">
                    <Image
                        src={Logo}
                        alt="Workflow"
                        width={200}
                        quality={100}
                    />
                </div>
                <div className="col-span-2">
                    <span className="text-gray-800 text-lg font-serif">Linux Imóveis</span>
                    <p className="text-gray-600">
                    CNPJ - 32.711.891/0001-80
                    </p>
                    <p className="text-gray-600">
                    Av. Agamenon Magalhães, 444 - Ed Empresarial Difusora, Andar 11, Sala 630, Maurício de Nassau - Caruaru/PE, 55012-290
                    </p>
                </div>
                <div className="col-span-2 grid grid-cols-2">
                    <div className="col-span-1 grid justify-center">
                        <span className="text-gray-800 text-lg font-serif">Menu</span>
                        <ul className="mt-2 text-gray-600">
                            <li className="mt-2">
                                <a href="#" className="hover:text-gray-800">Início</a>
                            </li>
                            <li className="mt-2">
                                <a href="#" className="hover:text-gray-800">Sobre</a>
                            </li>
                            <li className="mt-2">
                                <a href="#" className="hover:text-gray-800">Contato</a>
                            </li>
                            <li className="mt-2">
                                <a href="#" className="hover:text-gray-800">Financie</a>
                            </li>
                            <li className="mt-2">
                                <a href="#" className="hover:text-gray-800">Negocie seu Imóvel</a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-span-1">
                        <span className="text-gray-800 text-lg font-serif">Contato</span>
                        <ul className="mt-2 text-gray-600">
                            <li className="mt-2">
                                <a href="#" className="hover:text-gray-800">Ver e-mail</a>
                            </li>
                            <li className="mt-2">
                                <a href="#" className="hover:text-gray-800">(81) 99476-4467</a>
                            </li>
                            <li className="mt-2">
                                <a href="#" className="hover:text-gray-800">*** ***</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="bg-gray-300 flex justify-between">
                <div className="mx-2 py-4 px-4 sm:px-6 lg:px-8 font-light">
                    © Copyright 2023 - Linux Imóveis - Todos os direitos reservados
                </div>
                <div className="mx-2 py-4 px-4 sm:px-6 lg:px-8 font-light">
                    Desenvolvido por TG Software
                </div>
            </div>
        </footer>
    );
}

import React from "react";
import { useRouter } from "next/router";
import {Header} from "@/components/Header";
import {Navbar} from "@/components/Navbar";
import {Footer} from "@/components/Footer";

interface LayoutProps {
    children: React.ReactNode;
}


const Layout = ({ children }: LayoutProps) => {
    const router = useRouter();

    return (
        <div>
            <Header />
            <Navbar />
            <div className={router.pathname !== "/" && router.pathname !== "/imovel/[url]/[ref]" && router.pathname !== "/imoveis/[negocio]" ? "w-full xl:max-w-screen-xl md:max-w-screen-lg mx-auto mt-8" : ""}>{children}</div>
            <Footer />
        </div>
    );
};

export default Layout;
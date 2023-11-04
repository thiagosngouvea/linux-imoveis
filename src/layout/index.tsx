import React from "react";
import { useRouter } from "next/router";
import {Header} from "@/components/Header";
import {Navbar} from "@/components/Navbar";
import {Footer} from "@/components/Footer";
import { FloatButton } from 'antd';
import { BsWhatsapp } from "react-icons/bs";

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
            <FloatButton 
                icon={<BsWhatsapp size={22} className="text-white" />} 
                type="primary" 
                shape="circle"
                style={{ 
                    width: 60,
                    height: 60,
                }}
                onClick={() => window.open("https://api.whatsapp.com/send?phone=5581994764467", "_blank")}
            />
        </div>
    );
};

export default Layout;
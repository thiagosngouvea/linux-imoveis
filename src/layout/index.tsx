import React from "react";
import {Header} from "@/components/Header";
import {Navbar} from "@/components/Navbar";
import {Footer} from "@/components/Footer";

interface LayoutProps {
    children: React.ReactNode;
}


const Layout = ({ children }: LayoutProps) => {
    return (
        <div>
            <Header />
            <Navbar />
            {children}
            <Footer />
        </div>
    );
};

export default Layout;
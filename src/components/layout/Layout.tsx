// components/Layout.tsx
import React, { ReactNode } from "react";
import { ModalProvider } from "../../context/ModalContext";

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <ModalProvider>
            <div className="page-wrapper">
                <main>{children}</main>
            </div>
        </ModalProvider>
    );
};

export default Layout;

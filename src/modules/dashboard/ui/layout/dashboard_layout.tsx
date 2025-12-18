import React from "react";
import DashboardNavbar from "../components/navbar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-gray-50/50">
            <DashboardNavbar />
            <main className="container mx-auto p-6">
                {children}
            </main>
        </div>
    );
}

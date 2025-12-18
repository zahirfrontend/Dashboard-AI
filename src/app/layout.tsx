import type { Metadata } from "next";
import { Mulish, Geist_Mono } from "next/font/google";
import "./globals.css";

import { QueryProvider } from "@core/lib/query";
import { Toaster } from "sonner";

const fontSans = Mulish({ subsets: ["latin"], variable: "--font-sans" });

const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
    title: "Zahir Online",
    description: "Zahir Online - Your AI-powered accounting assistant",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${fontSans.variable} antialiased font-sans`}>
                <Toaster
                    richColors
                    position="top-right"
                    toastOptions={{
                        style: {
                            borderRadius: "var(--radius)",
                        },
                    }}
                />
                <QueryProvider>{children}</QueryProvider>
            </body>
        </html>
    );
}

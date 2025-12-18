"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { storage } from "@core/lib/storage";

export default function Splash() {
    const router = useRouter();

    useEffect(() => {
        // Small delay to show the splash screen effectively (optional, but feels smoother)
        const checkAuth = () => {
            const hasToken = storage.has("accessToken");
            const hasCompany = storage.has("companyId"); // Checking companyId as per previous logic

            if (hasToken) {
                if (hasCompany) {
                    router.replace("/home");
                } else {
                    router.replace("/company/list");
                }
            } else {
                router.replace("/auth/login");
            }
        };

        // Run immediately or with a slight timeout if desired. 
        // Using a small timeout to ensure hydration/mounting is stable and user sees the splash.
        const timer = setTimeout(checkAuth, 1000);

        return () => clearTimeout(timer);
    }, [router]);

    return (
        <div className="flex h-screen w-full items-center justify-center bg-primary">
            <div className="flex size-24 items-center justify-center rounded-full bg-white text-[#3478A6] font-bold text-6xl shadow-xl animate-pulse">
                Z
            </div>
        </div>
    );
}

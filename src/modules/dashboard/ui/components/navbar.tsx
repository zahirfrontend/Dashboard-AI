"use client";

import React from "react";
import { LayoutGrid } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@common/utils/cn";
import { Button } from "@core/ui/base/button";
import UserDropdown from "./user_dropdown";

const navItems = [
    { label: "Dashboard", href: "/home" },
    { label: "Data Store", href: "/datastore" },
    { label: "Ledger", href: "/ledger" },
    { label: "Sales", href: "/sales" },
    { label: "Purchase", href: "/purchase" },
    { label: "Cash & Bank", href: "/cash-bank" },
    { label: "Inventory", href: "/inventory" },
    { label: "Report", href: "/report" },
];

export default function DashboardNavbar() {
    const pathname = usePathname();

    return (
        <nav className="flex h-14 items-center justify-between bg-primary px-4 text-white shadow-md">
            <div className="flex h-full items-center gap-6">
                {/* Logo */}
                <div className="flex items-center gap-2">
                    <div className="flex size-8 items-center justify-center rounded-full bg-white text-[#3478A6] font-bold text-xl">
                        Z
                    </div>
                </div>

                {/* Navigation Links */}
                <div className="hidden h-full items-center gap-1 lg:flex">
                    {navItems.map((item) => {
                        const isActive = pathname?.startsWith(item.href);
                        return (
                            <Link
                                key={item.label}
                                href={item.href}
                                className={cn(
                                    "flex h-full items-center border-b-2 px-3 text-sm font-semibold transition-colors hover:text-white",
                                    isActive
                                        ? "border-white font-bold text-white"
                                        : "border-transparent opacity-90 hover:opacity-100 text-neutral-200"
                                )}
                            >
                                {item.label}
                            </Link>
                        );
                    })}
                </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
                <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/10 hover:text-white"
                >
                    <LayoutGrid className="size-5" />
                </Button>

                <UserDropdown />
            </div>
        </nav>
    );
}

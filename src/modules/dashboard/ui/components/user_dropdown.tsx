"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
    ChevronDown,
    Building2,
    User,
    Wallet,
    CloudUpload,
    CloudDownload,
    Clock,
    Settings,
    MessageSquare,
    Languages,
    LogOut,
    ChevronRight,
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@core/ui/base/dropdown-menu";
import { HugeiconsIcon } from "@hugeicons/react";
import { UserIcon } from "@hugeicons/core-free-icons";
import { storage } from "@core/lib/storage";

export default function UserDropdown() {
    const router = useRouter();

    const handleChangeCompany = () => {
        storage.remove("userCompany");
        storage.remove("companyId");
        storage.remove("slug");
        router.push("/company/list");
    };

    const handleLogout = () => {
        storage.clear();
        router.push("/auth/login");
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <div className="flex items-center gap-2 cursor-pointer rounded-full p-1 hover:bg-white/10">
                    <div className="size-8 flex items-center justify-center bg-neutral-100 rounded-full">
                        <HugeiconsIcon
                            icon={UserIcon}
                            className="size-5 text-neutral-800"
                        />
                    </div>
                    <ChevronDown className="size-4 opacity-80" />
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-72" align="end">
                <DropdownMenuGroup className="space-y-1">
                    <div className="flex items-center justify-between px-2 py-1.5 text-sm text-foreground hover:bg-neutral-300/40 cursor-pointer rounded-sm">
                        <div className="flex items-center gap-3">
                            <div className="flex size-8 items-center justify-center rounded-full bg-neutral-200 text-neutral-800">
                                <User className="size-4" />
                            </div>
                            <span>Profile</span>
                        </div>
                    </div>
                    <div 
                        onClick={handleChangeCompany}
                        className="flex items-center justify-between px-2 py-1.5 text-sm font-medium hover:bg-neutral-300/40 cursor-pointer rounded-sm"
                    >
                        <div className="flex items-center gap-3">
                            <div className="flex size-8 items-center justify-center rounded-full bg-gray-200 text-gray-800">
                                <Building2 className="size-4" />
                            </div>
                            <span className="text-foreground">
                                Change Company
                            </span>
                        </div>
                    </div>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                    <DropdownMenuItem className="py-2.5">
                        <User className="mr-2 size-4 text-gray-500" />
                        <span className="flex-1">Control Account</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="py-2.5">
                        <Wallet className="mr-2 size-4 text-gray-500" />
                        <span className="flex-1">Opening Balance</span>
                        <ChevronDown className="size-4 opacity-50" />
                    </DropdownMenuItem>
                    <DropdownMenuItem className="py-2.5">
                        <CloudUpload className="mr-2 size-4 text-gray-500" />
                        <span className="flex-1">Import</span>
                        <ChevronDown className="size-4 opacity-50" />
                    </DropdownMenuItem>
                    <DropdownMenuItem className="py-2.5">
                        <CloudDownload className="mr-2 size-4 text-gray-500" />
                        <span className="flex-1">Export CSV Invoice</span>
                        <ChevronDown className="size-4 opacity-50" />
                    </DropdownMenuItem>
                    <DropdownMenuItem className="py-2.5">
                        <Clock className="mr-2 size-4 text-gray-500" />
                        <span className="flex-1">Recalculate</span>
                    </DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                    <DropdownMenuItem className="py-2.5">
                        <Settings className="mr-2 size-4 text-gray-500" />
                        <span className="flex-1">Application Setting</span>
                    </DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                    <DropdownMenuItem className="py-2.5">
                        <div className="relative mr-2">
                            <MessageSquare className="size-4 text-gray-500" />
                            <span className="absolute -top-0.5 -right-0.5 size-2 rounded-full bg-red-500 border border-white" />
                        </div>
                        <span className="flex-1">Other</span>
                        <ChevronDown className="size-4 opacity-50" />
                    </DropdownMenuItem>
                    <DropdownMenuItem className="py-2.5">
                        <div className="mr-2 flex size-4 items-center justify-center">
                            {/* Placeholder for UK Flag */}
                            <Languages className="size-4 text-gray-500" />
                        </div>
                        <span className="flex-1">Language</span>
                        <ChevronDown className="size-4 opacity-50" />
                    </DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                <DropdownMenuItem 
                    variant="destructive"
                    onClick={handleLogout}
                >
                    <LogOut className="mr-2 size-4" />
                    <span>Logout</span>
                </DropdownMenuItem>

                <div className="px-2 py-2 text-xs text-muted-foreground border-t mt-1 pt-2">
                    Version <span className="font-mono">V2.25.12.162200</span>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

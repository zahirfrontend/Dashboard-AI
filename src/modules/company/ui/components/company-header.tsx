import React from "react";
import { Search } from "lucide-react";

interface CompanyHeaderProps {
    search: string;
    onSearchChange: (value: string) => void;
    totalCompanies: number;
}

export function CompanyHeader({ search, onSearchChange, totalCompanies }: CompanyHeaderProps) {
    return (
        <div className="flex justify-between items-center gap-3 mb-6">
            <div className="flex flex-col gap-1">
                <button className="text-sm text-emerald-500 hover:underline flex items-center font-medium">
                    Back to login
                </button>
                <div className="flex items-end justify-between">
                    <div>
                        <h1 className="text-xl font-semibold text-neutral-700">
                            Select Company
                        </h1>
                        <p className="text-neutral-500 text-sm mt-1">
                            {totalCompanies} Companies
                        </p>
                    </div>
                </div>
            </div>

            <div className="relative">
                <input
                    type="text"
                    placeholder="Search Company"
                    value={search}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="pl-4 pr-10 py-2 border rounded-md w-80 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
                <Search className="absolute right-3 top-2.5 h-4 w-4 text-neutral-400" />
            </div>
        </div>
    );
}

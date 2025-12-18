"use client";

import React, { useState, useCallback, useEffect } from "react";
import { CompanyHeader } from "../components/company-header";
import { CompanyTable } from "../components/company-table";

function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => clearTimeout(timer);
    }, [value, delay]);

    return debouncedValue;
}

export default function CompanyListView() {
    const [search, setSearch] = useState("");
    const [totalCompanies, setTotalCompanies] = useState(0);
    const debouncedSearch = useDebounce(search, 400);

    const handleTotalChange = useCallback((total: number) => {
        setTotalCompanies(total);
    }, []);

    return (
        <div className="min-h-screen bg-white p-8">
            <div className="max-w-4xl mx-auto">
                <CompanyHeader
                    search={search}
                    onSearchChange={setSearch}
                    totalCompanies={totalCompanies}
                />
                <CompanyTable
                    search={debouncedSearch}
                    onTotalChange={handleTotalChange}
                />
            </div>
        </div>
    );
}

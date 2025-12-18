"use client";

import React, { useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@core/ui/base/button";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
    PaginationEllipsis,
} from "@core/ui/base/pagination";
import { CompanyTableItem } from "@modules/company/models/company_table_item";
import { useListCompanies } from "@modules/company/hooks/queries/use_list_company.hook";
import { useSelectCompany } from "@modules/company/hooks/mutations/use_select_company.hook";

function getStatusColor(status: string) {
    switch (status) {
        case "Trial":
            return "bg-orange-400 text-white";
        case "Active":
            return "bg-emerald-500 text-white";
        case "Not Active":
            return "bg-slate-400 text-white";
        default:
            return "bg-gray-200 text-gray-800";
    }
}

interface CompanyRowProps {
    company: CompanyTableItem;
    onSelect: (company: CompanyTableItem) => void;
    isOdd: boolean;
    isSelecting: boolean;
    selectedId: string | null;
}

function CompanyRow({
    company,
    onSelect,
    isOdd,
    isSelecting,
    selectedId,
}: CompanyRowProps) {
    const bgColor = isOdd ? "bg-slate-50" : "bg-white";
    const isCurrentlySelecting = isSelecting && selectedId === company.id;

    return (
        <tr className={`${bgColor} hover:bg-gray-100 transition-colors`}>
            <td className="py-4 px-6 font-semibold text-neutral-600 text-sm">
                {company.name}
            </td>
            <td className="py-4 px-6 text-slate-600">{company.expiry}</td>
            <td className="py-4 px-6">
                <span
                    className={`px-4 py-1 rounded text-xs font-medium ${getStatusColor(
                        company.status
                    )} inline-block min-w-20 text-center`}
                >
                    {company.status}
                </span>
            </td>
            <td className="py-4 px-6">
                <Button
                    size={"sm"}
                    variant={"outline"}
                    onClick={() => onSelect(company)}
                    disabled={isSelecting}
                    className={"font-medium"}
                >
                    {isCurrentlySelecting ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                        "Select"
                    )}
                </Button>
            </td>
        </tr>
    );
}

function generatePageNumbers(
    currentPage: number,
    totalPages: number
): (number | "ellipsis")[] {
    const pages: (number | "ellipsis")[] = [];

    if (totalPages <= 5) {
        for (let i = 1; i <= totalPages; i++) {
            pages.push(i);
        }
    } else {
        pages.push(1);

        if (currentPage > 3) {
            pages.push("ellipsis");
        }

        const start = Math.max(2, currentPage - 1);
        const end = Math.min(totalPages - 1, currentPage + 1);

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        if (currentPage < totalPages - 2) {
            pages.push("ellipsis");
        }

        pages.push(totalPages);
    }

    return pages;
}

interface CompanyTableProps {
    search: string;
    onTotalChange?: (total: number) => void;
}

export function CompanyTable({ search, onTotalChange }: CompanyTableProps) {
    const [page, setPage] = useState(1);
    const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(
        null
    );
    const { data, isLoading, error } = useListCompanies(page, 20, search);
    const { selectCompany, isLoading: isSelecting } = useSelectCompany();

    React.useEffect(() => {
        if (data?.pagination?.totalItems !== undefined) {
            onTotalChange?.(data.pagination.totalItems);
        }
    }, [data?.pagination?.totalItems, onTotalChange]);

    React.useEffect(() => {
        setPage(1);
    }, [search]);

    const handleSelectCompany = (company: CompanyTableItem) => {
        setSelectedCompanyId(company.id);
        selectCompany({ id: company.id, slug: company.slug });
    };

    const pagination = data?.pagination;
    const totalPages = pagination?.totalPages ?? 1;

    if (isLoading) {
        return (
            <div className="bg-slate-50 rounded-lg p-8 flex justify-center items-center">
                <Loader2 className="h-8 w-8 animate-spin text-slate-500" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-slate-50 rounded-lg p-8 text-center text-red-500">
                Gagal memuat data perusahaan
            </div>
        );
    }

    const companies = data?.companies ?? [];

    if (companies.length === 0) {
        return (
            <div className="bg-slate-50 rounded-lg p-8 text-center text-slate-500">
                Tidak ada data perusahaan
            </div>
        );
    }

    const pageNumbers = generatePageNumbers(page, totalPages);

    return (
        <div className="space-y-4">
            <div className="bg-slate-50 rounded-lg overflow-hidden">
                <table className="w-full text-left text-sm">
                    <thead className="bg-white border-b">
                        <tr>
                            <th className="py-4 px-6 font-semibold text-slate-700 uppercase tracking-wider text-xs">
                                Nama Company
                            </th>
                            <th className="py-4 px-6 font-semibold text-slate-700 uppercase tracking-wider text-xs">
                                Kadaluarsa
                            </th>
                            <th className="py-4 px-6 font-semibold text-slate-700 uppercase tracking-wider text-xs">
                                Status
                            </th>
                            <th className="py-4 px-6 font-semibold text-slate-700 uppercase tracking-wider text-xs"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {companies.map((company, index) => (
                            <CompanyRow
                                key={company.id}
                                company={company}
                                onSelect={handleSelectCompany}
                                isOdd={index % 2 === 0}
                                isSelecting={isSelecting}
                                selectedId={selectedCompanyId}
                            />
                        ))}
                    </tbody>
                </table>
            </div>

            {totalPages > 1 && (
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                onClick={() =>
                                    setPage((p) => Math.max(1, p - 1))
                                }
                                className={
                                    page === 1
                                        ? "pointer-events-none opacity-50"
                                        : "cursor-pointer"
                                }
                            />
                        </PaginationItem>

                        {pageNumbers.map((pageNum, idx) =>
                            pageNum === "ellipsis" ? (
                                <PaginationItem key={`ellipsis-${idx}`}>
                                    <PaginationEllipsis />
                                </PaginationItem>
                            ) : (
                                <PaginationItem key={pageNum}>
                                    <PaginationLink
                                        onClick={() => setPage(pageNum)}
                                        isActive={page === pageNum}
                                        className="cursor-pointer"
                                    >
                                        {pageNum}
                                    </PaginationLink>
                                </PaginationItem>
                            )
                        )}

                        <PaginationItem>
                            <PaginationNext
                                onClick={() =>
                                    setPage((p) => Math.min(totalPages, p + 1))
                                }
                                className={
                                    page === totalPages
                                        ? "pointer-events-none opacity-50"
                                        : "cursor-pointer"
                                }
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            )}
        </div>
    );
}

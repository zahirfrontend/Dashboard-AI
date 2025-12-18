"use client";

import { useAppQuery, createQueryKeys } from "@core/lib/query";
import { CompanyTableItem } from "@modules/company/models/company_table_item";
import { UserCompany } from "@modules/company/models/user_company.type";
import { getListCompanyService } from "@modules/company/services/get_list_company.service";

export const companyKeys = createQueryKeys("companies");

function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const day = date.getDate();
    const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "Mei",
        "Jun",
        "Jul",
        "Agt",
        "Sep",
        "Okt",
        "Nov",
        "Des",
    ];
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
}

function mapMembershipStatus(
    status: string
): "Trial" | "Active" | "Not Active" {
    const statusLower = status.toLowerCase();
    if (statusLower === "trial") return "Trial";
    if (statusLower === "subscribe" || statusLower === "active")
        return "Active";
    return "Not Active";
}

function mapToTableItem(userCompany: UserCompany): CompanyTableItem {
    const { company } = userCompany;
    const membership = company.membership;

    return {
        id: userCompany.id,
        slug: userCompany.slug,
        name: company.name,
        version: `v${company.version}`,
        edition: membership.variant.name,
        expiry: formatDate(membership.expired_date),
        status: mapMembershipStatus(membership.status),
    };
}

export function useListCompanies(page = 1, perPage = 20, search = "") {
    return useAppQuery(
        companyKeys.list({ page, perPage, search }),
        async () => {
            const response = await getListCompanyService.exec({
                page,
                perPage,
                search,
            });
            return {
                companies: response.results.map(mapToTableItem),
                pagination: {
                    page: response.page_context.page,
                    perPage: response.page_context.per_page,
                    totalPages: response.page_context.total_pages,
                    totalItems: response.count,
                },
            };
        }
    );
}

import { apiClient } from "@core/lib/network/api.client";
import { UserCompaniesResponse } from "../models/response/user_companies.response";
import { UserCompanyDetail } from "../models/user_company_detail.type";

export interface GetCompaniesParams {
    page?: number;
    perPage?: number;
    search?: string;
}

export const getListCompanyService = {
    async exec(params?: GetCompaniesParams): Promise<UserCompaniesResponse> {
        const page = params?.page ?? 1;
        const perPage = params?.perPage ?? 20;
        const search = params?.search ?? "";

        const queryParams = new URLSearchParams({
            page: String(page),
            per_page: String(perPage),
            "includes[company_addons]": "1",
            "company[membership][status][$nin]": "Not Active,Expired,Suspend",
            "company[membership][variant][id][$nin]": "21,25,150,151",
            "isort[company.name]": "1",
        });

        if (search.trim()) {
            queryParams.set("search[company.name]", search.trim());
        }

        const response = await apiClient.get<UserCompaniesResponse>(
            `/user_companies?${queryParams.toString()}`
        );

        return response;
    },
};

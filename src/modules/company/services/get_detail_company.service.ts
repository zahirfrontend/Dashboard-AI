import { apiClient } from "@core/lib/network/api.client";
import { UserCompanyDetail } from "../models/user_company_detail.type";

export const getDetailCompanyService = {
    async exec(companyId: string): Promise<UserCompanyDetail> {
        const response = await apiClient.get<UserCompanyDetail>(
            `/user_companies/${companyId}`
        );

        return response;
    },
};

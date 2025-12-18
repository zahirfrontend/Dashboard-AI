import { PageContext } from "@common/types/page_context.type";
import { PageLinks } from "@common/types/page_link.type";
import { UserCompany } from "../user_company.type";

export interface UserCompaniesResponse {
    count: number;
    page_context: PageContext;
    links: PageLinks;
    results: UserCompany[];
}

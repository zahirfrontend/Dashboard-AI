import {
    Company,
    MembershipVariantItem,
    UserCompany,
} from "./user_company.type";

export interface UserCompanyDetail extends Omit<UserCompany, "company"> {
    company: Company;
    custom_features: string[];
    membership_variants: MembershipVariantItem[];
}

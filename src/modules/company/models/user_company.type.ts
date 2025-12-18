export interface UserCompany {
    id: string;
    slug: string;
    email: string;
    mobile_number: string;
    zahir_id: number;
    whatsapp_number: string;
    last_login: string;
    is_super_admin: boolean;
    acl: unknown;
    company: Company;
    company_addons: CompanyAddon[];
    created_at: string;
    updated_at: string;
}

export interface Company {
    id: string;
    name: string;
    slug: string;
    slug_alias: string;
    business: CompanyBusiness;
    business_type: CompanyBusinessType;
    is_active: boolean;
    is_on_premise: boolean;
    owner: CompanyOwner;
    membership: CompanyMembership;
    version: number;
    country_code: string | undefined;
}

export interface CompanyBusiness {
    id: string;
    name: string;
}

export interface CompanyBusinessType {
    id: number;
    name: string;
}

export interface CompanyOwner {
    first_name: string;
    last_name: string;
    email: string;
    mobile_phone: string;
}

export interface CompanyMembership {
    id: number;
    app_id: number;
    code: string;
    name: string;
    variant: MembershipVariant;
    price: MembershipPrice;
    start_date: string;
    expired_date: string;
    status: string;
    user_limit: number;
    department_limit: number;
    app_name: string;
    customer_id: number;
    storage: MembershipStorage;
}

export interface MembershipVariantItem {
    id: number;
    app_id: number;
    code: string;
    name: string;
    variant: MembershipVariant;
    price: MembershipPrice;
    start_date: string;
    expired_date: string;
    status: string;
    user_limit: number;
    department_limit: number;
}

export interface MembershipVariant {
    id: number;
    name: string;
    country: string;
    feature: Record<string, boolean>;
}

export interface MembershipPrice {
    id: number;
    currency: string | null;
    gross_amount: number | null;
    net_amount: number | null;
    description: string | null;
    note: string | null;
}

export interface MembershipStorage {
    id: number;
    type: string;
    currency: string;
    price: number;
    quota: number;
    usage: {
        attachment_size: number;
        db_size: number;
        total: number;
    };
}

export interface CompanyAddon {
    id: number;
    invoice: {
        number: string;
        status: {
            id: number;
            name: string;
        };
    };
    addon: {
        id: number;
        type: string;
        name: string;
        key: string;
    };
    start_date: string;
    expired_date: string;
    day: number;
}

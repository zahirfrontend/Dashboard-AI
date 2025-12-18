import { z } from "zod";
import { createStorage } from "./base/storage";

export { useStorageValue } from "./hooks/use_storage_value";

const membershipVariantSchema = z.object({
    id: z.number(),
    name: z.string(),
    country: z.string(),
    feature: z.record(z.string(), z.boolean()),
});

const membershipPriceSchema = z.object({
    id: z.number(),
    currency: z.string().nullable(),
    gross_amount: z.number().nullable(),
    net_amount: z.number().nullable(),
    description: z.string().nullable(),
    note: z.string().nullable(),
});

const membershipStorageSchema = z.object({
    id: z.number(),
    type: z.string(),
    currency: z.string(),
    price: z.number(),
    quota: z.number(),
    usage: z.object({
        attachment_size: z.number(),
        db_size: z.number(),
        total: z.number(),
    }),
});

const companyMembershipSchema = z.object({
    id: z.number(),
    app_id: z.number(),
    code: z.string(),
    name: z.string(),
    variant: membershipVariantSchema,
    price: membershipPriceSchema,
    start_date: z.string(),
    expired_date: z.string(),
    status: z.string(),
    user_limit: z.number(),
    department_limit: z.number(),
    app_name: z.string(),
    customer_id: z.number(),
    storage: membershipStorageSchema,
});

const companySchema = z.object({
    id: z.string(),
    name: z.string(),
    slug: z.string(),
    slug_alias: z.string(),
    business: z.object({
        id: z.string(),
        name: z.string(),
    }),
    business_type: z.object({
        id: z.number(),
        name: z.string(),
    }),
    is_active: z.boolean(),
    is_on_premise: z.boolean(),
    owner: z.object({
        first_name: z.string(),
        last_name: z.string(),
        email: z.string(),
        mobile_phone: z.string(),
    }),
    membership: companyMembershipSchema,
    version: z.number(),
    country_code: z.string().optional(),
});

const companyAddonSchema = z.object({
    id: z.number(),
    invoice: z.object({
        number: z.string(),
        status: z.object({
            id: z.number(),
            name: z.string(),
        }),
    }),
    addon: z.object({
        id: z.number(),
        type: z.string(),
        name: z.string(),
        key: z.string(),
    }),
    start_date: z.string(),
    expired_date: z.string(),
    day: z.number(),
});

const membershipVariantItemSchema = z.object({
    id: z.number(),
    app_id: z.number(),
    code: z.string(),
    name: z.string(),
    variant: membershipVariantSchema,
    price: membershipPriceSchema,
    start_date: z.string(),
    expired_date: z.string(),
    status: z.string(),
    user_limit: z.number(),
    department_limit: z.number(),
});

const userCompanyDetailSchema = z.object({
    id: z.string(),
    slug: z.string(),
    email: z.string(),
    mobile_number: z.string(),
    zahir_id: z.number(),
    last_login: z.string(),
    is_super_admin: z.boolean(),
    acl: z.unknown().nullable(),
    company: companySchema,
    company_addons: z.array(companyAddonSchema),
    created_at: z.string(),
    updated_at: z.string(),
    custom_features: z.array(z.string()),
    membership_variants: z.array(membershipVariantItemSchema),
});

export const storage = createStorage(
    {
        accessToken: z.string(),
        companyId: z.string(),
        slug: z.string(),
        userCompany: userCompanyDetailSchema,
    },
    { prefix: "zi" }
);

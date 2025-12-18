export interface CompanyTableItem {
    id: string;
    slug: string;
    name: string;
    version: string;
    edition: string;
    expiry: string;
    status: "Trial" | "Active" | "Not Active";
}

import CompanyListView from "@modules/company/ui/views/company_list_view";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Company List",
};

export default function CompanyListPage() {
    return <CompanyListView />;
}

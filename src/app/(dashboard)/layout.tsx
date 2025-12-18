import React from "react";
import DashboardLayout from "@modules/dashboard/ui/layout/dashboard_layout";

export default function DashboardLayoutWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    return <DashboardLayout>{children}</DashboardLayout>;
}

import LoginView from "@modules/auth/ui/views/auth_view";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Login",
};

export default function LoginPage() {
    return <LoginView />;
}

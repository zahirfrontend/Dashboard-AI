"use client";

import React, { useState } from "react";
import { Input } from "@core/ui/base/input";
import { Button } from "@core/ui/base/button";

interface PromptInputProps {
    onSubmit: (prompt: string) => void;
    isLoading?: boolean;
    placeholder?: string;
}

export function PromptInput({
    onSubmit,
    isLoading = false,
    placeholder = "Deskripsikan bisnis Anda... (contoh: toko online fashion, restoran, SaaS)",
}: PromptInputProps) {
    const [value, setValue] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (value.trim() && !isLoading) {
            onSubmit(value.trim());
            setValue("");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <Input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={placeholder}
                disabled={isLoading}
                className="flex-1"
            />
            <Button type="submit" disabled={!value.trim() || isLoading}>
                {isLoading ? "Generating..." : "Generate Dashboard"}
            </Button>
        </form>
    );
}

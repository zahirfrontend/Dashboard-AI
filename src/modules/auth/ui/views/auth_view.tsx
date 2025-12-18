"use client";

import React, { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Button } from "@core/ui/base/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@core/ui/base/card";
import { Input } from "@core/ui/base/input";
import { EyeIcon } from "@hugeicons/core-free-icons";
import { Field, FieldGroup, FieldLabel } from "@core/ui/base/field";
import { useLogin } from "@modules/auth/hooks/mutations/use_login.hook";
import { Eye, EyeClosed, EyeOff } from "lucide-react";

export default function LoginView() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const loginMutation = useLogin();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        loginMutation.mutate({ email, password });
    };

    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-white">
            <Card className="w-full max-w-md bg-transparent border-none ring-0">
                <CardHeader className="text-center">
                    <CardTitle className="font-bold text-2xl">
                        Sign In
                    </CardTitle>
                    <CardDescription>
                        Sign in to your zahir account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {loginMutation.isError && (
                        <div className="rounded-md bg-red-50 p-3 text-sm text-red-600 mb-4">
                            {loginMutation.error?.message || "Login failed"}
                        </div>
                    )}
                    <form onSubmit={handleSubmit}>
                        <FieldGroup>
                            <div className="space-y-3">
                                <Field>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        required
                                        disabled={loginMutation.isPending}
                                    />
                                </Field>
                                <Field>
                                    <div className="relative">
                                        <Input
                                            id="password"
                                            type={
                                                showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            placeholder="Enter your password"
                                            value={password}
                                            onChange={(e) =>
                                                setPassword(e.target.value)
                                            }
                                            required
                                            disabled={loginMutation.isPending}
                                        />
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowPassword(!showPassword)
                                            }
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-600 focus:outline-none"
                                        >
                                            {showPassword ? (
                                                <Eye className="size-4 text-neutral-400" />
                                            ) : (
                                                <EyeOff className="size-4 text-neutral-400" />
                                            )}
                                        </button>
                                    </div>
                                </Field>
                            </div>

                            <Field orientation="vertical">
                                <Button
                                    type="submit"
                                    disabled={loginMutation.isPending}
                                >
                                    {loginMutation.isPending
                                        ? "Logging in..."
                                        : "Login"}
                                </Button>
                            </Field>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

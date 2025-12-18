"use client";

import { useState } from "react";
import { useChat } from "@ai-sdk/react";
import { Card, CardContent, CardHeader, CardTitle } from "@core/ui/base/card";
import { Button } from "@core/ui/base/button";
import type {
    Widget,
    StatsWidget,
    GenerateDashboardOutput,
} from "@modules/dashboard/models/widget.types";
import { DefaultChatTransport } from "ai";
import { PromptInput } from "../components/prompt_input";
import { WidgetGrid } from "../components/widgets/widget_grid";
import { WidgetShimmer } from "../components/widgets/widget_shimmer";
import { Pencil } from "lucide-react";

export default function DashboardView() {
    const [showPrompt, setShowPrompt] = useState(false);
    const { messages, sendMessage, status } = useChat({
        transport: new DefaultChatTransport({
            api: "/api/dashboard",
        }),
    });

    const isLoading = status === "streaming" || status === "submitted";

    const handleSubmit = (prompt: string) => {
        sendMessage({ text: prompt });
        setShowPrompt(false);
    };

    const renderWidgets = () => {
        return messages.map((message) => {
            if (message.role !== "assistant") return null;

            return message.parts.map((part, index) => {
                if (part.type === "tool-generateDashboard") {
                    const toolPart = part as any;

                    switch (toolPart.state) {
                        case "input-streaming":
                        case "input-available":
                            return (
                                <WidgetShimmer
                                    key={`shimmer-${message.id}-${index}`}
                                />
                            );
                        case "output-available": {
                            const output =
                                toolPart.output as GenerateDashboardOutput;
                            if (output) {
                                return (
                                    <WidgetGrid
                                        key={`grid-${message.id}-${index}`}
                                        summary={output.summary}
                                        highlights={output.highlights}
                                    />
                                );
                            }
                            return null;
                        }
                        case "output-error":
                            return (
                                <div
                                    key={`error-${message.id}-${index}`}
                                    className="text-red-500"
                                >
                                    Error: {toolPart.errorText}
                                </div>
                            );
                        default:
                            return null;
                    }
                }
                return null;
            });
        });
    };

    const hasWidgets = messages.length > 0;

    if (!hasWidgets) {
        return (
            <div className="flex h-[80vh] flex-col items-center justify-center space-y-6">
                <div className="text-center space-y-2">
                    <h1 className="text-2xl font-bold">
                        Selamat datang di zahir online
                    </h1>
                    <p className="text-muted-foreground">
                        Deskripsikan bisnis Anda untuk generate widget dashboard
                        yang relevan
                    </p>
                </div>
                <div className="w-full max-w-2xl">
                    <div>
                        <PromptInput
                            onSubmit={handleSubmit}
                            isLoading={isLoading}
                        />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">
                    Hi, selamat datang di zahir online
                </h2>
                <Button
                    variant="outline"
                    onClick={() => setShowPrompt(!showPrompt)}
                    className="gap-2"
                >
                    <Pencil className="size-4" />
                    Edit Widget
                </Button>
            </div>

            {showPrompt && (
                <div>
                    <PromptInput
                        onSubmit={handleSubmit}
                        isLoading={isLoading}
                    />
                </div>
            )}

            <div className="min-h-100">
                {isLoading &&
                    messages[messages.length - 1]?.role === "user" && (
                        <div className="py-12 flex justify-center">
                            <span className="text-sm text-muted-foreground animate-pulse font-medium">
                                Lagi generate widget kamu, bentar yak...
                            </span>
                        </div>
                    )}
                {renderWidgets()}
            </div>
        </div>
    );
}

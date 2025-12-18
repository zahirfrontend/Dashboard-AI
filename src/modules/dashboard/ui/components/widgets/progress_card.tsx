import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@core/ui/base/card";
import type { ProgressWidget } from "@modules/dashboard/models/widget.types";

interface ProgressCardProps {
    widget: ProgressWidget;
}

export function ProgressCard({ widget }: ProgressCardProps) {
    const { title, current, target, unit } = widget;
    const percentage = Math.min((current / target) * 100, 100);
    const isComplete = percentage >= 100;

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium">
                            {current.toLocaleString()} / {target.toLocaleString()}
                            {unit && ` ${unit}`}
                        </span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                        <div
                            className={`h-full rounded-full transition-all ${
                                isComplete ? "bg-green-500" : "bg-blue-500"
                            }`}
                            style={{ width: `${percentage}%` }}
                        />
                    </div>
                    <div className="text-right text-xs text-muted-foreground">
                        {percentage.toFixed(1)}% tercapai
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@core/ui/base/card";
import type { TableWidget } from "@modules/dashboard/models/widget.types";

interface TableCardProps {
    widget: TableWidget;
}

export function TableCard({ widget }: TableCardProps) {
    const { title, columns, rows } = widget;

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b">
                                {columns?.map((col, i) => (
                                    <th
                                        key={`col-${i}`}
                                        className="text-left py-2 px-2 font-medium text-muted-foreground"
                                    >
                                        {col}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {rows?.map((row, rowIndex) => (
                                <tr
                                    key={`row-${rowIndex}`}
                                    className="border-b last:border-0"
                                >
                                    {row.map((cell, cellIndex) => (
                                        <td
                                            key={`cell-${rowIndex}-${cellIndex}`}
                                            className="py-2 px-2"
                                        >
                                            {cell}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </CardContent>
        </Card>
    );
}

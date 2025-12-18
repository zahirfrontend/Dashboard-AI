import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@core/ui/base/card";
import type { ChartWidget } from "@modules/dashboard/models/widget.types";

interface ChartCardProps {
    widget: ChartWidget;
}

function SimpleLineChart({ data }: { data: { label: string; value: number }[] }) {
    if (!data || data.length === 0) return null;
    
    const maxValue = Math.max(...data.map((d) => d.value));
    const minValue = Math.min(...data.map((d) => d.value));
    const range = maxValue - minValue || 1;
    // Normalized height coordinate system (0 to 100)
    const height = 100;
    const width = 100;

    const points = data
        .map((d, i) => {
            const x = (i / (data.length - 1)) * width;
            const y = height - ((d.value - minValue) / range) * height;
            return `${x},${y}`;
        })
        .join(" ");

    return (
        <div className="w-full h-[250px] flex items-center justify-center p-2">
            <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full" preserveAspectRatio="none">
                {/* Grid lines */}
                <line x1="0" y1="25" x2="100" y2="25" stroke="#e5e7eb" strokeWidth="0.5" />
                <line x1="0" y1="50" x2="100" y2="50" stroke="#e5e7eb" strokeWidth="0.5" />
                <line x1="0" y1="75" x2="100" y2="75" stroke="#e5e7eb" strokeWidth="0.5" />
                
                <polyline
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    points={points}
                    className="text-blue-500 vector-effect-non-scaling-stroke"
                />
                {data.map((d, i) => {
                    const x = (i / (data.length - 1)) * width;
                    const y = height - ((d.value - minValue) / range) * height;
                    return (
                        <circle
                            key={`point-${i}`}
                            cx={x}
                            cy={y}
                            r="2"
                            className="fill-blue-500 hover:r-4 transition-all"
                        />
                    );
                })}
            </svg>
        </div>
    );
}

function SimpleBarChart({ data }: { data: { label: string; value: number }[] }) {
    if (!data || data.length === 0) return null;
    
    const maxValue = Math.max(...data.map((d) => d.value)) || 1;

    return (
        <div className="flex items-end gap-4 h-[250px] w-full p-2">
            {data.map((d, i) => (
                <div key={`bar-${i}`} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                     <div className="text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                        {d.value}
                    </div>
                    <div
                        className="w-full bg-blue-500 rounded-t hover:bg-blue-600 transition-colors"
                        style={{ height: `${(d.value / maxValue) * 80}%` }}
                    />
                    <span className="text-xs text-muted-foreground truncate w-full text-center">
                        {d.label}
                    </span>
                </div>
            ))}
        </div>
    );
}

function SimplePieChart({ data }: { data: { label: string; value: number }[] }) {
    if (!data || data.length === 0) return null;
    
    const total = data.reduce((sum, d) => sum + d.value, 0) || 1;
    const colors = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899"];
    
    let currentAngle = 0;
    const paths = data.map((d, i) => {
        const angle = (d.value / total) * 360;
        const startAngle = currentAngle;
        const endAngle = currentAngle + angle;
        currentAngle = endAngle;

        const startRad = (startAngle - 90) * (Math.PI / 180);
        const endRad = (endAngle - 90) * (Math.PI / 180);

        const x1 = 50 + 40 * Math.cos(startRad);
        const y1 = 50 + 40 * Math.sin(startRad);
        const x2 = 50 + 40 * Math.cos(endRad);
        const y2 = 50 + 40 * Math.sin(endRad);

        const largeArc = angle > 180 ? 1 : 0;

        return (
            <path
                key={`slice-${i}`}
                d={`M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArc} 1 ${x2} ${y2} Z`}
                fill={colors[i % colors.length]}
                className="hover:opacity-80 transition-opacity cursor-pointer"
            />
        );
    });

    return (
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 h-[250px] w-full">
            <svg viewBox="0 0 100 100" className="w-48 h-48">
                {paths}
            </svg>
            <div className="flex flex-col gap-2 text-sm">
                {data.map((d, i) => (
                    <div key={`legend-${i}`} className="flex items-center gap-2">
                        <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: colors[i % colors.length] }}
                        />
                        <span className="text-muted-foreground">{d.label}</span>
                        <span className="font-medium ml-auto">{Math.round((d.value/total)*100)}%</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export function ChartCard({ widget }: ChartCardProps) {
    const { title, chartType, data } = widget;

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
            </CardHeader>
            <CardContent>
                {chartType === "line" && <SimpleLineChart data={data} />}
                {chartType === "bar" && <SimpleBarChart data={data} />}
                {chartType === "pie" && <SimplePieChart data={data} />}
            </CardContent>
        </Card>
    );
}

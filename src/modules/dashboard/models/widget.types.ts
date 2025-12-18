export type WidgetType = "stats" | "chart" | "table" | "progress";
export type WidgetSize = "small" | "medium" | "large";
export type ChartType = "line" | "bar" | "pie";
export type TrendDirection = "up" | "down";

export interface BaseWidget {
    id: string;
    type: WidgetType;
    title: string;
    size: WidgetSize;
}

export interface StatsWidget extends BaseWidget {
    type: "stats";
    value: string;
    change?: {
        value: number;
        trend: TrendDirection;
    };
    icon?: string;
}

export interface ChartDataPoint {
    label: string;
    value: number;
}

export interface ChartWidget extends BaseWidget {
    type: "chart";
    chartType: ChartType;
    data: ChartDataPoint[];
}

export interface TableWidget extends BaseWidget {
    type: "table";
    columns: string[];
    rows: string[][];
}

export interface ProgressWidget extends BaseWidget {
    type: "progress";
    current: number;
    target: number;
    unit?: string;
}

export type Widget = StatsWidget | ChartWidget | TableWidget | ProgressWidget;

export interface GenerateDashboardOutput {
    businessType: string;
    summary: StatsWidget[];
    highlights: Widget[];
}

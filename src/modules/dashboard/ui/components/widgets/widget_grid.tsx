import type { Widget, StatsWidget } from "@modules/dashboard/models/widget.types";
import { StatsCard } from "./stats_card";
import { ChartCard } from "./chart_card";
import { TableCard } from "./table_card";
import { ProgressCard } from "./progress_card";
import { cn } from "@common/utils/cn";

interface WidgetGridProps {
    summary?: StatsWidget[];
    highlights?: Widget[];
}

function getGridSpan(widget: Widget): string {
    switch (widget.size) {
        case "small":
            return "col-span-12 sm:col-span-6 lg:col-span-3";
        case "medium":
            return "col-span-12 lg:col-span-6";
        case "large":
            return "col-span-12";
        default:
            return "col-span-12 lg:col-span-6";
    }
}

function WidgetRenderer({ widget }: { widget: Widget }) {
    switch (widget.type) {
        case "stats":
            return <StatsCard widget={widget} />;
        case "chart":
            return <ChartCard widget={widget} />;
        case "table":
            return <TableCard widget={widget} />;
        case "progress":
            return <ProgressCard widget={widget} />;
        default:
            return null;
    }
}

export function WidgetGrid({ summary, highlights }: WidgetGridProps) {
    if ((!summary || summary.length === 0) && (!highlights || highlights.length === 0)) {
        return null;
    }

    return (
        <div className="space-y-8">
            {/* Summary Section - Fixed 4 cols */}
            {summary && summary.length > 0 && (
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {summary.map((widget) => (
                        <div key={widget.id} className="h-full">
                            <WidgetRenderer widget={widget} />
                        </div>
                    ))}
                </div>
            )}
            
            {/* Highlights Section - Mixed Grid */}
            {highlights && highlights.length > 0 && (
                <div className="grid grid-cols-12 gap-6 auto-rows-auto grid-flow-dense">
                    {highlights.map((widget) => (
                        <div key={widget.id} className={cn("h-fit", getGridSpan(widget))}>
                            <WidgetRenderer widget={widget} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

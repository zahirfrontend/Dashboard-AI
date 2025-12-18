import { cn } from "@common/utils/cn";

function ShimmerCard({ className }: { className?: string }) {
    return (
        <div
            className={cn(
                "animate-pulse rounded-xl bg-gray-200 dark:bg-gray-700",
                className
            )}
        >
            <div className="p-6 space-y-4">
                <div className="h-4 w-1/2 rounded bg-gray-300 dark:bg-gray-600" />
                <div className="h-8 w-3/4 rounded bg-gray-300 dark:bg-gray-600" />
                <div className="h-3 w-1/3 rounded bg-gray-300 dark:bg-gray-600" />
            </div>
        </div>
    );
}

export function WidgetShimmer() {
    return (
        <div className="grid grid-cols-12 gap-4 auto-rows-min">
            {/* Stats row shimmer - 4 cards */}
            {Array.from({ length: 4 }).map((_, index) => (
                <ShimmerCard
                    key={`stats-shimmer-${index}`}
                    className="col-span-6 sm:col-span-3 lg:col-span-3 h-28"
                />
            ))}
            
            {/* Other widgets shimmer - charts, tables, progress */}
            {/* 2 medium charts */}
            <ShimmerCard className="col-span-12 sm:col-span-6 lg:col-span-6 h-64" />
            <ShimmerCard className="col-span-12 sm:col-span-6 lg:col-span-6 h-64" />
            
            {/* 2 tables/progress */}
            <ShimmerCard className="col-span-12 sm:col-span-6 lg:col-span-6 h-72" />
            <ShimmerCard className="col-span-12 sm:col-span-6 lg:col-span-6 h-48" />
        </div>
    );
}

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@core/ui/base/card";
import type { StatsWidget } from "@modules/dashboard/models/widget.types";
import { cn } from "@common/utils/cn";
import { 
    DollarSign, 
    ShoppingCart, 
    Users, 
    Package, 
    Activity, 
    TrendingUp, 
    TrendingDown,
    CreditCard,
    Briefcase,
    Percent,
    BarChart3,
    Wallet
} from "lucide-react";

interface StatsCardProps {
    widget: StatsWidget;
}

const iconMap: Record<string, React.ElementType> = {
    "currency-dollar": DollarSign,
    "shopping-cart": ShoppingCart,
    "users": Users,
    "package": Package,
    "activity": Activity,
    "trending-up": TrendingUp,
    "trending-down": TrendingDown,
    "credit-card": CreditCard,
    "briefcase": Briefcase,
    "percent": Percent,
    "chart-bar": BarChart3,
    "wallet": Wallet,
    // Add fallbacks or variations
    "money": DollarSign,
    "dollar": DollarSign,
    "cart": ShoppingCart,
    "user": Users,
    "box": Package
};

export function StatsCard({ widget }: StatsCardProps) {
    const { title, value, change, icon } = widget;
    
    // Normalize icon name: lowercase and remove spaces if any
    const normalizedIcon = icon?.toLowerCase().trim();
    const IconComponent = normalizedIcon ? iconMap[normalizedIcon] : null;

    return (
        <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                    {title}
                </CardTitle>
                {IconComponent && <IconComponent className="h-4 w-4 text-muted-foreground" />}
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                {change && (
                    <p
                        className={cn(
                            "text-xs mt-1",
                            change.trend === "up"
                                ? "text-green-600"
                                : "text-red-600"
                        )}
                    >
                        {change.trend === "up" ? "↑" : "↓"} {Math.abs(change.value)}%
                        <span className="text-muted-foreground ml-1">vs bulan lalu</span>
                    </p>
                )}
            </CardContent>
        </Card>
    );
}

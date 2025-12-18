import React from "react";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-background">
            {/* Grid Pattern Top Left */}
            <div className="absolute top-0 left-0 w-150 h-150 pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#a3a3a3_1px,transparent_1px),linear-gradient(to_bottom,#a3a3a3_1px,transparent_1px)] bg-size-[40px_40px] opacity-30 mask-[radial-gradient(ellipse_at_top_left,black,transparent_70%)]" />
            </div>

            {/* Grid Pattern Bottom Right */}
            <div className="absolute bottom-0 right-0 w-150 h-150 pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#a3a3a3_1px,transparent_1px),linear-gradient(to_bottom,#a3a3a3_1px,transparent_1px)] bg-size-[40px_40px] opacity-30 mask-[radial-gradient(ellipse_at_bottom_right,black,transparent_70%)]" />
            </div>

            {children}

            <div className="absolute bottom-4 left-4">
                <p className="text-xs text-muted-foreground">
                    Nextjs template by @rianllauo
                </p>
            </div>
        </div>
    );
}

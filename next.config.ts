import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    async rewrites() {
        return [
            {
                source: "/api/auth/:path*",
                destination: "https://account.zahir.id/api/v3/:path*",
            },
            {
                source: "/api/v2/:path*",
                destination: "https://go.zahironline.com/api/v2/:path*",
            },
        ];
    },
};

export default nextConfig;

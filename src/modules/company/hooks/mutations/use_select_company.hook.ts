"use client";

import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { storage } from "@core/lib/storage";
import { getDetailCompanyService } from "@modules/company/services/get_detail_company.service";

interface SelectCompanyParams {
    id: string;
    slug: string;
}

export function useSelectCompany() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const selectCompany = useCallback(
        async ({ id, slug }: SelectCompanyParams) => {
            setIsLoading(true);
            setError(null);

            try {
                const response = await getDetailCompanyService.exec(id);

                storage.set("companyId", response.company.id);
                storage.set("slug", slug);
                storage.set("userCompany", response);

                router.push("/home");
            } catch (err) {
                const message =
                    err instanceof Error
                        ? err.message
                        : "Failed to get company detail";
                setError(message);
            } finally {
                setIsLoading(false);
            }
        },
        [router]
    );

    return { selectCompany, isLoading, error };
}

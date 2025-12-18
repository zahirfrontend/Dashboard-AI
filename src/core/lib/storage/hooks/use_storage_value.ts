"use client";

import { useState, useEffect, useRef } from "react";

interface UseStorageValueResult<T> {
    value: T | undefined;
    isReady: boolean;
}

export function useStorageValue<T>(
    getter: () => { success: boolean; data?: T; error?: string }
): UseStorageValueResult<T> {
    const [isReady, setIsReady] = useState(false);
    const [value, setValue] = useState<T | undefined>(undefined);
    const getterRef = useRef(getter);
    getterRef.current = getter;

    useEffect(() => {
        const result = getterRef.current();
        if (result.success && result.data !== undefined) {
            setValue(result.data);
        }
        setIsReady(true);
    }, []);

    return { value, isReady };
}

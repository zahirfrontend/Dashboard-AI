"use client";

import type {
    StorageOptions,
    StorageResult,
    StorageSchema,
    TypedStorage,
} from "./types";

export function createStorage<TSchema extends StorageSchema>(
    schema: TSchema,
    options?: StorageOptions
): TypedStorage<TSchema> {
    const prefix = options?.prefix ?? "";

    function getFullKey(key: keyof TSchema): string {
        return prefix ? `${prefix}:${String(key)}` : String(key);
    }

    function getStorage(): Storage | null {
        return window.localStorage;
    }

    return {
        get<K extends keyof TSchema>(
            key: K
        ): StorageResult<TSchema[K]["_output"]> {
            const storage = getStorage();
            if (!storage) {
                return { success: false, error: "Storage not available" };
            }

            try {
                const fullKey = getFullKey(key);
                const raw = storage.getItem(fullKey);

                if (raw === null) {
                    return { success: false, error: "Key not found" };
                }

                const parsed = JSON.parse(raw);
                const validator = schema[key];

                if (!validator) {
                    return {
                        success: false,
                        error: "Schema not found for key",
                    };
                }

                const result = validator.safeParse(parsed);
                if (!result.success) {
                    return { success: false, error: result.error.message };
                }

                return { success: true, data: result.data };
            } catch (error) {
                const message =
                    error instanceof Error
                        ? error.message
                        : "Failed to read from storage";
                return { success: false, error: message };
            }
        },

        set<K extends keyof TSchema>(
            key: K,
            value: TSchema[K]["_input"]
        ): StorageResult<void> {
            const storage = getStorage();
            if (!storage) {
                return { success: false, error: "Storage not available" };
            }

            try {
                const validator = schema[key];
                if (!validator) {
                    return {
                        success: false,
                        error: "Schema not found for key",
                    };
                }

                const result = validator.safeParse(value);
                if (!result.success) {
                    return { success: false, error: result.error.message };
                }

                const fullKey = getFullKey(key);
                storage.setItem(fullKey, JSON.stringify(result.data));
                return { success: true };
            } catch (error) {
                const message =
                    error instanceof Error
                        ? error.message
                        : "Failed to write to storage";
                return { success: false, error: message };
            }
        },

        remove(key: keyof TSchema): void {
            const storage = getStorage();
            if (!storage) return;

            try {
                const fullKey = getFullKey(key);
                storage.removeItem(fullKey);
            } catch {
                // Silent fail
            }
        },

        clear(): void {
            const storage = getStorage();
            if (!storage) return;

            try {
                const schemaKeys = Object.keys(schema);
                for (const key of schemaKeys) {
                    const fullKey = getFullKey(key);
                    storage.removeItem(fullKey);
                }
            } catch {
                // Silent fail
            }
        },

        has(key: keyof TSchema): boolean {
            const storage = getStorage();
            if (!storage) return false;

            try {
                const fullKey = getFullKey(key);
                return storage.getItem(fullKey) !== null;
            } catch {
                return false;
            }
        },

        keys(): (keyof TSchema)[] {
            return Object.keys(schema);
        },
    };
}

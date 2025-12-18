import type { ZodType } from "zod";

export interface StorageSchema {
    [key: string]: ZodType;
}

export interface StorageOptions {
    prefix?: string;
}

export interface StorageResult<T> {
    success: boolean;
    data?: T;
    error?: string;
}

export interface TypedStorage<TSchema extends StorageSchema> {
    get<K extends keyof TSchema>(key: K): StorageResult<TSchema[K]["_output"]>;
    set<K extends keyof TSchema>(key: K, value: TSchema[K]["_input"]): StorageResult<void>;
    remove(key: keyof TSchema): void;
    clear(): void;
    has(key: keyof TSchema): boolean;
    keys(): (keyof TSchema)[];
}

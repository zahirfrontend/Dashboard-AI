export type LogLevel = "trace" | "debug" | "info" | "warn" | "error" | "fatal";

export interface LogContext {
    [key: string]: unknown;
}

export interface Logger {
    trace(message: string, context?: LogContext): void;
    debug(message: string, context?: LogContext): void;
    info(message: string, context?: LogContext): void;
    warn(message: string, context?: LogContext): void;
    error(message: string, context?: LogContext): void;
    fatal(message: string, context?: LogContext): void;
    child(bindings: LogContext): Logger;
}

export interface LoggerConfig {
    level?: LogLevel;
    name?: string;
    enabled?: boolean;
}

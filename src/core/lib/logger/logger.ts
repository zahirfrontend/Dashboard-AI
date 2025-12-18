import pino, { type Logger as PinoLogger } from "pino";
import type { Logger, LogContext, LoggerConfig, LogLevel } from "./types";

const isServer = typeof window === "undefined";
const isDevelopment = process.env.NODE_ENV === "development";

function createPinoLogger(config?: LoggerConfig): PinoLogger {
    const level: LogLevel = config?.level ?? (isDevelopment ? "debug" : "info");
    const name = config?.name ?? "app";

    if (isServer) {
        return pino({
            name,
            level,
            ...(isDevelopment && {
                transport: {
                    target: "pino-pretty",
                    options: {
                        colorize: true,
                        translateTime: "SYS:standard",
                        ignore: "pid,hostname",
                    },
                },
            }),
        });
    }

    return pino({
        name,
        level,
        browser: {
            asObject: true,
        },
    });
}

function wrapPinoLogger(pinoLogger: PinoLogger): Logger {
    return {
        trace: (message: string, context?: LogContext) => {
            if (context) pinoLogger.trace(context, message);
            else pinoLogger.trace(message);
        },
        debug: (message: string, context?: LogContext) => {
            if (context) pinoLogger.debug(context, message);
            else pinoLogger.debug(message);
        },
        info: (message: string, context?: LogContext) => {
            if (context) pinoLogger.info(context, message);
            else pinoLogger.info(message);
        },
        warn: (message: string, context?: LogContext) => {
            if (context) pinoLogger.warn(context, message);
            else pinoLogger.warn(message);
        },
        error: (message: string, context?: LogContext) => {
            if (context) pinoLogger.error(context, message);
            else pinoLogger.error(message);
        },
        fatal: (message: string, context?: LogContext) => {
            if (context) pinoLogger.fatal(context, message);
            else pinoLogger.fatal(message);
        },
        child: (bindings: LogContext) => wrapPinoLogger(pinoLogger.child(bindings)),
    };
}

export function createLogger(config?: LoggerConfig): Logger {
    if (config?.enabled === false) {
        const noop = () => {};
        const noopLogger: Logger = {
            trace: noop,
            debug: noop,
            info: noop,
            warn: noop,
            error: noop,
            fatal: noop,
            child: () => noopLogger,
        };
        return noopLogger;
    }

    const pinoLogger = createPinoLogger(config);
    return wrapPinoLogger(pinoLogger);
}

export const logger = createLogger();

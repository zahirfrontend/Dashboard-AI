import { tool } from "ai";
import { z } from "zod";

const baseWidgetSchema = z.object({
    id: z.string().describe("Unique identifier for the widget"),
    title: z.string().describe("Widget title"),
    size: z.enum(["small", "medium", "large"]).describe("Widget size in grid"),
});

const statsWidgetSchema = baseWidgetSchema.extend({
    type: z.literal("stats"),
    value: z.string().describe("The main value to display"),
    change: z.object({
        value: z.number(),
        trend: z.enum(["up", "down"]),
    }).optional().describe("Change indicator"),
    icon: z.string().optional().describe("Icon name"),
});

const chartWidgetSchema = baseWidgetSchema.extend({
    type: z.literal("chart"),
    chartType: z.enum(["line", "bar", "pie"]),
    data: z.array(z.object({
        label: z.string(),
        value: z.number(),
    })).describe("Data points"),
});

const tableWidgetSchema = baseWidgetSchema.extend({
    type: z.literal("table"),
    columns: z.array(z.string()).describe("Column headers"),
    rows: z.array(z.array(z.string())).describe("Row data"),
});

const progressWidgetSchema = baseWidgetSchema.extend({
    type: z.literal("progress"),
    current: z.number(),
    target: z.number(),
    unit: z.string().optional(),
});

// Union schema for highlights section (charts, tables, progress)
const highlightWidgetSchema = z.union([
    chartWidgetSchema, 
    tableWidgetSchema, 
    progressWidgetSchema
]);

export const dashboardTools = {
    generateDashboard: tool({
        description: "Generate a structured dashboard layout with summary stats and detailed highlights.",
        inputSchema: z.object({
            businessType: z.string().describe("The type of business identified from user input"),
            summary: z.array(statsWidgetSchema).min(4).max(4).describe("Exactly 4 key metrics for the top row"),
            highlights: z.array(highlightWidgetSchema).describe("Detailed widgets (charts, tables) for the main section"),
        }),
        execute: async ({ businessType, summary, highlights }) => {
            return { businessType, summary, highlights };
        },
    }),
};

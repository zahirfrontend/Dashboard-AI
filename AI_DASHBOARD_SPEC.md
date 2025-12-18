# AI Dashboard Widget Generator - Spec & Plan

## Overview

Fitur AI yang memungkinkan user generate widget dashboard secara dinamis melalui prompt. AI akan menganalisis input user (tipe bisnis, preferensi) dan generate widget-widget yang relevan dengan placeholder data.

## Tech Stack

- **AI SDK**: Vercel AI SDK v5 (`ai`, `@ai-sdk/react`)
- **Model**: MiniMax-M2-Stable (via existing Anthropic adapter)
- **UI**: React components dengan Tailwind CSS

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      Dashboard View                          │
│  ┌─────────────────────────────────────────────────────┐    │
│  │         Prompt Input (describe your business)        │    │
│  └─────────────────────────────────────────────────────┘    │
│                            │                                 │
│                            ▼                                 │
│  ┌─────────────────────────────────────────────────────┐    │
│  │              Widget Grid Container                   │    │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐            │    │
│  │  │ Widget 1 │ │ Widget 2 │ │ Widget 3 │ ...        │    │
│  │  └──────────┘ └──────────┘ └──────────┘            │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
              ┌─────────────────────────┐
              │   POST /api/dashboard   │
              │   (AI SDK streamText)   │
              └─────────────────────────┘
                            │
                            ▼
              ┌─────────────────────────┐
              │   Tool: generateWidgets │
              │   Returns: Widget[]     │
              └─────────────────────────┘
```

---

## File Structure (New/Modified)

```
src/
├── app/api/dashboard/
│   └── route.ts                 # NEW: AI endpoint untuk dashboard
├── modules/dashboard/
│   ├── ai/
│   │   └── tools.ts             # NEW: AI tools definition
│   ├── models/
│   │   └── widget.types.ts      # NEW: Widget type definitions
│   ├── ui/
│   │   ├── views/
│   │   │   └── dashboard_view.tsx   # MODIFY: Add prompt + widget grid
│   │   └── components/
│   │       ├── prompt_input.tsx     # NEW: Input component
│   │       ├── widget_grid.tsx      # NEW: Grid container
│   │       ├── widget_shimmer.tsx   # NEW: Loading skeleton
│   │       └── widgets/
│   │           ├── stats_card.tsx   # NEW: Stats widget
│   │           ├── chart_card.tsx   # NEW: Chart widget  
│   │           ├── table_card.tsx   # NEW: Table widget
│   │           └── progress_card.tsx # NEW: Progress widget
```

---

## Widget Types

```typescript
type WidgetType = "stats" | "chart" | "table" | "progress";

interface BaseWidget {
  id: string;
  type: WidgetType;
  title: string;
  size: "small" | "medium" | "large"; // Grid span
}

interface StatsWidget extends BaseWidget {
  type: "stats";
  value: string;
  change?: { value: number; trend: "up" | "down" };
  icon?: string;
}

interface ChartWidget extends BaseWidget {
  type: "chart";
  chartType: "line" | "bar" | "pie";
  data: { label: string; value: number }[];
}

interface TableWidget extends BaseWidget {
  type: "table";
  columns: string[];
  rows: string[][];
}

interface ProgressWidget extends BaseWidget {
  type: "progress";
  current: number;
  target: number;
  unit?: string;
}

type Widget = StatsWidget | ChartWidget | TableWidget | ProgressWidget;
```

---

## AI Tool Definition

```typescript
// src/modules/dashboard/ai/tools.ts
import { tool } from "ai";
import { z } from "zod";

const widgetSchema = z.object({
  id: z.string(),
  type: z.enum(["stats", "chart", "table", "progress"]),
  title: z.string(),
  size: z.enum(["small", "medium", "large"]),
  // Type-specific fields (all optional)
  value: z.string().optional(),           // stats
  change: z.object({ value: z.number(), trend: z.enum(["up", "down"]) }).optional(),
  chartType: z.enum(["line", "bar", "pie"]).optional(),  // chart
  data: z.array(z.object({ label: z.string(), value: z.number() })).optional(),
  columns: z.array(z.string()).optional(),  // table
  rows: z.array(z.array(z.string())).optional(),
  current: z.number().optional(),           // progress
  target: z.number().optional(),
  unit: z.string().optional(),
});

export const dashboardTools = {
  generateWidgets: tool({
    description: "Generate dashboard widgets based on business type",
    inputSchema: z.object({
      businessType: z.string(),
      widgets: z.array(widgetSchema),
    }),
    execute: async ({ businessType, widgets }) => {
      return { businessType, widgets };
    },
  }),
};
```

---

## API Route

```typescript
// src/app/api/dashboard/route.ts
import { streamText, UIMessage, convertToModelMessages } from "ai";
import { createAnthropic } from "@ai-sdk/anthropic";
import { dashboardTools } from "@modules/dashboard/ai/tools";

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const model = createAnthropic({
    baseURL: "https://api.minimax.io/anthropic/v1",
    apiKey: "YOUR_API_KEY",
  });

  const result = streamText({
    model: model("MiniMax-M2-Stable"),
    system: `Kamu adalah AI assistant untuk generate dashboard widgets...`,
    messages: convertToModelMessages(messages),
    tools: dashboardTools,
    toolChoice: "required", // Force tool usage, no text response
  });

  return result.toUIMessageStreamResponse();
}
```

---

## Client Implementation

### Dashboard View

```typescript
// Key implementation points - AI SDK v5
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";

const { messages, sendMessage, status } = useChat({
  transport: new DefaultChatTransport({
    api: "/api/dashboard",
  }),
});

const isLoading = status === "streaming" || status === "submitted";

// Render logic - tool part states
{messages.map(msg => 
  msg.parts.map(part => {
    if (part.type === "tool-generateWidgets") {
      switch (part.state) {
        case "input-streaming":
        case "input-available":
          return <WidgetShimmer count={5} />;
        case "output-available":
          return <WidgetGrid widgets={part.output.widgets} />;
        case "output-error":
          return <div>Error: {part.errorText}</div>;
      }
    }
    return null;
  })
)}
```

### Loading Shimmer

```typescript
// Animated skeleton saat AI processing
const WidgetShimmer = ({ count }: { count: number }) => (
  <div className="grid grid-cols-4 gap-4">
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className="animate-pulse bg-gray-200 rounded-xl h-32" />
    ))}
  </div>
);
```

---

## User Flow

1. User buka dashboard, melihat input prompt
2. User ketik: "Saya punya bisnis online shop fashion"
3. AI processing → Shimmer widgets muncul
4. AI selesai → Widget grid ter-render dengan:
   - Stats: Total Orders, Revenue, Customers
   - Chart: Sales trend line chart
   - Table: Top products
   - Progress: Monthly target

---

## Implementation Steps

1. **Create types**: `widget.types.ts`
2. **Create AI tool**: `ai/tools.ts`  
3. **Create API route**: `app/api/dashboard/route.ts`
4. **Create widget components**: 
   - `widget_shimmer.tsx`
   - `stats_card.tsx`, `chart_card.tsx`, `table_card.tsx`, `progress_card.tsx`
   - `widget_grid.tsx`
5. **Create prompt input**: `prompt_input.tsx`
6. **Update dashboard view**: Integrate semua komponen

---

## Notes

- Data placeholder untuk MVP, integrasi real data di fase berikutnya
- Tidak ada text response dari AI, pure widget output
- Widget menggunakan existing Card component dari `@core/ui/base/card`
- Chart menggunakan simple SVG atau placeholder visual (tanpa library tambahan untuk MVP)

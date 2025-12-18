import { streamText, type UIMessage, convertToModelMessages } from "ai";
import { createAnthropic } from "@ai-sdk/anthropic";
import { dashboardTools } from "@modules/dashboard/ai/tools";

export async function POST(req: Request) {
    const { messages }: { messages: UIMessage[] } = await req.json();

    const model = createAnthropic({
        baseURL: "https://api.minimax.io/anthropic/v1",
        apiKey: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJHcm91cE5hbWUiOiJSaWFuIEtyaXN0aWFuIiwiVXNlck5hbWUiOiJSaWFuIEtyaXN0aWFuIiwiQWNjb3VudCI6IiIsIlN1YmplY3RJRCI6IjE5ODQyNzI2MTg4Mjc1NTA4MTQiLCJQaG9uZSI6IiIsIkdyb3VwSUQiOiIxOTg0MjcyNTc5MzUwNzY1NjYzIiwiUGFnZU5hbWUiOiIiLCJNYWlsIjoicmlhbmxhdW8xMUBnbWFpbC5jb20iLCJDcmVhdGVUaW1lIjoiMjAyNS0xMi0xNiAxMjoxMTozMCIsIlRva2VuVHlwZSI6MSwiaXNzIjoibWluaW1heCJ9.QaXnOglHksRYl5aQg1hNNYemvC6I9fglaJ992oPez3ZO02TSr15SFtsLUmNxcvnLRoeV6NuHW_sq0nYXeYSsP2GPR0wBNGzDhoYeHqyFz3uXS1yE9WeCUUcL0xFONxJnSaXL3UlXXGe-FoFaUMQmOYQfz1Pn7zVqMAaYbY16fN8kLV5QH9nMe3vgxQMJ5UQlds3h0jNqWZyfcarGJWVpAZNup6Y05X5ABJ9c7cLcG58ASRR00Z0fuQw4wsJfN3ZqqexI6BtIRRIggSIxM4jhhBkNbJ62zL1P_-DWRO695cB9zQhvEOBRwHPLxKr4lxGGolkBOUw390MkbuWORvXSjg",
    });

    const result = streamText({
        model: model("MiniMax-M2-Stable"),
        temperature: 0.7,
        system: `Kamu adalah AI assistant untuk generate dashboard widgets bisnis.

INSTRUKSI PENTING:
1. Analisis deskripsi bisnis dari user
2. WAJIB panggil tool "generateDashboard" untuk membuat layout dashboard
3. JANGAN balas dengan text biasa, HANYA gunakan tool

STRUKTUR DASHBOARD YANG HARUS DIHASILKAN:
1. SECTION SUMMARY (Stats):
   - WAJIB generate TEPAT 4 stats widgets
   - size: "small"
   - Contoh: Total Penjualan, Order Baru, Pelanggan, Produk Terlaris

2. SECTION HIGHLIGHTS (Charts/Tables):
   - Generate minimal 2-4 widgets detail
   - PRIORITASKAN size "medium" (setengah lebar) untuk visualisasi standar
   - GUNAKAN size "large" (lebar penuh) HANYA untuk tabel data yang panjang/lebar

GUIDE UKURAN WIDGET:
- Chart: 
  - Pie/Donut -> "medium" (SELALU medium)
  - Line/Bar sederhana -> "medium" (Disarankan)
  - Complex chart dengan banyak data point -> "large"
- Table:
  - Top 5 Products/Items -> "medium" (Cukup 2-3 kolom)
  - Detail transactions/Inventory -> "large" (4+ kolom)

CONTOH OUTPUT LAYOUT YANG BAIK:
- Summary: [Stat1, Stat2, Stat3, Stat4]
- Highlights: [Chart1(medium), Chart2(medium), Table1(large), Chart3(medium), Table2(medium)]

PENTING: Buat data placeholder yang REALISTIS. Gunakan Bahasa Indonesia.`,
        messages: convertToModelMessages(messages),
        tools: dashboardTools,
        toolChoice: "required",
    });

    return result.toUIMessageStreamResponse();
}

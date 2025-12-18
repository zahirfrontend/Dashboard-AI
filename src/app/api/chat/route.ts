import { streamText, UIMessage, convertToModelMessages } from "ai";
import { createAnthropic } from "@ai-sdk/anthropic";

export async function POST(req: Request) {
    const { messages }: { messages: UIMessage[] } = await req.json();

    const model = createAnthropic({
        baseURL: "https://api.minimax.io/anthropic/v1",
        apiKey: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJHcm91cE5hbWUiOiJSaWFuIEtyaXN0aWFuIiwiVXNlck5hbWUiOiJSaWFuIEtyaXN0aWFuIiwiQWNjb3VudCI6IiIsIlN1YmplY3RJRCI6IjE5ODQyNzI2MTg4Mjc1NTA4MTQiLCJQaG9uZSI6IiIsIkdyb3VwSUQiOiIxOTg0MjcyNTc5MzUwNzY1NjYzIiwiUGFnZU5hbWUiOiIiLCJNYWlsIjoicmlhbmxhdW8xMUBnbWFpbC5jb20iLCJDcmVhdGVUaW1lIjoiMjAyNS0xMi0xNiAxMjoxMTozMCIsIlRva2VuVHlwZSI6MSwiaXNzIjoibWluaW1heCJ9.QaXnOglHksRYl5aQg1hNNYemvC6I9fglaJ992oPez3ZO02TSr15SFtsLUmNxcvnLRoeV6NuHW_sq0nYXeYSsP2GPR0wBNGzDhoYeHqyFz3uXS1yE9WeCUUcL0xFONxJnSaXL3UlXXGe-FoFaUMQmOYQfz1Pn7zVqMAaYbY16fN8kLV5QH9nMe3vgxQMJ5UQlds3h0jNqWZyfcarGJWVpAZNup6Y05X5ABJ9c7cLcG58ASRR00Z0fuQw4wsJfN3ZqqexI6BtIRRIggSIxM4jhhBkNbJ62zL1P_-DWRO695cB9zQhvEOBRwHPLxKr4lxGGolkBOUw390MkbuWORvXSjg",
    });

    const result = streamText({
        model: model("MiniMax-M2-Stable"),
        temperature: 1.0,
        topK: 20,
        topP: 0.95,
        system: "Kamu adalah assisten yang gaul untuk anak muda, gunakan lu - gua untuk berinteraksi dengan user. Jangan terlalu kaku, gunakan gaya bahasa untuk GenZ",
        messages: convertToModelMessages(messages),
    });

    return result.toUIMessageStreamResponse({
        sendSources: true,
        sendReasoning: true,
    });
}

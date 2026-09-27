import { NextRequest } from "next/server";
import { systemPrompt } from "@/data/assistant";
import { profile } from "@/data/portfolio";

const MODEL = process.env.GOOGLE_AI_MODEL ?? "gemini-3.5-flash";
const MAX_MESSAGE_LENGTH = 800;
/** Enough turns to hold a conversation, few enough that the prompt can't be padded out. */
const MAX_TURNS = 20;
const REQUEST_TIMEOUT_MS = 25_000;

/** Per-IP window. In-memory, so it resets on cold start — a speed bump, not a bank vault. */
const RATE_LIMIT = { max: 20, windowMs: 10 * 60 * 1000 };
const hits = new Map<string, number[]>();

type IncomingMessage = {
  role?: unknown;
  content?: unknown;
};

type GeminiPart = { text?: string; thought?: boolean };

function isRateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((time) => now - time < RATE_LIMIT.windowMs);

  if (recent.length >= RATE_LIMIT.max) {
    hits.set(ip, recent);
    return true;
  }

  recent.push(now);
  hits.set(ip, recent);

  // The map is process-local; drop stale keys so a long-lived instance doesn't grow forever.
  if (hits.size > 500) {
    for (const [key, times] of hits) {
      if (times.every((time) => now - time >= RATE_LIMIT.windowMs)) hits.delete(key);
    }
  }

  return false;
}

function normalise(messages: unknown) {
  if (!Array.isArray(messages)) return null;

  const cleaned = messages
    .slice(-MAX_TURNS)
    .map((message: IncomingMessage) => ({
      role: message?.role === "assistant" ? "model" : "user",
      text: typeof message?.content === "string" ? message.content.trim().slice(0, MAX_MESSAGE_LENGTH) : "",
    }))
    .filter((message) => message.text.length > 0);

  if (!cleaned.length || cleaned[cleaned.length - 1].role !== "user") return null;

  return cleaned;
}

export async function POST(request: NextRequest) {
  const apiKey = process.env.GOOGLE_AI_API_KEY;
  if (!apiKey) {
    return Response.json(
      { error: `The assistant is not configured yet. Email ${profile.email} instead.` },
      { status: 503 },
    );
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  if (isRateLimited(ip)) {
    return Response.json(
      { error: `That's a lot of questions. Give it a few minutes, or email ${profile.email}.` },
      { status: 429 },
    );
  }

  let payload: { messages?: unknown };

  try {
    payload = (await request.json()) as { messages?: unknown };
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const messages = normalise(payload.messages);
  if (!messages) {
    return Response.json({ error: "Ask me a question first." }, { status: 422 });
  }

  let response: Response;

  try {
    response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey,
        },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: systemPrompt }] },
          contents: messages.map((message) => ({
            role: message.role,
            parts: [{ text: message.text }],
          })),
          generationConfig: {
            temperature: 0.1,
            maxOutputTokens: 900,
            // Short factual answers off a fixed profile don't need deliberation.
            thinkingConfig: { thinkingLevel: "low" },
          },
        }),
        signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
      },
    );
  } catch {
    return Response.json(
      { error: `That took too long. Try again, or email ${profile.email}.` },
      { status: 504 },
    );
  }

  if (!response.ok) {
    return Response.json({ error: "The assistant is unavailable right now." }, { status: 502 });
  }

  const result = (await response.json()) as {
    candidates?: { content?: { parts?: GeminiPart[] } }[];
  };

  // Gemini returns its reasoning as parts flagged `thought`; only the plain parts are the answer.
  const reply = (result.candidates?.[0]?.content?.parts ?? [])
    .filter((part) => !part.thought && typeof part.text === "string")
    .map((part) => part.text)
    .join("")
    .trim();

  if (!reply) {
    return Response.json({
      reply: `I couldn't answer that one. Email ${profile.email} and Rutik will reply himself.`,
    });
  }

  return Response.json({ reply });
}

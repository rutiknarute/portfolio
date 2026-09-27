"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { MessageSquareText, Send, X } from "lucide-react";
import { assistant } from "@/data/assistant";
import { profile } from "@/data/portfolio";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export function ChatAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [draft, setDraft] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  // Keep the newest turn in view as the conversation grows.
  useEffect(() => {
    const log = logRef.current;
    if (log) log.scrollTop = log.scrollHeight;
  }, [messages, pending, open]);

  useEffect(() => {
    if (!open) return;

    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open]);

  async function send(question: string) {
    const text = question.trim();
    if (!text || pending) return;

    const next: Message[] = [...messages, { role: "user", content: text }];

    setMessages(next);
    setDraft("");
    setError("");
    setPending(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });

      const result = (await response.json()) as { reply?: string; error?: string };

      if (!response.ok || !result.reply) {
        setError(result.error ?? "Something went wrong. Try again in a moment.");
        return;
      }

      setMessages([...next, { role: "assistant", content: result.reply }]);
    } catch {
      setError(`I couldn't reach the assistant. Email ${profile.email} instead.`);
    } finally {
      setPending(false);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void send(draft);
  }

  return (
    <div className="chat-assistant">
      {open && (
        <section className="chat-panel" role="dialog" aria-label={`${assistant.name}, ${assistant.role}`}>
          <header className="chat-panel__head">
            <span className="chat-avatar" aria-hidden="true">
              <MessageSquareText size={19} />
            </span>
            <span className="chat-identity">
              <strong>{assistant.name}</strong>
              <small>{assistant.role}</small>
            </span>
            <button type="button" className="chat-close" onClick={() => setOpen(false)} aria-label="Close assistant">
              <X size={18} aria-hidden="true" />
            </button>
          </header>

          <div className="chat-log" ref={logRef}>
            <div className="chat-intro">
              <p>{assistant.greeting}</p>
              <p>{assistant.followUp}</p>
            </div>

            <div className="chat-thread" role="log" aria-live="polite">
              {messages.map((message, index) => (
                <p
                  key={`${message.role}-${index}`}
                  className={message.role === "user" ? "chat-message chat-message--user" : "chat-message"}
                >
                  {message.content}
                </p>
              ))}

              {pending && (
                <p className="chat-typing" aria-label={`${assistant.name} is typing`}>
                  <span /><span /><span />
                </p>
              )}

              {error && <p className="chat-error" role="alert">{error}</p>}
            </div>
          </div>

          {messages.length === 0 && (
            <div className="chat-prompts">
              {assistant.prompts.map((prompt) => (
                <button key={prompt} type="button" onClick={() => void send(prompt)} disabled={pending}>
                  {prompt}
                </button>
              ))}
            </div>
          )}

          <form className="chat-composer" onSubmit={handleSubmit}>
            <input
              ref={inputRef}
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder="Ask a question"
              aria-label="Ask a question"
              maxLength={800}
              autoComplete="off"
              disabled={pending}
            />
            <button type="submit" aria-label="Send message" disabled={pending || !draft.trim()}>
              <Send size={17} aria-hidden="true" />
            </button>
          </form>

          <p className="chat-disclaimer">
            Answers use Rutik&apos;s shared information and resume and may contain mistakes. To confirm details,
            email <a href={`mailto:${profile.email}`}>{profile.email}</a>.
          </p>
        </section>
      )}

      <button
        type="button"
        className="chat-launcher"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
      >
        {open ? <X size={19} aria-hidden="true" /> : <MessageSquareText size={19} aria-hidden="true" />}
        <span>{open ? "Close" : "Ask about me"}</span>
      </button>
    </div>
  );
}

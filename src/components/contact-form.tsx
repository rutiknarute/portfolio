"use client";

import { FormEvent, useState } from "react";
import { ArrowUpRight, LoaderCircle } from "lucide-react";

type FormState = "idle" | "sending" | "sent" | "fallback";

export function ContactForm() {
  const [state, setState] = useState<FormState>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("sending");

    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = (await response.json()) as { delivered?: boolean };

      if (!response.ok || result.delivered === false) {
        setState("fallback");
        return;
      }

      form.reset();
      setState("sent");
    } catch {
      setState("fallback");
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="contact-form__row">
        <label>
          <span>Name</span>
          <input name="name" type="text" autoComplete="name" required maxLength={80} />
        </label>
        <label>
          <span>Email</span>
          <input name="email" type="email" autoComplete="email" required maxLength={120} />
        </label>
      </div>
      <label>
        <span>What are we building?</span>
        <textarea name="message" rows={4} required minLength={20} maxLength={3000} />
      </label>
      <label className="contact-form__honeypot" aria-hidden="true">
        Website
        <input name="website" type="text" tabIndex={-1} autoComplete="off" />
      </label>
      <div className="contact-form__footer">
        <p aria-live="polite">
          {state === "sent" && "Message sent. I’ll reply soon."}
          {state === "fallback" && (
            <>
              Delivery is not configured yet. Email me at{" "}
              <a href="mailto:rutiknarute25@gmail.com">rutiknarute25@gmail.com</a>.
            </>
          )}
          {(state === "idle" || state === "sending") && "Usually replies within two business days."}
        </p>
        <button className="button button--primary" type="submit" disabled={state === "sending"}>
          {state === "sending" ? (
            <><LoaderCircle className="spin" size={18} aria-hidden="true" /> Sending</>
          ) : (
            <>Send message <ArrowUpRight size={18} aria-hidden="true" /></>
          )}
        </button>
      </div>
    </form>
  );
}

/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import PageAnimatedWrapper from "@/components/PageAnimatedWrapper";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const t = useTranslations("contact");
  const locale = useLocale();
  const router = useRouter();

  const handelSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");

    const res = await fetch("https://formspree.io/f/xpwpjark", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify({ name, email, message }),
    });

    const data = await res.json();
    if (data.ok || res.status === 200) {
      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
      router.push(`/${locale}/thank`);
    } else {
      setStatus("error");
    }

    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <PageAnimatedWrapper>
      <div className="max-w-xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-sky-600">{t("title")}</h1>
        <form className="space-y-4" onSubmit={handelSubmit}>
          <div>
            <label className="block font-medium mb-1">{t("name")}</label>
            <input
              type="text"
              name="name"
              required
              onChange={(e) => setName(e.target.value)}
              className="border p-2 w-full rounded"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">{t("email")}</label>
            <input
              type="email"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border p-2 w-full rounded"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">{t("message")}</label>
            <textarea
              name="message"
              rows={4}
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="border p-2 w-full rounded"
            />
          </div>
          <button
            type="submit"
            className="bg-sky-500 text-white px-4 py-2 rounded hover:bg-sky-600 flex items-center justify-center gap-2"
            disabled={status === "sending"}
          >
            {status === "sending" ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                {t("sending")}
              </>
            ) : (
              t("submit")
            )}
          </button>
        </form>

        <div aria-live="polite">
          {showToast && (
            <p
              className={`text-sm ${
                status === "success" ? "text-green-600" : "text-red-600"
              }`}
            >
              {status === "success" ? t("success") : t("error")}
            </p>
          )}
        </div>
      </div>
    </PageAnimatedWrapper>
  );
}

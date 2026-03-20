import { useState } from "react";
import { X } from "lucide-react";
import Hero from "./components/Hero";

function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <div className="relative h-full">
      <Hero
        title="We embed AI in your business DNA"
        description="Custom AI for your business: agents, workflow automations, and fine‑tuned LLMs delivered as production‑grade applications. Senior engineers, security‑first, measurable ROI."
        onCtaClick={() => setIsContactOpen(true)}
      />

      {isContactOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6 md:px-8">
          <button
            type="button"
            className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(69,191,211,0.18),transparent_38%),linear-gradient(135deg,rgba(3,7,18,0.92),rgba(15,23,42,0.84))] backdrop-blur-md"
            aria-label="Close contact popup"
            onClick={() => setIsContactOpen(false)}
          />
          <div className="relative z-10 w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/15 bg-white/82 shadow-[0_28px_120px_rgba(2,8,23,0.45)] backdrop-blur-xl">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#45BFD3] to-transparent" />
            <div className="grid gap-0 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)]">
              <div className="relative overflow-hidden bg-[linear-gradient(160deg,#f8fdff_0%,#edf8fb_46%,#e0f5f8_100%)] p-6 md:p-8">
                <div className="absolute -left-12 top-10 h-40 w-40 rounded-full bg-[#45BFD3]/18 blur-3xl" />
                <div className="absolute bottom-0 right-0 h-48 w-48 translate-x-10 translate-y-10 rounded-full bg-slate-900/10 blur-3xl" />
                <div className="relative">
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#0f6d7b]">
                    Project Intake
                  </p>
                  <h2 className="mt-4 max-w-xs text-3xl font-light tracking-tight text-slate-950">
                    Tell us what you want AI to do
                  </h2>
                  <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-600">
                    Share the workflow, bottleneck, or outcome you want to improve. We review
                    every brief directly and reply with a practical next step.
                  </p>
                  <div className="mt-8 space-y-3 text-sm text-slate-700">
                    <div className="rounded-2xl border border-white/60 bg-white/65 px-4 py-3 shadow-sm">
                      Senior team review within one business day
                    </div>
                    <div className="rounded-2xl border border-white/60 bg-white/65 px-4 py-3 shadow-sm">
                      Best fit for AI agents, internal tools, and workflow automation
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative bg-white/70 p-2 md:p-3">
                <button
                  type="button"
                  className="absolute right-5 top-5 z-20 inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200/80 bg-white/90 text-slate-700 shadow-sm transition hover:scale-105 hover:bg-white"
                  aria-label="Close contact popup"
                  onClick={() => setIsContactOpen(false)}
                >
                  <X className="h-5 w-5" />
                </button>
                <div className="overflow-hidden rounded-[1.35rem] border border-slate-200/80 bg-white shadow-inner">
                  <iframe
                    src="https://app.youform.com/forms/r9h71i28"
                    loading="lazy"
                    width="100%"
                    height="700"
                    frameBorder="0"
                    marginHeight={0}
                    marginWidth={0}
                    title="Resonance contact form"
                    style={{ border: "none" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default App

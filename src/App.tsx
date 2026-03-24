import { useState } from "react";
import { X } from "lucide-react";
import Hero from "./components/Hero";

function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const serviceCards = [
    {
      title: "AI Agents",
      description:
        "Agents that retrieve context and take action across internal systems.",
    },
    {
      title: "Workflow Automation",
      description:
        "Automate repetitive work across email, CRM, ERP, and support tools.",
    },
    {
      title: "Domain-Tuned Models",
      description:
        "Fine-tuned and domain-tuned models built for your workflows, language, and decisions.",
    },
  ];

  const useCases = [
    {
      title: "Customer support",
      description: "AI triage, drafting, and escalation.",
    },
    {
      title: "Operations",
      description: "Multi-step workflows across approvals and systems.",
    },
    {
      title: "Knowledge teams",
      description: "Domain-aware assistants over proprietary docs and SOPs.",
    },
    {
      title: "Revenue operations",
      description: "Routing, enrichment, follow-up, and pipeline hygiene.",
    },
    {
      title: "Compliance and risk",
      description: "Review workflows, policy checks, and audit-ready traceability.",
    },
  ];

  const processSteps = [
    {
      step: "01",
      title: "Identify the highest-value workflow",
      description: "Pick the best first use case and define success.",
    },
    {
      step: "02",
      title: "Build and validate in production conditions",
      description: "Add evals, review paths, and integration logic.",
    },
    {
      step: "03",
      title: "Deploy, monitor, and iterate",
      description: "Launch with observability, controls, and iteration.",
    },
  ];

  return (
    <main className="relative min-h-screen bg-white text-slate-950">
      <Hero
        eyebrow="Production AI systems"
        title="Custom AI solutions for ambitious businesses"
        description="We design, build, and ship AI agents, workflow automation, and domain-tuned models that reduce manual work and create measurable operational ROI."
        serviceLine="AI agents • Workflow automation • Domain-tuned models"
        ctaText="Let's Talk"
        onCtaClick={() => setIsContactOpen(true)}
      />

      <section className="relative z-10 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-20">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#0f6d7b]">
              What We Build
            </p>
            <h2 className="mt-4 text-3xl font-light tracking-tight text-slate-950 md:text-4xl">
              Three ways to put AI into production
            </h2>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {serviceCards.map((card) => (
              <article
                key={card.title}
                className="rounded-[1.75rem] border border-slate-200/80 bg-[linear-gradient(180deg,#ffffff_0%,#f5fbfc_100%)] p-6 shadow-[0_18px_60px_rgba(15,23,42,0.06)]"
              >
                <h3 className="text-xl font-medium tracking-tight text-slate-950">{card.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-700">{card.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 bg-[linear-gradient(180deg,#f9fcfd_0%,#eef8fb_100%)]">
        <div className="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-20">
          <div className="grid gap-12 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#0f6d7b]">
                Where AI Creates Value
              </p>
              <h2 className="mt-4 text-3xl font-light tracking-tight text-slate-950 md:text-4xl">
                Outcomes that map
              </h2>
              <div className="mt-8 grid gap-4">
                {useCases.map((useCase) => (
                  <div
                    key={useCase.title}
                    className="rounded-[1.5rem] border border-white/80 bg-white/80 p-5 shadow-sm backdrop-blur-sm"
                  >
                    <h3 className="text-base font-semibold tracking-tight text-slate-950">{useCase.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-700">{useCase.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#0f6d7b]">
                How We Work
              </p>
              <h2 className="mt-4 text-3xl font-light tracking-tight text-slate-950 md:text-4xl">
                Delivery model for live operations
              </h2>
              <div className="mt-8 space-y-4">
                {processSteps.map((step) => (
                  <div
                    key={step.step}
                    className="rounded-[1.6rem] border border-slate-200/80 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)]"
                  >
                    <div className="text-sm font-semibold tracking-[0.24em] text-[#0f6d7b]">{step.step}</div>
                    <h3 className="mt-3 text-xl font-medium tracking-tight text-slate-950">{step.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-slate-700">{step.description}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-[1.75rem] border border-[#45BFD3]/25 bg-[linear-gradient(135deg,rgba(69,191,211,0.12),rgba(255,255,255,0.9))] p-6">
                <p className="text-sm leading-relaxed text-slate-700">
                  Built for CRM, ERP, support, and internal tool integrations with review paths,
                  observability, and production controls from day one.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

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
                    AI Strategy Call
                  </p>
                  <h2 className="mt-4 max-w-xs text-3xl font-light tracking-tight text-slate-950">
                    Review the workflow you want AI to improve
                  </h2>
                  <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-600">
                    Share the process, bottleneck, or business outcome you want to improve.
                    We review every brief directly and come back with a practical first step.
                  </p>
                  <div className="mt-8 space-y-3 text-sm text-slate-700">
                    <div className="rounded-2xl border border-white/60 bg-white/65 px-4 py-3 shadow-sm">
                      Senior team review within one business day
                    </div>
                    <div className="rounded-2xl border border-white/60 bg-white/65 px-4 py-3 shadow-sm">
                      Best fit for AI agents, workflow automation, and production AI applications
                    </div>
                    <div className="rounded-2xl border border-white/60 bg-white/65 px-4 py-3 shadow-sm">
                      We look for the best first use case, integration risks, and ROI potential
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
    </main>
  );
}

export default App

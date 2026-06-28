import { useState } from "react";
import { ChevronDown, X } from "lucide-react";
import CompanyBrainFlow from "./components/CompanyBrainFlow";
import Hero from "./components/Hero";
import {
  faqs,
  homePage,
  navLinks,
  processSteps,
  proofPoints,
  servicePages,
  useCasePages,
} from "./seo/content";

function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  return (
    <main className="relative min-h-screen bg-white text-slate-950">
      <Hero
        eyebrow={homePage.heroEyebrow}
        title={homePage.h1}
        description={homePage.summary}
        serviceLine={homePage.serviceLine}
        navLinks={navLinks}
        ctaText="Let's Talk"
        ctaHref="/contact/"
        secondaryCtaText="Explore AI agents"
        secondaryCtaHref="/services/ai-agents/"
        ctaSupport="Built for CRM, ERP, support, revenue, and internal operations workflows that need measurable ROI."
        onCtaClick={() => setIsContactOpen(true)}
      />

      <section className="relative z-10 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-20">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#0f6d7b]">
              What We Build
            </p>
            <h2 className="mt-4 text-3xl font-light tracking-tight text-slate-950 md:text-4xl">
              Production AI systems for operations work
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-slate-700 md:text-base">
              Direct answers for teams evaluating AI agents, workflow automation, and
              domain-tuned models for live B2B operations.
            </p>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {servicePages.map((service) => (
              <a
                key={service.path}
                href={service.path}
                className="flex items-center gap-5 rounded-[1.75rem] border border-slate-200/80 bg-[linear-gradient(180deg,#ffffff_0%,#f5fbfc_100%)] p-5 shadow-[0_18px_60px_rgba(15,23,42,0.06)]"
              >
                <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-[1.25rem] border border-[#45BFD3]/20 bg-[linear-gradient(135deg,rgba(69,191,211,0.14),rgba(255,255,255,0.9))]">
                  <div
                    aria-hidden="true"
                    className="h-[76px] w-[62px] bg-[#0f6d7b]"
                    style={{
                      WebkitMaskImage: `url(${service.image})`,
                      maskImage: `url(${service.image})`,
                      WebkitMaskPosition: "center",
                      maskPosition: "center",
                      WebkitMaskRepeat: "no-repeat",
                      maskRepeat: "no-repeat",
                      WebkitMaskSize: "contain",
                      maskSize: "contain",
                    }}
                  />
                </div>
                <div className="min-w-0">
                  <h3 className="text-xl font-medium tracking-tight text-slate-950">{service.shortTitle}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-700">{service.summary}</p>
                  <p className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#0f6d7b]">
                    Read service page
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <CompanyBrainFlow />

      <section className="relative z-10 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-20">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#0f6d7b]">
              Anonymized Proof
            </p>
            <h2 className="mt-4 text-3xl font-light tracking-tight text-slate-950 md:text-4xl">
              Evidence without unsupported claims
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-slate-700 md:text-base">
              {homePage.proofIntro}
            </p>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {proofPoints.map((proof) => (
              <article
                key={proof.title}
                className="rounded-[1.6rem] border border-slate-200/80 bg-[linear-gradient(180deg,#ffffff_0%,#f7fbfc_100%)] p-6 shadow-[0_18px_50px_rgba(15,23,42,0.05)]"
              >
                <h3 className="text-xl font-medium tracking-tight text-slate-950">{proof.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-700">{proof.description}</p>
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
                Use cases for B2B operations leaders
              </h2>
              <div className="mt-8 grid gap-4">
                {useCasePages.map((useCase) => (
                  <a
                    key={useCase.path}
                    href={useCase.path}
                    className="rounded-[1.5rem] border border-white/80 bg-white/80 p-5 shadow-sm backdrop-blur-sm transition hover:border-[#45BFD3]/40 hover:bg-white"
                  >
                    <h3 className="text-base font-semibold tracking-tight text-slate-950">{useCase.shortTitle}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-700">{useCase.summary}</p>
                    <p className="mt-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#0f6d7b]">
                      View use case
                    </p>
                  </a>
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
                <div className="mt-4 flex flex-wrap gap-3 text-sm font-semibold text-[#0f6d7b]">
                  <a href="/services/workflow-automation/">Workflow automation</a>
                  <a href="/services/domain-tuned-models/">Domain-tuned models</a>
                  <a href="/contact/">Contact page</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 bg-[linear-gradient(180deg,#eef8fb_0%,#f8fcfd_42%,#ffffff_100%)]">
        <div className="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-20">
          <div className="grid gap-10 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:gap-12">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#0f6d7b]">
                FAQ
              </p>
              <h2 className="mt-4 text-3xl font-light tracking-tight text-slate-950 md:text-4xl">
                Questions decision-makers and AI systems both ask
              </h2>
              <p className="mt-5 max-w-xl text-sm leading-relaxed text-slate-700 md:text-base">
                This FAQ is written to answer the practical questions that come up when
                teams evaluate AI agents, workflow automation, and domain-tuned models
                for live operations.
              </p>
              <a
                href="/faq/"
                className="mt-6 inline-flex rounded-full border border-[#45BFD3]/25 bg-white px-4 py-2 text-sm font-semibold text-[#0f6d7b] shadow-sm transition hover:border-[#45BFD3]/50"
              >
                Read the full FAQ
              </a>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => {
                const isOpen = openFaqIndex === index;

                return (
                  <article
                    key={faq.question}
                    className="rounded-[1.75rem] border border-white/80 bg-white/85 shadow-[0_18px_60px_rgba(15,23,42,0.08)] backdrop-blur-sm"
                  >
                    <h3>
                      <button
                        type="button"
                        className="flex w-full items-start justify-between gap-4 px-5 py-5 text-left md:px-6"
                        aria-expanded={isOpen}
                        aria-controls={`faq-panel-${index}`}
                        id={`faq-trigger-${index}`}
                        onClick={() => setOpenFaqIndex(isOpen ? -1 : index)}
                      >
                        <span className="pr-2 text-base font-medium tracking-tight text-slate-950 md:text-lg">
                          {faq.question}
                        </span>
                        <span
                          className={`mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#45BFD3]/20 bg-[linear-gradient(135deg,rgba(69,191,211,0.12),rgba(255,255,255,0.95))] text-[#0f6d7b] transition-transform duration-200 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        >
                          <ChevronDown className="h-5 w-5" />
                        </span>
                      </button>
                    </h3>
                    <div
                      id={`faq-panel-${index}`}
                      role="region"
                      aria-labelledby={`faq-trigger-${index}`}
                      className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="px-5 pb-5 md:px-6 md:pb-6">
                          <div className="rounded-[1.4rem] border border-slate-200/70 bg-[linear-gradient(180deg,#ffffff_0%,#f6fbfc_100%)] p-5">
                            <p className="text-sm font-medium leading-relaxed text-slate-900 md:text-[0.98rem]">
                              {faq.answer}
                            </p>
                            <p className="mt-3 text-sm leading-relaxed text-slate-700">
                              {faq.supporting}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
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

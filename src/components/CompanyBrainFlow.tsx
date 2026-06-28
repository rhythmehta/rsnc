import {
  ArrowRight,
  Bot,
  BrainCircuit,
  CheckCircle2,
  Database,
} from "lucide-react";

const dataSources = [
  {
    title: "Codified Knowledge",
    examples: "CRM, ERP, docs, wikis, tickets, databases, records",
    logos: [
      { name: "AWS", src: "/aws.svg" },
      { name: "Salesforce", src: "/salesforce.svg", className: "max-w-[88px]" },
      { name: "SAP", src: "/sap.svg" },
      { name: "Azure", src: "/azure.svg" },
      { name: "HubSpot", src: "/hubspot.svg" },
      { name: "Epic", src: "/epic.svg" },
      { name: "CentralReach", src: "/centralreach.svg" },
    ],
  },
  {
    title: "Tribal Knowledge",
    examples: "Slack, email, meetings, calls, notes, team know-how",
    logos: [
      { name: "Slack", src: "/slack.svg" },
      { name: "Email", src: "/email.svg" },
      { name: "Calls", src: "/calls.svg" },
    ],
  },
];

const intelligenceCapabilities = [
  "Retrieval and memory",
  "Domain understanding",
  "Workflow logic",
  "Guardrails",
  "Reasoning across context",
];

const workerTypes = [
  "Customer support",
  "Sales follow-up",
  "Operations",
  "Finance and admin",
  "Internal knowledge",
  "Patient intake",
  "Care coordination",
];

function FlowArrow() {
  return (
    <div className="hidden items-center justify-center text-[#0f6d7b] lg:flex">
      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#45BFD3]/25 bg-white shadow-[0_14px_36px_rgba(15,109,123,0.10)]">
        <ArrowRight className="h-5 w-5" aria-hidden="true" />
      </div>
    </div>
  );
}

export default function CompanyBrainFlow() {
  return (
    <section className="relative z-10 bg-[linear-gradient(180deg,#ffffff_0%,#f4fbfd_100%)]">
      <div className="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-20">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#0f6d7b]">
            How AI Compounds Knowledge
          </p>
          <h2 className="mt-4 text-3xl font-light tracking-tight text-slate-950 md:text-4xl">
            Company Brain for CRM, ERP, documents, and team knowledge
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-slate-700 md:text-base">
            Codified systems and tribal knowledge become a governed retrieval, memory, and
            workflow layer that powers specialized AI workers across the business.
          </p>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-[minmax(0,0.95fr)_auto_minmax(0,1.35fr)_auto_minmax(0,0.95fr)] lg:items-stretch">
          <article className="rounded-[1.75rem] border border-slate-200/80 bg-white p-5 shadow-[0_18px_60px_rgba(15,23,42,0.06)]">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-medium tracking-tight text-slate-950">
                  Business Data
                </h3>
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#45BFD3]/10 text-[#0f6d7b]">
                <Database className="h-5 w-5" aria-hidden="true" />
              </div>
            </div>

            <div className="mt-6 grid gap-3">
              {dataSources.map((source) => (
                <div
                  key={source.title}
                  className="rounded-[1.25rem] border border-slate-200/80 bg-[linear-gradient(180deg,#ffffff_0%,#f8fcfd_100%)] p-4"
                >
                  <h4 className="text-sm font-semibold tracking-tight text-slate-950">
                    {source.title}
                  </h4>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{source.examples}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {source.logos.map((logo) => (
                      <span
                        key={logo.name}
                        className="flex h-12 min-w-12 items-center justify-center rounded-full border border-[#45BFD3]/20 bg-white px-3.5 shadow-[0_10px_28px_rgba(15,109,123,0.08)]"
                      >
                        <img
                          src={logo.src}
                          alt={`${logo.name} logo`}
                          className={`h-6 object-contain opacity-85 [filter:brightness(0)_saturate(100%)_invert(31%)_sepia(41%)_saturate(1030%)_hue-rotate(143deg)_brightness(88%)_contrast(90%)] ${
                            logo.className ?? "max-w-[68px]"
                          }`}
                          loading="lazy"
                        />
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </article>

          <FlowArrow />

          <article className="rounded-[2rem] border border-[#45BFD3]/30 bg-[linear-gradient(135deg,#ffffff_0%,#eef9fb_100%)] p-5 shadow-[0_24px_80px_rgba(15,109,123,0.12)]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-2xl font-medium tracking-tight text-slate-950">
                  Company Brain
                </h3>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-700">
                  Company-specific context built for how your business actually runs,
                  with evals, access controls, and review paths around production work.
                </p>
              </div>
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#0f6d7b] text-white shadow-[0_14px_36px_rgba(15,109,123,0.22)]">
                <BrainCircuit className="h-6 w-6" aria-hidden="true" />
              </div>
            </div>

            <div className="mt-6 grid gap-4">
              <div className="rounded-[1.35rem] border border-white/90 bg-white/85 p-4 shadow-sm backdrop-blur-sm">
                <ul className="space-y-2">
                  {intelligenceCapabilities.map((capability) => (
                    <li key={capability} className="flex gap-2 text-sm leading-relaxed text-slate-600">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#0f6d7b]" aria-hidden="true" />
                      <span>{capability}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 rounded-[1.1rem] border border-[#45BFD3]/20 bg-[#45BFD3]/10 p-4">
                  <p className="text-sm leading-relaxed text-slate-700">
                    Small, specialized language models tuned to your business for{" "}
                    <strong className="font-semibold text-slate-950">lower cost</strong>,{" "}
                    <strong className="font-semibold text-slate-950">lower latency</strong>, and{" "}
                    <strong className="font-semibold text-slate-950">private deployment</strong>{" "}
                    with data under your control.{" "}
                    <a className="font-semibold text-[#0f6d7b]" href="/services/domain-tuned-models/">
                      Learn about domain-tuned models.
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </article>

          <FlowArrow />

          <article className="rounded-[1.75rem] border border-slate-200/80 bg-white p-5 shadow-[0_18px_60px_rgba(15,23,42,0.06)]">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-medium tracking-tight text-slate-950">AI Workers</h3>
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#45BFD3]/10 text-[#0f6d7b]">
                <Bot className="h-5 w-5" aria-hidden="true" />
              </div>
            </div>

            <div className="mt-6 grid gap-3">
              {workerTypes.map((worker) => (
                <div
                  key={worker}
                  className="flex items-center gap-3 rounded-full border border-[#45BFD3]/20 bg-[#45BFD3]/10 px-4 py-3 text-sm font-medium tracking-tight text-slate-800"
                >
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-[#0f6d7b]" aria-hidden="true" />
                  <span>{worker}</span>
                </div>
              ))}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

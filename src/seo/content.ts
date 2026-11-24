export interface LinkItem {
  label: string;
  href: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  supporting: string;
}

export interface ServicePage {
  kind: "service";
  slug: string;
  path: string;
  shortTitle: string;
  title: string;
  metaDescription: string;
  h1: string;
  eyebrow: string;
  summary: string;
  directAnswer: string;
  image: string;
  serviceType: string;
  bestFor: string[];
  integrations: string[];
  reliability: string[];
  roiMetrics: string[];
  workflowExamples: string[];
  proof: string;
  faqs: FaqItem[];
}

export interface UseCasePage {
  kind: "use-case";
  slug: string;
  path: string;
  shortTitle: string;
  title: string;
  metaDescription: string;
  h1: string;
  eyebrow: string;
  summary: string;
  directAnswer: string;
  buyer: string;
  workflows: string[];
  systems: string[];
  metrics: string[];
  proof: string;
}

export interface SeoPage {
  path: string;
  title: string;
  metaDescription: string;
  h1: string;
  summary: string;
}

interface HomeWorker {
  title: string;
  description: string;
  path: `/use-cases/${string}/`;
  icon: string;
}

export interface HeroWorker {
  title: string;
  description: string;
  icon: string;
}

export interface ClientWork {
  name: string;
  description: string;
  logo?: string;
  darkLogo?: boolean;
  url?: string;
}

export interface SchemaEntity {
  "@type": string;
  "@id"?: string;
  [key: string]: unknown;
}

export const site = {
  name: "Resonance Technology",
  shortName: "Resonance",
  url: "https://rsnc.tech",
  logoPath: "/rsnc-tech-company-logo.png",
  ogImagePath: "/og-resonance-technology.png",
  formUrl: "https://app.youform.com/forms/r9h71i28",
  foundingDate: "2025",
  description:
    "Resonance Technology builds specialized AI workers for B2B teams and a Company Brain that connects them to approved knowledge, rules, and tools.",
};

export const navLinks: LinkItem[] = [
  { label: "Clients", href: "/#clients" },
  { label: "AI workers", href: "/#use-cases" },
  { label: "Services", href: "/#services" },
];

export const homePage: SeoPage = {
  path: "/",
  title: "Custom AI Workers and Company Brain | Resonance Technology",
  metaDescription: site.description,
  h1: "Automate the work round the clock.",
  summary:
    "AI workers for the roles you’d otherwise hire, grounded in your company’s knowledge, rules, and tools.",
};

export const heroWorkers: readonly HeroWorker[] = [
  { title: "Operations coordinator", description: "Route requests and flag exceptions", icon: "list-checks" },
  { title: "Customer support agent", description: "Triage incoming tickets", icon: "inbox" },
  { title: "Inbound sales rep", description: "Qualify and route new leads", icon: "messages-square" },
  { title: "Outbound sales rep", description: "Research accounts and draft follow-ups", icon: "send" },
  { title: "Finance analyst", description: "Prepare reports for close", icon: "credit-card" },
  { title: "Accounts payable clerk", description: "Match invoices to orders", icon: "file-text" },
  { title: "HR coordinator", description: "Route employee requests", icon: "users" },
  { title: "Recruiting coordinator", description: "Schedule interviews and prep briefs", icon: "users" },
  { title: "IT help desk analyst", description: "Handle access and setup requests", icon: "shield-check" },
  { title: "Procurement coordinator", description: "Check vendor requests against policy", icon: "clipboard-check" },
  { title: "Customer success manager", description: "Surface account risks and next steps", icon: "message-square-text" },
  { title: "Marketing coordinator", description: "Adapt campaign content for review", icon: "book-open" },
  { title: "Social media manager", description: "Draft posts for approval", icon: "message-square-text" },
  { title: "Compliance analyst", description: "Gather evidence and flag exceptions", icon: "shield-check" },
  { title: "Data analyst", description: "Summarize recurring reports", icon: "list-checks" },
  { title: "Knowledge specialist", description: "Find policy answers with sources", icon: "book-open" },
];

export const homeWorkers: readonly HomeWorker[] = [
  {
    title: "Support triage",
    description: "Sorts new tickets and routes exceptions.",
    path: "/use-cases/customer-support-ai/",
    icon: "inbox",
  },
  {
    title: "Response drafting",
    description: "Drafts replies using account context and approved support material.",
    path: "/use-cases/customer-support-ai/",
    icon: "message-square-text",
  },
  {
    title: "Request intake",
    description: "Extracts key details and prepares a task for review.",
    path: "/use-cases/operations-ai/",
    icon: "file-input",
  },
  {
    title: "Approval prep",
    description: "Assembles records and documents for a human decision.",
    path: "/use-cases/operations-ai/",
    icon: "clipboard-check",
  },
  {
    title: "Sales follow-up",
    description: "Drafts the next message using account context.",
    path: "/use-cases/revenue-operations-ai/",
    icon: "send",
  },
  {
    title: "CRM record review",
    description: "Flags incomplete records and prepares updates.",
    path: "/use-cases/revenue-operations-ai/",
    icon: "list-checks",
  },
  {
    title: "Internal knowledge",
    description: "Answers staff questions with links to approved sources.",
    path: "/use-cases/knowledge-assistants/",
    icon: "book-open",
  },
  {
    title: "Compliance review prep",
    description: "Gathers evidence and flags policy exceptions for review.",
    path: "/use-cases/compliance-risk-ai/",
    icon: "shield-check",
  },
];

export const servicePages: ServicePage[] = [
  {
    kind: "service",
    slug: "ai-agents",
    path: "/services/ai-agents/",
    shortTitle: "AI Agents",
    title: "AI Agents for B2B Operations | Resonance Technology",
    metaDescription:
      "Custom AI agents for B2B operations teams: retrieve context, follow business rules, update systems, and keep humans in the loop.",
    h1: "AI agents for B2B operations",
    eyebrow: "Service",
    summary:
      "Custom AI agents that retrieve company context, reason over workflow rules, and take approved actions across business systems.",
    directAnswer:
      "Resonance builds AI agents for teams that need to triage work, draft responses, update records, route exceptions, and coordinate multi-step tasks across CRM, ERP, support, and internal tools.",
    image: "/best_ai_agents.svg",
    serviceType: "Custom AI agent design and development",
    bestFor: [
      "High-volume support, operations, revenue, and admin workflows",
      "Processes that require context from more than one system",
      "Tasks where people still need approval, escalation, or exception handling",
    ],
    integrations: ["Salesforce", "HubSpot", "SAP", "Epic", "CentralReach", "Slack", "email", "internal APIs"],
    reliability: [
      "Tool permissions and action limits",
      "Human approval gates for sensitive steps",
      "Evals for common and edge-case requests",
      "Logs, monitoring, and fallback paths",
    ],
    roiMetrics: [
      "Manual handling time",
      "Response and resolution cycle time",
      "Case or task throughput",
      "Error and rework rate",
    ],
    workflowExamples: [
      "Classify inbound requests and gather the missing context before a person reviews them",
      "Draft account, case, or ticket updates from source-system data",
      "Route exceptions to the right owner with supporting evidence",
    ],
    proof:
      "For anonymized deployments, we document before-and-after workflow steps, integration points, eval coverage, handoff rules, and the operational metric the agent is expected to improve.",
    faqs: [
      {
        question: "What makes an AI agent production-ready?",
        answer:
          "A production-ready AI agent has clear permissions, reliable context retrieval, measurable evals, logging, fallback behavior, and human review where the workflow requires it.",
        supporting:
          "The agent should not just answer questions. It should know which tools it can use, what it is allowed to change, when to stop, and when to ask a person for approval.",
      },
      {
        question: "Can AI agents update CRM or ERP records?",
        answer:
          "Yes, when the workflow and permissions support it, AI agents can draft or update records through approved APIs and review gates.",
        supporting:
          "Most operational deployments start with retrieval, drafting, and recommended actions before moving into direct writes for lower-risk steps.",
      },
    ],
  },
  {
    kind: "service",
    slug: "workflow-automation",
    path: "/services/workflow-automation/",
    shortTitle: "Workflow Automation",
    title: "AI Workflow Automation for B2B Operations | Resonance Technology",
    metaDescription:
      "AI workflow automation for B2B teams that need faster approvals, cleaner handoffs, and less repetitive work across business systems.",
    h1: "AI workflow automation for B2B operations",
    eyebrow: "Service",
    summary:
      "Workflow automation that combines LLM reasoning, APIs, business rules, and review paths to move operational work through the right systems.",
    directAnswer:
      "Resonance automates repetitive B2B workflows where teams copy data between tools, review similar requests, wait for approvals, or manually route work across support, operations, revenue, and finance systems.",
    image: "/best_workflow_automations.svg",
    serviceType: "AI workflow automation design and implementation",
    bestFor: [
      "Approval workflows with repeated evidence gathering",
      "Inbox, ticket, document, and queue triage",
      "Cross-system handoffs that currently depend on manual copy-paste",
    ],
    integrations: ["email", "Slack", "CRM", "ERP", "support tools", "document stores", "databases", "internal APIs"],
    reliability: [
      "Business-rule mapping before automation",
      "Step-level audit logs",
      "Exception queues for uncertain outputs",
      "Monitoring for latency, accuracy, and completion rate",
    ],
    roiMetrics: [
      "Approval cycle time",
      "Queue backlog",
      "Manual touches per request",
      "SLA attainment",
    ],
    workflowExamples: [
      "Read inbound requests, extract required fields, and create a structured task",
      "Prepare approval packets from source documents and system records",
      "Notify owners, update status, and escalate stuck work",
    ],
    proof:
      "Anonymized proof focuses on the workflow map, removed manual steps, review requirements, and measurable queue or cycle-time improvements rather than unsupported blanket claims.",
    faqs: [
      {
        question: "Which workflows should be automated first?",
        answer:
          "The best first workflow is frequent, measurable, rule-bound, and painful enough that a small production deployment can show clear operational value.",
        supporting:
          "Good candidates include ticket triage, intake review, approval prep, account enrichment, document processing, and repetitive follow-up.",
      },
      {
        question: "How do you prevent automation from making the wrong change?",
        answer:
          "Sensitive workflow steps use approval gates, limited tool scopes, validation rules, and exception paths before any system of record is changed.",
        supporting:
          "The implementation should separate drafting, recommending, and executing so higher-risk actions can stay under human control.",
      },
    ],
  },
  {
    kind: "service",
    slug: "domain-tuned-models",
    path: "/services/domain-tuned-models/",
    shortTitle: "Domain-Tuned Models",
    title: "Domain-Tuned Models and Retrieval for B2B Operations | Resonance Technology",
    metaDescription:
      "Domain-tuned models, retrieval, evals, and private deployment patterns for teams whose AI needs to understand proprietary workflows and language.",
    h1: "Domain-tuned models for company-specific work",
    eyebrow: "Service",
    summary:
      "Domain-tuned models and retrieval systems that make AI understand company terminology, operating rules, documents, and repeatable decisions.",
    directAnswer:
      "Resonance builds domain-tuned AI systems when generic models do not reliably match the language, policies, decisions, or workflows inside a business.",
    image: "/best_fine_tuned_models.svg",
    serviceType: "Domain-tuned model, fine-tuning, retrieval, and eval development",
    bestFor: [
      "Proprietary terminology and operating procedures",
      "Repeatable judgments that need consistent standards",
      "Private or latency-sensitive deployments",
    ],
    integrations: ["knowledge bases", "document stores", "vector databases", "Postgres", "cloud storage", "internal applications"],
    reliability: [
      "Golden datasets and regression evals",
      "Retrieval quality checks",
      "Model and prompt versioning",
      "Cost, latency, and privacy controls",
    ],
    roiMetrics: [
      "Answer accuracy on domain questions",
      "Escalation and correction rate",
      "Cost per resolved task",
      "Latency for production workflows",
    ],
    workflowExamples: [
      "Answer policy and SOP questions with citations to approved source material",
      "Classify documents or requests using company-specific categories",
      "Support smaller specialized models for predictable internal tasks",
    ],
    proof:
      "For anonymized model work, proof comes from evaluation sets, retrieval audits, error analysis, latency measurements, and the business decisions the model supports.",
    faqs: [
      {
        question: "When is fine-tuning better than retrieval alone?",
        answer:
          "Fine-tuning helps when the model must consistently follow domain-specific language, classification rules, or output patterns that retrieval alone does not fix.",
        supporting:
          "Retrieval is often the first layer for fresh facts. Fine-tuning is useful when behavior, terminology, and repeatable judgment need to become more consistent.",
      },
      {
        question: "Can domain-tuned models run privately?",
        answer:
          "Yes, some domain-tuned systems can use private deployment patterns depending on model choice, latency needs, data controls, and infrastructure constraints.",
        supporting:
          "The right architecture depends on sensitivity, scale, quality requirements, and the cost profile of the workflow.",
      },
    ],
  },
];

export const useCasePages: UseCasePage[] = [
  {
    kind: "use-case",
    slug: "customer-support-ai",
    path: "/use-cases/customer-support-ai/",
    shortTitle: "Customer Support",
    title: "Customer Support AI Agents and Triage | Resonance Technology",
    metaDescription:
      "Customer support AI for triage, drafting, escalation, knowledge retrieval, and measurable support operations improvement.",
    h1: "Customer support AI agents and triage",
    eyebrow: "Use Case",
    summary:
      "AI support workflows that classify inbound work, retrieve customer context, draft responses, and escalate exceptions.",
    directAnswer:
      "Resonance helps support teams use AI to reduce repetitive triage, improve response preparation, and keep complex or sensitive cases under human review.",
    buyer: "Support leaders, operations leaders, and founders managing growing ticket or case volume.",
    workflows: ["Ticket classification", "Response drafting", "Escalation routing", "Knowledge retrieval", "Case summary generation"],
    systems: ["support tools", "CRM", "Slack", "email", "knowledge bases", "internal applications"],
    metrics: ["first response time", "manual handling time", "resolution cycle time", "escalation quality"],
    proof:
      "Anonymized proof should compare the prior support workflow with the AI-assisted path, including review rules and measurable case-handling metrics.",
  },
  {
    kind: "use-case",
    slug: "operations-ai",
    path: "/use-cases/operations-ai/",
    shortTitle: "Operations",
    title: "Operations AI Workflow Automation | Resonance Technology",
    metaDescription:
      "AI workflow automation for operations teams handling approvals, intake, routing, system updates, and cross-functional handoffs.",
    h1: "Operations AI workflow automation",
    eyebrow: "Use Case",
    summary:
      "Automation for multi-step operations work that depends on documents, approvals, queues, and system updates.",
    directAnswer:
      "Resonance builds AI workflows that help operations teams gather evidence, prepare decisions, route work, and update systems with audit-ready controls.",
    buyer: "COOs, operations leads, and teams responsible for process throughput and service levels.",
    workflows: ["Request intake", "Approval preparation", "Exception routing", "Status updates", "Audit trail generation"],
    systems: ["ERP", "CRM", "databases", "document stores", "Slack", "email", "internal tools"],
    metrics: ["cycle time", "manual touches", "backlog", "SLA attainment", "rework rate"],
    proof:
      "Anonymized proof should show the removed manual steps, remaining review gates, and the operational metric that changed after deployment.",
  },
  {
    kind: "use-case",
    slug: "knowledge-assistants",
    path: "/use-cases/knowledge-assistants/",
    shortTitle: "Knowledge Assistants",
    title: "AI Knowledge Assistants for Internal Teams | Resonance Technology",
    metaDescription:
      "AI knowledge assistants over docs, SOPs, tickets, and internal systems with retrieval, citations, evals, and access controls.",
    h1: "AI knowledge assistants for internal teams",
    eyebrow: "Use Case",
    summary:
      "Company-specific assistants that answer internal questions with approved sources, business context, and clear escalation paths.",
    directAnswer:
      "Resonance builds knowledge assistants when teams need AI to answer questions from proprietary docs, SOPs, tickets, records, and tribal knowledge without losing source traceability.",
    buyer: "Operations, enablement, product, support, and knowledge-management leaders.",
    workflows: ["Policy lookup", "SOP guidance", "Ticket and document retrieval", "Onboarding support", "Internal Q&A"],
    systems: ["wikis", "docs", "tickets", "CRM", "databases", "Slack", "email"],
    metrics: ["answer quality", "source coverage", "repeat questions", "time to information", "escalation rate"],
    proof:
      "Anonymized proof should include retrieval quality, cited source coverage, common failure modes, and improvements in how quickly teams find approved information.",
  },
  {
    kind: "use-case",
    slug: "revenue-operations-ai",
    path: "/use-cases/revenue-operations-ai/",
    shortTitle: "Revenue Operations",
    title: "Revenue Operations AI Automation | Resonance Technology",
    metaDescription:
      "Revenue operations AI for CRM hygiene, routing, enrichment, follow-up preparation, and pipeline workflow automation.",
    h1: "Revenue operations AI automation",
    eyebrow: "Use Case",
    summary:
      "AI workflows that improve routing, enrichment, follow-up, and CRM hygiene without asking sales teams to do more admin work.",
    directAnswer:
      "Resonance helps revenue operations teams automate repetitive CRM and follow-up workflows while keeping account context, business rules, and approval requirements visible.",
    buyer: "Revenue operations, sales operations, founders, and go-to-market leaders.",
    workflows: ["Lead routing", "Account enrichment", "Follow-up drafting", "CRM cleanup", "Pipeline hygiene"],
    systems: ["Salesforce", "HubSpot", "email", "calendar", "Slack", "data providers", "internal APIs"],
    metrics: ["speed to lead", "CRM completeness", "follow-up latency", "routing accuracy", "pipeline hygiene"],
    proof:
      "Anonymized proof should document record-quality changes, routing logic, exception handling, and follow-up cycle improvements.",
  },
  {
    kind: "use-case",
    slug: "compliance-risk-ai",
    path: "/use-cases/compliance-risk-ai/",
    shortTitle: "Compliance and Risk",
    title: "Compliance and Risk AI Review Workflows | Resonance Technology",
    metaDescription:
      "AI-assisted compliance and risk workflows for policy checks, review queues, audit trails, and human approval gates.",
    h1: "Compliance and risk AI review workflows",
    eyebrow: "Use Case",
    summary:
      "AI-assisted review workflows that check policies, prepare evidence, route exceptions, and preserve audit-ready traceability.",
    directAnswer:
      "Resonance builds compliance and risk AI workflows for teams that need faster review preparation without removing human oversight from sensitive decisions.",
    buyer: "Operations, compliance, risk, and quality leaders responsible for review accuracy and auditability.",
    workflows: ["Policy checks", "Evidence gathering", "Review queue triage", "Exception escalation", "Audit summary generation"],
    systems: ["document stores", "case systems", "CRM", "ERP", "databases", "email", "internal tools"],
    metrics: ["review cycle time", "exception rate", "audit completeness", "manual handling time", "rework"],
    proof:
      "Anonymized proof should emphasize review paths, approval gates, traceability, and error analysis rather than unsupported claims of autonomous compliance decisions.",
  },
];

export const processSteps = [
  {
    title: "Map and measure",
    description: "Pick a recurring workflow and measure where time or effort goes today.",
  },
  {
    title: "Validate",
    description: "Connect your tools and test decisions and review paths on representative cases.",
  },
  {
    title: "Deploy and monitor",
    description: "Roll out with scoped permissions, logs, and a clear owner for exceptions.",
  },
];

export const clientWork: ClientWork[] = [
  {
    name: "Stealth",
    description:
      "Plastic surgery AI simulation",
  },
  {
    name: "Centering Healthcare Institute",
    description:
      "Community platform for care providers",
    logo: "/clients/centering-healthcare-institute.webp",
    url: "https://centeringhealthcare.org/",
  },
  {
    name: "Wendi",
    description:
      "Multi-EHR clinic assistant",
    logo: "/clients/wendi.webp",
    url: "https://www.getwendi.com/",
  },
  {
    name: "LEARN Behavioral",
    description:
      "Patient intake platform for ABA therapy",
    logo: "/clients/learn-behavioral.svg",
    url: "https://learnbehavioral.com/",
  },
  {
    name: "Fertility Answers",
    description:
      "AI fertility product using IBM Watson",
    logo: "/clients/fertility-answers.webp",
    url: "https://fertility.medanswers.com/",
  },
  {
    name: "Colliga Apps",
    description:
      "Research, clinical trials, and course platform",
    logo: "/clients/colliga-apps.webp",
    url: "https://colliga.io/",
  },
  {
    name: "TadHealth",
    description:
      "School-based healthcare claims and billing",
    logo: "/clients/tadhealth.webp",
    url: "https://www.tadhealth.com/",
  },
  {
    name: "TelMD",
    description:
      "Telehealth platform for patients and providers",
    logo: "/clients/telmd.webp",
    url: "https://telmd.com/",
  },
  {
    name: "HomeMeds",
    description:
      "Preventive care and healthcare automation",
    logo: "/clients/homemeds.webp",
    url: "https://www.homemeds.org/",
  },
  {
    name: "SOFLETE",
    description:
      "Fitness app with wearable integration",
    logo: "/clients/soflete.webp",
    darkLogo: true,
    url: "https://soflete.com/",
  },
  {
    name: "Official Black Wall Street",
    description:
      "Marketplace for Black-owned businesses",
    logo: "/clients/official-black-wall-street.webp",
    url: "https://officialblackwallstreet.com/",
  },
  {
    name: "Argot",
    description:
      "Social network with automatic connections",
  },
  {
    name: "Los Angeles County DCFS",
    description:
      "Digital tools for child and family services",
    logo: "/clients/la-county-dcfs.webp",
    url: "https://dcfs.lacounty.gov/",
  },
];

export const faqs: FaqItem[] = [
  {
    question: "What kind of businesses benefit from custom AI agents?",
    answer:
      "Businesses with high-volume, repeatable workflows across internal systems benefit most from custom AI agents.",
    supporting:
      "Resonance builds AI agents for B2B operations teams that need faster work across CRM, ERP, support tools, and proprietary knowledge systems, especially when manual routing, review, and follow-up slow the business down.",
  },
  {
    question: "How do you integrate AI with CRM, ERP, or support systems?",
    answer:
      "We integrate AI by connecting agents and workflow automation directly to the systems your teams already use.",
    supporting:
      "That usually means combining API access, business rules, retrieval, and review paths so AI can gather context, draft actions, update approved records, and hand work back to people inside CRM, ERP, support tools, and internal applications.",
  },
  {
    question: "When should a company use a domain-tuned model instead of a generic model?",
    answer:
      "A domain-tuned model makes sense when generic models do not reliably match your workflows, language, or decision standards.",
    supporting:
      "Resonance uses domain-tuned and fine-tuned models when teams need stronger accuracy on proprietary terminology, structured business logic, or repeatable judgments that affect operations, compliance, or customer experience.",
  },
  {
    question: "How do you keep AI workflows reliable and reviewable in production?",
    answer:
      "We keep AI workflows reliable by adding observability, evals, controls, and human review where the process requires it.",
    supporting:
      "Production AI systems need more than prompts. We design review paths, fallback logic, logging, monitoring, and tool permissions around live workflows so outputs are traceable, measurable, and safer to run inside real operations.",
  },
  {
    question: "How long does it take to launch an AI workflow automation project?",
    answer:
      "Launch timing depends on workflow complexity, integration depth, and review requirements, but the first production use case should be narrow and measurable.",
    supporting:
      "The process starts by identifying the highest-value workflow, validating it in production conditions, and deploying with observability and controls instead of trying to automate a broad transformation program all at once.",
  },
  {
    question: "How do you measure ROI from AI automation?",
    answer:
      "We measure AI automation ROI against the operational metric the workflow is supposed to improve.",
    supporting:
      "Typical metrics include reduced manual handling time, faster response or approval cycles, lower rework, improved throughput, better SLA attainment, and cleaner pipeline or case management across CRM, ERP, support, and internal process work.",
  },
  {
    question: "Do you build with human review and approval steps?",
    answer:
      "Yes, we build review and approval steps into AI systems whenever the workflow needs oversight, escalation, or sign-off.",
    supporting:
      "That includes approval gates for sensitive actions, exception handling for uncertain outputs, and escalation paths that let teams keep control while still automating the repetitive parts of the workflow.",
  },
  {
    question: "What is the difference between AI workflow automation and a chatbot?",
    answer:
      "A chatbot mainly answers or drafts messages, while AI workflow automation completes structured process steps across systems under defined business rules.",
    supporting:
      "Resonance focuses on production workflows: retrieving approved context, preparing decisions, updating systems when allowed, escalating exceptions, and measuring operational outcomes.",
  },
];

export const contactPage: SeoPage = {
  path: "/contact/",
  title: "Hire AI Workers | Resonance Technology",
  metaDescription:
    "Start a custom AI worker project with Resonance Technology. Tell us what task you want handled and the tools or rules it depends on.",
  h1: "Tell us what you want an AI worker to handle.",
  summary:
    "Share one recurring task and the tools or rules it depends on. We’ll review what a custom AI worker would need and where to start.",
};

export const faqPage: SeoPage = {
  path: "/faq/",
  title: "AI Agents and Workflow Automation FAQ | Resonance Technology",
  metaDescription:
    "Practical answers about AI agents, workflow automation, domain-tuned models, integrations, review paths, and ROI for B2B operations teams.",
  h1: "AI agents and workflow automation FAQ",
  summary:
    "Direct answers for B2B operations leaders evaluating AI agents, workflow automation, and domain-tuned models for live business processes.",
};

export const allStaticPages = [
  homePage,
  ...servicePages,
  ...useCasePages,
  faqPage,
  contactPage,
];

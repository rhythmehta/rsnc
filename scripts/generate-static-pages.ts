import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { primaryCta as primaryCtaConfig } from "../src/cta.ts";
import {
  allStaticPages,
  clientWork,
  contactPage,
  faqPage,
  faqs,
  homePage,
  heroWorkers,
  homeServices,
  intakePath,
  intakeResources,
  intakeSteps,
  navLinks,
  processSteps,
  servicePages,
  site,
  useCasePages,
  type FaqItem,
  type IntakeResource,
  type SeoPage,
  type ServicePage,
  type UseCasePage,
} from "../src/seo/content.ts";

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function absoluteUrl(path: string) {
  return new URL(path, site.url).toString();
}

function jsonScript(data: unknown) {
  return JSON.stringify(data).replaceAll("</script", "<\\/script");
}

function list(items: string[]) {
  return `<ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
}

function primaryCta(text: string = primaryCtaConfig.text) {
  return `<a class="primary-cta" href="${primaryCtaConfig.href}">${escapeHtml(text)}<span aria-hidden="true">↗</span></a>`;
}

function workerIcon(name: string) {
  return `<svg class="worker-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><use href="/worker-icons.svg#${name}" /></svg>`;
}

function sourceIcons(sources: readonly [name: string, file: string][]) {
  return `<div class="brain-source-icons">
    <ul role="list">
      ${sources.map(([name, file]) => `<li><img src="/source-${file}.svg" alt="${escapeHtml(name)}" width="24" height="24" loading="lazy" decoding="async" /></li>`).join("")}
    </ul>
  </div>`;
}

function commonSchema(page: SeoPage, extra: Record<string, unknown>[] = []) {
  const url = absoluteUrl(page.path);
  const graph: Record<string, unknown>[] = [
    {
      "@type": "Organization",
      "@id": `${site.url}/#organization`,
      name: site.name,
      alternateName: site.shortName,
      url: site.url,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl(site.logoPath),
      },
      foundingDate: site.foundingDate,
      description: site.description,
      knowsAbout: [
        "Healthcare artificial intelligence",
        "EHR integrations",
        "Telehealth software",
        "AI agents",
        "Workflow automation",
        "Domain-tuned language models",
        "Clinical operations software",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: site.name,
      publisher: { "@id": `${site.url}/#organization` },
      inLanguage: "en",
    },
    {
      "@type": "ProfessionalService",
      "@id": `${site.url}/#professional-service`,
      name: site.name,
      url: site.url,
      areaServed: "Global",
      serviceType: "Custom AI workers and Company Brain development for B2B teams",
      provider: { "@id": `${site.url}/#organization` },
      description: site.description,
    },
    {
      "@type": "WebPage",
      "@id": `${url}#webpage`,
      url,
      name: page.title,
      description: page.metaDescription,
      isPartOf: { "@id": `${site.url}/#website` },
      about: { "@id": `${site.url}/#professional-service` },
      inLanguage: "en",
    },
  ];

  if (page.path !== "/") {
    graph.push({
      "@type": "BreadcrumbList",
      "@id": `${url}#breadcrumbs`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: site.url,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: page.h1,
          item: url,
        },
      ],
    });
  }

  graph.push(...extra);

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}

function faqSchema(page: SeoPage, items: FaqItem[], concise = false) {
  return {
    "@type": "FAQPage",
    "@id": `${absoluteUrl(page.path)}#faq`,
    mainEntity: items.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: concise ? faq.answer : `${faq.answer} ${faq.supporting}`,
      },
    })),
  };
}

function pageHead(page: SeoPage, schema: unknown) {
  const url = absoluteUrl(page.path);
  const ogImage = absoluteUrl(site.ogImagePath);

  return `<head>
    <meta charset="UTF-8" />
    <meta name="page-type" content="service" />
    <meta name="site-kind" content="other" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(page.title)}</title>
    <meta name="description" content="${escapeHtml(page.metaDescription)}" />
    <meta name="theme-color" content="#fafaf6" />
    <meta name="robots" content="index,follow,max-image-preview:large" />
    <link rel="canonical" href="${url}" />
    <link rel="icon" href="/favicon.ico" sizes="any" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    <link rel="manifest" href="/site.webmanifest" crossorigin="use-credentials" />
    <meta property="og:title" content="${escapeHtml(page.title)}" />
    <meta property="og:description" content="${escapeHtml(page.metaDescription)}" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${url}" />
    <meta property="og:image" content="${ogImage}" />
    <meta property="og:image:type" content="image/png" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(page.title)}" />
    <meta name="twitter:description" content="${escapeHtml(page.metaDescription)}" />
    <meta name="twitter:image" content="${ogImage}" />
    <script type="application/ld+json">${jsonScript(schema)}</script>
    <link rel="stylesheet" href="/site.css" />
  </head>`;
}

function shell(page: SeoPage, body: string, schema: unknown) {
  return `<!doctype html>
<html lang="en" data-type="service">
  ${pageHead(page, schema)}
  <body>
    <a class="skip-link" href="#main">Skip to content</a>
    ${pageHeader()}
    ${body}
    ${pageFooter()}
  </body>
</html>
`;
}

function brandLink() {
  return `<a class="brand" href="/" aria-label="Resonance Technology home"><img src="/wordmark.webp" alt="" width="320" height="65" /></a>`;
}

function pageHeader() {
  return `<header class="site-header">
    <div class="site-wrap header-row">
      ${brandLink()}
      <nav aria-label="Primary">
        ${navLinks.map((link) => `<a href="${link.href}">${escapeHtml(link.label)}</a>`).join("")}
      </nav>
    </div>
  </header>`;
}

function pageFooter() {
  return `<footer class="site-footer">
    <div class="site-wrap footer-row">
      <div>${brandLink()}<p>Custom AI workers for B2B teams.</p></div>
      <nav aria-label="Footer">
        ${navLinks.map((link) => `<a href="${link.href}">${escapeHtml(link.label)}</a>`).join("")}
        <a href="/#company-brain">Company Brain</a>
        <a href="/faq/">FAQ</a>
        <a href="/contact/">Contact</a>
      </nav>
    </div>
  </footer>`;
}

function ctaBlock(text?: string) {
  return `<section class="cta-band" aria-labelledby="cta-title">
    <div>
      <h2 id="cta-title">Start with one AI worker.</h2>
      <p>Tell us what you want handled. We’ll scope a custom build.</p>
    </div>
    ${primaryCta(text)}
  </section>`;
}

function renderFaqs(items: FaqItem[], concise = false) {
  return `<div class="faq-list">
    ${items.map((faq) => `<details>
          <summary>${escapeHtml(faq.question)}</summary>
          <p>${escapeHtml(faq.answer)}${concise ? "" : ` ${escapeHtml(faq.supporting)}`}</p>
        </details>`).join("")}
  </div>`;
}

const roster = [
  ...clientWork.filter((client) => client.name !== "Stealth").sort((a, b) => a.name.localeCompare(b.name, "en")),
  ...clientWork.filter((client) => client.name === "Stealth"),
];

const homeFaqs = [faqs[1], faqs[6], faqs[4], faqs[5]];

const brainOutcomes = [
  { label: "Support", icon: "inbox" },
  { label: "Operations", icon: "clipboard-check" },
  { label: "Sales", icon: "send" },
  { label: "Finance", icon: "credit-card" },
  { label: "People", icon: "users" },
  { label: "IT", icon: "shield-check" },
];

const additionalWorkflows = useCasePages.filter((page) =>
  page.slug === "knowledge-assistants" || page.slug === "compliance-risk-ai",
);

function renderHeroMosaic() {
  return `<div class="hero-mosaic">
    <ul class="hero-worker-grid" id="use-cases" aria-label="Business roles a specialized AI worker can handle" role="list">
      ${heroWorkers.map(({ title, description, outcomes, icon }) => `<li class="hero-worker" tabindex="0">
        ${workerIcon(icon)}
        <div class="hero-worker-copy"><strong>${escapeHtml(title)}</strong><small class="hero-worker-description">${escapeHtml(description)}</small>
          <div class="hero-worker-outcomes"><ul>${outcomes.map((outcome) => `<li>${escapeHtml(outcome)}</li>`).join("")}</ul></div>
        </div>
      </li>`).join("")}
    </ul>
  </div>`;
}

function renderClients() {
  return `<section class="clients-section" id="clients" aria-labelledby="client-work-title">
    <div class="site-wrap">
      <h2 id="client-work-title">Clients</h2>
      <ul class="client-grid" role="list">
        ${roster.map((client) => `<li class="client-entry">
          ${client.logo ? `<div class="client-mark${client.darkLogo ? " client-mark-inverse" : ""}"><img src="${client.logo}" alt="" width="128" height="48" loading="lazy" decoding="async" /></div>` : ""}
          <h3>${escapeHtml(client.name)}</h3>
          <p>${escapeHtml(client.description)}</p>
        </li>`).join("")}
      </ul>
    </div>
  </section>`;
}

function renderCompanyBrain() {
  return `<section class="site-wrap company-brain" id="company-brain" aria-labelledby="brain-title">
    <h2 id="brain-title">How your AI workers learn your business</h2>
    <p class="brain-intro">Your systems hold the records. Your team knows how to handle exceptions. We build a Company Brain that brings both together.</p>

    <div class="brain-flow">
      <div class="brain-knowledge">
        <div class="brain-source">
          ${workerIcon("file-text")}
          <h3>Records and policies</h3>
          <p>CRM data, playbooks, and product docs</p>
          ${sourceIcons([["Salesforce", "salesforce"], ["Google Drive", "google-drive"], ["Notion", "notion"], ["Google Docs", "google-docs"], ["HubSpot", "hubspot"], ["Jira", "jira"]])}
          <span class="brain-signal-track" aria-hidden="true"></span>
        </div>
        <div class="brain-source">
          ${workerIcon("messages-square")}
          <h3>Team know-how</h3>
          <p>Handoffs and exception rules captured with your team</p>
          ${sourceIcons([["Slack", "slack"], ["Gmail", "gmail"], ["Microsoft Teams", "microsoft-teams"], ["Google Chat", "google-chat"], ["Zoom", "zoom"], ["Intercom", "intercom"]])}
          <span class="brain-signal-track" aria-hidden="true"></span>
        </div>
      </div>

      <div class="brain-core">
        ${workerIcon("brain-circuit")}
        <h3>Company Brain</h3>
        <p>Gives each worker the knowledge and rules for its job.</p>
        <ul role="list">
          <li>Approved sources</li>
          <li>Scoped access</li>
          <li>Human approval for sensitive actions</li>
        </ul>
      </div>

      <ul class="brain-workers" aria-label="Teams supported by specialized AI workers" role="list">
        ${brainOutcomes.map(({ label, icon }) => `<li class="brain-output">
          ${workerIcon(icon)}
          <strong>${label}</strong>
          <span class="brain-signal-track" aria-hidden="true"></span>
        </li>`).join("")}
      </ul>
    </div>

  </section>`;
}

function renderServices() {
  return `<section class="site-wrap home-services" id="services" aria-labelledby="services-title">
    <h2 id="services-title">Services</h2>
    <ul class="home-service-grid" role="list">
      ${homeServices.map(({ title, description, href, icon }) => `<li>
        <a class="home-service-card" href="${escapeHtml(href)}">
          ${workerIcon(icon)}
          <div><h3>${escapeHtml(title)}</h3><p>${escapeHtml(description)}</p></div>
          <span class="home-service-arrow" aria-hidden="true">↗</span>
        </a>
      </li>`).join("")}
    </ul>
  </section>`;
}

function homeBody() {
  return `<main id="main" class="home">
    <section class="home-hero" aria-labelledby="home-title">
      <div class="hero-copy">
        <h1 id="home-title">${escapeHtml(homePage.h1)}</h1>
        <p class="summary">${escapeHtml(homePage.summary)}</p>
        <div class="actions">
          ${primaryCta()}
          <a class="text-link" href="/#clients">See clients &amp; projects</a>
        </div>
      </div>
      ${renderHeroMosaic()}
    </section>

    ${renderClients()}

    ${renderCompanyBrain()}
    ${renderServices()}

    <section class="delivery" aria-labelledby="process-title">
      <div class="site-wrap">
        <h2 id="process-title">How we deliver</h2>
        <ol class="process-list" role="list">
          ${processSteps.map((step) => `<li><h3>${escapeHtml(step.title)}</h3><p>${escapeHtml(step.description)}</p></li>`).join("")}
        </ol>
      </div>
    </section>

    <section class="site-wrap home-faq" aria-labelledby="faq-title">
      <h2 id="faq-title">Before you start</h2>
      <div>
        ${renderFaqs(homeFaqs, true)}
        <a class="text-link" href="/faq/">Read the full FAQ</a>
      </div>
    </section>

    <div class="site-wrap">${ctaBlock()}</div>
  </main>`;
}

function renderServicePage(service: ServicePage) {
  const schema = commonSchema(service, [
    {
      "@type": "Service",
      "@id": `${absoluteUrl(service.path)}#service`,
      name: service.h1,
      serviceType: service.serviceType,
      provider: { "@id": `${site.url}/#organization` },
      areaServed: "Global",
      url: absoluteUrl(service.path),
      description: service.metaDescription,
    },
    faqSchema(service, service.faqs),
  ]);

  const body = `<main id="main" class="site-wrap seo-page">
    <section class="hero compact">
      <p class="eyebrow">${escapeHtml(service.eyebrow)}</p>
      <h1>${escapeHtml(service.h1)}</h1>
      <p class="summary">${escapeHtml(service.summary)}</p>
      <div class="answer-box"><strong>Direct answer:</strong> ${escapeHtml(service.directAnswer)}</div>
      <div class="actions">
        ${primaryCta()}
      </div>
    </section>

    <section aria-labelledby="fit-title">
      <h2 id="fit-title">Who it is for</h2>
      <div class="grid two">
        <article class="card"><h3>Best-fit workflows</h3>${list(service.bestFor)}</article>
        <article class="card"><h3>Systems it connects</h3>${list(service.integrations)}</article>
      </div>
    </section>

    <section aria-labelledby="reliability-title">
      <h2 id="reliability-title">How production reliability is handled</h2>
      <div class="grid two">
        <article class="card"><h3>Reliability controls</h3>${list(service.reliability)}</article>
        <article class="card"><h3>ROI metrics</h3>${list(service.roiMetrics)}</article>
      </div>
    </section>

    <section aria-labelledby="examples-title">
      <h2 id="examples-title">Workflow examples</h2>
      <div class="card">${list(service.workflowExamples)}</div>
      <div class="service-links" aria-label="More workflow examples">
        ${(service.slug === "ai-agents" ? useCasePages.filter(({ path }) => path !== intakePath) : additionalWorkflows)
          .map((page) => `<a href="${page.path}">${escapeHtml(page.shortTitle)}</a>`).join("")}
      </div>
      ${service.slug === "workflow-automation" ? intakeLinks() : ""}
    </section>

    <section aria-labelledby="service-faq-title">
      <h2 id="service-faq-title">Common questions</h2>
      ${renderFaqs(service.faqs)}
    </section>

    ${ctaBlock()}
  </main>`;

  return shell(service, body, schema);
}

function renderUseCasePage(useCase: UseCasePage) {
  const isIntake = useCase.path === intakePath;
  const schema = commonSchema(useCase);
  const body = `<main id="main" class="site-wrap seo-page">
    <section class="hero compact">
      <p class="eyebrow">${escapeHtml(useCase.eyebrow)}</p>
      <h1>${escapeHtml(useCase.h1)}</h1>
      <p class="summary">${escapeHtml(useCase.summary)}</p>
      <p class="answer-box">${escapeHtml(useCase.directAnswer)}</p>
      <div class="actions">
        ${primaryCta(isIntake ? "Share one recurring task" : undefined)}
      </div>
    </section>

    ${isIntake ? `<section class="workflow-prose" aria-labelledby="intake-steps-title">
      <h2 id="intake-steps-title">How a request moves from inbox to approval</h2>
      <ol>${intakeSteps.map((step) => `<li>${escapeHtml(step)}</li>`).join("")}</ol>
      <p>The <a href="/#company-brain">Company Brain</a> supplies the current intake policy, approval rules, and access to the tools the worker needs. The operations team owns exceptions and approves changes that require staff sign-off.</p>
      ${intakeLinks(useCase.path)}
    </section>` : ""}

    <section aria-labelledby="buyer-title">
      <h2 id="buyer-title">Buyer fit</h2>
      <p>${escapeHtml(useCase.buyer)}</p>
    </section>

    <section aria-labelledby="workflow-title">
      <h2 id="workflow-title">Workflows, systems, and metrics</h2>
      <div class="grid three">
        <article class="card"><h3>Workflows</h3>${list(useCase.workflows)}</article>
        <article class="card"><h3>Systems</h3>${list(useCase.systems)}</article>
        <article class="card"><h3>Metrics</h3>${list(useCase.metrics)}</article>
      </div>
    </section>

    ${ctaBlock(isIntake ? "Share one recurring task" : undefined)}
  </main>`;

  return shell(useCase, body, schema);
}

function intakeLinks(currentPath?: string) {
  const links = [
    { path: intakePath, shortTitle: "Explore AI request intake and approvals" },
    ...intakeResources,
  ];
  return `<nav class="service-links" aria-label="Request intake resources">
    ${links.filter((link) => link.path !== currentPath)
      .map((link) => `<a href="${escapeHtml(link.path)}">${escapeHtml(link.shortTitle)}</a>`)
      .join("")}
  </nav>`;
}

function renderIntakeResource(page: IntakeResource) {
  const url = absoluteUrl(page.path);
  const schema = commonSchema(page, [{
    "@type": "Article",
    "@id": `${url}#article`,
    headline: page.h1,
    description: page.metaDescription,
    mainEntityOfPage: { "@id": `${url}#webpage` },
    author: { "@id": `${site.url}/#organization` },
    inLanguage: "en",
  }]);
  return shell(page, `<main id="main" class="site-wrap seo-page">
    <section class="hero compact">
      <p class="eyebrow">${escapeHtml(page.label)}</p>
      <h1>${escapeHtml(page.h1)}</h1>
      <p class="summary">${escapeHtml(page.summary)}</p>
    </section>
    ${page.sections.map(({ heading, paragraphs = [], checklist }) => `<section class="workflow-prose">
      <h2>${escapeHtml(heading)}</h2>
      ${checklist ? list(checklist) : ""}
      ${paragraphs.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}
    </section>`).join("")}
    ${intakeLinks(page.path)}
    ${ctaBlock("Share one recurring task")}
  </main>`, schema);
}

function renderFaqPage() {
  const schema = commonSchema(faqPage, [faqSchema(faqPage, faqs)]);
  const body = `<main id="main" class="site-wrap seo-page">
    <section class="hero compact">
      <p class="eyebrow">FAQ</p>
      <h1>${escapeHtml(faqPage.h1)}</h1>
      <p class="summary">${escapeHtml(faqPage.summary)}</p>
    </section>
    <section>
      ${renderFaqs(faqs)}
    </section>
    ${ctaBlock()}
  </main>`;

  return shell(faqPage, body, schema);
}

function renderContactPage() {
  const email = process.env.RSNC_CONTACT_EMAIL?.trim();
  if (email && !/^[a-z0-9._+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i.test(email)) {
    throw new Error("RSNC_CONTACT_EMAIL must be a public contact email address.");
  }

  return shell(contactPage, `<main id="main" class="site-wrap seo-page contact-page">
    <section class="hero compact" aria-labelledby="contact-title">
      <h1 id="contact-title">${escapeHtml(contactPage.h1)}</h1>
      <p class="summary">${escapeHtml(contactPage.summary)}</p>
      <div class="actions">
        <a class="primary-cta" href="${site.formUrl}">Open the project brief <span aria-hidden="true">↗</span></a>
        ${email ? `<a class="text-link" href="mailto:${email}">Email us instead</a>` : ""}
      </div>
      <p class="contact-note">Describe the steps and tools involved. Leave out confidential or personal records.</p>
    </section>
  </main>`, commonSchema(contactPage));
}

function sitemap() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allStaticPages
  .map(
    (page) => `  <url>
    <loc>${absoluteUrl(page.path)}</loc>
  </url>`,
  )
  .join("\n")}
</urlset>
`;
}

function robots() {
  const bots = ["Googlebot", "Bingbot", "OAI-SearchBot", "GPTBot", "ChatGPT-User"];
  return `# robots.txt for ${site.url}
# Search and answer-engine crawlers may index the public site.
User-agent: *
Allow: /

${bots.map((bot) => `User-agent: ${bot}\nAllow: /`).join("\n\n")}

Host: ${site.url}
Sitemap: ${site.url}/sitemap.xml
`;
}

function llmsText() {
  return `# ${site.name}

> ${site.description}

${site.name} builds specialized AI workers for B2B teams and the Company Brain that connects them to company knowledge, rules, and tools.

## Primary Pages

- Home: ${site.url}/
- Company Brain: ${site.url}/#company-brain
- AI workers: ${site.url}/#use-cases
- AI agents: ${absoluteUrl("/services/ai-agents/")}
- Workflow automation: ${absoluteUrl("/services/workflow-automation/")}
- Domain-tuned models: ${absoluteUrl("/services/domain-tuned-models/")}
- FAQ: ${absoluteUrl("/faq/")}
- Contact: ${absoluteUrl("/contact/")}

## Services

${homeServices
  .map((service) => `- ${service.title}: ${service.description} (${absoluteUrl(service.href)})`)
  .join("\n")}

## B2B Operations Use Cases

${useCasePages
  .map((useCase) => `- ${useCase.shortTitle}: ${useCase.summary} (${absoluteUrl(useCase.path)})`)
  .join("\n")}

## Request Intake Resources

${intakeResources.map((page) => `- ${page.title}: ${absoluteUrl(page.path)}`).join("\n")}

## Evidence and Safety

- Publishes selected named client work across healthcare, research, public services, marketplaces, social products, and connected fitness.
- Measures ROI through workflow-specific metrics such as manual handling time, cycle time, throughput, error rate, SLA attainment, and data quality.
- Builds production controls including evals, logs, scoped tool access, fallback paths, and human review gates.

## Clients & Projects

${roster
  .map((client) => `- ${client.name}: ${client.description}`)
  .join("\n")}

## Contact

Workflow review: ${absoluteUrl("/contact/")}
`;
}

const clientWorkSchema = {
  "@type": "ItemList",
  "@id": `${site.url}/#clients`,
  name: "Clients & Projects",
  numberOfItems: roster.length,
  itemListElement: roster.map((client, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "CreativeWork",
      name: client.name,
      description: client.description,
      about: {
        "@type": "Organization",
        name: client.name,
        ...(client.url ? { url: client.url } : {}),
      },
    },
  })),
};

const homeSchema = commonSchema(homePage, [
  faqSchema(homePage, homeFaqs, true),
  clientWorkSchema,
]);

const notFound = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="robots" content="noindex" />
  <title>Page not found | Resonance Technology</title>
  <link rel="stylesheet" href="/site.css" />
</head>
<body>
  <a class="skip-link" href="#main">Skip to content</a>
  ${pageHeader()}
  <main id="main" class="site-wrap seo-page">
    <section class="hero compact"><h1>Page not found</h1><p><a href="/">Go to the homepage</a></p></section>
  </main>
  ${pageFooter()}
</body>
</html>
`;

export function writeSite(root: string): string[] {
  const pages: [string, string][] = [
    ["index.html", shell(homePage, homeBody(), homeSchema)],
    ...servicePages.map((page): [string, string] => [`${page.path.slice(1)}index.html`, renderServicePage(page)]),
    ...useCasePages.map((page): [string, string] => [`${page.path.slice(1)}index.html`, renderUseCasePage(page)]),
    ...intakeResources.map((page): [string, string] => [`${page.path.slice(1)}index.html`, renderIntakeResource(page)]),
    [`${faqPage.path.slice(1)}index.html`, renderFaqPage()],
    [`${contactPage.path.slice(1)}index.html`, renderContactPage()],
    ["404.html", notFound],
  ];
  return pages.map(([page, html]) => {
    const file = join(root, page);
    mkdirSync(dirname(file), { recursive: true });
    writeFileSync(file, html);
    return file;
  });
}

export function discoveryFiles(): Record<string, string> {
  const llms = llmsText();
  return {
    "sitemap.xml": sitemap(),
    "robots.txt": robots(),
    "llms.txt": llms,
    "llms.text": llms,
  };
}

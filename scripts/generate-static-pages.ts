import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { primaryCta as primaryCtaConfig } from "../src/cta.ts";
import {
  allStaticPages,
  clientWork,
  contactPage,
  faqPage,
  faqs,
  homePage,
  navLinks,
  processSteps,
  servicePages,
  site,
  useCasePages,
  type FaqItem,
  type SeoPage,
  type ServicePage,
  type UseCasePage,
} from "../src/seo/content.ts";

const distDir = join(process.cwd(), "dist");
const builtIndexPath = join(distDir, "index.html");
const builtIndex = readFileSync(builtIndexPath, "utf8");
const assetTags = Array.from(
  builtIndex.matchAll(/<script\b[^>]*><\/script>|<link\b[^>]*>/g),
)
  .map((match) => match[0])
  .filter((tag) => tag.includes("/assets/"))
  .join("\n    ");

const isoDate = new Date().toISOString().slice(0, 10);

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

function routeFile(path: string) {
  if (path === "/") {
    return builtIndexPath;
  }

  return join(distDir, path.replace(/^\/|\/$/g, ""), "index.html");
}

function writeRoute(path: string, html: string) {
  const filePath = routeFile(path);
  mkdirSync(dirname(filePath), { recursive: true });
  writeFileSync(filePath, html);
}

function list(items: string[]) {
  return `<ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
}

function nav() {
  return `<nav aria-label="Primary">
    <a href="/">Home</a>
    ${navLinks.map((link) => `<a href="${link.href}">${escapeHtml(link.label)}</a>`).join("")}
  </nav>`;
}

function primaryCta(href = primaryCtaConfig.href) {
  const text = escapeHtml(primaryCtaConfig.text);

  return `<a class="primary-cta" href="${href}" data-contact-modal-trigger>
    <span class="primary-cta__label">${text}</span>
    <span class="primary-cta__hover" aria-hidden="true">
      <span>${text}</span>
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" focusable="false">
        <path d="M5 12h14"></path>
        <path d="m12 5 7 7-7 7"></path>
      </svg>
    </span>
    <span class="primary-cta__fill" aria-hidden="true"></span>
  </a>`;
}

function contactModal() {
  return `<div class="contact-modal" data-contact-modal hidden>
    <button type="button" class="contact-modal__backdrop" data-contact-modal-close aria-label="Close contact popup"></button>
    <div class="contact-modal__panel" role="dialog" aria-modal="true" aria-labelledby="contact-modal-title">
      <div class="contact-modal__intro">
        <p class="eyebrow">AI Strategy Call</p>
        <h2 id="contact-modal-title">Review the workflow you want AI to improve</h2>
        <p>Share the process, bottleneck, or business outcome you want to improve. We review every brief directly and come back with a practical first step.</p>
        <div class="contact-modal__notes">
          <div>Senior team review within one business day</div>
          <div>Best fit for AI agents, workflow automation, and production AI applications</div>
          <div>We look for the best first use case, integration risks, and ROI potential</div>
        </div>
      </div>
      <div class="contact-modal__form">
        <button type="button" class="contact-modal__close" data-contact-modal-close aria-label="Close contact popup">&times;</button>
        <div class="contact-modal__frame">
          <iframe src="${site.formUrl}" loading="lazy" width="100%" height="700" frameborder="0" marginheight="0" marginwidth="0" title="Resonance contact form"></iframe>
        </div>
      </div>
    </div>
  </div>`;
}

function contactModalScript() {
  return `<script>
(() => {
  const modal = document.querySelector("[data-contact-modal]");
  if (!modal) return;

  const closeModal = () => {
    modal.hidden = true;
    document.documentElement.classList.remove("contact-modal-open");
  };
  const openModal = () => {
    modal.hidden = false;
    document.documentElement.classList.add("contact-modal-open");
    const closeButton = modal.querySelector("[data-contact-modal-close]");
    if (closeButton instanceof HTMLElement) closeButton.focus();
  };

  document.querySelectorAll("[data-contact-modal-trigger]").forEach((trigger) => {
    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      openModal();
    });
  });
  modal.querySelectorAll("[data-contact-modal-close]").forEach((trigger) => {
    trigger.addEventListener("click", closeModal);
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !modal.hidden) closeModal();
  });
})();
</script>`;
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
      serviceType: "AI agents, workflow automation, and domain-tuned models for B2B operations",
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

function faqSchema(page: SeoPage, items: FaqItem[]) {
  return {
    "@type": "FAQPage",
    "@id": `${absoluteUrl(page.path)}#faq`,
    mainEntity: items.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: `${faq.answer} ${faq.supporting}`,
      },
    })),
  };
}

function pageHead(page: SeoPage, schema: unknown, includeAssets = false) {
  const url = absoluteUrl(page.path);
  const ogImage = absoluteUrl(site.ogImagePath);

  return `<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(page.title)}</title>
    <meta name="description" content="${escapeHtml(page.metaDescription)}" />
    <meta name="theme-color" content="#ffffff" />
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
    <style>${staticCss}</style>
    ${includeAssets ? assetTags : ""}
  </head>`;
}

function shell(page: SeoPage, body: string, schema: unknown, includeAssets = false) {
  return `<!doctype html>
<html lang="en">
  ${pageHead(page, schema, includeAssets)}
  <body>
    ${body}
    ${contactModal()}
    ${contactModalScript()}
  </body>
</html>
`;
}

function pageHeader() {
  return `<header class="site-header">
    <a class="brand" href="/" aria-label="Resonance Technology home">
      <img src="${site.logoPath}" alt="Resonance Technology logo" width="64" height="64" />
      <span>${site.name}</span>
    </a>
    ${nav()}
  </header>`;
}

function ctaBlock() {
  return `<section class="cta-band" aria-labelledby="cta-title">
    <p class="eyebrow">AI Strategy Call</p>
    <h2 id="cta-title">Review the workflow you want AI to improve</h2>
    <p>Share the operational process, bottleneck, or outcome you want to improve. We look for fit, integration risk, review requirements, and the most practical first production use case.</p>
    <div class="actions">
      ${primaryCta()}
    </div>
  </section>`;
}

function renderFaqs(items: FaqItem[]) {
  return `<div class="faq-list">
    ${items
      .map(
        (faq) => `<article>
          <h3>${escapeHtml(faq.question)}</h3>
          <p><strong>${escapeHtml(faq.answer)}</strong></p>
          <p>${escapeHtml(faq.supporting)}</p>
        </article>`,
      )
      .join("")}
  </div>`;
}

function homeBody() {
  return `<div id="root">
    <main class="seo-page">
      ${pageHeader()}
      <section class="hero">
        <p class="eyebrow">${escapeHtml(homePage.heroEyebrow)}</p>
        <h1>${escapeHtml(homePage.h1)}</h1>
        <p class="summary">${escapeHtml(homePage.summary)}</p>
        <p class="service-line">${escapeHtml(homePage.serviceLine)}</p>
        <div class="actions">
          ${primaryCta()}
        </div>
      </section>

      <section aria-labelledby="services-title">
        <p class="eyebrow">What We Build</p>
        <h2 id="services-title">Production AI systems for operations work</h2>
        <div class="grid three">
          ${servicePages
            .map(
              (service) => `<a class="card link-card" href="${service.path}">
                <img src="${service.image}" alt="" width="42" height="42" />
                <h3>${escapeHtml(service.shortTitle)}</h3>
                <p>${escapeHtml(service.summary)}</p>
              </a>`,
            )
            .join("")}
        </div>
      </section>

      <section aria-labelledby="client-work-title">
        <p class="eyebrow">Selected Client Work</p>
        <h2 id="client-work-title">Products built with ambitious teams</h2>
        <p>Experience across healthcare AI, EHR integrations, telehealth, clinical operations, academic research, public services, marketplaces, and connected fitness.</p>
        <div class="client-grid">
          ${clientWork
            .map(
              (client) => `<article class="client-card">
                <div class="client-logo">
                  ${
                    client.logo
                      ? `<img src="${client.logo}" alt="${escapeHtml(client.name)} logo" loading="lazy"${client.darkLogo ? ' class="dark-logo"' : ""} />`
                      : `<span>${escapeHtml(client.name)}</span>`
                  }
                </div>
                <h3>${escapeHtml(client.name)}</h3>
                <p>${escapeHtml(client.description)}</p>
              </article>`,
            )
            .join("")}
        </div>
      </section>

      <section aria-labelledby="use-cases-title">
        <p class="eyebrow">Where AI Creates Value</p>
        <h2 id="use-cases-title">Use cases for B2B operations leaders</h2>
        <div class="grid two">
          ${useCasePages
            .map(
              (useCase) => `<a class="card link-card" href="${useCase.path}">
                <h3>${escapeHtml(useCase.shortTitle)}</h3>
                <p>${escapeHtml(useCase.summary)}</p>
              </a>`,
            )
            .join("")}
        </div>
      </section>

      <section aria-labelledby="process-title">
        <p class="eyebrow">How We Work</p>
        <h2 id="process-title">Delivery model for live operations</h2>
        <div class="grid three">
          ${processSteps
            .map(
              (step) => `<article class="card">
                <p class="step">${escapeHtml(step.step)}</p>
                <h3>${escapeHtml(step.title)}</h3>
                <p>${escapeHtml(step.description)}</p>
              </article>`,
            )
            .join("")}
        </div>
      </section>

      <section aria-labelledby="faq-title">
        <p class="eyebrow">FAQ</p>
        <h2 id="faq-title">Questions buyers and answer engines ask</h2>
        ${renderFaqs(faqs)}
        <p><a href="/faq/">Read the full AI automation FAQ</a></p>
      </section>

      ${ctaBlock()}
    </main>
  </div>`;
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

  const body = `<main class="seo-page">
    ${pageHeader()}
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
      <div class="answer-box"><strong>Anonymized proof:</strong> ${escapeHtml(service.proof)}</div>
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
  const schema = commonSchema(useCase);
  const body = `<main class="seo-page">
    ${pageHeader()}
    <section class="hero compact">
      <p class="eyebrow">${escapeHtml(useCase.eyebrow)}</p>
      <h1>${escapeHtml(useCase.h1)}</h1>
      <p class="summary">${escapeHtml(useCase.summary)}</p>
      <div class="answer-box"><strong>Direct answer:</strong> ${escapeHtml(useCase.directAnswer)}</div>
      <div class="actions">
        ${primaryCta()}
      </div>
    </section>

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
      <div class="answer-box"><strong>Anonymized proof:</strong> ${escapeHtml(useCase.proof)}</div>
    </section>

    ${ctaBlock()}
  </main>`;

  return shell(useCase, body, schema);
}

function renderFaqPage() {
  const schema = commonSchema(faqPage, [faqSchema(faqPage, faqs)]);
  const body = `<main class="seo-page">
    ${pageHeader()}
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
  const schema = commonSchema(contactPage);
  const body = `<main class="seo-page">
    ${pageHeader()}
    <section class="hero compact">
      <p class="eyebrow">Contact</p>
      <h1>${escapeHtml(contactPage.h1)}</h1>
      <p class="summary">${escapeHtml(contactPage.summary)}</p>
      <div class="actions">
        ${primaryCta()}
      </div>
    </section>
    <section aria-labelledby="fit-title">
      <h2 id="fit-title">Best fit</h2>
      <div class="grid three">
        <article class="card"><h3>AI agents</h3><p>Processes that need context retrieval, multi-step decisions, tool use, and human approval.</p></article>
        <article class="card"><h3>Workflow automation</h3><p>Operational queues, approvals, handoffs, document review, and system updates.</p></article>
        <article class="card"><h3>Domain-tuned models</h3><p>Company-specific language, policy, retrieval, evals, latency, or private deployment needs.</p></article>
      </div>
    </section>
  </main>`;

  return shell(contactPage, body, schema);
}

function sitemap() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allStaticPages
  .map(
    (page) => `  <url>
    <loc>${absoluteUrl(page.path)}</loc>
    <lastmod>${isoDate}</lastmod>
    <changefreq>${page.path === "/" ? "weekly" : "monthly"}</changefreq>
    <priority>${page.path === "/" ? "1.0" : "0.8"}</priority>
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

${site.name} builds production AI systems for B2B operations leaders: AI agents, workflow automation, and domain-tuned models connected to CRM, ERP, support, document, and internal systems.

## Primary Pages

- Home: ${site.url}/
- AI agents: ${absoluteUrl("/services/ai-agents/")}
- Workflow automation: ${absoluteUrl("/services/workflow-automation/")}
- Domain-tuned models: ${absoluteUrl("/services/domain-tuned-models/")}
- FAQ: ${absoluteUrl("/faq/")}
- Contact: ${absoluteUrl("/contact/")}

## Services

${servicePages
  .map((service) => `- ${service.shortTitle}: ${service.summary} (${absoluteUrl(service.path)})`)
  .join("\n")}

## B2B Operations Use Cases

${useCasePages
  .map((useCase) => `- ${useCase.shortTitle}: ${useCase.summary} (${absoluteUrl(useCase.path)})`)
  .join("\n")}

## Evidence and Safety

- Publishes selected named client work across healthcare, research, public services, marketplaces, social products, and connected fitness.
- Measures ROI through workflow-specific metrics such as manual handling time, cycle time, throughput, error rate, SLA attainment, and data quality.
- Builds production controls including evals, logs, scoped tool access, fallback paths, and human review gates.

## Selected Client Work

${clientWork
  .map((client) => `- ${client.name}: ${client.description}`)
  .join("\n")}

## Contact

Workflow review: ${absoluteUrl("/contact/")}
`;
}

const staticCss = `
:root {
  color-scheme: light;
  --ink: #0f172a;
  --muted: #475569;
  --line: #d8e8ec;
  --teal: #0f6d7b;
  --teal-bright: #45bfd3;
  --soft: #f5fbfc;
}
* {
  box-sizing: border-box;
}
body {
  margin: 0;
  background: #ffffff;
  color: var(--ink);
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}
.contact-modal-open {
  overflow: hidden;
}
.seo-page a {
  color: var(--teal);
  text-decoration: none;
}
.seo-page a:hover {
  text-decoration: underline;
}
.seo-page {
  min-height: 100vh;
}
.seo-page .site-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  max-width: 1180px;
  margin: 0 auto;
  padding: 20px 24px;
}
.seo-page .brand {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  color: var(--ink);
  font-weight: 700;
}
.seo-page .brand img {
  width: 48px;
  height: 48px;
  border-radius: 10px;
}
.seo-page nav {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 14px;
  font-size: 14px;
}
.seo-page section {
  max-width: 1120px;
  margin: 0 auto;
  padding: 56px 24px;
}
.seo-page .hero {
  min-height: 560px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.seo-page .hero.compact {
  min-height: auto;
  padding-top: 72px;
}
.seo-page .eyebrow,
.seo-page .step {
  margin: 0 0 14px;
  color: var(--teal);
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}
.seo-page h1,
.seo-page h2,
.seo-page h3 {
  margin: 0;
  letter-spacing: 0;
}
.seo-page h1 {
  max-width: 860px;
  font-size: clamp(40px, 8vw, 76px);
  line-height: 0.98;
  font-weight: 500;
}
.seo-page h2 {
  max-width: 760px;
  font-size: clamp(30px, 4vw, 46px);
  line-height: 1.05;
  font-weight: 500;
}
.seo-page h3 {
  font-size: 21px;
  line-height: 1.2;
}
.seo-page p,
.seo-page li {
  color: var(--muted);
  font-size: 17px;
  line-height: 1.7;
}
.seo-page .summary {
  max-width: 780px;
  font-size: 21px;
}
.seo-page .service-line {
  color: var(--teal);
  font-weight: 700;
}
.seo-page .actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 24px;
}
.seo-page .primary-cta {
  position: relative;
  display: inline-block;
  width: 128px;
  overflow: hidden;
  border-radius: 999px;
  border: 1px solid var(--line);
  background: rgba(255, 255, 255, 0.8);
  color: #111827;
  padding: 8px;
  text-align: center;
  font-weight: 700;
  line-height: 1.5;
  text-decoration: none;
  backdrop-filter: blur(8px);
}
.seo-page .primary-cta:hover {
  color: #111827;
  text-decoration: none;
}
.seo-page .primary-cta__label {
  position: relative;
  z-index: 1;
  display: inline-block;
  transform: translateX(4px);
  transition: transform 300ms ease, opacity 300ms ease;
}
.seo-page .primary-cta__hover {
  position: absolute;
  inset: 0;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: #ffffff;
  opacity: 0;
  transform: translateX(48px);
  transition: transform 300ms ease, opacity 300ms ease;
}
.seo-page .primary-cta__fill {
  position: absolute;
  left: 20%;
  top: 40%;
  z-index: 0;
  width: 8px;
  height: 8px;
  border-radius: 8px;
  background: var(--teal-bright);
  transform: scale(1);
  transition: left 300ms ease, top 300ms ease, width 300ms ease, height 300ms ease, transform 300ms ease;
}
.seo-page .primary-cta:hover .primary-cta__label {
  opacity: 0;
  transform: translateX(48px);
}
.seo-page .primary-cta:hover .primary-cta__hover {
  opacity: 1;
  transform: translateX(-4px);
}
.seo-page .primary-cta:hover .primary-cta__fill {
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  transform: scale(1.8);
}
.contact-modal[hidden] {
  display: none;
}
.contact-modal {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}
.contact-modal__backdrop {
  position: absolute;
  inset: 0;
  border: 0;
  background: radial-gradient(circle at top, rgba(69, 191, 211, 0.18), transparent 38%),
    linear-gradient(135deg, rgba(3, 7, 18, 0.92), rgba(15, 23, 42, 0.84));
  backdrop-filter: blur(12px);
  cursor: pointer;
}
.contact-modal__panel {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.4fr);
  width: min(100%, 1024px);
  max-height: calc(100vh - 48px);
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 32px;
  background: rgba(255, 255, 255, 0.82);
  box-shadow: 0 28px 120px rgba(2, 8, 23, 0.45);
  backdrop-filter: blur(20px);
}
.contact-modal__panel::before {
  content: "";
  position: absolute;
  inset: 0 0 auto;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--teal-bright), transparent);
}
.contact-modal__intro {
  position: relative;
  overflow: hidden;
  background: linear-gradient(160deg, #f8fdff 0%, #edf8fb 46%, #e0f5f8 100%);
  padding: 32px;
}
.contact-modal__intro h2 {
  max-width: 360px;
  font-size: 34px;
  font-weight: 300;
  line-height: 1.08;
}
.contact-modal__intro p:not(.eyebrow) {
  max-width: 380px;
  font-size: 15px;
  line-height: 1.65;
}
.contact-modal__notes {
  display: grid;
  gap: 12px;
  margin-top: 32px;
  color: var(--muted);
  font-size: 14px;
}
.contact-modal__notes div {
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.65);
  padding: 12px 16px;
  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.06);
}
.contact-modal__form {
  position: relative;
  background: rgba(255, 255, 255, 0.7);
  padding: 12px;
}
.contact-modal__close {
  position: absolute;
  right: 20px;
  top: 20px;
  z-index: 2;
  display: inline-flex;
  width: 44px;
  height: 44px;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(226, 232, 240, 0.8);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.9);
  color: #334155;
  font-size: 28px;
  line-height: 1;
  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.08);
  cursor: pointer;
  transition: transform 160ms ease, background 160ms ease;
}
.contact-modal__close:hover {
  background: #ffffff;
  transform: scale(1.05);
}
.contact-modal__frame {
  overflow: hidden;
  border: 1px solid rgba(226, 232, 240, 0.8);
  border-radius: 22px;
  background: #ffffff;
  box-shadow: inset 0 2px 4px rgba(15, 23, 42, 0.06);
}
.contact-modal__frame iframe {
  display: block;
  width: 100%;
  border: 0;
}
.seo-page .grid {
  display: grid;
  gap: 18px;
  margin-top: 28px;
}
.seo-page .grid.two {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}
.seo-page .grid.three {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}
.seo-page .client-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 18px;
  margin-top: 28px;
}
.seo-page .client-card {
  min-height: 248px;
  border: 1px solid var(--line);
  border-radius: 22px;
  background: linear-gradient(180deg, #ffffff 0%, var(--soft) 100%);
  padding: 20px;
}
.seo-page .client-logo {
  display: flex;
  height: 80px;
  align-items: center;
  justify-content: center;
  border: 1px solid #e2e8f0;
  border-radius: 18px;
  background: #ffffff;
  padding: 16px;
}
.seo-page .client-logo img {
  display: block;
  max-width: 100%;
  max-height: 48px;
  object-fit: contain;
  filter: grayscale(1);
  opacity: 0.78;
}
.seo-page .client-logo img.dark-logo {
  filter: grayscale(1) brightness(0);
}
.seo-page .client-logo span {
  color: #64748b;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-align: center;
  text-transform: uppercase;
}
.seo-page .client-card h3 {
  margin-top: 20px;
  font-size: 18px;
}
.seo-page .client-card p {
  margin-bottom: 0;
  font-size: 14px;
  line-height: 1.6;
}
.seo-page .card,
.seo-page .answer-box,
.seo-page .cta-band {
  border: 1px solid var(--line);
  border-radius: 18px;
  background: linear-gradient(180deg, #ffffff 0%, var(--soft) 100%);
  padding: 24px;
}
.seo-page .link-card {
  display: block;
  color: var(--ink);
}
.seo-page .link-card:hover {
  border-color: var(--teal-bright);
  text-decoration: none;
}
.seo-page .card img {
  display: block;
  margin-bottom: 18px;
}
.seo-page .answer-box {
  max-width: 880px;
  margin-top: 24px;
  color: var(--muted);
  font-size: 17px;
  line-height: 1.7;
}
.seo-page .faq-list {
  display: grid;
  gap: 16px;
  margin-top: 28px;
}
.seo-page .faq-list article {
  border-bottom: 1px solid var(--line);
  padding-bottom: 18px;
}
.seo-page .cta-band {
  margin-bottom: 56px;
}
@media (max-width: 820px) {
  .seo-page .site-header {
    align-items: flex-start;
    flex-direction: column;
  }
  .seo-page nav {
    justify-content: flex-start;
  }
  .seo-page .grid.two,
  .seo-page .grid.three,
  .seo-page .client-grid {
    grid-template-columns: 1fr;
  }
  .seo-page .hero {
    min-height: auto;
    padding-top: 56px;
  }
  .contact-modal {
    padding: 16px;
  }
  .contact-modal__panel {
    grid-template-columns: 1fr;
    overflow-y: auto;
  }
  .contact-modal__intro {
    padding: 24px;
  }
  .contact-modal__intro h2 {
    font-size: 30px;
  }
  .contact-modal__frame iframe {
    height: 640px;
  }
}
`;

const clientWorkSchema = {
  "@type": "ItemList",
  "@id": `${site.url}/#selected-client-work`,
  name: "Selected client work",
  numberOfItems: clientWork.length,
  itemListElement: clientWork.map((client, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "CreativeWork",
      name: `${client.name} project`,
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
  faqSchema(homePage, faqs),
  clientWorkSchema,
]);

writeRoute("/", shell(homePage, homeBody(), homeSchema, true));
for (const service of servicePages) {
  writeRoute(service.path, renderServicePage(service));
}
for (const useCase of useCasePages) {
  writeRoute(useCase.path, renderUseCasePage(useCase));
}
writeRoute(faqPage.path, renderFaqPage());
writeRoute(contactPage.path, renderContactPage());
writeFileSync(join(distDir, "sitemap.xml"), sitemap());
writeFileSync(join(distDir, "robots.txt"), robots());
writeFileSync(join(distDir, "llms.txt"), llmsText());
writeFileSync(join(distDir, "llms.text"), llmsText());

const hostingConfigPath = join(process.cwd(), ".openai", "hosting.json");
const distHostingDir = join(distDir, ".openai");
const distServerDir = join(distDir, "server");

mkdirSync(distHostingDir, { recursive: true });
mkdirSync(distServerDir, { recursive: true });
writeFileSync(
  join(distHostingDir, "hosting.json"),
  readFileSync(hostingConfigPath),
);
writeFileSync(
  join(distServerDir, "index.js"),
  `export default {
  fetch(request, env) {
    return env.ASSETS.fetch(request);
  },
};
`,
);

console.log(`Generated ${allStaticPages.length} static pages, sitemap.xml, robots.txt, llms.txt, and llms.text.`);

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import {
  allStaticPages,
  contactPage,
  faqPage,
  faqs,
  homePage,
  navLinks,
  processSteps,
  proofPoints,
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
      <a class="button" href="/contact/">Let's Talk</a>
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
          <a class="button" href="/contact/">Let's Talk</a>
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

      <section aria-labelledby="proof-title">
        <p class="eyebrow">Anonymized Proof</p>
        <h2 id="proof-title">Evidence without unsupported claims</h2>
        <p>${escapeHtml(homePage.proofIntro)}</p>
        <div class="grid three">
          ${proofPoints
            .map(
              (proof) => `<article class="card">
                <h3>${escapeHtml(proof.title)}</h3>
                <p>${escapeHtml(proof.description)}</p>
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
        <a class="button" href="/contact/">Let's Talk</a>
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
        <a class="button" href="/contact/">Let's Talk</a>
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
        <a class="button" href="${site.formUrl}">Let's Talk</a>
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

- Uses anonymized workflow proof when client names cannot be published.
- Measures ROI through workflow-specific metrics such as manual handling time, cycle time, throughput, error rate, SLA attainment, and data quality.
- Builds production controls including evals, logs, scoped tool access, fallback paths, and human review gates.

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
.seo-page .button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 46px;
  border-radius: 999px;
  border: 1px solid var(--teal);
  background: var(--teal);
  color: #ffffff;
  padding: 0 18px;
  font-weight: 700;
}
.seo-page .button.secondary {
  background: #ffffff;
  color: var(--teal);
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
  .seo-page .grid.three {
    grid-template-columns: 1fr;
  }
  .seo-page .hero {
    min-height: auto;
    padding-top: 56px;
  }
}
`;

const homeSchema = commonSchema(homePage, [faqSchema(homePage, faqs)]);

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

console.log(`Generated ${allStaticPages.length} static pages, sitemap.xml, robots.txt, llms.txt, and llms.text.`);

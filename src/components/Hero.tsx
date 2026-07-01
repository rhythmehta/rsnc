import { lazy, Suspense } from "react";
import type React from "react";
import BlurEffect from "react-progressive-blur";
import { primaryCta } from "@/cta";
import { PrimaryCta } from "@/components/PrimaryCta";

const HeroScene = lazy(() => import("./HeroScene"));

interface HeroProps {
  eyebrow?: string;
  title: string;
  description: string;
  serviceLine?: string;
  navLinks?: Array<{ label: string; href: string }>;
  ctaHref?: string;
  ctaSupport?: string;
  onCtaClick?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  eyebrow,
  title,
  description,
  serviceLine,
  navLinks,
  ctaHref = primaryCta.href,
  ctaSupport,
  onCtaClick,
}) => {
  return (
    <section className="relative min-h-screen w-screen overflow-hidden bg-white font-sans tracking-tight text-gray-900">
      {/* Top-left logo */}
      <div className="absolute top-4 left-4 md:top-6 md:left-6 z-30 select-none">
        <img
          src="/rsnc-tech-company-logo.png"
          alt="Resonance Technology logo"
          className="h-48 w-auto"
          draggable={false}
        />
      </div>
      {navLinks?.length ? (
        <nav
          className="absolute right-4 top-4 z-30 flex max-w-[calc(100vw-2rem)] flex-wrap justify-end gap-2 rounded-full border border-white/70 bg-white/78 px-3 py-2 text-xs font-medium text-slate-700 shadow-sm backdrop-blur-md md:right-6 md:top-6 md:gap-3 md:text-sm"
          aria-label="Primary"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-2 py-1 transition hover:bg-[#45BFD3]/10 hover:text-[#0f6d7b]"
            >
              {link.label}
            </a>
          ))}
        </nav>
      ) : null}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={<div className="h-full w-full bg-white" />}>
          <HeroScene />
        </Suspense>
      </div>

      <div className="absolute inset-x-4 bottom-4 z-20 md:inset-x-auto md:bottom-10 md:left-10">
        <div className="max-w-xl rounded-[2rem] border border-white/70 bg-white/78 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.12)] backdrop-blur-md md:p-8">
          {eyebrow ? (
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#0f6d7b]">
              {eyebrow}
            </p>
          ) : null}
          <h1 className="mt-3 text-4xl font-light tracking-tight text-slate-950 md:text-5xl">{title}</h1>
          <p className="mt-4 text-base leading-relaxed font-light tracking-tight text-slate-700 md:text-lg">
            {description}
          </p>
          {serviceLine ? (
            <p className="mt-4 text-sm tracking-tight text-slate-600">
              {serviceLine}
            </p>
          ) : null}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <PrimaryCta onClick={onCtaClick} />
            <a className="sr-only" href={ctaHref}>
              {primaryCta.text}
            </a>
            {ctaSupport ? (
              <p className="basis-full max-w-md text-sm leading-relaxed text-slate-600">
                {ctaSupport}
              </p>
            ) : null}
          </div>
        </div>
      </div>
      <BlurEffect className="absolute bg-gradient-to-b from-transparent to-white/20 h-1/2 md:h-1/3 w-full bottom-0" position="bottom" intensity={50} />
      <BlurEffect className="absolute bg-gradient-to-b from-white/20 to-transparent h-1/2 md:h-1/3 w-full top-0" position="top" intensity={50} />
    </section>
  );
};

export default Hero;

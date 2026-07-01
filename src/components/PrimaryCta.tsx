import type React from "react";
import { primaryCta } from "@/cta";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";

type PrimaryCtaProps = Omit<
  React.ComponentProps<typeof InteractiveHoverButton>,
  "text" | "className"
>;

export function PrimaryCta(props: PrimaryCtaProps) {
  return (
    <InteractiveHoverButton
      text={primaryCta.text}
      className="bg-white/80 text-gray-900 backdrop-blur-sm"
      {...props}
    />
  );
}

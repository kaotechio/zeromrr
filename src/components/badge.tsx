import * as React from "react";

type BadgeColor = "sky" | "emerald" | "amber" | "blue";

type BadgeCardProps = {
  color: BadgeColor;
  title: string;
  subtitle: string;
  href?: string;
  icon?: React.ReactNode;
  className?: string;
  linkTitle?: string;
};

const colorToClasses: Record<BadgeColor, {
  border: string;
  bg: string;
  title: string;
  subtitle: string;
  iconBg: string;
}> = {
  sky: {
    border: "border-sky-200",
    bg: "bg-sky-50",
    title: "text-sky-900",
    subtitle: "text-sky-800/70",
    iconBg: "bg-sky-100",
  },
  emerald: {
    border: "border-emerald-200",
    bg: "bg-emerald-50",
    title: "text-emerald-900",
    subtitle: "text-emerald-800/70",
    iconBg: "bg-emerald-100",
  },
  amber: {
    border: "border-amber-200",
    bg: "bg-amber-50",
    title: "text-amber-900",
    subtitle: "text-amber-800/70",
    iconBg: "bg-amber-100",
  },
  blue: {
    border: "border-blue-200",
    bg: "bg-blue-50",
    title: "text-blue-900",
    subtitle: "text-blue-800/70",
    iconBg: "bg-blue-100",
  },
};

export default function BadgeCard({ color, title, subtitle, href, icon, className, linkTitle }: BadgeCardProps) {
  const c = colorToClasses[color];
  const Container: any = href ? "a" : "div";
  return (
    <Container
      href={href}
      title={href ? (linkTitle ?? title) : undefined}
      className={`rounded-lg border ${c.border} ${c.bg} p-3 shadow-sm transition-transform duration-200 ease-out hover:scale-[1.02] ${href ? "block" : ""} ${className ?? ""}`}
    >
      <div className="flex items-center gap-2">
        {icon ? (
          <span className={`inline-flex h-6 w-6 items-center justify-center rounded-full ${c.iconBg}`}>{icon}</span>
        ) : null}
        <div>
          <div className={`font-medium ${c.title}`}>{title}</div>
          <div className={`text-sm ${c.subtitle}`}>{subtitle}</div>
        </div>
      </div>
    </Container>
  );
}

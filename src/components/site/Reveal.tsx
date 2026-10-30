import { useEffect, useRef, type ElementType, type ReactNode } from "react";

export function Reveal({
  children,
  as: Tag = "div",
  className = "",
  delay = 0,
  variant = "fade",
}: {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
  variant?: "fade" | "image";
}) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e) return;
        if (e.isIntersecting) {
          el.classList.add("is-visible");
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Tag
      ref={ref}
      className={`${variant === "image" ? "reveal-img" : "reveal"} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

import { ArrowUpRight } from "lucide-react";

export function SiteFooter({ topHref = "#top" }: { topHref?: string }) {
  return (
    <footer className="site-footer section-shell">
      <p>© {new Date().getFullYear()} Rutik Narute</p>
      <a href={topHref}>Back to top <ArrowUpRight size={14} /></a>
    </footer>
  );
}

import { ArrowUpRight } from "lucide-react";

export function SiteFooter({ topHref = "#top" }: { topHref?: string }) {
  return (
    <footer className="site-footer section-shell">
      <div className="site-footer__name" aria-hidden="true">
        <span>Rutik</span> <span>Narute</span>
      </div>
      <a href={topHref}>Back to top <ArrowUpRight size={14} /></a>
    </footer>
  );
}

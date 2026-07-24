import type { ProjectVisual as ProjectVisualType } from "@/data/portfolio";

export function ProjectVisual({ type }: { type: ProjectVisualType }) {
  if (type === "supply") {
    return (
      <div className="visual visual--supply" aria-hidden="true">
        <span className="supply-line supply-line--one" />
        <span className="supply-line supply-line--two" />
        <span className="supply-node supply-node--one">BRAND</span>
        <span className="supply-node supply-node--two">T1</span>
        <span className="supply-node supply-node--three">T2</span>
        <span className="supply-node supply-node--four">T3</span>
        <span className="passport-card">
          <i />
          <b>PASS</b>
          <small>EU / DPP</small>
        </span>
      </div>
    );
  }

  if (type === "atsift") {
    return (
      <div className="visual visual--atsift" aria-hidden="true">
        <div className="atsift-radar">
          <i className="atsift-radar__ring atsift-radar__ring--one" />
          <i className="atsift-radar__ring atsift-radar__ring--two" />
          <i className="atsift-radar__cross atsift-radar__cross--x" />
          <i className="atsift-radar__cross atsift-radar__cross--y" />
          <span className="atsift-radar__point atsift-radar__point--one" />
          <span className="atsift-radar__point atsift-radar__point--two" />
          <span className="atsift-radar__point atsift-radar__point--three" />
        </div>
        <div className="atsift-card">
          <span>FRESH MATCH</span>
          <strong>AI Engineer</strong>
          <small>12 min ago · Los Angeles</small>
        </div>
        <span className="atsift-window">LAST 12 HOURS</span>
      </div>
    );
  }

  return (
    <div className="visual visual--planner" aria-hidden="true">
      <div className="planner-board">
        <span className="planner-day">MON</span>
        <span className="planner-day">TUE</span>
        <span className="planner-day">WED</span>
        <i className="meal meal--one" />
        <i className="meal meal--two" />
        <i className="meal meal--three" />
      </div>
      <span className="planner-pill">MILO / 7 DAY PLAN</span>
    </div>
  );
}

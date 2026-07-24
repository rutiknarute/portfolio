import { ImageResponse } from "next/og";

export const alt = "Rutik Narute — AI Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#070907",
        color: "#f2f4eb",
        padding: "72px",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24 }}>
        <span>RUTIK NARUTE</span>
        <span style={{ color: "#86efac" }}>AI SOFTWARE ENGINEER</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span style={{ fontSize: 122, letterSpacing: "-7px", lineHeight: 0.9 }}>Make AI</span>
        <span style={{ fontSize: 122, letterSpacing: "-7px", lineHeight: 0.9, color: "#86efac" }}>useful.</span>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, color: "#9da692" }}>
        <span>Applied AI · Full-stack systems · Product craft</span>
        <span>LOS ANGELES, CA</span>
      </div>
    </div>,
    size,
  );
}

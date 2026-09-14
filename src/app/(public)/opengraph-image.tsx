import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "AdCollection - a curated library of the best-performing video ads";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const logo = await readFile(join(process.cwd(), "public/adcollection-logo.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 36,
        padding: 96,
        background: "#fff",
        color: "#111",
      }}
    >
      {/** biome-ignore lint/performance/noImgElement: ImageResponse renders Satori JSX, not the DOM */}
      <img src={logoSrc} alt="" width={536} height={59} />
      <div style={{ fontSize: 62, lineHeight: 1.15, letterSpacing: -1.5 }}>
        A curated library of the best-performing video ads.
      </div>
      <div style={{ fontSize: 34, color: "#666" }}>
        Rated and broken down so you can learn what actually works.
      </div>
    </div>,
    size,
  );
}

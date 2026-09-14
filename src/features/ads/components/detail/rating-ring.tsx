"use client";

import { useEffect, useState } from "react";

interface RatingRingProps {
  label: string;
  value: number | null;
  trackVar: string;
  fillVar: string;
  size?: number;
}

const MAX_SCORE = 10;
const RADIUS = 39;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

// The original prints whole scores without a trailing ".0" (9, 8, 10) but keeps
// the decimal when there is one (8.5).
function formatScore(value: number): string {
  return Number.isInteger(value) ? String(value) : value.toFixed(1);
}

export function RatingRing({ label, value, trackVar, fillVar, size = 82 }: RatingRingProps) {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setAnimated(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  const hasValue = value != null && Number.isFinite(value);
  const clamped = hasValue ? Math.min(Math.max(value, 0), MAX_SCORE) : 0;
  const offset = CIRCUMFERENCE * (1 - (animated && hasValue ? clamped : 0) / MAX_SCORE);

  return (
    <div
      className="relative"
      style={{ width: size, height: size }}
      role="img"
      aria-label={hasValue ? `${label}: ${formatScore(clamped)} out of 10` : `${label}: not rated`}
    >
      <svg width={size} height={size} viewBox="0 0 82 82" className="-rotate-90" aria-hidden="true">
        <circle
          cx="41"
          cy="41"
          r={RADIUS}
          fill="none"
          strokeWidth={2}
          style={{ stroke: `var(${trackVar})` }}
        />
        {hasValue && (
          <circle
            cx="41"
            cy="41"
            r={RADIUS}
            fill="none"
            strokeWidth={2}
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={offset}
            className="motion-safe:transition-[stroke-dashoffset] motion-safe:duration-700 motion-safe:ease-out"
            style={{ stroke: `var(${fillVar})` }}
          />
        )}
      </svg>

      <span className="tabular absolute inset-0 flex items-center justify-center text-rating-value text-heading">
        {hasValue ? formatScore(clamped) : ""}
      </span>
    </div>
  );
}

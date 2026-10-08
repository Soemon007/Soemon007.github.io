export type GeometryVariant = "orbit" | "fold" | "wave";

type GeometryArtProps = {
  variant?: GeometryVariant;
  className?: string;
};

/** Decorative, browser-safe line artwork shared by the portfolio sections. */
export function GeometryArt({ variant = "orbit", className = "" }: GeometryArtProps) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 400 400"
      className={`geometry-art geometry-${variant} ${className}`}
      fill="none"
    >
      {variant === "orbit" && (
        <>
          {Array.from({ length: 12 }, (_, i) => (
            <ellipse
              key={i}
              cx="200"
              cy="200"
              rx="145"
              ry="58"
              transform={`rotate(${i * 15} 200 200)`}
            />
          ))}
          <circle cx="200" cy="200" r="164" className="geometry-guide" />
          <path d="M200 14v30M200 356v30M14 200h30M356 200h30" />
        </>
      )}
      {variant === "fold" && (
        <>
          {Array.from({ length: 11 }, (_, i) => (
            <rect
              key={i}
              x={65 + i * 8}
              y={65 + i * 8}
              width={270 - i * 16}
              height={270 - i * 16}
              transform={`rotate(${i * 5} 200 200)`}
            />
          ))}
          <path d="M36 36l328 328M36 364L364 36" className="geometry-guide" />
        </>
      )}
      {variant === "wave" && (
        <>
          {Array.from({ length: 17 }, (_, i) => (
            <path
              key={i}
              d={`M35 ${90 + i * 11} C140 ${-20 + i * 17}, 260 ${420 - i * 17}, 365 ${90 + i * 11}`}
            />
          ))}
          <circle cx="200" cy="200" r="155" className="geometry-guide" />
        </>
      )}
    </svg>
  );
}

import { useId } from "react";

interface NotFoundIconProps {
  width?: number;
  className?: string;
}

const DEFAULT_WIDTH = 1200;
const DEFAULT_HEIGHT = 630;
const ICON_ASPECT_RATIO = DEFAULT_WIDTH / DEFAULT_HEIGHT;
const ICON_WIDTH = 2000;

export function NotFoundIcon({
  width = ICON_WIDTH,
  className = "w-full h-full",
}: NotFoundIconProps) {
  const height = width / ICON_ASPECT_RATIO;

  // generate ids
  const glowId = useId();
  const scanlinesId = useId();
  const glitch404Id = useId();

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={className}
    >
      <title>404 Not Found</title>
      <defs>
        {/* Colors */}
        <style>
          {`
            :root {
              --neon: #00ff84;
              --cyan: #00d9ff;
              --fg: #e6fff4;
              --dim: rgba(255,255,255,0.12);
            }
            text, .fg { fill: var(--fg); }
            .neon { fill: var(--neon); }
            .cyan { fill: var(--cyan); }
            .thin { stroke-width: 1.5; }
            .grid { stroke: #00ff84; stroke-opacity: .07; }
            .trace { stroke: #00ff84; stroke-opacity: .55; stroke-width: 2; fill: none; }
            .node { fill: #00ff84; fill-opacity: .8; }
            .chip { stroke: #00ff84; stroke-opacity: .85; fill: none; }
            .label { font: 16px/1.1 SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace; letter-spacing: .12em; text-transform: uppercase; }
            .brand { font: 18px/1.15 SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace; letter-spacing: .18em; text-transform: uppercase; }
            .num   { font: 220px/0.9 SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace; font-weight: 700; }
            .sub   { font: 18px/1.2 SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace; letter-spacing: .2em; text-transform: uppercase; }
            .mono  { font: 14px SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace; }
            .scan  { opacity: .06; }
          `}
        </style>

        {/* Glow filter */}
        <filter id={glowId} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Subtle noise / scanlines */}
        <filter id={scanlinesId} x="0" y="0" width="100%" height="100%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="2"
            stitchTiles="stitch"
            result="n"
          />
          <feColorMatrix type="saturate" values="0" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.03" />
          </feComponentTransfer>
        </filter>

        {/* Simple glitch offsets by color layers */}
        <g id={glitch404Id}>
          <text
            x={width / 2}
            y={height / 2}
            textAnchor="middle"
            className="num fg"
          >
            404 Not Found
          </text>
          <text
            x={width / 2 + 2}
            y={height / 2 - 2}
            textAnchor="middle"
            className="num neon"
            opacity=".45"
          >
            404 Not Found
          </text>
          <text
            x={width / 2 - 2}
            y={height / 2 + 2}
            textAnchor="middle"
            className="num cyan"
            opacity=".35"
          >
            404 Not Found
          </text>
        </g>
      </defs>

      {/* 404 Title with glow/glitch */}
      <g filter={`url(#${glowId})`}>
        <use href={`#${glitch404Id}`} />
      </g>
    </svg>
  );
}

export default function NotFound() {
  return (
    <div>
      <NotFoundIcon />
    </div>
  );
}

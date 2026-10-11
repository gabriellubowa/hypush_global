import React from "react";
import styled, { keyframes } from "styled-components";

/*
 * Hero visual: a line-drawn listener wearing headphones, with music icons
 * slowly orbiting around them. Drawn in the brand accent with thin strokes so
 * it sits in the same family as the wireframe sphere it replaces. Pure SVG +
 * CSS, so it needs no WebGL and renders on every device.
 */

const SIZE = 520;
const C = SIZE / 2; // centre of the drawing
const ORBIT_R = 200;
const ORBIT_SECONDS = 60; // one full lap; slow, like the old sphere

const spin = keyframes`
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
`;

const counterSpin = keyframes`
  from { transform: rotate(0deg); }
  to   { transform: rotate(-360deg); }
`;

// Orbit + upright cancel in ONE keyframe so Safari cannot desync two clocks.
const iconOrbit = keyframes`
  from {
    transform: rotate(0deg) translateX(${ORBIT_R}px) rotate(0deg);
  }
  to {
    transform: rotate(360deg) translateX(${ORBIT_R}px) rotate(-360deg);
  }
`;

const pulse = keyframes`
  0%, 100% { opacity: 0.25; }
  50%      { opacity: 1; }
`;

const slide = keyframes`
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(var(--slide, 10px)); }
`;

const bob = keyframes`
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-4px); }
`;

const Container = styled.div`
  position: relative;
  width: 520px;
  height: 520px;
  max-width: 100%;

  @media (max-width: 1024px) {
    width: min(360px, calc(100vw - 2 * var(--margins-lg)));
    height: min(360px, calc(100vw - 2 * var(--margins-lg)));
  }

  svg {
    width: 100%;
    height: 100%;
    overflow: visible;
    color: var(--color-accent);
  }

  .line {
    fill: none;
    stroke: currentColor;
    stroke-width: 2.2;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .thin {
    stroke-width: 1;
  }

  .knob {
    fill: var(--color-background);
  }

  .guard {
    fill: none;
    stroke: none;
  }

  .ring,
  .ring-reverse {
    transform-box: fill-box;
    transform-origin: center;
  }

  .ring {
    animation: ${spin} ${ORBIT_SECONDS * 1.5}s linear infinite;
  }

  .ring-reverse {
    animation: ${counterSpin} ${ORBIT_SECONDS * 2}s linear infinite;
  }

  /* Dashed path under the icons — cosmetic only, may drift from icons slightly. */
  .orbit-path {
    transform-box: fill-box;
    transform-origin: center;
    animation: ${spin} ${ORBIT_SECONDS}s linear infinite;
  }

  .icon-orbit {
    transform-box: view-box;
    transform-origin: ${C}px ${C}px;
    animation: ${iconOrbit} ${ORBIT_SECONDS}s linear infinite;
  }

  .wave {
    animation: ${pulse} 1.6s ease-in-out infinite;
  }

  .wave-2 {
    animation-delay: 0.4s;
  }

  .knob-a,
  .knob-b,
  .knob-c,
  .knob-d {
    animation: ${slide} 2.4s ease-in-out infinite;
  }
  .knob-a { --slide: 14px; }
  .knob-b { --slide: -16px; animation-delay: 0.3s; }
  .knob-c { --slide: 12px; animation-delay: 0.6s; }
  .knob-d { --slide: -12px; animation-delay: 0.9s; }

  .listener {
    animation: ${bob} 3.2s ease-in-out infinite;
  }

  @media (prefers-reduced-motion: reduce) {
    .orbit-path,
    .icon-orbit,
    .ring,
    .ring-reverse,
    .wave,
    .knob-a,
    .knob-b,
    .knob-c,
    .knob-d,
    .listener {
      animation: none;
    }

    .icon-orbit {
      /* Park each icon at its start angle without animating. */
      transform: rotate(var(--start-angle, 0deg)) translateX(${ORBIT_R}px) rotate(calc(-1 * var(--start-angle, 0deg)));
    }
  }
`;

/* A small note used inside the bubble, heart and phone icons. */
const MiniNote = ({
  x = 0,
  y = 0,
  scale = 1,
}: {
  x?: number;
  y?: number;
  scale?: number;
}) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`}>
    <path className="line" d="M-3 6 V-9 L9 -12 V3" />
    <ellipse className="line" cx={-6.5} cy={6} rx={3.6} ry={2.8} />
    <ellipse className="line" cx={5.5} cy={3} rx={3.6} ry={2.8} />
  </g>
);

const Notes = () => (
  <g>
    <path className="line" d="M-13 14 V-14 L15 -22 V7" />
    <path className="line" d="M-13 -8 L15 -16" />
    <ellipse className="line" cx={-18} cy={14} rx={6} ry={4.6} />
    <ellipse className="line" cx={10} cy={7} rx={6} ry={4.6} />
    <path className="line" d="M22 -24 V-4" />
    <ellipse className="line" cx={18.5} cy={-4} rx={4.2} ry={3.2} />
    <path className="line" d="M22 -24 Q30 -20 28 -12" />
  </g>
);

const Bubble = () => (
  <g>
    <path
      className="line"
      d="M-18 -24 H18 Q28 -24 28 -14 V6 Q28 16 18 16 H-2 L-14 28 L-12 16 H-18 Q-28 16 -28 6 V-14 Q-28 -24 -18 -24 Z"
    />
    <MiniNote x={0} y={-3} />
  </g>
);

const Heart = () => (
  <g>
    <path
      className="line"
      d="M0 26 C-34 4 -32 -24 -14 -25 C-6 -25.5 -1 -20 0 -14 C1 -20 6 -25.5 14 -25 C32 -24 34 4 0 26 Z"
    />
    <MiniNote x={0} y={-2} />
  </g>
);

const Speaker = () => (
  <g>
    <rect className="line" x={-13} y={-24} width={26} height={46} rx={4} />
    <circle className="line" cx={0} cy={7} r={8} />
    <circle className="line" cx={0} cy={7} r={2.5} />
    <circle className="line" cx={0} cy={-12} r={3.5} />
    <path className="line wave" d="M20 -10 Q25 0 20 10" />
    <path className="line wave wave-2" d="M27 -17 Q35 0 27 17" />
    <path className="line wave" d="M-20 -10 Q-25 0 -20 10" />
    <path className="line wave wave-2" d="M-27 -17 Q-35 0 -27 17" />
  </g>
);

const Earbuds = () => (
  <g>
    <circle className="line" cx={-12} cy={-12} r={9} />
    <path className="line" d="M-16 -4 V18 Q-16 22 -12 22 Q-8 22 -8 18 V-4" />
    <circle className="line" cx={12} cy={-12} r={9} />
    <path className="line" d="M8 -4 V18 Q8 22 12 22 Q16 22 16 18 V-4" />
    <path className="line thin" d="M-12 22 V28 M12 22 V28" />
  </g>
);

const Player = () => (
  <g>
    <rect className="line" x={-16} y={-26} width={30} height={50} rx={5} />
    <rect className="line" x={-11} y={-21} width={20} height={18} rx={2} />
    <MiniNote x={-1} y={-11} scale={0.6} />
    <circle className="line" cx={-1} cy={11} r={7} />
    <circle className="line" cx={-1} cy={11} r={2} />
    <path className="line" d="M14 -18 C30 -18 34 6 26 14 C20 20 24 28 30 28" />
    <rect className="line" x={28} y={26} width={8} height={4} rx={2} />
  </g>
);

const Equalizer = () => (
  <g>
    {[-18, -6, 6, 18].map((x) => (
      <path key={x} className="line" d={`M${x} -24 V24`} />
    ))}
    <circle className="line knob knob-a" cx={-18} cy={-8} r={4.5} />
    <circle className="line knob knob-b" cx={-6} cy={10} r={4.5} />
    <circle className="line knob knob-c" cx={6} cy={-12} r={4.5} />
    <circle className="line knob knob-d" cx={18} cy={6} r={4.5} />
  </g>
);

const Phone = () => (
  <g>
    <rect className="line" x={-16} y={-27} width={32} height={54} rx={6} />
    <path className="line" d="M-16 -18 H16 M-16 16 H16" />
    <path className="line" d="M-4 21.5 H4" />
    <MiniNote x={0} y={-1} />
  </g>
);

/* Clockwise from the top, matching the reference layout. */
const ICONS = [Notes, Heart, Speaker, Earbuds, Player, Equalizer, Phone, Bubble];

const Listener = () => (
  <g className="listener">
    {/* shoulders */}
    <path
      className="line"
      d={`M${C - 120} ${C + 125} C${C - 105} ${C + 75} ${C - 60} ${C + 62} ${C - 26} ${C + 58}`}
    />
    <path
      className="line"
      d={`M${C + 120} ${C + 125} C${C + 105} ${C + 75} ${C + 60} ${C + 62} ${C + 26} ${C + 58}`}
    />
    {/* neck */}
    <path className="line" d={`M${C - 24} ${C + 30} L${C - 26} ${C + 58}`} />
    <path className="line" d={`M${C + 24} ${C + 30} L${C + 26} ${C + 58}`} />
    {/* head */}
    <path
      className="line"
      d={`M${C - 24} ${C + 30} C${C - 52} ${C + 14} ${C - 56} ${C - 20} ${C - 54} ${C - 40}
          C${C - 50} ${C - 80} ${C - 28} ${C - 98} ${C} ${C - 98}
          C${C + 28} ${C - 98} ${C + 50} ${C - 80} ${C + 54} ${C - 40}
          C${C + 56} ${C - 20} ${C + 52} ${C + 14} ${C + 24} ${C + 30}`}
    />
    {/* headband: double line, like a padded band */}
    <path
      className="line"
      d={`M${C - 70} ${C - 22} C${C - 76} ${C - 150} ${C + 76} ${C - 150} ${C + 70} ${C - 22}`}
    />
    <path
      className="line"
      d={`M${C - 60} ${C - 26} C${C - 64} ${C - 134} ${C + 64} ${C - 134} ${C + 60} ${C - 26}`}
    />
    {/* ear cups */}
    <rect className="line knob" x={C - 78} y={C - 38} width={26} height={54} rx={12} />
    <rect className="line knob" x={C + 52} y={C - 38} width={26} height={54} rx={12} />
    <rect className="line knob" x={C - 88} y={C - 28} width={12} height={34} rx={6} />
    <rect className="line knob" x={C + 76} y={C - 28} width={12} height={34} rx={6} />
  </g>
);

export const OrbitingListener = () => (
  <Container>
    <svg
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      role="img"
      aria-label="A listener wearing headphones, with music icons orbiting around them"
    >
      {/* faint guide rings, drifting in opposite directions */}
      <g className="ring">
        <circle className="guard" cx={C} cy={C} r={ORBIT_R + 40} />
        <circle
          className="line thin"
          cx={C}
          cy={C}
          r={ORBIT_R + 28}
          strokeDasharray="1 9"
          opacity={0.5}
        />
      </g>
      <g className="ring-reverse">
        <circle className="guard" cx={C} cy={C} r={ORBIT_R + 40} />
        <circle
          className="line thin"
          cx={C}
          cy={C}
          r={ORBIT_R - 30}
          strokeDasharray="2 12"
          opacity={0.35}
        />
      </g>

      <Listener />

      {/* Dashed ring (visual only). Icons use a locked orbit/upright keyframe. */}
      <g className="orbit-path">
        <circle className="guard" cx={C} cy={C} r={ORBIT_R + 40} />
        <circle
          className="line"
          cx={C}
          cy={C}
          r={ORBIT_R}
          strokeDasharray="3 11"
          strokeWidth={2}
        />
      </g>

      {ICONS.map((Icon, i) => {
        const startAngleDeg = (i / ICONS.length) * 360 - 90;
        const delaySeconds = -((i / ICONS.length) * ORBIT_SECONDS);
        return (
          <g
            key={i}
            className="icon-orbit"
            style={
              {
                "--start-angle": `${startAngleDeg}deg`,
                animationDelay: `${delaySeconds.toFixed(4)}s`,
              } as React.CSSProperties
            }
          >
            {/* Drawn at the SVG centre; the orbit keyframe pushes it out on +X. */}
            <g transform={`translate(${C} ${C})`}>
              <circle className="guard" cx={0} cy={0} r={40} />
              <circle cx={0} cy={0} r={36} fill="var(--color-background)" />
              <Icon />
            </g>
          </g>
        );
      })}
    </svg>
  </Container>
);

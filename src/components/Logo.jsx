import React from 'react';

/**
 * Federation mark: a marigold of eight petals — many organisations — joined
 * at one shared centre. Petals alternate marigold and terracotta; the centre
 * is the federation (forest green) with a light core.
 */
export function LogoMark({ size = 44, title }) {
  const petals = Array.from({ length: 8 }, (_, i) => i * 45);
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      className="logo-mark"
    >
      {petals.map((deg, i) => (
        <path
          key={deg}
          d="M24 24 C 19.5 18, 20 8.5, 24 3.5 C 28 8.5, 28.5 18, 24 24 Z"
          fill={i % 2 === 0 ? '#eab045' : '#c8532b'}
          transform={`rotate(${deg + 22.5} 24 24)`}
        />
      ))}
      <circle cx="24" cy="24" r="8.2" fill="#1d5b45" stroke="#fbf8f2" strokeWidth="1.6" />
      <circle cx="24" cy="24" r="2.6" fill="#fbf8f2" />
      {[0, 90, 180, 270].map((deg) => (
        <circle key={deg} cx="24" cy="18.9" r="1.05" fill="#fbf8f2" transform={`rotate(${deg + 45} 24 24)`} />
      ))}
    </svg>
  );
}

export default function Logo({ tone = 'light', size = 44 }) {
  return (
    <span className={`logo logo-${tone}`}>
      <LogoMark size={size} />
      <span className="logo-words">
        <span className="logo-super">Indian National</span>
        <span className="logo-main">NGO Federation</span>
      </span>
    </span>
  );
}

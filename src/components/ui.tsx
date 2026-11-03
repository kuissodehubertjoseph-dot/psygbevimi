import React from 'react';
import { Link } from 'react-router-dom';

const BTN_BASE =
  'h-[52px] px-[28px] font-bricolage font-semibold text-[16px] rounded-[8px] inline-flex items-center justify-center transition-colors min-h-[48px] text-center focus-visible:outline-2 focus-visible:outline-offset-2';

export const BTN = {
  primary: `${BTN_BASE} bg-[#D98268] hover:bg-[#C4704F] text-[#15173D]  focus-visible:outline-[#15173D]`,
  primaryOnDark: `${BTN_BASE} bg-[#D98268] hover:bg-[#C4704F] text-[#15173D]  focus-visible:outline-[#D98268]`,
  outline: `${BTN_BASE} bg-transparent text-[#15173D] border-2 border-[#15173D] hover:bg-[#15173D] hover:text-[#F3F1F8] focus-visible:outline-[#15173D]`,
  outlineOnDark: `${BTN_BASE} bg-transparent text-[#F3F1F8] border-2 border-[#F3F1F8] hover:bg-[#F3F1F8] hover:text-[#15173D] focus-visible:outline-[#D98268]`,
};

interface ButtonLinkProps {
  href: string;
  className: string;
  children: React.ReactNode;
}

/** Lien interne (routeur) ou externe (nouvel onglet) selon l'adresse */
export const ButtonLink: React.FC<ButtonLinkProps> = ({ href, className, children }) => {
  if (href.startsWith('/')) {
    return (
      <Link to={href} className={className}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
    </a>
  );
};


export const H2: React.FC<{ id?: string; children: React.ReactNode; onDark?: boolean }> = ({ id, children, onDark }) => (
  <h2
    id={id}
    className={`font-bricolage font-bold text-[clamp(1.9rem,3.6vw,3rem)] leading-[1.1] tracking-[-0.015em] ${
      onDark ? 'text-[#F3F1F8]' : 'text-[#15173D]'
    }`}
  >
    {children}
  </h2>
);

export const PageHeader: React.FC<{ eyebrow: string; title: string; intro?: string }> = ({ eyebrow, title, intro }) => (
  <section className="bg-[#15173D] text-[#F3F1F8] py-16 lg:py-24">
    <div className="max-w-[1160px] mx-auto px-6 lg:px-12">
      <h1 className="font-bricolage font-bold text-[clamp(2.2rem,5vw,4rem)] leading-[1.08] tracking-[-0.02em] max-w-[22ch]">
        {title}
      </h1>
      {intro && (
        <p className="mt-6 font-atkinson text-[#C9C8E3] text-[1.125rem] leading-[1.65] max-w-[65ch]">{intro}</p>
      )}
    </div>
  </section>
);

export const Check: React.FC<{ className?: string }> = ({ className = 'w-5 h-5 text-[#12694A] shrink-0 mt-0.5' }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
  </svg>
);

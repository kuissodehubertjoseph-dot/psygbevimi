import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { PROGRAMS_DATA, YOUTH_BOOKING_MESSAGE, createWhatsAppUrl } from '../data';

interface ProgramsProps {
  highlightedProgramId: string | null;
  /** Sur la page d'accueil, la section suit directement « Vous vous reconnaissez ? » */
  flushTop?: boolean;
}

// Une teinte par accompagnement : fond de la carte au repos, puis nuit au survol
const TONES: Record<string, string> = {
  sante: 'bg-[#E9D5E4]',
  coaching: 'bg-[#F6E1D8]',
  jeune: 'bg-[#DCE8E1]',
  entreprise: 'bg-[#D9DAEE]',
};

const CARD_CLS =
  'relative flex flex-col min-h-[300px] shrink-0 snap-start w-full md:w-[calc(50%-10px)] rounded-[20px] p-8 lg:p-10 overflow-hidden focus-visible:outline-2 focus-visible:outline-[#15173D] focus-visible:outline-offset-4';

// Délai entre deux défilements automatiques des cartes
const AUTO_SCROLL_MS = 3500;

export const Programs: React.FC<ProgramsProps> = ({ highlightedProgramId, flushTop = false }) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);

  // Les cartes défilent à tour de rôle, en boucle ; pause au survol ou au focus
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = setInterval(() => {
      const track = trackRef.current;
      if (!track || pausedRef.current) return;
      const first = track.firstElementChild as HTMLElement | null;
      if (!first) return;
      const step = first.offsetWidth + 20;
      const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
      track.scrollTo({ left: atEnd ? 0 : track.scrollLeft + step, behavior: 'smooth' });
    }, AUTO_SCROLL_MS);
    return () => clearInterval(timer);
  }, []);

  // Arrivée depuis « Vous vous reconnaissez ? » : on amène le programme à l'écran
  useEffect(() => {
    if (!highlightedProgramId) return;
    const timer = setTimeout(() => {
      document.getElementById(highlightedProgramId)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 50);
    return () => clearTimeout(timer);
  }, [highlightedProgramId]);

  return (
    <section
      id="accompagnements"
      aria-labelledby="programs-heading"
      className={`scroll-mt-28 py-16 lg:py-24 bg-[#F3F1F8] ${flushTop ? 'pt-0 lg:pt-0' : ''}`}
    >
      <div className="max-w-[1160px] mx-auto px-6 lg:px-12">
        <h2
          id="programs-heading"
          className="uppercase text-[#15173D] text-[clamp(1.9rem,3.6vw,3rem)] leading-[1.1] max-w-[22ch]"
          style={{ fontFamily: 'Roboto, Arial, sans-serif', fontWeight: 700 }}
        >
          {PROGRAMS_DATA.title}
        </h2>

        <div
          ref={trackRef}
          onMouseEnter={() => (pausedRef.current = true)}
          onMouseLeave={() => (pausedRef.current = false)}
          onFocus={() => (pausedRef.current = true)}
          onBlur={() => (pausedRef.current = false)}
          className="mt-12 flex gap-5 overflow-x-auto snap-x snap-mandatory py-2 -my-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {PROGRAMS_DATA.programs.map((prog, i) => {
            const ring = highlightedProgramId === prog.id ? ' ring-4 ring-[#D98268]' : '';
            const cls = `${CARD_CLS} ${TONES[prog.id]}${ring}`;
            const content = (
              <>
                <span
                  aria-hidden="true"
                  className="font-bricolage text-[4rem] leading-none text-[#15173D]/15"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3
                  className="mt-6 font-bricolage font-bold text-[1.9rem] leading-tight text-[#15173D]"
                  style={{ fontWeight: 700 }}
                >
                  {prog.title}
                </h3>
                <p className="mt-3 font-atkinson text-[1.05rem] leading-[1.65] text-[#15173D]/80 max-w-[44ch]">
                  {prog.description}
                </p>
                <div className="mt-auto pt-8 flex items-center justify-between gap-4">
                  <p className="font-bricolage font-semibold text-[14px] uppercase tracking-[0.12em] text-[#15173D]">
                    {prog.badge}
                  </p>
                  <span className="inline-flex items-center gap-1 font-semibold text-[15px] text-[#2563eb] whitespace-nowrap">
                    {prog.buttonLabel}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                </div>
              </>
            );

            return prog.slug ? (
              <Link key={prog.id} id={prog.id} to={`/program/${prog.slug}`} className={cls}>
                {content}
              </Link>
            ) : (
              <a
                key={prog.id}
                id={prog.id}
                href={createWhatsAppUrl(YOUTH_BOOKING_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
                className={cls}
              >
                {content}
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

import React from 'react';
import { Link } from 'react-router-dom';
import { HERO_DATA, createWhatsAppUrl, DEFAULT_BOOKING_MESSAGE } from '../data';

export const Hero: React.FC = () => {
  const bookingUrl = createWhatsAppUrl(DEFAULT_BOOKING_MESSAGE);

  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="relative bg-[#15173D] text-[#F3F1F8] min-h-[60vh] overflow-hidden flex items-center pt-8 pb-12 lg:py-14"
    >
      {/* Image d'arrière-plan + voile bleu nuit pour garder le texte lisible */}
      <img src="/images/hero-bg.jpg" alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-[#15173D]/75" aria-hidden="true" />
      <div className="max-w-[1160px] mx-auto px-6 lg:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        {/* Colonne texte (7/12 sur bureau) */}
        <div className="lg:col-span-9 flex flex-col items-start">
          <h1
            id="hero-heading"
            className="font-bricolage font-bold text-[#F3F1F8] text-[clamp(2.1rem,4.6vw,3.6rem)] leading-[1.05] tracking-[-0.02em] max-w-[20ch]"
          >
            {HERO_DATA.title.split('avec une équipe')[0]}
            <span className="text-[#D98268]">avec une équipe{HERO_DATA.title.split('avec une équipe')[1]}</span>
          </h1>

          <p className="mt-8 font-atkinson text-[#C9C8E3] text-[1.125rem] leading-[1.65] max-w-[65ch]">
            {HERO_DATA.paragraph}
          </p>

          {/* Boutons d'action */}
          <div className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
            <a
              href={bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="h-[52px] px-[28px] font-bricolage font-semibold text-[16px] bg-[#D98268] hover:bg-[#C4704F] text-[#15173D]  rounded-[8px] inline-flex items-center justify-center transition-colors min-h-[48px] focus-visible:outline-2 focus-visible:outline-[#D98268] focus-visible:outline-offset-2 text-center"
            >
              {HERO_DATA.primaryCta}
            </a>

            <Link
              to="/tests"
              className="h-[52px] px-[28px] font-bricolage font-semibold text-[16px] glass-dark text-[#F3F1F8] rounded-[8px] inline-flex items-center justify-center transition-colors min-h-[48px] focus-visible:outline-2 focus-visible:outline-[#D98268] focus-visible:outline-offset-2 text-center"
            >
              {HERO_DATA.secondaryCta}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

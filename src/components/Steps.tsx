import React from 'react';
import { STEPS_DATA, createWhatsAppUrl, DEFAULT_BOOKING_MESSAGE } from '../data';
import { H2 } from './ui';

export const Steps: React.FC = () => {
  const bookingUrl = createWhatsAppUrl(DEFAULT_BOOKING_MESSAGE);

  return (
    <section
      aria-labelledby="steps-heading"
      className="py-16 lg:py-24 bg-[#E9D5E4]/40"
    >
      <div className="max-w-[1160px] mx-auto px-6 lg:px-12">
        <H2 id="steps-heading">{STEPS_DATA.title}</H2>

        {/* Séquence horizontale sur bureau, verticale sur mobile */}
        <div className="mt-16 relative">
          {/* Ligne de connexion : horizontale sur bureau, verticale sur mobile */}
          <div
            className="hidden lg:block absolute top-[22px] left-[44px] right-[44px] h-[2px] bg-[#5A5D7E]/30 z-0"
            aria-hidden="true"
          />
          <div
            className="lg:hidden absolute top-[22px] bottom-[22px] left-[21px] w-[2px] bg-[#5A5D7E]/30 z-0"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-8 relative z-10">
            {STEPS_DATA.steps.map((step) => (
              <div
                key={step.number}
                className="flex lg:flex-col items-start gap-5 lg:gap-6"
              >
                {/* Cercle numéroté 44px, fond nuit, texte aube */}
                <div className="w-[44px] h-[44px] rounded-full bg-[#15173D] text-[#F3F1F8] font-bricolage font-bold text-[18px] flex items-center justify-center shrink-0 shadow-xs">
                  {step.number}
                </div>

                <div className="flex flex-col items-start">
                  <h3 className="font-bricolage font-semibold text-[1.35rem] text-[#15173D] leading-tight">
                    {step.title}
                  </h3>
                  <p className="mt-3 font-atkinson text-[#5A5D7E] text-[1.05rem] leading-[1.6]">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bouton principal en dessous */}
        <div className="mt-14 flex items-center">
          <a
            href={bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="h-[52px] px-[28px] font-bricolage font-semibold text-[16px] bg-[#D98268] hover:bg-[#C4704F] text-[#15173D]  rounded-[8px] inline-flex items-center justify-center transition-colors min-h-[48px] focus-visible:outline-2 focus-visible:outline-[#15173D] focus-visible:outline-offset-2"
          >
            {STEPS_DATA.cta}
          </a>
        </div>
      </div>
    </section>
  );
};

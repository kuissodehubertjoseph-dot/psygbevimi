import React from 'react';
import { FIRST_STEP_DATA as D, createWhatsAppUrl, DEFAULT_BOOKING_MESSAGE } from '../data';
import { BTN } from './ui';

/** Bloc « Un premier échange gratuit » : carte claire posée sur fond lavande, pour se détacher du pied de page */
export const FirstStep: React.FC = () => {
  const bookingUrl = createWhatsAppUrl(DEFAULT_BOOKING_MESSAGE);

  return (
    <section className="bg-[#F3F1F8] py-16 lg:py-24">
      <div className="max-w-[1160px] mx-auto px-6 lg:px-12">
        <div className="bg-[#E9D5E4] rounded-[28px] p-8 sm:p-12 lg:p-16 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-7">
            <h2 className="font-bricolage text-[clamp(1.9rem,3.6vw,3rem)] leading-[1.1] text-[#15173D] max-w-[18ch]">
              {D.title}
            </h2>
            <p className="mt-5 text-[1.15rem] leading-[1.7] text-[#15173D]/85 max-w-[52ch]">{D.text}</p>
          </div>

          <div className="lg:col-span-5 bg-white rounded-[20px] p-7 sm:p-8 flex flex-col items-start gap-5">
            <a href={bookingUrl} target="_blank" rel="noopener noreferrer" className={`${BTN.primary} w-full`}>
              {D.cta}
            </a>
            <a
              href={D.phoneLink}
              className="font-bricolage text-[1.3rem] text-[#15173D] hover:text-[#D98268] transition-colors"
            >
              {D.phoneDisplay}
            </a>
            <p className="pt-5 border-t border-[#15173D]/10 text-[14px] leading-[1.6] text-[#5A5D7E]">{D.disclaimer}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

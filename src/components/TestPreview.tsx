import React from 'react';
import { TESTS_HOME_DATA as D } from '../data';
import { BTN, ButtonLink, H2 } from './ui';

export const TestPreview: React.FC = () => {
  return (
    <section aria-labelledby="tests-heading" className="py-16 lg:py-24 bg-[#F3F1F8]">
      <div className="max-w-[1160px] mx-auto px-6 lg:px-12">
        {/* Panneau fond rose, rayon 8px */}
        <div className="bg-[#E9D5E4] rounded-[8px] p-8 lg:p-14 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          <div className="lg:col-span-7">
            <H2 id="tests-heading">{D.title}</H2>
            <p className="mt-4 font-atkinson text-[#15173D]/90 text-[1.125rem] leading-[1.65] max-w-[60ch]">{D.text}</p>

            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <ButtonLink href={D.startUrl} className={BTN.primary}>
                {D.primaryCta}
              </ButtonLink>
              <ButtonLink href="/tests" className={BTN.outline}>
                {D.secondaryCta}
              </ButtonLink>
            </div>

            <p className="mt-8 font-atkinson font-bold text-[14px] text-[#5A5D7E] leading-relaxed max-w-[60ch]">{D.disclaimer}</p>
          </div>

          <div className="lg:col-span-5 bg-[#F3F1F8] rounded-[8px] p-6 lg:p-8 border border-[#15173D]/10 self-start">
            <span className="inline-flex items-center px-3 py-1 rounded-[8px] text-[13px] font-atkinson font-bold bg-[#15173D] text-[#F3F1F8]">
              {D.badge}
            </span>
            <p className="mt-4 font-atkinson font-bold text-[15px] text-[#15173D]/90 leading-[1.65]">{D.description}</p>

            <h3 className="mt-6 font-bricolage font-bold text-[15px] text-[#15173D]" style={{ fontWeight: 700 }}>{D.dimensionsTitle}</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {D.dimensions.map((dimension) => (
                <li
                  key={dimension}
                  className="px-3 py-1.5 rounded-[8px] bg-[#E9D5E4]/60 border border-[#15173D]/10 font-atkinson font-bold text-[13px] text-[#15173D] leading-snug"
                >
                  {dimension}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

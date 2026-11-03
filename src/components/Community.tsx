import React from 'react';
import { COMMUNITY_DATA as D, createWhatsAppUrl } from '../data';
import { Bird } from './Bird';
import { BTN, H2, PageHeader } from './ui';

const JOIN_MESSAGE = 'Bonjour Psy Gbevimi, je souhaite rejoindre la communauté des Aiglons & Aiglonnes. Je viens de la page « Communauté ».';

export const Community: React.FC = () => {
  const joinUrl = createWhatsAppUrl(JOIN_MESSAGE);

  return (
    <>
      <PageHeader eyebrow={D.pageEyebrow} title={D.pageTitle} intro={D.pageParagraph} />

      <section className="bg-[#15173D] text-[#F3F1F8] pb-16 lg:pb-20 -mt-1">
        <div className="max-w-[1160px] mx-auto px-6 lg:px-12">
          <a href={joinUrl} target="_blank" rel="noopener noreferrer" className={BTN.primaryOnDark}>
            {D.joinCta}
          </a>
        </div>
      </section>

      {/* Être Aiglon ou Aiglonne */}
      <section className="py-16 lg:py-24 bg-[#F3F1F8]">
        <div className="max-w-[1160px] mx-auto px-6 lg:px-12">
          <H2>{D.beTitle}</H2>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {D.verbs.map((v) => (
              <div key={v.verb} className="bg-[#E9D5E4]/50 border border-[#15173D]/10 rounded-[8px] p-6">
                <h3 className="font-bricolage font-bold text-[1.6rem] text-[#15173D]">{v.verb}</h3>
                <p className="mt-2 font-atkinson text-[1.05rem] text-[#15173D]/90 leading-[1.6]">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* L'esprit Psy Gbevimi */}
      <section className="py-16 lg:py-24 bg-[#E9D5E4]/40">
        <div className="max-w-[1160px] mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5">
            <H2>{D.spiritTitle}</H2>
          </div>
          <ul className="lg:col-span-7 divide-y divide-[#15173D]/10 border-t border-b border-[#15173D]/10">
            {D.spirit.map((s) => (
              <li key={s} className="py-4 font-bricolage font-semibold text-[1.25rem] text-[#15173D]">
                {s}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Notre devise */}
      <section className="py-16 lg:py-24 bg-[#15173D] text-[#F3F1F8]">
        <div className="max-w-[1160px] mx-auto px-6 lg:px-12">
          <h2 className="font-bricolage font-bold text-[clamp(1.9rem,3.6vw,3rem)] leading-[1.15] max-w-[26ch]">
            {D.mottoTitle}
          </h2>
          <p className="mt-6 font-atkinson text-[#C9C8E3] text-[1.125rem] leading-[1.65] max-w-[65ch]">{D.mottoText}</p>

          <div className="mt-12 space-y-6">
            {D.pillars.map((pillar) => (
              <div key={pillar} className="flex items-center gap-4 sm:gap-6">
                <Bird className="w-[28px] sm:w-[36px] h-auto text-[#D98268] shrink-0" />
                <span className="font-bricolage font-semibold text-[clamp(1.5rem,2.8vw,2.4rem)] leading-tight">
                  {pillar}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <a href={joinUrl} target="_blank" rel="noopener noreferrer" className={BTN.primaryOnDark}>
              {D.joinCta}
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

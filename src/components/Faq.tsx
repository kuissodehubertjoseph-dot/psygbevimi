import React from 'react';
import { Link } from 'react-router-dom';
import { FAQ_DATA, createWhatsAppUrl, DEFAULT_QUESTION_MESSAGE } from '../data';
import { BTN, PageHeader } from './ui';

export const Faq: React.FC = () => {
  const questionUrl = createWhatsAppUrl(DEFAULT_QUESTION_MESSAGE);

  return (
    <>
      <PageHeader eyebrow={FAQ_DATA.eyebrow} title={FAQ_DATA.title} />

      <section id="faq" aria-label={FAQ_DATA.title} className="py-16 lg:py-20 bg-[#F3F1F8]">
        <div className="max-w-[1160px] mx-auto px-6 lg:px-12">
          <div className="divide-y divide-[#15173D]/10 border-t border-b border-[#15173D]/10 max-w-[900px]">
            {FAQ_DATA.items.map((item, index) => (
              <details key={item.question} open={index === 0} className="group py-5">
                <summary className="flex items-center justify-between gap-4 cursor-pointer list-none rounded-[8px] py-1 select-none focus-visible:outline-2 focus-visible:outline-[#15173D] focus-visible:outline-offset-2">
                  <h2 className="font-bricolage font-semibold text-[1.25rem] text-[#15173D] leading-snug group-hover:text-[#5A5D7E] transition-colors">
                    {item.question}
                  </h2>
                  <div className="w-8 h-8 rounded-full bg-[#E9D5E4]/50 flex items-center justify-center shrink-0 text-[#15173D] transition-transform duration-200 group-open:rotate-180">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </summary>

                <div className="pt-3 pb-2 pr-8">
                  <p className="font-atkinson text-[1.1rem] text-[#15173D]/90 leading-[1.65]">
                    {item.answer.split('notre politique de confidentialité').map((part, i, arr) => (
                      <React.Fragment key={i}>
                        {part}
                        {i < arr.length - 1 && (
                          <Link to="/confidentialite" className="underline">
                            notre politique de confidentialité
                          </Link>
                        )}
                      </React.Fragment>
                    ))}
                  </p>
                </div>
              </details>
            ))}
          </div>

          <div className="mt-12 flex flex-col sm:flex-row sm:items-center gap-4">
            <p className="font-atkinson text-[1.125rem] text-[#15173D]">{FAQ_DATA.bottomText}</p>
            <a href={questionUrl} target="_blank" rel="noopener noreferrer" className={`${BTN.primary} w-fit`}>
              {FAQ_DATA.bottomCta}
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

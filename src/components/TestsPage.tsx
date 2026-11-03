import React from 'react';
import { Link } from 'react-router-dom';
import { TESTS_PAGE_DATA as D } from '../data';
import { BTN } from './ui';

export const TestsPage: React.FC = () => {
  return (
    <>
      {/* Ouverture */}
      <section className="bg-[#F3F1F8] pt-14 pb-10 lg:pt-20 lg:pb-12">
        <div className="max-w-[1160px] mx-auto px-6 lg:px-12">
          <h1 className="font-bricolage text-[clamp(2.2rem,4.8vw,3.8rem)] leading-[1.1] text-[#15173D] max-w-[20ch]">
            {D.title}
          </h1>
          <p className="mt-6 text-[1.15rem] leading-[1.75] text-[#15173D]/80 max-w-[58ch]">{D.intro}</p>
        </div>
      </section>

      {/* Les trois tests, une ligne chacun */}
      <section className="bg-[#F3F1F8] pb-16 lg:pb-24">
        <div className="max-w-[1160px] mx-auto px-6 lg:px-12 flex flex-col gap-4">
          {D.tests.map((t) => (
            <Link
              key={t.url}
              to={t.url}
              className="bg-white rounded-[24px] border border-[#15173D]/10 p-7 lg:p-9 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center focus-visible:outline-2 focus-visible:outline-[#15173D] focus-visible:outline-offset-4"
            >
              <div className="lg:col-span-6">
                <p className="font-bricolage font-semibold text-[12px] uppercase tracking-[0.14em] text-[#D98268]">
                  {t.programme}
                </p>
                <h2 className="mt-3 font-bricolage text-[clamp(1.5rem,2.4vw,2rem)] leading-[1.2] text-[#15173D]">
                  {t.title}
                </h2>
                <p className="mt-2 text-[1.05rem] leading-[1.6] text-[#5A5D7E]">{t.audience}</p>
              </div>

              <div className="lg:col-span-3 flex lg:flex-col gap-x-6 gap-y-1 flex-wrap">
                <p className="font-bricolage text-[1.35rem] text-[#15173D]">{t.duration}</p>
                <p className="text-[1rem] text-[#5A5D7E]">{t.questions}</p>
              </div>

              <div className="lg:col-span-3 flex lg:justify-end">
                <span className={`${BTN.primary} w-full sm:w-auto`}>{D.startLabel}</span>
              </div>
            </Link>
          ))}

          <p className="mt-6 text-[14px] leading-[1.7] text-[#5A5D7E] max-w-[85ch]">{D.disclaimer}</p>
        </div>
      </section>
    </>
  );
};

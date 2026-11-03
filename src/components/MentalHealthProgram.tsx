import React from 'react';
import { Link } from 'react-router-dom';
import {
  PROGRAM_DETAILS,
  PROGRAM_PAGE_COMMON as C,
  createWhatsAppUrl,
  TESTS_PAGE_DATA,
} from '../data';
import { BTN } from './ui';

// Mise en page propre à « Santé mentale » : bandeau rose, colonne latérale fixe, parcours en frise verticale
export const MentalHealthProgram: React.FC = () => {
  const program = PROGRAM_DETAILS.find((p) => p.slug === 'mental-health-wellbeing')!;
  const bookingUrl = createWhatsAppUrl(
    `Bonjour Psy Gbevimi, je souhaite réserver mon appel découverte gratuit. Je viens de la page « ${program.title} ».`,
  );
  const test = TESTS_PAGE_DATA.tests.find((t) => t.title === program.testName);

  const facts = [
    { label: C.targetLabel, value: program.target },
    { label: C.approachLabel, value: program.approach },
    { label: C.formatLabel, value: program.format },
  ];

  return (
    <>
      {/* Bandeau d'ouverture */}
      <section className="bg-[#E9D5E4]">
        <div className="max-w-[1160px] mx-auto px-6 lg:px-12 pt-10 pb-16 lg:pb-24">
          <Link
            to="/#accompagnements"
            className="inline-flex items-center gap-2 text-[15px] text-[#15173D]/70 hover:text-[#15173D] transition-colors"
          >
            <span aria-hidden="true">←</span> {C.back}
          </Link>
          <h1 className="mt-10 font-bricolage text-[clamp(2.4rem,5.5vw,4.6rem)] leading-[1.05] text-[#15173D] max-w-[16ch]">
            {program.title}
          </h1>
          <p className="mt-6 text-[1.2rem] leading-[1.7] text-[#15173D]/85 max-w-[58ch]">{program.intro}</p>
        </div>
      </section>

      <section className="bg-[#F3F1F8] py-14 lg:py-20">
        <div className="max-w-[1160px] mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Colonne latérale fixe */}
          <aside className="lg:col-span-4 lg:order-2">
            <div className="lg:sticky lg:top-28 flex flex-col gap-5">
              <div className="bg-white rounded-[20px] border border-[#15173D]/10 p-7">
                <dl className="divide-y divide-[#15173D]/10">
                  {facts.map((f) => (
                    <div key={f.label} className="py-4 first:pt-0 last:pb-0">
                      <dt className="font-bricolage font-semibold text-[12px] uppercase tracking-[0.14em] text-[#5A5D7E]">
                        {f.label}
                      </dt>
                      <dd className="mt-1 font-bricolage text-[1.1rem] leading-snug text-[#15173D]">{f.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <div className="bg-[#15173D] text-[#F3F1F8] rounded-[20px] p-7">
                <p className="font-bricolage text-[1.35rem] leading-tight">{C.startTitle}</p>
                <p className="mt-3 text-[#C9C8E3] leading-[1.6]">{C.startText}</p>
                <a href={bookingUrl} target="_blank" rel="noopener noreferrer" className={`${BTN.primaryOnDark} mt-5 w-full`}>
                  {C.cta}
                </a>
              </div>
            </div>
          </aside>

          {/* Contenu principal */}
          <div className="lg:col-span-8 lg:order-1">
            {/* Méthodologie */}
            <div>
              <h2 className="font-bricolage text-[clamp(1.6rem,3vw,2.2rem)] leading-tight text-[#15173D]">
                {C.methodologyTitle}
              </h2>
              <p className="mt-4 text-[1.15rem] leading-[1.75] text-[#15173D]/85 max-w-[62ch]">{program.methodology}</p>
            </div>

            {/* Services en frise verticale */}
            <div className="mt-16">
              <h2 className="font-bricolage text-[clamp(1.6rem,3vw,2.2rem)] leading-tight text-[#15173D]">
                {C.servicesTitle}
              </h2>
              <ol className="mt-8 relative border-l-2 border-[#D98268]/40 ml-3">
                {program.services.map((s) => (
                  <li key={s.title} className="relative pl-8 pb-10 last:pb-0">
                    <span
                      aria-hidden="true"
                      className="absolute -left-[9px] top-2 w-4 h-4 rounded-full bg-[#D98268] ring-4 ring-[#F3F1F8]"
                    />
                    <h3 className="font-bricolage text-[1.4rem] leading-tight text-[#15173D]">{s.title}</h3>
                    <p className="mt-2 text-[1.05rem] leading-[1.6] text-[#5A5D7E]">{s.description}</p>
                    <p className="mt-3 text-[14px] text-[#15173D]">
                      <span className="font-semibold">{s.duree}</span>
                      <span aria-hidden="true" className="mx-2 text-[#D98268]">
                        •
                      </span>
                      {s.modalites}
                    </p>
                  </li>
                ))}
              </ol>
            </div>

            {/* Test */}
            <Link
              to={test?.url ?? '/tests'}
              className="mt-16 group flex items-center justify-between gap-6 rounded-[20px] border-2 border-[#15173D] p-7 lg:p-8 transition-colors hover:bg-[#15173D]"
            >
              <span>
                <span className="block font-bricolage text-[1.5rem] leading-tight text-[#15173D] group-hover:text-[#F3F1F8] transition-colors">
                  {C.evaluateTitle}
                </span>
                <span className="mt-2 block text-[1.05rem] leading-[1.6] text-[#15173D]/80 group-hover:text-[#C9C8E3] transition-colors">
                  {program.testName}
                </span>
              </span>
              <span
                aria-hidden="true"
                className="shrink-0 w-12 h-12 rounded-full bg-[#D98268] flex items-center justify-center text-[#15173D] text-[1.3rem]"
              >
                →
              </span>
            </Link>

            {/* Questions fréquentes */}
            <div className="mt-16">
              <h2 className="font-bricolage text-[clamp(1.6rem,3vw,2.2rem)] leading-tight text-[#15173D]">
                {C.faqTitle}
              </h2>
              <div className="mt-6 flex flex-col gap-3">
                {C.faq.map((item) => (
                  <details key={item.question} className="group bg-white rounded-[16px] border border-[#15173D]/10 px-6 py-5">
                    <summary className="flex items-center justify-between gap-4 cursor-pointer list-none select-none">
                      <span className="font-bricolage text-[1.15rem] leading-snug text-[#15173D]">{item.question}</span>
                      <span aria-hidden="true" className="text-[1.5rem] leading-none text-[#D98268] group-open:hidden">
                        +
                      </span>
                      <span aria-hidden="true" className="text-[1.5rem] leading-none text-[#D98268] hidden group-open:inline">
                        −
                      </span>
                    </summary>
                    <p className="pt-3 text-[1.05rem] leading-[1.7] text-[#15173D]/85">{item.answer}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

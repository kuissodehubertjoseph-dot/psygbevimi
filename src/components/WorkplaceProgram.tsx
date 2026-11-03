import React from 'react';
import { Link } from 'react-router-dom';
import {
  PROGRAM_DETAILS,
  PROGRAM_PAGE_COMMON as C,
  createWhatsAppUrl,
  TESTS_PAGE_DATA,
} from '../data';
import { BTN } from './ui';

// Mise en page propre à « Bien-être en entreprise » : héros centré sur fond nuit, bento de services, FAQ en grille
const SPANS = ['lg:col-span-7', 'lg:col-span-5', 'lg:col-span-5', 'lg:col-span-7'];
const TONES = ['bg-[#E9D5E4]', 'bg-white', 'bg-white', 'bg-[#E9D5E4]'];

export const WorkplaceProgram: React.FC = () => {
  const program = PROGRAM_DETAILS.find((p) => p.slug === 'workplace-wellness')!;
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
      {/* Héros centré */}
      <section className="relative bg-[#15173D] text-[#F3F1F8] pt-10 pb-28 lg:pb-36 overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute -right-32 -top-32 w-[420px] h-[420px] rounded-full border-[60px] border-[#D98268]/15"
        />
        <div
          aria-hidden="true"
          className="absolute -left-24 bottom-0 w-[260px] h-[260px] rounded-full bg-[#E9D5E4]/10"
        />
        <div className="relative max-w-[1160px] mx-auto px-6 lg:px-12">
          <Link
            to="/#accompagnements"
            className="inline-flex items-center gap-2 text-[15px] text-[#C9C8E3] hover:text-[#D98268] transition-colors"
          >
            <span aria-hidden="true">←</span> {C.back}
          </Link>
          <div className="mt-14 text-center max-w-[820px] mx-auto">
            <h1 className="font-bricolage text-[clamp(2.3rem,5.5vw,4.4rem)] leading-[1.06]">{program.title}</h1>
            <p className="mt-6 text-[1.2rem] leading-[1.7] text-[#C9C8E3]">{program.intro}</p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <a href={bookingUrl} target="_blank" rel="noopener noreferrer" className={BTN.primaryOnDark}>
                {C.cta}
              </a>
              <Link to={test?.url ?? '/tests'} className={BTN.outlineOnDark}>
                {C.evaluateTitle}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trois repères, chevauchant le héros */}
      <section className="bg-[#F3F1F8]">
        <div className="max-w-[1060px] mx-auto px-6 lg:px-12 -mt-16 lg:-mt-20 grid grid-cols-1 md:grid-cols-3 gap-4">
          {facts.map((f) => (
            <div key={f.label} className="bg-white rounded-[16px] p-6 shadow-[0_18px_40px_-24px_rgba(21,23,61,0.35)] border-t-4 border-[#D98268]">
              <p className="font-bricolage font-semibold text-[12px] uppercase tracking-[0.14em] text-[#5A5D7E]">{f.label}</p>
              <p className="mt-2 font-bricolage text-[1.2rem] leading-snug text-[#15173D]">{f.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Méthodologie en citation */}
      <section className="bg-[#F3F1F8] py-20 lg:py-28">
        <div className="max-w-[900px] mx-auto px-6 lg:px-12 text-center">
          <span aria-hidden="true" className="block font-bricolage text-[6rem] leading-[0.6] text-[#D98268]">
            “
          </span>
          <h2 className="mt-4 font-bricolage font-semibold text-[13px] uppercase tracking-[0.14em] text-[#5A5D7E]">
            {C.methodologyTitle}
          </h2>
          <p className="mt-5 font-bricolage text-[clamp(1.4rem,2.6vw,2rem)] leading-[1.45] text-[#15173D]">
            {program.methodology}
          </p>
        </div>
      </section>

      {/* Services en mosaïque */}
      <section className="bg-[#F3F1F8] pb-20 lg:pb-28">
        <div className="max-w-[1160px] mx-auto px-6 lg:px-12">
          <h2 className="font-bricolage text-[clamp(1.9rem,3.6vw,3rem)] leading-[1.1] text-[#15173D] text-center">
            {C.servicesTitle}
          </h2>
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-5">
            {program.services.map((s, i) => (
              <article
                key={s.title}
                className={`${SPANS[i]} ${TONES[i]} rounded-[24px] p-8 lg:p-10 flex flex-col border border-[#15173D]/10`}
              >
                <span aria-hidden="true" className="font-bricolage text-[3rem] leading-none text-[#D98268]">
                  {i + 1}
                </span>
                <h3 className="mt-5 font-bricolage text-[1.55rem] leading-tight text-[#15173D]">{s.title}</h3>
                <p className="mt-3 text-[1.05rem] leading-[1.6] text-[#15173D]/80">{s.description}</p>
                <div className="mt-auto pt-8 flex flex-wrap gap-2">
                  <span className="px-3 py-1.5 rounded-full bg-[#15173D] text-[#F3F1F8] text-[13px]">{s.duree}</span>
                  <span className="px-3 py-1.5 rounded-full border border-[#15173D]/30 text-[#15173D] text-[13px]">
                    {s.modalites}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Bandeau test */}
      <section className="bg-[#D98268]">
        <div className="max-w-[1160px] mx-auto px-6 lg:px-12 py-14 lg:py-16 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="max-w-[56ch]">
            <h2 className="font-bricolage text-[clamp(1.8rem,3vw,2.5rem)] leading-tight text-[#15173D]">
              {C.evaluateTitle}
            </h2>
            <p className="mt-3 text-[1.1rem] leading-[1.6] text-[#15173D]/90">{C.evaluateText}</p>
          </div>
          <Link
            to={test?.url ?? '/tests'}
            className="inline-flex items-center justify-center gap-3 rounded-[12px] bg-[#15173D] text-[#F3F1F8] px-7 py-4 font-bricolage text-[1.05rem] hover:bg-[#15173D]/90 transition-colors text-center"
          >
            {program.testName} <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      {/* FAQ en grille, réponses visibles */}
      <section className="bg-[#F3F1F8] py-20 lg:py-28">
        <div className="max-w-[1160px] mx-auto px-6 lg:px-12">
          <h2 className="font-bricolage text-[clamp(1.9rem,3.6vw,3rem)] leading-[1.1] text-[#15173D] text-center">
            {C.faqTitle}
          </h2>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
            {C.faq.map((item, i) => (
              <div key={item.question} className="flex gap-5">
                <span aria-hidden="true" className="font-bricolage text-[1.6rem] leading-none text-[#D98268] pt-1">
                  Q{i + 1}
                </span>
                <div>
                  <h3 className="font-bricolage text-[1.25rem] leading-snug text-[#15173D]">{item.question}</h3>
                  <p className="mt-2 text-[1.05rem] leading-[1.7] text-[#15173D]/80">{item.answer}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="font-bricolage text-[1.4rem] text-[#15173D]">{C.startTitle}</p>
            <a href={bookingUrl} target="_blank" rel="noopener noreferrer" className={`${BTN.primary} mt-5`}>
              {C.cta}
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

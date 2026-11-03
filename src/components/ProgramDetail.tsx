import React from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  PROGRAM_DETAILS,
  PROGRAM_PAGE_COMMON as C,
  createWhatsAppUrl,
  TESTS_PAGE_DATA,
} from '../data';
import { BTN } from './ui';
import { WorkplaceProgram } from './WorkplaceProgram';
import { MentalHealthProgram } from './MentalHealthProgram';

export const ProgramDetail: React.FC = () => {
  const { slug } = useParams();
  const program = PROGRAM_DETAILS.find((p) => p.slug === slug);

  // « Bien-être en entreprise » a sa propre mise en page
  if (slug === 'workplace-wellness') return <WorkplaceProgram />;
  if (slug === 'mental-health-wellbeing') return <MentalHealthProgram />;

  if (!program) {
    return (
      <section className="py-24 bg-[#F3F1F8]">
        <div className="max-w-[1160px] mx-auto px-6 lg:px-12">
          <Link to="/#accompagnements" className={BTN.outline}>
            {C.back}
          </Link>
        </div>
      </section>
    );
  }

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
      {/* Titre + fiche du programme */}
      <section className="bg-[#F3F1F8] pt-10 pb-16 lg:pb-24">
        <div className="max-w-[1160px] mx-auto px-6 lg:px-12">
          <Link
            to="/#accompagnements"
            className="inline-flex items-center gap-2 text-[15px] text-[#5A5D7E] hover:text-[#D98268] transition-colors"
          >
            <span aria-hidden="true">←</span> {C.back}
          </Link>

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            <div className="lg:col-span-7">
              <h1 className="font-bricolage text-[clamp(2.2rem,5vw,3.9rem)] leading-[1.08] text-[#15173D]">
                {program.title}
              </h1>
              <p className="mt-6 text-[1.15rem] leading-[1.7] text-[#15173D]/85 max-w-[60ch]">{program.intro}</p>
            </div>

            <aside className="lg:col-span-5 bg-[#15173D] text-[#F3F1F8] rounded-[20px] p-8 lg:p-10">
              <dl className="space-y-6">
                {facts.map((f) => (
                  <div key={f.label}>
                    <dt className="font-bricolage font-semibold text-[12px] uppercase tracking-[0.14em] text-[#D98268]">
                      {f.label}
                    </dt>
                    <dd className="mt-1 text-[1.1rem] leading-snug">{f.value}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-8 pt-8 border-t border-[#F3F1F8]/15">
                <p className="text-[#C9C8E3] leading-[1.6]">{C.startText}</p>
                <a href={bookingUrl} target="_blank" rel="noopener noreferrer" className={`${BTN.primaryOnDark} mt-5`}>
                  {C.cta}
                </a>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Méthodologie */}
      <section className="bg-[#E9D5E4] py-16 lg:py-20">
        <div className="max-w-[1160px] mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-14">
          <h2 className="lg:col-span-4 font-bricolage text-[clamp(1.6rem,3vw,2.2rem)] leading-tight text-[#15173D]">
            {C.methodologyTitle}
          </h2>
          <p className="lg:col-span-8 text-[1.3rem] leading-[1.6] text-[#15173D]">{program.methodology}</p>
        </div>
      </section>

      {/* Services : lignes numérotées */}
      <section className="bg-[#F3F1F8] py-16 lg:py-24">
        <div className="max-w-[1160px] mx-auto px-6 lg:px-12">
          <h2 className="font-bricolage text-[clamp(1.9rem,3.6vw,3rem)] leading-[1.1] text-[#15173D]">
            {C.servicesTitle}
          </h2>
          <ol className="mt-12 border-t border-[#15173D]/15">
            {program.services.map((s, i) => (
              <li
                key={s.title}
                className="grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-8 py-8 border-b border-[#15173D]/15"
              >
                <span aria-hidden="true" className="lg:col-span-1 font-bricolage text-[2.2rem] leading-none text-[#D98268]">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="lg:col-span-6">
                  <h3 className="font-bricolage text-[1.5rem] leading-tight text-[#15173D]">{s.title}</h3>
                  <p className="mt-2 text-[1.05rem] leading-[1.6] text-[#5A5D7E]">{s.description}</p>
                </div>
                <div className="lg:col-span-2">
                  <p className="font-bricolage font-semibold text-[12px] uppercase tracking-[0.14em] text-[#5A5D7E]">
                    {C.durationLabel.replace(/\s*:$/, '')}
                  </p>
                  <p className="mt-1 text-[1rem] text-[#15173D]">{s.duree}</p>
                </div>
                <div className="lg:col-span-3">
                  <p className="font-bricolage font-semibold text-[12px] uppercase tracking-[0.14em] text-[#5A5D7E]">
                    {C.modalitiesLabel.replace(/\s*:$/, '')}
                  </p>
                  <p className="mt-1 text-[1rem] text-[#15173D]">{s.modalites}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Évaluation + réservation */}
      <section className="bg-[#F3F1F8] pb-16 lg:pb-24">
        <div className="max-w-[1160px] mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Test : toute la carte est cliquable */}
          <Link
            to={test?.url ?? '/tests'}
            className="group flex flex-col rounded-[20px] bg-[#E9D5E4] p-8 lg:p-12 transition-all duration-300 hover:bg-[#D98268] hover:-translate-y-1"
          >
            <span className="font-bricolage font-semibold text-[13px] uppercase tracking-[0.14em] text-[#15173D]/60 group-hover:text-[#15173D]">
              Test gratuit
            </span>
            <h2 className="mt-4 font-bricolage text-[clamp(1.8rem,3vw,2.5rem)] leading-tight text-[#15173D]">
              {C.evaluateTitle}
            </h2>
            <p className="mt-4 text-[1.1rem] leading-[1.65] text-[#15173D]/85">{C.evaluateText}</p>
            <span className="mt-auto pt-10 flex items-center justify-between gap-6 border-t border-[#15173D]/20 font-bricolage text-[1.15rem] text-[#15173D]">
              {program.testName}
              <span aria-hidden="true" className="text-[1.6rem] transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </span>
          </Link>

          {/* Réservation */}
          <div className="flex flex-col rounded-[20px] bg-[#15173D] text-[#F3F1F8] p-8 lg:p-12">
            <span className="font-bricolage font-semibold text-[13px] uppercase tracking-[0.14em] text-[#D98268]">
              20 minutes · Gratuit
            </span>
            <h2 className="mt-4 font-bricolage text-[clamp(1.8rem,3vw,2.5rem)] leading-tight">{C.startTitle}</h2>
            <p className="mt-4 text-[1.1rem] leading-[1.65] text-[#C9C8E3]">{C.startText}</p>
            <div className="mt-auto pt-10">
              <a href={bookingUrl} target="_blank" rel="noopener noreferrer" className={`${BTN.primaryOnDark} w-full sm:w-auto`}>
                {C.cta}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Questions fréquentes */}
      <section className="bg-[#F3F1F8] py-16 lg:py-24">
        <div className="max-w-[1160px] mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-10">
          <h2 className="lg:col-span-4 font-bricolage text-[clamp(1.7rem,3vw,2.4rem)] leading-tight text-[#15173D]">
            {C.faqTitle}
          </h2>
          <div className="lg:col-span-8 divide-y divide-[#15173D]/15 border-t border-b border-[#15173D]/15">
            {C.faq.map((item) => (
              <details key={item.question} className="group py-5">
                <summary className="flex items-center justify-between gap-4 cursor-pointer list-none select-none">
                  <span className="font-bricolage text-[1.2rem] text-[#15173D] leading-snug">{item.question}</span>
                  <span
                    aria-hidden="true"
                    className="w-8 h-8 rounded-full bg-[#E9D5E4] flex items-center justify-center shrink-0 transition-transform group-open:rotate-180"
                  >
                    ▾
                  </span>
                </summary>
                <p className="pt-3 pr-10 text-[1.05rem] leading-[1.7] text-[#15173D]/85">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

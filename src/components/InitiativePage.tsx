import React from 'react';
import { INITIATIVE_DATA as D, createWhatsAppUrl, DEFAULT_BOOKING_MESSAGE } from '../data';
import { BTN } from './ui';
import { Founder } from './Founder';
import { FirstStep } from './FirstStep';
// Les cinq mots de la mission, affichés un par ligne
const MISSION_WORDS = D.missionTitle.split(' · ');

// Mosaïque « cinq façons d'agir » : trois cartes puis deux plus larges
const ACTION_SPANS = ['lg:col-span-2', 'lg:col-span-2', 'lg:col-span-2', 'lg:col-span-3', 'lg:col-span-3'];
const ACTION_TONES = ['bg-[#E9D5E4]', 'bg-white', 'bg-[#F6E1D8]', 'bg-white', 'bg-[#E9D5E4]'];

// Teintes des neuf valeurs, en alternance
const VALUE_TONES = ['bg-[#E9D5E4]', 'bg-[#F6E1D8]', 'bg-[#D9DAEE]'];

export const InitiativePage: React.FC = () => {
  return (
    <>
      {/* Ouverture */}
      <section className="bg-[#F3F1F8] py-14 lg:py-24">
        <div className="max-w-[1160px] mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6">
            <h1 className="font-bricolage text-[clamp(2.2rem,4.4vw,3.6rem)] leading-[1.1] text-[#15173D]">{D.title}</h1>
            <p className="mt-6 text-[1.15rem] leading-[1.75] text-[#15173D]/85 max-w-[52ch]">{D.intro}</p>
            <a
              href={createWhatsAppUrl(DEFAULT_BOOKING_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              className={`${BTN.primary} mt-9`}
            >
              Réserver mon appel gratuit
            </a>
          </div>

          {/* Livre du fondateur, sur un aplat rose */}
          <div className="lg:col-span-6 bg-[#E9D5E4] rounded-[28px] p-6 sm:p-10 flex items-center justify-center">
            <img
              src="/images/livre-hero.png"
              alt="Livre « Accédez au bonheur authentique » de Gbèvimi C. F. Houénon"
              className="w-full max-w-[420px] h-auto object-contain drop-shadow-[0_24px_30px_rgba(21,23,61,0.25)]"
            />
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-[#F3F1F8] pb-16 lg:pb-24">
        <div className="max-w-[1160px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Les cinq mots : une phrase en grand, le dernier mis en avant */}
            <p className="lg:col-span-7 font-bricolage text-[clamp(2.2rem,5vw,4.2rem)] leading-[1.15] text-[#15173D]">
              {MISSION_WORDS.map((word, i) => (
                <React.Fragment key={word}>
                  <span className={`whitespace-nowrap ${i === MISSION_WORDS.length - 1 ? 'text-[#D98268]' : ''}`}>
                    {word}
                    {i < MISSION_WORDS.length - 1 ? ',' : '.'}
                  </span>{' '}
                </React.Fragment>
              ))}
            </p>
            <div className="lg:col-span-5 space-y-5">
              {D.missionParagraphs.map((p) => (
                <p key={p} className="text-[1.1rem] leading-[1.75] text-[#15173D]/85">
                  {p}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Cinq façons d'agir */}
      <section className="bg-[#F3F1F8] pb-16 lg:pb-24">
        <div className="max-w-[1160px] mx-auto px-6 lg:px-12">
          <h2 className="font-bricolage text-[clamp(1.9rem,3.6vw,3rem)] leading-[1.1] text-[#15173D]">
            {D.actionsTitle}
          </h2>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-5">
            {D.actions.map((a, i) => (
              <article
                key={a.title}
                className={`${ACTION_SPANS[i]} ${ACTION_TONES[i]} rounded-[22px] p-8 border border-[#15173D]/10 min-h-[230px] flex flex-col ${
                  i === 4 ? 'md:col-span-2' : ''
                }`}
              >
                <span aria-hidden="true" className="font-bricolage text-[2.6rem] leading-none text-[#D98268]">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-auto pt-8 font-bricolage text-[1.45rem] leading-tight text-[#15173D]">{a.title}</h3>
                <p className="mt-2 text-[1.02rem] leading-[1.6] text-[#15173D]/80">{a.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Founder />

      {/* Nos valeurs */}
      <section className="bg-[#F3F1F8] py-16 lg:py-24">
        <div className="max-w-[1160px] mx-auto px-6 lg:px-12">
          <h2 className="font-bricolage text-[clamp(1.8rem,3.2vw,2.7rem)] leading-[1.15] text-[#15173D] text-center max-w-[24ch] mx-auto">
            {D.valuesTitle}
          </h2>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {D.values.map((v, i) => (
              <div key={v.title} className={`${VALUE_TONES[i % VALUE_TONES.length]} rounded-[22px] p-8 min-h-[190px]`}>
                <h3 className="font-bricolage text-[1.6rem] leading-tight text-[#15173D]">{v.title}</h3>
                <p className="mt-3 text-[1.05rem] leading-[1.65] text-[#15173D]/80">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FirstStep />
    </>
  );
};

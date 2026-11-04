import React from 'react';
import { BOOK_DATA as D, BOOK_ORDER_URL, DEFAULT_BOOK_MESSAGE, IMAGES, createWhatsAppUrl } from '../data';
import { BTN } from './ui';

// Page « Le livre » : titre centré, couverture posée à cheval sur un bandeau sombre, détails dessous
export const Book: React.FC = () => {
  const questionUrl = createWhatsAppUrl(DEFAULT_BOOK_MESSAGE);

  return (
    <>
      {/* Titre et couverture */}
      <section aria-labelledby="book-heading" className="bg-[#F3F1F8] pt-14 lg:pt-20">
        <div className="max-w-[900px] mx-auto px-6 text-center">
          <h1
            id="book-heading"
            className="font-bricolage font-bold text-[clamp(2.4rem,6vw,4.6rem)] leading-[1.06] text-[#15173D]"
            style={{ fontWeight: 700 }}
          >
            {D.title}
          </h1>
          <p className="mt-4 text-[1.25rem] leading-[1.5] text-[#D98268]">{D.subtitle}</p>
        </div>
        <div className="relative z-10 mt-12 -mb-24 lg:-mb-32 flex justify-center px-6">
          <img
            src="/images/livre-hero.png"
            alt={`Couverture du livre « ${D.title} »`}
            className="w-[300px] sm:w-[380px] lg:w-[440px] h-auto drop-shadow-[0_24px_30px_rgba(21,23,61,0.35)]"
          />
        </div>
      </section>

      {/* Détails et achat */}
      <section className="bg-[#15173D] text-[#F3F1F8] pt-36 lg:pt-48 pb-16 lg:pb-24">
        <div className="max-w-[900px] mx-auto px-6 flex flex-col items-center text-center">
          <dl className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-10 w-full">
            {D.meta.map((m) => (
              <div key={m.label}>
                <dt className="text-[13px] uppercase tracking-[0.14em] text-[#D98268]">{m.label}</dt>
                <dd className="mt-2 font-bricolage text-[1.15rem] leading-snug">{m.value}</dd>
              </div>
            ))}
          </dl>

          <p className="mt-14 text-[1.2rem] leading-[1.75] text-[#C9C8E3] max-w-[60ch]">{D.pitch}</p>

          <div className="mt-12 flex flex-wrap items-baseline justify-center gap-4">
            <span className="font-bricolage text-[clamp(2.4rem,5vw,3.4rem)] leading-none">{D.price}</span>
            <span className="text-[16px] text-[#C9C8E3]">{D.priceSub}</span>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 w-full sm:w-auto">
            <a href={BOOK_ORDER_URL} target="_blank" rel="noopener noreferrer" className={BTN.primaryOnDark}>
              {D.primaryCta}
            </a>
            <a href={questionUrl} target="_blank" rel="noopener noreferrer" className={BTN.outlineOnDark}>
              {D.questionCta}
            </a>
          </div>
          <p className="mt-5 text-[14px] text-[#C9C8E3]">{D.payment}</p>
        </div>
      </section>

      {/* Ce que contient le livre */}
      <section className="bg-[#F3F1F8] py-16 lg:py-24">
        <div className="max-w-[1160px] mx-auto px-6 lg:px-12">
          <h2 className="font-bricolage text-[clamp(1.9rem,3.6vw,3rem)] leading-[1.1] text-[#15173D] text-center max-w-[22ch] mx-auto">
            {D.contentTitle}
          </h2>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5">
            {D.features.map((f, i) => (
              <div
                key={f}
                className={`${['bg-[#E9D5E4]', 'bg-[#F6E1D8]', 'bg-[#D9DAEE]'][i % 3]} rounded-[24px] p-8 min-h-[200px] flex items-end`}
              >
                <p className="font-bricolage text-[1.35rem] leading-[1.3] text-[#15173D]">{f}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* L'auteur */}
      <section className="bg-[#F3F1F8] pb-16 lg:pb-24">
        <div className="max-w-[900px] mx-auto px-6 text-center">
          <h2 className="font-bricolage text-[clamp(1.6rem,3vw,2.2rem)] leading-tight text-[#15173D]">{D.authorName}</h2>
          <p className="mt-5 text-[1.15rem] leading-[1.75] text-[#15173D]/85 max-w-[62ch] mx-auto">{D.authorText}</p>
        </div>
      </section>
    </>
  );
};

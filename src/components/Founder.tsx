import React from 'react';
import { Link } from 'react-router-dom';
import { FOUNDER_DATA as D, IMAGES } from '../data';
import { H2 } from './ui';

interface FounderProps {
  showInitiativeLink?: boolean;
}

export const Founder: React.FC<FounderProps> = ({ showInitiativeLink = false }) => {
  return (
    <section
      id="fondateur"
      aria-labelledby="founder-heading"
      className="py-16 lg:py-24 bg-[#F3F1F8]"
    >
      <div className="max-w-[1160px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-5 max-w-[360px] lg:max-w-none mx-auto lg:mx-0 w-full">
            <img
              src={IMAGES.founder}
              alt={D.photoAlt}
              className="aspect-4/5 w-full object-cover rounded-[8px] bg-[#E9D5E4]"
            />
          </div>

          <div className="lg:col-span-7 flex flex-col items-start">
            <H2 id="founder-heading">
              {D.title.split('GBÈVIMI').map((part, i) => (
                <React.Fragment key={i}>
                  {i > 0 && <strong className="font-black">GBÈVIMI</strong>}
                  {part}
                </React.Fragment>
              ))}
            </H2>

            <p className="mt-6 indent-12 font-atkinson text-[#15173D]/90 text-[1.125rem] leading-[1.65] max-w-[65ch]">
              {D.paragraph}
            </p>

            <div className="mt-8 w-full">
              {D.credentials.map((cred) => (
                <div key={cred} className="py-3 flex items-center gap-3 font-atkinson text-[16px] text-[#15173D]">
                  <span aria-hidden="true" className="shrink-0 w-3 h-3 rounded-full bg-[#15173D]" />
                  {cred}
                </div>
              ))}
            </div>

            <blockquote className="mt-8 italic font-atkinson text-[#E5322D] text-[1.15rem]">
              « {D.quote} »
            </blockquote>

            {showInitiativeLink && (
              <Link
                to="/initiative"
                className="mt-8 inline-flex items-center gap-2 font-bricolage font-semibold text-[16px] text-[#3960E6] hover:text-[#2A47B8] transition-colors rounded-[4px] focus-visible:outline-2 focus-visible:outline-[#3960E6] focus-visible:outline-offset-4"
              >
                Découvrir l'initiative
                <span aria-hidden="true">→</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

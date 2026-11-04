import React from 'react';
import { RECOGNIZE_DATA } from '../data';

interface RecognizeProps {
  onHighlightProgram: (programId: 'sante' | 'coaching' | 'jeune' | 'entreprise') => void;
}

export const Recognize: React.FC<RecognizeProps> = () => {
  return (
    <section
      id="reconnaitre"
      aria-labelledby="recognize-heading"
      className="py-16 lg:py-24 bg-[#F3F1F8]"
    >
      <div className="max-w-[1160px] mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        {/* Colonne gauche : titre et introduction */}
        <div className="lg:col-span-5">
          <h2
            id="recognize-heading"
            className="font-bold uppercase text-[clamp(1.9rem,3.6vw,3rem)] leading-[1.1] tracking-[-0.015em] text-[#E5322D]"
            style={{ fontFamily: 'Roboto, Arial, sans-serif', fontWeight: 700 }}
          >
            {RECOGNIZE_DATA.title}
          </h2>        </div>

        {/* Colonne droite : image du livre */}
        <div className="lg:col-span-7 flex justify-center">
          <img
            src="/images/livre-hero.png"
            alt="Couverture du livre « Accédez au bonheur authentique » de Gbèvimi C. F. Houénon"
            className="w-full max-w-[460px] h-auto"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
};

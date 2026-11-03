import React, { useState } from 'react';
import { RECOGNIZE_DATA, ThoughtItem } from '../data';
import { H2 } from './ui';

interface RecognizeProps {
  onHighlightProgram: (programId: 'sante' | 'coaching' | 'jeune' | 'entreprise') => void;
}

export const Recognize: React.FC<RecognizeProps> = ({ onHighlightProgram }) => {
  const [selectedThought, setSelectedThought] = useState<ThoughtItem | null>(null);

  const handleSelectThought = (thought: ThoughtItem) => {
    if (selectedThought?.id === thought.id) {
      setSelectedThought(null);
    } else {
      setSelectedThought(thought);
    }
  };

  const handleGoToProgram = (programId: 'sante' | 'coaching' | 'jeune') => {
    onHighlightProgram(programId);
  };

  return (
    <section
      id="reconnaitre"
      aria-labelledby="recognize-heading"
      className="py-16 lg:py-24 bg-[#F3F1F8]"
    >
      <div className="max-w-[1160px] mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        {/* Colonne gauche : titre, introduction et recommandation */}
        <div className="lg:col-span-5 lg:sticky lg:top-28">
          <H2 id="recognize-heading">{RECOGNIZE_DATA.title}</H2>

          <p className="mt-4 font-atkinson text-[#5A5D7E] text-[1.125rem] leading-[1.65] max-w-[46ch]">
            {RECOGNIZE_DATA.intro}
          </p>

          <div aria-live="polite" className="mt-8">
            {selectedThought ? (
              <div className="bg-[#15173D] text-[#F3F1F8] rounded-[12px] p-6 shadow-[0_12px_32px_rgba(21,23,61,0.18)]">
                <p className="font-atkinson text-[13px] uppercase tracking-[0.12em] text-[#D98268]">
                  Le chemin qui vous correspond
                </p>
                <p className="mt-2 font-bricolage font-semibold text-[1.5rem] leading-snug">
                  {selectedThought.programName}
                </p>
                <button
                  type="button"
                  onClick={() => handleGoToProgram(selectedThought.programId)}
                  className="mt-5 h-[48px] px-[24px] font-bricolage font-semibold text-[16px] bg-[#D98268] hover:bg-[#C4704F] text-[#15173D]  rounded-[8px] inline-flex items-center justify-center gap-2 transition-colors focus-visible:outline-2 focus-visible:outline-[#D98268] focus-visible:outline-offset-2"
                >
                  Voir cet accompagnement
                  <span aria-hidden="true">→</span>
                </button>
              </div>
            ) : (
              <p className="font-atkinson text-[15px] text-[#5A5D7E] py-1">
                Sélectionnez la phrase qui vous ressemble pour découvrir l&apos;accompagnement adapté.
              </p>
            )}
          </div>
        </div>

        {/* Colonne droite : liste numérotée des situations */}
        <ul className="lg:col-span-7 bg-white/70 border border-[#15173D]/10 rounded-[12px] divide-y divide-[#15173D]/10 overflow-hidden" role="group" aria-label="Situations vécues">
          {RECOGNIZE_DATA.thoughts.map((thought, index) => {
            const isSelected = selectedThought?.id === thought.id;

            return (
              <li key={thought.id}>
                <button
                  type="button"
                  onClick={() => handleSelectThought(thought)}
                  aria-pressed={isSelected}
                  className={`w-full text-left flex items-center gap-4 sm:gap-5 px-5 sm:px-6 py-5 transition-colors cursor-pointer group focus-visible:outline-2 focus-visible:outline-[#15173D] focus-visible:-outline-offset-2 ${
                    isSelected
                      ? 'bg-[#E9D5E4]/40'
                      : 'hover:bg-[#E9D5E4]/20'
                  }`}
                >
                  <span
                    className={`shrink-0 w-9 h-9 rounded-full inline-flex items-center justify-center font-bricolage font-semibold text-[14px] transition-colors ${
                      isSelected ? 'bg-[#D98268] text-[#15173D]' : 'bg-[#15173D]/8 text-[#15173D]/70'
                    }`}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="flex-1 font-bricolage font-semibold text-[1.125rem] sm:text-[1.3rem] leading-snug text-[#15173D]">
                    {thought.text}
                  </span>
                  <span
                    aria-hidden="true"
                    className={`shrink-0 text-[20px] transition-all ${
                      isSelected ? 'text-[#15173D] translate-x-0' : 'text-[#15173D]/30 -translate-x-1 group-hover:translate-x-0 group-hover:text-[#15173D]'
                    }`}
                  >
                    →
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

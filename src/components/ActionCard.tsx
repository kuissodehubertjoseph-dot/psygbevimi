import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

interface ActionCardProps {
  index: number;
  title: string;
  text: string;
  className: string;
}

const EASE = [0.22, 1, 0.36, 1] as const;

/** Carte « façon d'agir » : apparition échelonnée, projecteur lumineux sous la souris, élévation et soulignement au survol */
export const ActionCard: React.FC<ActionCardProps> = ({ index, title, text, className }) => {
  const reduce = useReducedMotion();

  const handleMove = (e: React.MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
  };

  return (
    <motion.article
      onMouseMove={handleMove}
      initial={reduce ? false : { opacity: 0, y: 48, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '0px 0px -80px 0px' }}
      transition={{ duration: 0.8, ease: EASE, delay: (index % 3) * 0.12 }}
      whileHover={reduce ? undefined : { y: -8, boxShadow: '0 28px 50px -24px rgba(21,23,61,0.35)' }}
      className={`${className} group relative overflow-hidden`}
    >
      {/* Projecteur qui suit le curseur */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(260px circle at var(--mx, 50%) var(--my, 50%), rgba(255,255,255,0.75), transparent 70%)',
        }}
      />

      <motion.span
        aria-hidden="true"
        initial={reduce ? false : { opacity: 0, x: -16 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: EASE, delay: 0.25 + (index % 3) * 0.12 }}
        className="relative font-bricolage text-[2.6rem] leading-none text-[#D98268] transition-transform duration-500 ease-out group-hover:translate-x-2"
      >
        {String(index + 1).padStart(2, '0')}
      </motion.span>

      <h3
        className="relative mt-auto pt-8 font-bricolage font-bold text-[1.45rem] leading-tight text-[#15173D]"
        style={{ fontWeight: 700 }}
      >
        {title}
        <span
          aria-hidden="true"
          className="mt-2 block h-[3px] w-full origin-left scale-x-0 rounded-full bg-[#D98268] transition-transform duration-500 ease-out group-hover:scale-x-[0.28]"
        />
      </h3>
      <p className="relative mt-2 text-[1.02rem] leading-[1.6] text-[#15173D]/80">{text}</p>
    </motion.article>
  );
};

import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Headphones, Pause, Play } from 'lucide-react';
import { ARTICLES_DATA as D, ARTICLE_CATEGORIES } from '../data';
import { ARTICLES, Article, formatArticleDate } from '../content';
import { BTN } from './ui';

const PAGE_SIZE = 12;

const meta = (a: Article) =>
  `${formatArticleDate(a.createdAt)} · ${a.readingTime || '5'} min${
    a.commentsCount > 0 ? ` · ${a.commentsCount} commentaire${a.commentsCount > 1 ? 's' : ''}` : ''
  }`;

/** Vidéo YouTube ouverte par le bouton « Lire la vidéo » */
const VIDEO_URL = 'https://youtu.be/4gbNNM2mX2I';

/** Boutons du héro : lire la vidéo (YouTube) et lire l'audio (lecture vocale du titre et de l'introduction) */
const HeroMedia: React.FC = () => {
  const [state, setState] = useState<'idle' | 'playing' | 'paused'>('idle');
  const supported = typeof window !== 'undefined' && 'speechSynthesis' in window;

  useEffect(() => () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) window.speechSynthesis.cancel();
  }, []);

  const toggleAudio = () => {
    const synth = window.speechSynthesis;
    if (state === 'playing') {
      synth.pause();
      setState('paused');
    } else if (state === 'paused') {
      synth.resume();
      setState('playing');
    } else {
      synth.cancel();
      const u = new SpeechSynthesisUtterance(`${D.title}. ${D.intro}`);
      u.lang = 'fr-FR';
      u.onend = () => setState('idle');
      u.onerror = () => setState('idle');
      synth.speak(u);
      setState('playing');
    }
  };

  return (
    <div className="mt-9 flex flex-wrap items-center gap-4">
      {/* Vidéo : un disque « play » qui pulse */}
      <a
        href={VIDEO_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex items-center gap-4 pr-6 rounded-full bg-white hover:bg-[#E9D5E4] border border-[#15173D]/10 shadow-sm transition-colors focus-visible:outline-2 focus-visible:outline-[#D98268]"
      >
        <span className="relative grid place-items-center h-14 w-14 rounded-full bg-[#D98268] text-[#15173D]">
          <Play size={22} fill="currentColor" className="relative ml-0.5" aria-hidden="true" />
        </span>
        <span className="font-bricolage font-semibold text-[16px] text-[#15173D]">Lire la vidéo</span>
      </a>

      {/* Audio : une pastille avec égaliseur animé pendant la lecture */}
      {supported && (
        <div className="inline-flex items-center gap-3">
          <button
            type="button"
            onClick={toggleAudio}
            className="inline-flex items-center gap-3 h-14 px-7 rounded-full bg-[#15173D] hover:bg-[#2A2D63] text-[#F3F1F8] font-bricolage font-semibold text-[16px] transition-colors focus-visible:outline-2 focus-visible:outline-[#D98268]"
          >
            {state === 'playing' ? "Pause l'audio" : state === 'paused' ? "Reprendre l'audio" : "Lire l'audio"}
          </button>
          {state !== 'idle' && (
            <button
              type="button"
              onClick={() => {
                window.speechSynthesis.cancel();
                setState('idle');
              }}
              className="text-[14px] text-[#5A5D7E] hover:text-[#15173D] underline underline-offset-4"
            >
              Arrêter
            </button>
          )}
        </div>
      )}
    </div>
  );
};

/** Styles et animations du héro (coupées si l'utilisateur préfère moins de mouvement) */
const HeroStyles: React.FC = () => (
  <style>{`
    @keyframes art-rise { from { opacity: 0; transform: translateY(28px) } to { opacity: 1; transform: none } }
    @keyframes art-spin { to { transform: rotate(360deg) } }
    @keyframes art-draw { from { stroke-dashoffset: 1 } to { stroke-dashoffset: 0 } }
    .art-spin { animation: art-spin 14s linear infinite }
    .art-draw { stroke-dasharray: 1; stroke-dashoffset: 1; animation: art-draw 1s .9s ease-out forwards }
    .art-rise { animation: art-rise .8s cubic-bezier(.2,.7,.2,1) both }
    .art-outline { -webkit-text-stroke: 1.5px rgba(243,241,248,.9); color: transparent }
    @media (prefers-reduced-motion: reduce) {
      .art-rise { animation: none }
      .art-draw { animation: none; stroke-dashoffset: 0 }
    }
  `}</style>
);

export const Articles: React.FC = () => {
  const [category, setCategory] = useState<(typeof ARTICLE_CATEGORIES)[number]>('Tous');
  const [query, setQuery] = useState('');
  const [limit, setLimit] = useState(PAGE_SIZE);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ARTICLES.filter(
      (a) => (category === 'Tous' || a.category === category) && (!q || a.title.toLowerCase().includes(q)),
    );
  }, [category, query]);


  const [featured, ...others] = filtered;
  const shown = others.slice(0, limit);

  return (
    <>
      {/* Ouverture : « une » de magazine, titre à gauche, dernier article en couverture à droite */}
      <section className="relative isolate overflow-hidden bg-[#F3F1F8] text-[#15173D]">
        <HeroStyles />
        <div className="absolute -top-24 right-[-8rem] h-[34rem] w-[34rem] rounded-full bg-[#D98268]/20 blur-[2px]" aria-hidden="true" />
        <div className="absolute bottom-[-10rem] left-[-8rem] h-[26rem] w-[26rem] rounded-full bg-[#E9D5E4]" aria-hidden="true" />

        <div className="relative z-10 max-w-[1160px] mx-auto px-6 lg:px-12 pt-14 lg:pt-20 pb-12 lg:pb-16">
          <div>
            <div className="max-w-[860px]">
              <h1 className="font-bricolage leading-[0.92] tracking-[-0.035em] text-[clamp(3rem,7vw,6.2rem)]">
                <span className="art-rise block" style={{ animationDelay: '.05s' }}>Lire,</span>
                <span className="art-rise block" style={{ animationDelay: '.18s' }}>
                  <span className="relative inline-block">
                    <span className="absolute inset-x-[-0.08em] bottom-[0.06em] h-[0.34em] -skew-x-6 bg-[#D98268]/55" aria-hidden="true" />
                    <span className="relative italic">comprendre,</span>
                  </span>
                </span>
                <span className="art-rise block" style={{ animationDelay: '.31s' }}>
                  en{' '}
                  <span className="relative inline-block">
                    parler.
                  </span>
                </span>
              </h1>

              <p className="art-rise mt-9 text-[1.15rem] leading-[1.75] text-[#15173D]/80 max-w-[52ch]" style={{ animationDelay: '.45s' }}>
                {D.intro}
              </p>
              <div className="art-rise" style={{ animationDelay: '.55s' }}>
                <HeroMedia />
              </div>
            </div>

          </div>

          {/* Recherche et catégories (avec le nombre d'articles) */}
          <div className="mt-14 lg:mt-16 rounded-[30px] bg-white p-4 sm:p-5 shadow-[0_30px_60px_-40px_rgba(21,23,61,0.45)] flex flex-col gap-4">
            <input
              type="search"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setLimit(PAGE_SIZE);
              }}
              placeholder={D.searchLabel}
              aria-label={D.searchLabel}
              className="h-[56px] w-full px-6 rounded-full bg-[#F3F1F8] border-2 border-transparent text-[16px] text-[#15173D] placeholder:text-[#15173D]/50 focus:outline-none focus:border-[#D98268]"
            />
            <div className="flex flex-wrap gap-2" role="group" aria-label="Catégories">
              {ARTICLE_CATEGORIES.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => {
                    setCategory(c);
                    setLimit(PAGE_SIZE);
                  }}
                  aria-pressed={category === c}
                  className={`px-5 py-2.5 rounded-full text-[15px] font-semibold transition-colors cursor-pointer ${
                    category === c ? 'bg-[#15173D] text-[#F3F1F8]' : 'bg-[#E9D5E4] text-[#15173D] hover:bg-[#D98268]'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F3F1F8] pt-10 pb-16 lg:pb-24">
        <div className="max-w-[1160px] mx-auto px-6 lg:px-12">
          <p className="text-[15px] text-[#5A5D7E]" aria-live="polite">
            {filtered.length} article{filtered.length > 1 ? 's' : ''}
          </p>

          {/* Article à la une */}
          {featured && (
            <Link
              to={`/blog/${encodeURIComponent(featured.slug)}`}
              className="mt-5 grid grid-cols-1 lg:grid-cols-12 bg-white rounded-[28px] border border-[#15173D]/10 overflow-hidden"
            >
              {featured.imageUrl && (
                <img
                  src={featured.imageUrl}
                  alt=""
                  referrerPolicy="no-referrer"
                  className="lg:col-span-6 w-full h-auto lg:h-full object-contain bg-[#E9D5E4]"
                />
              )}
              <div className={`${featured.imageUrl ? 'lg:col-span-6' : 'lg:col-span-12'} p-8 lg:p-12 flex flex-col justify-center`}>
                <p className="font-bricolage text-[13px] uppercase tracking-[0.12em] text-[#D98268]">{featured.category}</p>
                <h2 className="mt-4 font-bricolage text-[clamp(1.5rem,2.6vw,2.2rem)] leading-[1.2] text-[#15173D]">
                  {featured.title}
                </h2>
                <p className="mt-5 text-[15px] text-[#5A5D7E]">{meta(featured)}</p>
                <span className="mt-6 inline-flex items-center gap-1 font-semibold text-[#2563eb]">Découvrir →</span>
              </div>
            </Link>
          )}

          {/* Autres articles */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {shown.map((a) => (
              <Link
                key={a.id}
                to={`/blog/${encodeURIComponent(a.slug)}`}
                className="bg-white rounded-[24px] border border-[#15173D]/10 overflow-hidden flex flex-col"
              >
                {a.imageUrl && (
                  <img
                    src={a.imageUrl}
                    alt=""
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="w-full h-auto bg-[#E9D5E4]"
                  />
                )}
                <div className="p-6 flex flex-col flex-1">
                  <p className="font-bricolage text-[12px] uppercase tracking-[0.12em] text-[#D98268]">{a.category}</p>
                  <h2 className="mt-3 font-bricolage text-[1.15rem] leading-[1.3] text-[#15173D]">{a.title}</h2>
                  <p className="mt-auto pt-5 text-[14px] text-[#5A5D7E]">{meta(a)}</p>
                  <span className="mt-4 inline-flex items-center gap-1 font-semibold text-[#2563eb]">Découvrir →</span>
                </div>
              </Link>
            ))}
          </div>

          {others.length > limit && (
            <div className="mt-10 flex justify-center">
              <button type="button" onClick={() => setLimit(limit + PAGE_SIZE)} className={`${BTN.outline} cursor-pointer`}>
                Voir plus d'articles
              </button>
            </div>
          )}

          {/* Vidéos */}
          <div className="mt-16 bg-[#E9D5E4] rounded-[28px] p-8 lg:p-12 flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="max-w-[640px]">
              <h2 className="font-bricolage text-[clamp(1.6rem,3vw,2.2rem)] leading-tight text-[#15173D]">
                {D.videoBlock.title}
              </h2>
              <p className="mt-3 text-[1.1rem] leading-[1.65] text-[#15173D]/85">{D.videoBlock.description}</p>
            </div>
            <a href={D.videoBlock.url} target="_blank" rel="noopener noreferrer" className={`${BTN.primary} shrink-0`}>
              {D.videoBlock.cta}
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

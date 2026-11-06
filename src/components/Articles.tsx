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
    <div className="mt-8 flex flex-wrap items-center gap-3">
      <a href={VIDEO_URL} target="_blank" rel="noopener noreferrer" className={`${BTN.outline} gap-2`}>
        <Play size={18} aria-hidden="true" /> Lire la vidéo
      </a>
      {supported && (
        <>
          <button type="button" onClick={toggleAudio} className={`${BTN.primary} gap-2`}>
            {state === 'playing' ? <Pause size={18} aria-hidden="true" /> : <Headphones size={18} aria-hidden="true" />}
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
        </>
      )}
    </div>
  );
};

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
      {/* Ouverture */}
      <section className="bg-[#F3F1F8] pt-14 pb-8 lg:pt-20 lg:pb-10">
        <div className="max-w-[1160px] mx-auto px-6 lg:px-12">
          <h1 className="font-bricolage text-[clamp(2.4rem,5.5vw,4.4rem)] leading-[1.06] text-[#15173D]">{D.title}</h1>
          <p className="mt-5 text-[1.15rem] leading-[1.75] text-[#15173D]/80 max-w-[58ch]">{D.intro}</p>
          <HeroMedia />

          {/* Recherche et catégories */}
          <div className="mt-10 flex flex-col gap-5">
            <input
              type="search"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setLimit(PAGE_SIZE);
              }}
              placeholder={D.searchLabel}
              aria-label={D.searchLabel}
              className="h-[56px] w-full px-6 rounded-full bg-white border-2 border-[#15173D]/10 text-[16px] text-[#15173D] focus:outline-none focus:border-[#D98268]"
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

      <section className="bg-[#F3F1F8] pb-16 lg:pb-24">
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

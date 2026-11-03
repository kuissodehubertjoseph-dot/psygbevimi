import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Markdown from 'react-markdown';
import { motion } from 'motion/react';
import { Facebook, Link2, Linkedin, MessageCircle, Twitter } from 'lucide-react';
import { ARTICLES, Article, formatArticleDate } from '../content';
import { createWhatsAppUrl } from '../data';
import { BTN } from './ui';

const metaLine = (a: Article) =>
  `${formatArticleDate(a.createdAt)} · ${a.readingTime || '5'} min de lecture${
    a.commentsCount > 0 ? ` · ${a.commentsCount} commentaire${a.commentsCount > 1 ? 's' : ''}` : ''
  }`;

const BackLink: React.FC = () => (
  <Link to="/tous-les-articles" className="inline-flex items-center gap-2 text-[15px] text-[#5A5D7E] hover:text-[#15173D] transition-colors">
    <span aria-hidden="true">←</span> Tous les articles
  </Link>
);

/** Barre de progression de lecture, collée sous l'en-tête */
const ReadingProgress: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(100, Math.max(0, (window.scrollY / max) * 100)) : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div aria-hidden="true" className="fixed inset-x-0 top-[72px] z-30 h-[3px] bg-transparent">
      <div className="h-full bg-[#D98268] transition-[width] duration-100" style={{ width: `${progress}%` }} />
    </div>
  );
};

/** Boutons de partage (WhatsApp, Facebook, LinkedIn, X, copier le lien), comme sur l'ancien site */
const ShareBar: React.FC<{ article: Article }> = ({ article }) => {
  const [copied, setCopied] = useState(false);

  const share = (platform: 'whatsapp' | 'facebook' | 'linkedin' | 'twitter' | 'copy') => {
    const pageUrl = `${window.location.origin}/blog/${encodeURIComponent(article.slug).replace(
      /[!'()*]/g,
      (c) => `%${c.charCodeAt(0).toString(16).toUpperCase()}`,
    )}`;
    if (platform === 'copy') {
      navigator.clipboard
        .writeText(pageUrl)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        })
        .catch(() => undefined);
      return;
    }
    const u = encodeURIComponent(pageUrl);
    const text = encodeURIComponent(`${article.title} · Psy Gbevimi`);
    const urls = {
      whatsapp: `https://wa.me/?text=${text}%20${u}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${u}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`,
      twitter: `https://twitter.com/intent/tweet?text=${text}&url=${u}`,
    };
    window.open(urls[platform], '_blank', 'noopener,noreferrer');
  };

  const items = [
    { key: 'whatsapp', label: 'Partager sur WhatsApp', icon: MessageCircle, highlight: true },
    { key: 'facebook', label: 'Partager sur Facebook', icon: Facebook },
    { key: 'linkedin', label: 'Partager sur LinkedIn', icon: Linkedin },
    { key: 'twitter', label: 'Partager sur X', icon: Twitter },
    { key: 'copy', label: 'Copier le lien', icon: Link2 },
  ] as const;

  return (
    <aside
      aria-label="Partager l'article"
      className="fixed right-3 sm:right-5 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center gap-2"
    >
      {items.map(({ key, label, icon: Icon, ...rest }) => (
        <button
          key={key}
          type="button"
          title={key === 'copy' && copied ? 'Lien copié' : label}
          aria-label={label}
          onClick={() => share(key)}
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border shadow-[0_8px_20px_-8px_rgba(21,23,61,0.35)] transition-colors cursor-pointer ${
            'highlight' in rest
              ? 'border-[#16a34a] bg-[#16a34a] text-white hover:bg-[#16a34a]/90'
              : 'glass text-[#15173D]/80 hover:text-[#15173D]'
          }`}
        >
          <Icon className="h-4 w-4" aria-hidden="true" />
        </button>
      ))}
      <span
        role="status"
        aria-live="polite"
        className={`absolute right-full mr-3 bottom-0 whitespace-nowrap rounded-full bg-[#15173D] px-3 py-1.5 text-[13px] text-[#F3F1F8] ${
          copied ? '' : 'hidden'
        }`}
      >
        Lien copié
      </span>
    </aside>
  );
};

/** Transforme les adresses écrites en clair (https://…) en vrais liens Markdown, sans toucher aux liens déjà écrits */
const linkify = (md: string) =>
  md.replace(/(?<![(\[<"])(https?:\/\/[^\s)<\]]+)/g, (match) => {
    const trailing = match.match(/[.,;:!?]+$/)?.[0] ?? '';
    const url = trailing ? match.slice(0, -trailing.length) : match;
    return `[${url}](${url})${trailing}`;
  });

/** Rend un texte Markdown (adresses en clair rendues cliquables, liens externes dans un nouvel onglet) */
const Md: React.FC<{ children: string }> = ({ children }) => (
  <Markdown
    components={{
      // Les liens vers les réseaux sociaux et autres sites s'ouvrent dans un nouvel onglet
      a: ({ href, children: label }) => {
        const external = !!href && /^https?:\/\//.test(href);
        return (
          <a href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
            {label}
          </a>
        );
      },
    }}
  >
    {linkify(children)}
  </Markdown>
);

const Body: React.FC<{ article: Article; className?: string }> = ({ article, className = '' }) => (
  <div className={`article-body text-[1.1rem] leading-[1.8] text-[#15173D]/90 ${className}`}>
    <Md>{article.content}</Md>
  </div>
);

const Actions: React.FC<{ url: string; center?: boolean }> = ({ url, center = false }) => (
  <div className={`mt-14 pt-8 border-t border-[#15173D]/10 flex flex-col sm:flex-row sm:items-center gap-4 ${center ? 'sm:justify-center' : ''}`}>
    <a href={url} target="_blank" rel="noopener noreferrer" className={BTN.primary}>
      En parler sur WhatsApp
    </a>
    <Link to="/tous-les-articles" className={BTN.outline}>
      Tous les articles
    </Link>
  </div>
);

/** Articles dont l'affiche et le titre forment un seul héro : Octobre Rose, Retrouver le goût de vivre, Parentalité responsable */
const isMergedHero = (a: Article) =>
  ['8994324a', '07c10849', 'b8a47b7b', 'aa158937'].some((k) => a.id.startsWith(k)) && !!a.imageUrl;

/** Héro d'Octobre Rose et de « Retrouver le goût de vivre » : l'affiche entière, titre sur une carte vitrée dans son coin bas droit */
const CardHero: React.FC<{ article: Article }> = ({ article }) => {
  // Octobre Rose : affiche plus petite, centrée dans la page, coins arrondis
  const compact = article.id.startsWith('8994324a');

  return (
    <header className={`bg-[#F3F1F8] ${compact ? 'pt-6 px-6 pb-4 lg:pb-20' : 'pb-4'}`}>
      <div className={`relative ${compact ? 'max-w-[1000px] mx-auto' : ''}`}>
        <img
          src={article.imageUrl!}
          alt=""
          referrerPolicy="no-referrer"
          className={`block w-full h-auto ${compact ? 'rounded-[28px] shadow-[0_30px_60px_-34px_rgba(21,23,61,0.45)]' : ''}`}
        />
        <div
          className={`relative z-10 mt-5 lg:mt-0 lg:absolute bg-white/90 backdrop-blur-md rounded-[24px] px-6 py-6 sm:px-8 sm:py-7 shadow-[0_30px_60px_-30px_rgba(21,23,61,0.5)] ${
            compact ? 'lg:-bottom-14 lg:right-6 lg:w-[46%]' : 'mx-6 lg:mx-0 lg:bottom-8 lg:right-8 lg:w-[44%]'
          }`}
        >
          <BackLink />
          <h1 className="mt-3 font-bricolage text-[clamp(1.4rem,2.3vw,2rem)] leading-[1.15] text-[#15173D]">{article.title}</h1>
          <p className="mt-3 text-[14px] text-[#5A5D7E]">
            {article.category} · {metaLine(article)}
          </p>
        </div>
      </div>
    </header>
  );
};

/** Choix du héro : Parentalité responsable a le sien (fond flouté, coins arrondis), les deux autres gardent la carte vitrée */
const HeroFor: React.FC<{ article: Article }> = ({ article }) =>
  article.id.startsWith('aa158937') ? (
    <PosterHero article={article} />
  ) : article.id.startsWith('b8a47b7b') ? (
    <MergedHero article={article} />
  ) : (
    <CardHero article={article} />
  );

/** Héro de « L'audace » : un bloc coloré avec le titre, puis l'affiche entière dans son propre cadre, séparée du texte */
const PosterHero: React.FC<{ article: Article }> = ({ article }) => (
  <header className="px-4 pt-3 sm:px-6">
    <div className="overflow-hidden rounded-[32px] lg:rounded-[56px] bg-[#E9D5E4]">
      <div className="px-6 pt-6 pb-8 sm:px-10 sm:pt-8 lg:pb-12 text-center text-[#15173D]">
        <div className="text-left">
          <Link
            to="/tous-les-articles"
            className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-[15px] hover:bg-white transition-colors"
          >
            <span aria-hidden="true">←</span> Tous les articles
          </Link>
        </div>

        <span className="mt-8 inline-block rounded-full bg-[#D98268] px-4 py-1.5 uppercase tracking-[0.1em] font-bricolage text-[13px] text-[#15173D] font-semibold">
          {article.category}
        </span>
        <h1 className="mt-5 mx-auto max-w-[20ch] font-bricolage text-[clamp(2.2rem,5.6vw,4.4rem)] leading-[1.06]">{article.title}</h1>

        <div className="mt-7 flex flex-wrap justify-center gap-2 text-[14px]">
          <span className="rounded-full bg-white/70 px-4 py-1.5">{formatArticleDate(article.createdAt)}</span>
          <span className="rounded-full bg-white/70 px-4 py-1.5">{article.readingTime || '5'} min de lecture</span>
          {article.commentsCount > 0 && (
            <span className="rounded-full bg-white/70 px-4 py-1.5">
              {article.commentsCount} commentaire{article.commentsCount > 1 ? 's' : ''}
            </span>
          )}
        </div>

        <div className="mt-7 flex items-center justify-center gap-3 text-left">
          <span className="flex h-11 items-center rounded-xl bg-white px-2">
            <img src="/images/logo.webp" alt="" className="h-9 w-auto" />
          </span>
          <span className="flex flex-col leading-tight">
            <span className="font-semibold">Psy Gbevimi</span>
            <span className="text-[13px] text-[#15173D]/70">Initiative pour le bonheur et la santé mentale</span>
          </span>
        </div>
      </div>
    </div>

    {/* Affiche séparée du texte, dans son propre cadre */}
    <img
      src={article.imageUrl!}
      alt=""
      referrerPolicy="no-referrer"
      className="mt-6 block h-auto w-full lg:max-w-[760px] lg:mx-auto rounded-[32px] lg:rounded-[40px] shadow-[0_30px_60px_-34px_rgba(21,23,61,0.5)]"
    />
  </header>
);

/** Héro de Parentalité responsable : le fond reprend les couleurs de l'affiche (floutée), l'affiche reste entière et le titre est écrit dessus */
const MergedHero: React.FC<{ article: Article }> = ({ article }) => (
  <header className="relative isolate overflow-hidden mt-3 rounded-[36px] lg:rounded-[56px]">
    <img
      src={article.imageUrl!}
      alt=""
      aria-hidden="true"
      referrerPolicy="no-referrer"
      className="absolute inset-0 -z-20 h-full w-full scale-125 object-cover blur-3xl"
    />
    <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-br from-[#15173D]/55 to-[#15173D]/80" />

    <div className="max-w-[1240px] mx-auto px-6 lg:px-12 py-10 lg:py-16">
      <Link
        to="/tous-les-articles"
        className="inline-flex items-center gap-2 text-[15px] text-[#E9D5E4] hover:text-white transition-colors"
      >
        <span aria-hidden="true">←</span> Tous les articles
      </Link>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        <motion.img
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          src={article.imageUrl!}
          alt=""
          referrerPolicy="no-referrer"
          className="lg:col-span-7 w-full h-auto rounded-[28px] ring-1 ring-white/20 shadow-[0_50px_90px_-30px_rgba(0,0,0,0.7)]"
        />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
          className="lg:col-span-5 text-[#F3F1F8]"
        >
          <span className="inline-block glass-dark rounded-full px-4 py-1.5 text-[13px] uppercase tracking-[0.12em] text-[#F3F1F8] font-bricolage">
            {article.category}
          </span>
          <h1 className="mt-5 font-bricolage text-[clamp(1.9rem,3.6vw,3rem)] leading-[1.1]">{article.title}</h1>

          <div className="mt-6 flex flex-wrap gap-2 text-[14px]">
            <span className="glass-dark rounded-full px-3.5 py-1.5">{formatArticleDate(article.createdAt)}</span>
            <span className="glass-dark rounded-full px-3.5 py-1.5">{article.readingTime || '5'} min de lecture</span>
            {article.commentsCount > 0 && (
              <span className="glass-dark rounded-full px-3.5 py-1.5">
                {article.commentsCount} commentaire{article.commentsCount > 1 ? 's' : ''}
              </span>
            )}
          </div>

          {/* Auteur, comme sur l'ancien site */}
          <div className="mt-8 flex items-center gap-3">
            <span className="flex h-12 items-center rounded-xl bg-white px-2">
              <img src="/images/logo.webp" alt="" className="h-10 w-auto" />
            </span>
            <span className="flex flex-col leading-tight">
              <span className="font-semibold">Psy Gbevimi</span>
              <span className="text-[13px] text-[#C9C8E3]">Initiative pour le bonheur et la santé mentale</span>
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  </header>
);

/** Mise en page A : couverture centrée, texte en colonne étroite */
const LayoutCover: React.FC<{ article: Article; url: string }> = ({ article, url }) => {
  const merged = isMergedHero(article);

  return (
  <article className={`bg-[#F3F1F8] ${merged ? 'pb-12 lg:pb-16' : 'py-12 lg:py-16'}`}>
    {merged ? (
      <HeroFor article={article} />
    ) : (
      <div className="max-w-[900px] mx-auto px-6 text-center">
        <BackLink />
        <p className="mt-8 text-[14px] uppercase tracking-[0.12em] text-[#D98268] font-bricolage">{article.category}</p>
        <h1 className="mt-4 font-bricolage text-[clamp(1.9rem,4.4vw,3.2rem)] leading-[1.15] text-[#15173D]">{article.title}</h1>
        <p className="mt-5 text-[15px] text-[#5A5D7E]">{metaLine(article)}</p>
        {article.imageUrl && (
          <img
            src={article.imageUrl}
            alt=""
            referrerPolicy="no-referrer"
            className="mt-10 mx-auto w-full max-w-[860px] h-auto rounded-[24px] bg-white border border-[#15173D]/10 shadow-[0_24px_50px_-30px_rgba(21,23,61,0.45)]"
          />
        )}
      </div>
    )}
    {/* Texte sur une carte blanche, puis bloc de fin rose */}
    <div className="max-w-[860px] mx-auto px-6 mt-14">
      <div className="bg-white rounded-[28px] border border-[#15173D]/10 px-6 py-10 sm:px-12 sm:py-14 shadow-[0_24px_50px_-34px_rgba(21,23,61,0.35)]">
        <Body article={article} className="article-body--card max-w-[68ch] mx-auto" />
      </div>

      <div className="mt-8 bg-[#E9D5E4] rounded-[28px] p-8 sm:p-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <p className="font-bricolage text-[1.4rem] leading-snug text-[#15173D] max-w-[26ch]">
          Cet article vous a parlé ? Échangeons-en.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 shrink-0">
          <a href={url} target="_blank" rel="noopener noreferrer" className={BTN.primary}>
            En parler sur WhatsApp
          </a>
          <Link to="/tous-les-articles" className={BTN.outline}>
            Tous les articles
          </Link>
        </div>
      </div>
    </div>
  </article>
  );
};

/** Mise en page B : titre et image côte à côte, colonne d'informations fixe à gauche du texte */
const LayoutSidebar: React.FC<{ article: Article; url: string }> = ({ article, url }) => {
  const merged = isMergedHero(article);

  return (
  <article className="bg-[#F3F1F8]">
    {merged ? (
      <div className="pb-14 lg:pb-20">
        <HeroFor article={article} />
      </div>
    ) : (
    <header className="pt-10 pb-14 lg:pb-20">
      <div className="max-w-[1160px] mx-auto px-6 lg:px-12">
        <BackLink />
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <h1 className="lg:col-span-5 font-bricolage text-[clamp(2rem,4vw,3.2rem)] leading-[1.1] text-[#15173D]">
            {article.title}
          </h1>
          {article.imageUrl && (
            <div className="lg:col-span-7 bg-[#E9D5E4] rounded-[28px] p-4 sm:p-6">
              <img
                src={article.imageUrl}
                alt=""
                referrerPolicy="no-referrer"
                className="w-full h-auto rounded-[18px]"
              />
            </div>
          )}
        </div>
      </div>
    </header>
    )}

    {merged ? (
      // Texte de « L'audace » : colonne centrée sur le fond de la page, style magazine, puis bloc de fin
      <div className="max-w-[780px] mx-auto px-6 pb-16 lg:pb-24">
        <Body article={article} className="article-body--mag" />

        <div className="mt-16 rounded-[32px] bg-white border border-[#15173D]/10 p-8 sm:p-12 text-center shadow-[0_24px_50px_-34px_rgba(21,23,61,0.35)]">
          <p className="font-bricolage text-[clamp(1.5rem,3vw,2.2rem)] leading-tight text-[#15173D] max-w-[24ch] mx-auto">
            Cet article vous a parlé ? Échangeons-en.
          </p>
          <div className="mt-7 flex flex-col sm:flex-row gap-3 justify-center">
            <a href={url} target="_blank" rel="noopener noreferrer" className={BTN.primary}>
              En parler sur WhatsApp
            </a>
            <Link to="/tous-les-articles" className={BTN.outline}>
              Tous les articles
            </Link>
          </div>
        </div>
      </div>
    ) : (
    <div className="bg-white border-t border-[#15173D]/10">
      <div className="max-w-[1160px] mx-auto px-6 lg:px-12 py-14 lg:py-20 grid grid-cols-1 lg:grid-cols-12 gap-10">
        <aside className="lg:col-span-3">
          <div className="lg:sticky lg:top-28 flex flex-col gap-6">
            <div>
              <p className="text-[12px] uppercase tracking-[0.14em] text-[#D98268] font-bricolage">Catégorie</p>
              <p className="mt-1 font-bricolage text-[1.05rem] text-[#15173D]">{article.category}</p>
            </div>
            <div>
              <p className="text-[12px] uppercase tracking-[0.14em] text-[#D98268] font-bricolage">Publié le</p>
              <p className="mt-1 font-bricolage text-[1.05rem] text-[#15173D]">{formatArticleDate(article.createdAt)}</p>
            </div>
            <div>
              <p className="text-[12px] uppercase tracking-[0.14em] text-[#D98268] font-bricolage">Lecture</p>
              <p className="mt-1 font-bricolage text-[1.05rem] text-[#15173D]">{article.readingTime || '5'} min</p>
            </div>
            <a href={url} target="_blank" rel="noopener noreferrer" className={`${BTN.primary} w-full`}>
              En parler
            </a>
          </div>
        </aside>
        <div className="lg:col-span-9 max-w-[72ch]">
          <Body article={article} />
          <Actions url={url} />
        </div>
      </div>
    </div>
    )}
  </article>
  );
};

/** Mise en page C : bandeau rose, image flottante à droite du texte */
const LayoutFloat: React.FC<{ article: Article; url: string }> = ({ article, url }) => {
  const merged = isMergedHero(article);

  return (
  <article className="bg-[#F3F1F8]">
    {merged ? (
      <HeroFor article={article} />
    ) : (
      <header className="bg-[#E9D5E4] py-12 lg:py-20">
        <div className="max-w-[960px] mx-auto px-6 lg:px-12">
          <BackLink />
          <h1 className="mt-8 font-bricolage text-[clamp(2rem,4.8vw,3.8rem)] leading-[1.1] text-[#15173D]">{article.title}</h1>
          <p className="mt-5 text-[15px] text-[#15173D]/75">
            {article.category} · {metaLine(article)}
          </p>
        </div>
      </header>
    )}

    <div className="max-w-[960px] mx-auto px-6 lg:px-12 py-12 lg:py-16">
      {article.imageUrl && !merged && (
        <img
          src={article.imageUrl}
          alt=""
          referrerPolicy="no-referrer"
          className="w-full h-auto mb-10 rounded-[24px] bg-white border border-[#15173D]/10 shadow-[0_24px_50px_-30px_rgba(21,23,61,0.45)]"
        />
      )}
      {/* Texte à plat sur le fond, puis bloc de fin bleu nuit */}
      <Body article={article} className="article-body--open max-w-[760px] mx-auto" />

      <div className="mt-14 bg-[#15173D] text-[#F3F1F8] rounded-[28px] p-8 sm:p-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <p className="font-bricolage text-[1.4rem] leading-snug max-w-[26ch]">Cet article vous a parlé ? Échangeons-en.</p>
        <div className="flex flex-col sm:flex-row gap-3 shrink-0">
          <a href={url} target="_blank" rel="noopener noreferrer" className={BTN.primaryOnDark}>
            En parler sur WhatsApp
          </a>
          <Link to="/tous-les-articles" className={BTN.outlineOnDark}>
            Tous les articles
          </Link>
        </div>
      </div>
    </div>
  </article>
  );
};

/** Sépare « ## Titre » du reste d'un bloc Markdown */
const splitHeading = (block: string) => {
  const m = block.match(/^##\s+(.*)\n+([\s\S]*)$/);
  return m ? { title: m[1].trim(), body: m[2].trim() } : { title: '', body: block.trim() };
};

/** Mise en page propre à « Cancer et bonheur durable » : introduction, sept piliers en cartes numérotées, conclusion */
const LayoutPillars: React.FC<{ article: Article; url: string }> = ({ article, url }) => {
  // Le texte est découpé par les traits « --- » : introduction, piliers, conclusion
  const parts = article.content.replace(/\r\n/g, '\n').split(/\n---\n/).map((p) => p.trim());
  const intro = splitHeading(parts[0] ?? '');
  const pillars = (parts[1] ?? '')
    .split(/\n(?=## )/)
    .map((sec) => splitHeading(sec))
    .map((h) => {
      const n = h.title.match(/^(\d+)\.\s*(.*)$/);
      return { num: n ? n[1] : '', title: n ? n[2] : h.title, body: h.body };
    });
  const outro = splitHeading(parts.slice(2).join('\n\n'));

  // Dernière ligne de hashtags : affichée en pastilles
  const outroLines = outro.body.split('\n');
  const tagLine = outroLines.map((l) => l.trim()).reduce((acc, l, i) => (l.startsWith('#') ? i : acc), -1);
  const tags = tagLine >= 0 ? outroLines[tagLine].trim().split(/\s+/).filter((t) => t.startsWith('#')) : [];
  const outroBody = tagLine >= 0 ? outroLines.slice(0, tagLine).join('\n').trim() : outro.body;

  return (
    <article className="bg-[#F3F1F8]">
      {/* Héro sans cadre : titre centré en grand sur le fond de la page, puis l'affiche entière, un peu plus petite, centrée dessous */}
      <header className="px-6 pb-4 pt-10 lg:px-12 lg:pt-14">
        <div className="mx-auto max-w-[960px] text-center">
          <div className="text-left">
            <BackLink />
          </div>
          <p className="mt-10 text-[14px] uppercase tracking-[0.14em] text-[#D98268] font-bricolage">{article.category}</p>
          <h1 className="mx-auto mt-5 max-w-[22ch] font-bricolage text-[clamp(2.1rem,5vw,4rem)] leading-[1.08] text-[#15173D]">{article.title}</h1>
          <p className="mt-6 text-[15px] text-[#5A5D7E]">{metaLine(article)}</p>
        </div>
        {article.imageUrl && (
          <img
            src={article.imageUrl}
            alt=""
            referrerPolicy="no-referrer"
            className="mx-auto mt-12 block h-auto w-full max-w-[860px] rounded-[16px]"
          />
        )}
      </header>

      <div className="max-w-[960px] mx-auto px-6 lg:px-12 py-12 lg:py-16">
        {/* Texte à plat sur le fond de la page, sans cadre : seuls l'espace et la typographie structurent */}
        <div className="mx-auto max-w-[760px]">
          {/* Introduction */}
          <section>
            <h2 className="font-bricolage text-[clamp(1.9rem,3.8vw,2.9rem)] leading-[1.15] text-[#15173D]">{intro.title}</h2>
            <div className="article-body mt-8 text-[1.2rem] leading-[1.85] text-[#15173D]/90">
              <Md>{intro.body}</Md>
            </div>
          </section>

          {/* Les sept piliers */}
          <div className="mt-24 flex flex-col gap-20">
            {pillars.map((p) => (
              <section key={p.title} className="grid gap-2 sm:grid-cols-[6rem_minmax(0,1fr)] sm:gap-8">
                <span aria-hidden="true" className="font-bricolage text-[3.4rem] sm:text-[4.6rem] leading-none text-[#D98268]">
                  {p.num.padStart(2, '0')}
                </span>
                <div>
                  <h2 className="font-bricolage text-[clamp(1.5rem,2.8vw,2.1rem)] leading-[1.2] text-[#15173D]">{p.title}</h2>
                  <div className="article-body mt-5 text-[1.12rem] leading-[1.85] text-[#15173D]/85">
                    <Md>{p.body}</Md>
                  </div>
                </div>
              </section>
            ))}
          </div>

          {/* Conclusion */}
          <section className="mt-28">
            <h2 className="font-bricolage text-[clamp(1.9rem,3.8vw,2.9rem)] leading-[1.15] text-[#15173D]">{outro.title}</h2>
            <div className="article-body mt-8 text-[1.2rem] leading-[1.85] text-[#15173D]/90">
              <Md>{outroBody}</Md>
            </div>
            {tags.length > 0 && <p className="mt-10 text-[15px] leading-[2] text-[#D98268]">{tags.join('   ')}</p>}
            <div className="mt-12 flex flex-col gap-3 sm:flex-row">
              <a href={url} target="_blank" rel="noopener noreferrer" className={BTN.primary}>
                En parler sur WhatsApp
              </a>
              <Link to="/tous-les-articles" className={BTN.outline}>
                Tous les articles
              </Link>
            </div>
          </section>
        </div>
      </div>
    </article>
  );
};

/** Titre en minuscules avec majuscule initiale : « CROIS EN TOI » → « Crois en toi » */
const sentenceCase = (t: string) => {
  const lower = t.toLocaleLowerCase('fr-FR');
  return lower.charAt(0).toLocaleUpperCase('fr-FR') + lower.slice(1);
};

/** Mise en page propre à « OCTOBRE » : chaque lettre de l'acrostiche en très grand, texte à plat sans cadre */
const LayoutAcrostic: React.FC<{ article: Article; url: string }> = ({ article, url }) => {
  // Le texte est découpé par les traits « --- » : introduction, sept lettres, conclusion, hashtags et contacts
  const parts = article.content.replace(/\r\n/g, '\n').split(/\n---\n/).map((p) => p.trim()).filter(Boolean);
  const intro = parts[0] ?? '';
  const letters = parts.slice(1).flatMap((p) => {
    const m = p.match(/^###\s+([A-ZÉÈÀ]),\s*(.*)\n+([\s\S]*)$/);
    return m ? [{ letter: m[1], title: sentenceCase(m[2].trim()), body: m[3].trim() }] : [];
  });
  // Blocs de fin de page : texte de conclusion, ligne de hashtags, lignes de contacts
  const blocks = parts
    .slice(1)
    .filter((p) => !/^###\s+[A-ZÉÈÀ],\s/.test(p))
    .flatMap((p) => p.split(/\n{2,}/).map((b) => b.trim()).filter(Boolean));
  const tagBlock = blocks.find((b) => /^\*\*#/.test(b));
  const tags = tagBlock ? tagBlock.replace(/\*/g, '').split(/\s+/).filter((t) => t.startsWith('#')) : [];
  const contactLine = /^\*\*([^*]+?)\s*:\s*\*\*\s*(.*)$/;
  const contactBlock = blocks.find((b) => b.split('\n').every((l) => contactLine.test(l.trim())));
  const contacts = contactBlock
    ? contactBlock.split('\n').flatMap((l) => {
        const m = l.trim().match(contactLine);
        return m ? [{ label: m[1].trim(), value: m[2].trim() }] : [];
      })
    : [];
  const rest = blocks.filter((b) => b !== tagBlock && b !== contactBlock);

  return (
    <article className="bg-[#F3F1F8]">
      <header className="pt-10 pb-14 lg:pb-20">
        <div className="max-w-[1160px] mx-auto px-6 lg:px-12">
          <BackLink />
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <h1 className="lg:col-span-5 font-bricolage text-[clamp(2rem,4vw,3.2rem)] leading-[1.1] text-[#15173D]">
              {article.title}
            </h1>
            {article.imageUrl && (
              <div className="lg:col-span-7 bg-[#E9D5E4] rounded-[28px] p-4 sm:p-6">
                <img src={article.imageUrl} alt="" referrerPolicy="no-referrer" className="w-full h-auto rounded-[18px]" />
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[780px] px-6 pb-20 lg:pb-28">
        <p className="text-[14px] uppercase tracking-[0.14em] text-[#D98268] font-bricolage">
          {article.category} <span className="text-[#5A5D7E] normal-case tracking-normal">· {metaLine(article)}</span>
        </p>

        {/* Introduction */}
        <div className="article-body mt-8 text-[1.3rem] leading-[1.8] text-[#15173D]">
          <Md>{intro}</Md>
        </div>

        {/* Les sept lettres */}
        <div className="mt-20 flex flex-col gap-20">
          {letters.map((l) => (
            <section key={l.letter + l.title} className="grid gap-2 sm:grid-cols-[7rem_minmax(0,1fr)] sm:gap-8">
              <span aria-hidden="true" className="font-bricolage text-[5.5rem] leading-[0.85] text-[#D98268] sm:text-[7rem]">
                {l.letter}
              </span>
              <div>
                <h2 className="font-bricolage text-[clamp(1.8rem,3.4vw,2.6rem)] leading-[1.15] text-[#15173D]">{l.title}</h2>
                <div className="article-body mt-5 text-[1.12rem] leading-[1.85] text-[#15173D]/85">
                  <Md>{l.body}</Md>
                </div>
              </div>
            </section>
          ))}
        </div>

        {/* Conclusion */}
        <div className="mt-24 flex flex-col gap-10">
          {rest.map((p) => (
            <div key={p.slice(0, 40)} className="article-body text-[1.15rem] leading-[1.85] text-[#15173D]/90">
              <Md>{p}</Md>
            </div>
          ))}
        </div>

        {/* Hashtags : une ligne aérée */}
        {tags.length > 0 && (
          <p className="mt-14 flex flex-wrap gap-x-5 gap-y-2 text-[1rem] text-[#D98268]">
            {tags.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </p>
        )}

        {/* Contacts : un par ligne, libellé à gauche et lien à droite */}
        {contacts.length > 0 && (
          <dl className="mt-12 grid gap-y-5 sm:grid-cols-[9rem_minmax(0,1fr)] sm:gap-x-6">
            {contacts.map((c) => (
              <React.Fragment key={c.label}>
                <dt className="font-bricolage text-[13px] uppercase tracking-[0.14em] text-[#5A5D7E] sm:pt-1.5">{c.label}</dt>
                <dd className="article-body text-[1.08rem] leading-snug text-[#15173D] break-words">
                  <Md>{c.value}</Md>
                </dd>
              </React.Fragment>
            ))}
          </dl>
        )}

        <div className="mt-14 flex flex-col gap-3 sm:flex-row">
          <a href={url} target="_blank" rel="noopener noreferrer" className={BTN.primary}>
            En parler sur WhatsApp
          </a>
          <Link to="/tous-les-articles" className={BTN.outline}>
            Tous les articles
          </Link>
        </div>
      </div>
    </article>
  );
};

/** Mise en page propre à « LA FOURMI » : cinq leçons en deux colonnes (titre à gauche, texte à droite), texte à plat sans cadre */
const LayoutLessons: React.FC<{ article: Article; url: string }> = ({ article, url }) => {
  const parts = article.content.replace(/\r\n/g, '\n').split(/\n---\n/).map((p) => p.trim()).filter(Boolean);
  const intro = parts[0] ?? '';

  const lessons = parts.flatMap((p) => {
    const m = p.match(/^##\s+(\d+)\.\s*(.*)\n+([\s\S]*)$/);
    return m ? [{ num: m[1], title: m[2].trim(), body: m[3].trim() }] : [];
  });

  // « # LA GRANDE LEÇON… » puis son texte (qui contient la liste et le sous-titre « Le bonheur durable »)
  const big = parts.find((p) => p.startsWith('# '));
  const bigMatch = big?.match(/^#\s+(.*)\n+([\s\S]*)$/);
  const bigBlock = bigMatch ? { title: bigMatch[1].trim(), body: bigMatch[2].trim() } : null;

  const thought = parts.find((p) => p.startsWith('### Une pensée'))?.replace(/^###[^\n]*\n+/, '').trim() ?? '';

  // Dernier bloc : contacts « **Libellé :** valeur » puis hashtags
  const footer = parts.find((p) => p.startsWith('### Retrouvez')) ?? '';
  const contactLine = /^\*\*([^*]+?)\s*:\s*\*\*\s*(.*)$/;
  const contacts = footer.split('\n').flatMap((l) => {
    const m = l.trim().match(contactLine);
    return m ? [{ label: m[1].trim(), value: m[2].trim() }] : [];
  });
  const tags = footer
    .split('\n')
    .filter((l) => l.trim().startsWith('#') && !l.trim().startsWith('###'))
    .flatMap((l) => l.trim().split(/\s+/))
    .filter((t) => t.startsWith('#'));

  return (
    <article className="bg-[#F3F1F8] py-12 lg:py-16">
      {/* Héro sans cadre : titre à gauche, affiche à droite, côte à côte */}
      <div className="mx-auto max-w-[1160px] px-6 lg:px-12">
        <BackLink />
        <div className="mt-10 grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <p className="text-[14px] uppercase tracking-[0.14em] text-[#D98268] font-bricolage">{article.category}</p>
            <h1 className="mt-5 font-bricolage text-[clamp(1.8rem,3.3vw,2.7rem)] leading-[1.15] text-[#15173D]">{article.title}</h1>
            <p className="mt-6 text-[15px] text-[#5A5D7E]">{metaLine(article)}</p>
          </div>
          {article.imageUrl && (
            <img
              src={article.imageUrl}
              alt=""
              referrerPolicy="no-referrer"
              className="lg:col-span-7 block h-auto w-full rounded-[20px]"
            />
          )}
        </div>
      </div>

      <div className="mx-auto mt-24 max-w-[1000px] px-6 lg:px-12">
        {/* Introduction */}
        <div className="article-body article-body--mag mx-auto max-w-[720px] text-[1.25rem] leading-[1.8] text-[#15173D]">
          <Md>{intro}</Md>
        </div>

        {/* Les cinq leçons : titre à gauche, texte à droite */}
        <div className="mt-24 flex flex-col gap-20">
          {lessons.map((l) => (
            <section key={l.num} className="grid gap-5 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-5">
                <span aria-hidden="true" className="font-bricolage text-[4.2rem] leading-none text-[#D98268] lg:text-[5.2rem]">
                  {l.num}
                </span>
                <h2 className="mt-3 font-bricolage text-[clamp(1.5rem,2.6vw,2.1rem)] leading-[1.2] text-[#15173D]">{l.title}</h2>
              </div>
              <div className="article-body lg:col-span-7 text-[1.12rem] leading-[1.85] text-[#15173D]/85 lg:pt-3">
                <Md>{l.body}</Md>
              </div>
            </section>
          ))}
        </div>

        {/* La grande leçon */}
        {bigBlock && (
          <section className="mx-auto mt-28 max-w-[760px] text-center">
            <h2 className="font-bricolage text-[clamp(2rem,4.4vw,3.4rem)] leading-[1.1] text-[#15173D]">{bigBlock.title}</h2>
            <div className="article-body mt-8 text-left text-[1.15rem] leading-[1.85] text-[#15173D]/90">
              <Md>{bigBlock.body}</Md>
            </div>
          </section>
        )}

        {/* Pensée à retenir */}
        {thought && (
          <section className="mx-auto mt-24 max-w-[760px] text-center">
            <div className="article-body font-bricolage text-[clamp(1.5rem,3vw,2.2rem)] leading-[1.35] text-[#15173D] [&_strong]:font-normal [&_p+p]:mt-6">
              <Md>{thought}</Md>
            </div>
          </section>
        )}

        {/* Contacts : un par ligne */}
        {contacts.length > 0 && (
          <dl className="mx-auto mt-24 grid max-w-[720px] gap-y-5 sm:grid-cols-[9rem_minmax(0,1fr)] sm:gap-x-6">
            {contacts.map((c) => (
              <React.Fragment key={c.label}>
                <dt className="font-bricolage text-[13px] uppercase tracking-[0.14em] text-[#5A5D7E] sm:pt-1.5">{c.label}</dt>
                <dd className="article-body break-words text-[1.08rem] leading-snug text-[#15173D]">
                  <Md>{c.value}</Md>
                </dd>
              </React.Fragment>
            ))}
          </dl>
        )}

        {tags.length > 0 && (
          <p className="mx-auto mt-12 flex max-w-[720px] flex-wrap gap-x-5 gap-y-2 text-[1rem] text-[#D98268]">
            {tags.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </p>
        )}

        <div className="mx-auto mt-14 flex max-w-[720px] flex-col gap-3 sm:flex-row">
          <a href={url} target="_blank" rel="noopener noreferrer" className={BTN.primary}>
            En parler sur WhatsApp
          </a>
          <Link to="/tous-les-articles" className={BTN.outline}>
            Tous les articles
          </Link>
        </div>
      </div>
    </article>
  );
};

/** Mise en page propre à « L'honnêteté » : sommaire fixe à gauche, sections à droite avec un paragraphe d'ouverture en grand, sans cadre */
const LayoutGuide: React.FC<{ article: Article; url: string }> = ({ article, url }) => {
  const parts = article.content.replace(/\r\n/g, '\n').split(/\n---\n/).map((p) => p.trim()).filter(Boolean);
  // Le texte commence par « # Titre » déjà affiché dans l'en-tête : on l'enlève
  const main = (parts[0] ?? '').replace(/^#\s[^\n]*\n+/, '');
  const signature = parts[1] ?? '';

  const [introRaw, ...sectionsRaw] = main.split(/\n(?=## )/);
  const sections = sectionsRaw.map((sec, i) => {
    const m = sec.match(/^##\s+(.*)\n+([\s\S]*)$/);
    const body = (m?.[2] ?? '').trim();
    const [lead, ...others] = body.split(/\n{2,}/);
    return { id: `section-${i + 1}`, title: m?.[1].trim() ?? '', lead: lead ?? '', rest: others.join('\n\n') };
  });

  const bold = signature.match(/\*\*([^*]+)\*\*/)?.[1] ?? '';
  const motto = signature.match(/(?:^|\n)\*([^*]+)\*/)?.[1] ?? '';

  return (
    <article className="bg-[#F3F1F8]">
      {/* Héro : fond flouté aux couleurs de l'affiche, affiche entière à gauche, titre à droite */}
      <div className="pb-14 lg:pb-20">
        <MergedHero article={article} />
      </div>

      <div className="mx-auto grid max-w-[1160px] gap-12 px-6 pb-24 lg:grid-cols-12 lg:gap-16 lg:px-12">
        {/* Sommaire fixe */}
        <nav aria-label="Sommaire" className="lg:col-span-3">
          <div className="lg:sticky lg:top-28">
            <p className="font-bricolage text-[13px] uppercase tracking-[0.14em] text-[#D98268]">Dans cet article</p>
            <p className="mt-2 text-[14px] text-[#5A5D7E]">{metaLine(article)}</p>
            <ol className="mt-6 flex flex-col gap-4">
              {sections.map((s, i) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="group flex gap-3 text-[1rem] leading-snug text-[#15173D] hover:text-[#D98268] transition-colors">
                    <span className="font-bricolage text-[#D98268]">{String(i + 1).padStart(2, '0')}</span>
                    <span>{s.title}</span>
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </nav>

        {/* Texte */}
        <div className="lg:col-span-9">
          <div className="article-body max-w-[720px] text-[1.3rem] leading-[1.8] text-[#15173D]">
            <Md>{introRaw.trim()}</Md>
          </div>

          <div className="mt-20 flex max-w-[720px] flex-col gap-16">
            {sections.map((s, i) => (
              <section key={s.id} id={s.id} className="scroll-mt-28">
                <span aria-hidden="true" className="font-bricolage text-[14px] uppercase tracking-[0.14em] text-[#D98268]">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h2 className="mt-2 font-bricolage text-[clamp(1.7rem,3vw,2.3rem)] leading-[1.2] text-[#15173D]">{s.title}</h2>
                <div className="article-body mt-5 text-[1.22rem] leading-[1.7] text-[#15173D]">
                  <Md>{s.lead}</Md>
                </div>
                {s.rest && (
                  <div className="article-body mt-5 text-[1.1rem] leading-[1.85] text-[#15173D]/85">
                    <Md>{s.rest}</Md>
                  </div>
                )}
              </section>
            ))}
          </div>

          {(bold || motto) && (
            <div className="mt-24 max-w-[720px]">
              {motto && <p className="font-bricolage text-[clamp(1.5rem,3vw,2.2rem)] italic leading-[1.35] text-[#15173D]">{motto}</p>}
              {bold && <p className="mt-4 font-semibold text-[#15173D]">{bold}</p>}
            </div>
          )}

          <div className="mt-12 flex flex-col gap-3 sm:flex-row">
            <a href={url} target="_blank" rel="noopener noreferrer" className={BTN.primary}>
              En parler sur WhatsApp
            </a>
            <Link to="/tous-les-articles" className={BTN.outline}>
              Tous les articles
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
};

export const ArticlePage: React.FC = () => {
  const { slug } = useParams();
  const article = ARTICLES.find((a) => a.slug === slug);

  if (!article) {
    return (
      <section className="py-24 bg-[#F3F1F8]">
        <div className="max-w-[860px] mx-auto px-6 lg:px-12">
          <h1 className="font-bricolage text-[2rem] text-[#15173D]">Cet article n'existe pas</h1>
          <Link to="/tous-les-articles" className={`${BTN.outline} mt-6`}>
            Tous les articles
          </Link>
        </div>
      </section>
    );
  }

  const discussUrl = createWhatsAppUrl(
    `Bonjour Psy Gbevimi, je viens de lire l'article « ${article.title} » et j'aimerais en parler. Je viens de la page « Articles ».`,
  );

  // Une mise en page par catégorie, pour que les articles ne se ressemblent pas tous
  let layout: React.ReactNode;
  if (article.id.startsWith('0c708900')) {
    // « Cancer et bonheur durable » : mise en page à part
    layout = <LayoutPillars article={article} url={discussUrl} />;
  } else if (article.id.startsWith('3c41eb3e')) {
    // « L'honnêteté » : sommaire fixe et sections
    layout = <LayoutGuide article={article} url={discussUrl} />;
  } else if (article.id.startsWith('eb80238d')) {
    // « LA FOURMI » : cinq leçons en deux colonnes
    layout = <LayoutLessons article={article} url={discussUrl} />;
  } else if (article.id.startsWith('2ca73876')) {
    // « OCTOBRE » : acrostiche, une lettre en grand par section
    layout = <LayoutAcrostic article={article} url={discussUrl} />;
  } else
  switch (article.category) {
    case 'Développement Personnel':
      layout = <LayoutSidebar article={article} url={discussUrl} />;
      break;
    case 'Santé Mentale':
      layout = <LayoutFloat article={article} url={discussUrl} />;
      break;
    default:
      layout = <LayoutCover article={article} url={discussUrl} />;
  }

  return (
    <>
      <ReadingProgress />
      {layout}
      {/* Réseaux sociaux flottants, alignés à droite, sur les pages d'article uniquement */}
      <ShareBar article={article} />
    </>
  );
};

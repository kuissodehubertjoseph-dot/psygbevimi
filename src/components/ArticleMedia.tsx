import React, { useEffect, useRef, useState } from 'react';
import { Play } from 'lucide-react';
import { ARTICLES } from '../content';

/** Vidéo YouTube ouverte par le bouton « Lire la vidéo » */
const VIDEO_URL = 'https://youtu.be/4gbNNM2mX2I';

/** Vidéo propre à certains articles (début de l'identifiant de l'article → lien YouTube) */
const ARTICLE_VIDEOS: Record<string, string> = {
  // « Et si votre plus grand obstacle au bonheur… c'était vous-même ? »
  '3b0179e6': 'https://youtu.be/ppCcJpPhKoM',
  // « Novembre : huit lettres pour faire le bilan de sa vie… »
  '9dc37b09': 'https://youtu.be/4gbNNM2mX2I',
};

/** Texte Markdown → texte brut à lire à voix haute, découpé en morceaux courts (les voix du navigateur coupent les textes longs) */
const toSpeechChunks = (title: string, markdown: string): string[] => {
  const plain = `${title}.\n\n${markdown}`
    .replace(/\r\n/g, '\n')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/https?:\/\/\S+/g, '')
    .replace(/^\s*(?:-{3,}|>)\s?/gm, '')
    .replace(/^#{1,6}\s*/gm, '')
    .replace(/[*_`#]/g, '')
    .replace(/^\s*[-•]\s+/gm, '');

  const chunks: string[] = [];
  for (const para of plain.split(/\n{2,}|\n/).map((p) => p.trim()).filter(Boolean)) {
    let current = '';
    for (const sentence of para.match(/[^.!?…]+[.!?…]*\s*/g) ?? [para]) {
      if ((current + sentence).length > 220 && current) {
        chunks.push(current.trim());
        current = '';
      }
      current += sentence;
    }
    if (current.trim()) chunks.push(current.trim());
  }
  return chunks;
};

/** Boutons « Lire la vidéo » et « Lire l'audio » (lecture vocale de l'article) affichés en tête de chaque article */
export const ArticleMedia: React.FC<{ title: string; content: string; className?: string; center?: boolean }> = ({
  title,
  content,
  className = '',
  center = false,
}) => {
  const [state, setState] = useState<'idle' | 'playing' | 'paused'>('idle');
  const run = useRef(0);
  const id = ARTICLES.find((a) => a.title === title)?.id ?? '';
  const videoUrl = Object.entries(ARTICLE_VIDEOS).find(([k]) => id.startsWith(k))?.[1] ?? VIDEO_URL;
  const supported = typeof window !== 'undefined' && 'speechSynthesis' in window;

  const stop = () => {
    run.current += 1;
    if (supported) window.speechSynthesis.cancel();
    setState('idle');
  };

  // On coupe la voix quand on change d'article ou qu'on quitte la page
  useEffect(() => {
    stop();
    return () => {
      run.current += 1;
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) window.speechSynthesis.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title]);

  const toggleAudio = () => {
    const synth = window.speechSynthesis;
    if (state === 'playing') {
      synth.pause();
      setState('paused');
      return;
    }
    if (state === 'paused') {
      synth.resume();
      setState('playing');
      return;
    }
    synth.cancel();
    const id = ++run.current;
    const chunks = toSpeechChunks(title, content);
    const speak = (i: number) => {
      if (id !== run.current) return;
      if (i >= chunks.length) {
        setState('idle');
        return;
      }
      const u = new SpeechSynthesisUtterance(chunks[i]);
      u.lang = 'fr-FR';
      u.onend = () => speak(i + 1);
      u.onerror = () => {
        if (id === run.current) setState('idle');
      };
      synth.speak(u);
    };
    speak(0);
    setState('playing');
  };

  return (
    <div className={className}>
      <div className={`flex flex-wrap items-center gap-4 ${center ? 'justify-center' : ''}`}>
        <a
          href={videoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-4 pr-6 rounded-full bg-white hover:bg-[#E9D5E4] border border-[#15173D]/10 shadow-sm transition-colors focus-visible:outline-2 focus-visible:outline-[#D98268]"
        >
          <span className="grid place-items-center h-14 w-14 rounded-full bg-[#D98268] text-[#15173D]">
            <Play size={22} fill="currentColor" className="ml-0.5" aria-hidden="true" />
          </span>
          <span className="font-bricolage font-semibold text-[16px] text-[#15173D]">Lire la vidéo</span>
        </a>

        {supported && (
          <div className="inline-flex items-center gap-3">
            <button
              type="button"
              onClick={toggleAudio}
              className="inline-flex items-center gap-3 h-14 px-7 rounded-full bg-[#15173D] hover:bg-[#2A2D63] text-[#F3F1F8] font-bricolage font-semibold text-[16px] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#D98268]"
            >
              {state === 'playing' ? "Pause l'audio" : state === 'paused' ? "Reprendre l'audio" : "Lire l'audio"}
            </button>
            {state !== 'idle' && (
              <button
                type="button"
                onClick={stop}
                className="text-[14px] text-[#5A5D7E] hover:text-[#15173D] underline underline-offset-4 cursor-pointer"
              >
                Arrêter
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

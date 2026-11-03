import React from 'react';
import { Link } from 'react-router-dom';
import { FOOTER_DATA as D, createWhatsAppUrl } from '../data';

const linkCls =
  'font-atkinson text-[16px] text-[#C9C8E3] hover:text-[#F3F1F8] transition-colors focus-visible:outline-2 focus-visible:outline-[#D98268] focus-visible:outline-offset-2 rounded-[4px]';
const titleCls = 'font-bricolage font-semibold text-[13px] uppercase tracking-[0.12em] text-[#D98268] mb-4';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#15173D] text-[#F3F1F8] border-t border-[#F3F1F8]/15 pt-14 pb-[calc(6rem+env(safe-area-inset-bottom,0px))] lg:pb-14">
      <div className="max-w-[1160px] mx-auto px-6 lg:px-12">
        {/* Ligne de marque : logo réduit, présentation, lien YouTube */}
        <div className="flex flex-col gap-6 pb-10 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-6">
            <Link to="/" className="shrink-0" aria-label={`${D.name} - Accueil`}>
              <span className="flex items-center justify-center rounded-[12px] bg-white px-3 py-2">
                <img src="/images/logo.webp" alt={D.name} className="h-[56px] w-auto object-contain" />
              </span>
            </Link>
            <p className="max-w-[46ch] font-atkinson text-[15px] leading-relaxed text-[#C9C8E3]">{D.tagline}</p>
          </div>
          <a href={D.youtubeUrl} target="_blank" rel="noopener noreferrer" className={`${linkCls} shrink-0 underline underline-offset-4`}>
            {D.youtubeLabel}
          </a>
        </div>

        {/* Liens : Accompagner, Découvrir sur deux colonnes, Contact */}
        <div className="grid grid-cols-1 gap-10 border-t border-[#F3F1F8]/10 pt-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-12">
          {D.groups.map((g, i) => (
            <nav key={g.title} aria-label={g.title} className={i === 0 ? 'lg:col-span-3' : 'lg:col-span-5'}>
              <p className={titleCls}>{g.title}</p>
              <ul className={i === 0 ? 'space-y-3' : 'grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2'}>
                {g.links.map((l) => (
                  <li key={l.href}>
                    <Link to={l.href} className={linkCls}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="lg:col-span-4">
            <p className={titleCls}>{D.contactTitle}</p>
            <ul className="space-y-3">
              <li>
                <a href={createWhatsAppUrl(D.footerWhatsAppMessage)} target="_blank" rel="noopener noreferrer" className={linkCls}>
                  {D.whatsappLabel}
                </a>
              </li>
              <li>
                <a href={`mailto:${D.email}`} className={`${linkCls} break-all`}>
                  {D.email}
                </a>
              </li>
              <li>
                <Link to="/contact" className={linkCls}>
                  {D.writeUs}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[#F3F1F8]/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <p className="font-atkinson text-[14px] text-[#C9C8E3]/80">{D.copyright}</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {D.legal.map((l) => (
              <Link key={l.href} to={l.href} className="font-atkinson text-[14px] text-[#C9C8E3] hover:text-[#F3F1F8]">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

import React from 'react';
import { Link } from 'react-router-dom';
import { FOOTER_DATA as D, createWhatsAppUrl } from '../data';

const linkCls =
  'font-atkinson text-[16px] text-[#C9C8E3] hover:text-[#F3F1F8] transition-colors focus-visible:outline-2 focus-visible:outline-[#D98268] focus-visible:outline-offset-2 rounded-[4px]';
const titleCls = 'font-bricolage font-semibold text-[13px] uppercase tracking-[0.12em] text-[#D98268] mb-4';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#15173D] text-[#F3F1F8] border-t border-[#F3F1F8]/15 pt-16 pb-[calc(6rem+env(safe-area-inset-bottom,0px))] lg:pb-16">
      <div className="max-w-[1160px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Marque */}
          <div className="lg:col-span-4 flex flex-col items-start gap-5">
            <Link to="/" className="flex items-center gap-3" aria-label={`${D.name} - Accueil`}>
              <span className="rounded-[16px] bg-white px-4 py-3 flex items-center justify-center">
                <img src="/images/logo.webp" alt={D.name} className="h-[120px] w-auto object-contain" />
              </span>
            </Link>
            <p className="font-atkinson text-[15px] text-[#C9C8E3] leading-relaxed max-w-[36ch]">{D.tagline}</p>
            <a href={D.youtubeUrl} target="_blank" rel="noopener noreferrer" className={`${linkCls} underline underline-offset-4`}>
              {D.youtubeLabel}
            </a>
          </div>

          {/* Liens : trois colonnes de même largeur */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-8">
            {D.groups.map((g) => (
              <nav key={g.title} aria-label={g.title}>
                <p className={titleCls}>{g.title}</p>
                <ul className="space-y-3">
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

            <div>
              <p className={titleCls}>{D.contactTitle}</p>
              <ul className="space-y-3">
                <li>
                  <a
                    href={createWhatsAppUrl(D.footerWhatsAppMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkCls}
                  >
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

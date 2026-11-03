import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { NAV_LINKS, createWhatsAppUrl, DEFAULT_BOOKING_MESSAGE } from '../data';

export const Header: React.FC = () => {
  const bookingUrl = createWhatsAppUrl(DEFAULT_BOOKING_MESSAGE);

  return (
    <>
      {/* Lien d'évitement accessible */}
      <a
        href="#contenu"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#15173D] focus:text-[#F3F1F8] focus:rounded-[8px] focus:font-bricolage focus:font-semibold focus:outline-2 focus:outline-[#D98268]"
      >
        Aller au contenu
      </a>

      <header className="sticky top-0 z-40 h-[72px] glass !rounded-none !border-x-0 !border-t-0 border-b-2 !border-b-[#DC2626]">
        <div className="max-w-[1160px] mx-auto h-full px-4 sm:px-6 lg:px-12 flex items-center justify-between gap-3">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center group rounded-[8px] focus-visible:outline-2 focus-visible:outline-[#15173D] focus-visible:outline-offset-2"
            aria-label="Psy Gbevimi - Accueil"
          >
            <img
              src="/images/logo.webp"
              alt="Psy Gbevimi"
              className="h-[58px] w-auto object-contain shrink-0 transition-transform group-hover:scale-105"
            />
          </Link>

          {/* Navigation bureau (sur mobile : barre fixée en bas, voir BottomNav) */}
          <nav aria-label="Navigation principale" className="hidden lg:flex items-center gap-7">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.href}
                to={link.href}
                className={({ isActive }) =>
                  `font-atkinson text-[14px] text-[#15173D] hover:text-[#5A5D7E] transition-colors py-1 border-b-2 focus-visible:outline-2 focus-visible:outline-[#15173D] focus-visible:outline-offset-2 ${
                    isActive ? 'border-[#D98268]' : 'border-transparent'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Bouton d'action : version complète sur bureau, version courte sur mobile */}
          <a
            href={bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Réserver mon appel"
            className="lg:ml-6 lg:-mr-8 h-[44px] lg:h-[44px] px-4 lg:px-[24px] font-bricolage font-semibold text-[13px] lg:text-[14px] bg-[#D98268] hover:bg-[#C4704F] text-[#15173D]  rounded-[8px] inline-flex items-center justify-center transition-colors focus-visible:outline-2 focus-visible:outline-[#15173D] focus-visible:outline-offset-2"
          >
            <span className="lg:hidden">Réserver</span>
            <span className="hidden lg:inline">Réserver mon appel</span>
          </a>
        </div>
      </header>
    </>
  );
};

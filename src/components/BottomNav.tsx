import React from 'react';
import { NavLink } from 'react-router-dom';
import { BookOpen, ClipboardCheck, HeartHandshake, Newspaper, Sprout } from 'lucide-react';
import { NAV_LINKS } from '../data';

const ITEMS = [
  { href: '/accompagnements', short: 'Accompagner', Icon: HeartHandshake },
  { href: '/tests', short: 'Tests', Icon: ClipboardCheck },
  { href: '/livre', short: 'Livre', Icon: BookOpen },
  { href: '/tous-les-articles', short: 'Articles', Icon: Newspaper },
  { href: '/initiative', short: 'Initiative', Icon: Sprout },
];

/** Navigation principale fixée en bas de l'écran sur mobile et tablette (< 1024px) */
export const BottomNav: React.FC = () => {
  return (
    <nav
      aria-label="Navigation principale"
      className="lg:hidden fixed bottom-[56px] left-0 right-0 z-50 glass !border-x-0"
    >
      <ul className="grid grid-cols-5">
        {ITEMS.map(({ href, short, Icon }) => {
          const full = NAV_LINKS.find((l) => l.href === href)?.label ?? short;
          return (
            <li key={href}>
              <NavLink
                to={href}
                aria-label={full}
                className={({ isActive }) =>
                  `flex flex-col items-center justify-center gap-1 h-[62px] font-atkinson text-[11px] font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-[#15173D] focus-visible:-outline-offset-2 ${
                    isActive ? 'text-[#15173D]' : 'text-[#5A5D7E] hover:text-[#15173D]'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span
                      className={`flex h-[26px] w-[48px] items-center justify-center rounded-full transition-colors ${
                        isActive ? 'bg-[#8FAF9D]' : 'bg-transparent'
                      }`}
                    >
                      <Icon className="h-[20px] w-[20px]" strokeWidth={2} aria-hidden="true" />
                    </span>
                    <span>{short}</span>
                  </>
                )}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

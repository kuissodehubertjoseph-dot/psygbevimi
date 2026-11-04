import React from 'react';
import { REASSURANCE_DATA } from '../data';

export const Reassurance: React.FC = () => {
  return (
    <section
      aria-label="Chiffres clés et réassurance"
      className="bg-[#F3F1F8] border-t border-b border-[#15173D]/10 py-10 lg:py-12"
    >
      <div className="max-w-[1160px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-[#15173D]/10">
          {REASSURANCE_DATA.map((item, index) => (
            <div
              key={item.value}
              className={`flex flex-col justify-center ${
                index === 0
                  ? 'pb-6 lg:pb-0 lg:pr-8'
                  : index === 1
                  ? 'py-6 lg:py-0 lg:px-8'
                  : 'pt-6 lg:pt-0 lg:pl-8'
              }`}
            >
              <span className="font-bricolage font-bold text-[30px] uppercase text-[#15173D] leading-tight tracking-tight">
                {item.value}
              </span>
              <span className="font-atkinson text-[16px] text-[#5A5D7E] mt-2">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

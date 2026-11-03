import React from 'react';

interface BirdProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

export const Bird: React.FC<BirdProps> = ({ className = 'w-6 h-auto', ...props }) => {
  return (
    <svg
      viewBox="0 0 40 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <path d="M2 14C8 6 14 8 20 14C26 8 32 6 38 14C32 12 26 14 20 20C14 14 8 12 2 14Z" />
    </svg>
  );
};

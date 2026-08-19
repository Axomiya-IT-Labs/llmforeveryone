import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  selected?: boolean;
  onClick?: () => void;
}

export function Card({ 
  children, 
  className = '', 
  hover = false, 
  selected = false,
  onClick 
}: CardProps) {
  return (
    <div
      onClick={onClick}
      className={`
        bg-white/[0.04] backdrop-blur-xl border rounded-2xl p-6 transition-all duration-300
        ${selected ? 'border-cyan-400 bg-cyan-500/[0.08] shadow-lg shadow-cyan-500/20' : 'border-white/10 hover:border-white/20'}
        ${hover ? 'hover:border-cyan-400/50 hover:bg-white/[0.07] hover:shadow-xl hover:shadow-cyan-500/10 cursor-pointer active:scale-[0.99]' : ''}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
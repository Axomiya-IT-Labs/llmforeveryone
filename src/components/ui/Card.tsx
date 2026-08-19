import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  selected?: boolean;
  onClick?: () => void;
  variant?: 'default' | 'elevated' | 'glass' | 'bordered';
}

export function Card({ 
  children, 
  className = '', 
  hover = false, 
  selected = false,
  onClick,
  variant = 'default'
}: CardProps) {
  const variantStyles = {
    default: 'bg-[#111625]/90 border border-white/[0.08]',
    elevated: 'bg-[#151C30] border border-white/[0.1] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]',
    glass: 'bg-white/[0.03] backdrop-blur-xl border border-white/[0.08]',
    bordered: 'bg-transparent border border-white/[0.12]',
  };

  return (
    <div
      onClick={onClick}
      className={`
        rounded-2xl transition-all duration-200
        ${variantStyles[variant]}
        ${selected ? '!border-[#635BFF] bg-[#635BFF]/[0.08] shadow-[0_0_0_1px_#635BFF,0_8px_20px_rgba(99,91,255,0.2)]' : ''}
        ${hover ? 'hover:border-white/25 hover:bg-[#161D32] hover:-translate-y-0.5 hover:shadow-[0_12px_30px_-10px_rgba(0,0,0,0.5)] cursor-pointer' : ''}
        ${onClick ? 'cursor-pointer active:scale-[0.99]' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
}

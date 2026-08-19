import type { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  className?: string;
  disabled?: boolean;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  size?: 'sm' | 'md' | 'lg';
  type?: 'button' | 'submit' | 'reset';
  title?: string;
}

export function Button({
  children,
  onClick,
  variant = 'primary',
  className = '',
  disabled = false,
  icon,
  iconPosition = 'left',
  size = 'md',
  type = 'button',
  title,
}: ButtonProps) {
  const baseStyles = 'rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 select-none cursor-pointer';
  
  const sizeStyles = {
    sm: 'px-3.5 py-1.5 text-xs',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-7 py-3.5 text-base'
  };
  
  const variants = {
    primary: 'bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-500 text-white hover:opacity-95 hover:shadow-lg hover:shadow-cyan-500/25 active:scale-[0.98]',
    secondary: 'bg-white/10 text-white hover:bg-white/15 border border-white/10 active:scale-[0.98]',
    outline: 'bg-transparent text-cyan-300 border border-cyan-400/40 hover:bg-cyan-400/10 active:scale-[0.98]',
    ghost: 'text-gray-300 hover:text-white hover:bg-white/5 active:scale-[0.98]'
  };

  return (
    <button
      type={type}
      title={title}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${sizeStyles[size]} ${variants[variant]} ${disabled ? 'opacity-50 !cursor-not-allowed pointer-events-none' : ''} ${className}`}
    >
      {icon && iconPosition === 'left' && icon}
      <span>{children}</span>
      {icon && iconPosition === 'right' && icon}
    </button>
  );
}
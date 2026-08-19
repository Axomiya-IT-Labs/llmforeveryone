import type { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'stripe';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  type?: 'button' | 'submit' | 'reset';
  title?: string;
}

export function Button({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  icon,
  iconPosition = 'left',
  type = 'button',
  title,
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 select-none cursor-pointer rounded-xl';
  
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-4 py-2 text-sm gap-2',
    lg: 'px-6 py-3 text-base gap-2.5 font-semibold',
  };
  
  const variantStyles = {
    stripe: 'bg-[#635BFF] hover:bg-[#5851EA] text-white shadow-[0_4px_14px_0_rgba(99,91,255,0.39)] hover:shadow-[0_6px_20px_rgba(99,91,255,0.5)] active:scale-[0.98]',
    primary: 'bg-white text-[#0A2540] hover:bg-slate-100 shadow-[0_4px_14px_0_rgba(255,255,255,0.15)] active:scale-[0.98] font-semibold',
    secondary: 'bg-white/[0.08] hover:bg-white/[0.14] text-white border border-white/10 active:scale-[0.98]',
    outline: 'bg-transparent text-slate-200 border border-white/20 hover:border-white/40 hover:bg-white/[0.04] active:scale-[0.98]',
    ghost: 'text-slate-300 hover:text-white hover:bg-white/[0.06] active:scale-[0.98]',
  };

  return (
    <button
      type={type}
      title={title}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${
        disabled ? 'opacity-40 !cursor-not-allowed pointer-events-none' : ''
      } ${className}`}
    >
      {icon && iconPosition === 'left' && icon}
      <span>{children}</span>
      {icon && iconPosition === 'right' && icon}
    </button>
  );
}

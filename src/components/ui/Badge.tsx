import type { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'violet' | 'cyan' | 'emerald' | 'amber' | 'slate' | 'coral';
  size?: 'sm' | 'md';
  icon?: ReactNode;
  className?: string;
  dot?: boolean;
}

export function Badge({
  children,
  variant = 'violet',
  size = 'md',
  icon,
  className = '',
  dot = false,
}: BadgeProps) {
  const sizeStyles = {
    sm: 'px-2 py-0.5 text-[11px] font-medium gap-1',
    md: 'px-2.5 py-1 text-xs font-medium gap-1.5',
  };

  const variantStyles = {
    violet: 'bg-[#635BFF]/10 border-[#635BFF]/30 text-[#8F89FF]',
    cyan: 'bg-[#00D4FF]/10 border-[#00D4FF]/30 text-[#38BDF8]',
    emerald: 'bg-[#10B981]/10 border-[#10B981]/30 text-[#34D399]',
    amber: 'bg-[#F59E0B]/10 border-[#F59E0B]/30 text-[#FBBF24]',
    coral: 'bg-[#FF5A5F]/10 border-[#FF5A5F]/30 text-[#FF7A80]',
    slate: 'bg-white/5 border-white/10 text-slate-300',
  };

  const dotColors = {
    violet: 'bg-[#635BFF]',
    cyan: 'bg-[#00D4FF]',
    emerald: 'bg-[#10B981]',
    amber: 'bg-[#F59E0B]',
    coral: 'bg-[#FF5A5F]',
    slate: 'bg-slate-400',
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
    >
      {dot && <span className={`w-1.5 h-1.5 rounded-full ${dotColors[variant]}`} />}
      {icon && icon}
      <span>{children}</span>
    </span>
  );
}

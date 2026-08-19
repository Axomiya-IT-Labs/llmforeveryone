import type { InputHTMLAttributes, ReactNode } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: ReactNode;
  helperText?: string;
}

export function Input({
  label,
  icon,
  helperText,
  className = '',
  ...props
}: InputProps) {
  return (
    <div className="space-y-1.5 w-full">
      {label && (
        <label className="block text-xs font-semibold text-slate-300">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {icon && (
          <div className="absolute left-3 text-slate-400 pointer-events-none">
            {icon}
          </div>
        )}
        <input
          className={`
            w-full bg-[#0A0D18] border border-white/[0.12] rounded-xl px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500
            focus:outline-none focus:border-[#635BFF] focus:ring-2 focus:ring-[#635BFF]/20 transition-all duration-150
            ${icon ? 'pl-9' : ''}
            ${className}
          `}
          {...props}
        />
      </div>
      {helperText && (
        <p className="text-[11px] text-slate-400">{helperText}</p>
      )}
    </div>
  );
}

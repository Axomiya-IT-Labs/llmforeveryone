interface SocialLinksProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const SOCIAL_ITEMS = [
  { name: 'GitHub', icon: '/social/icons/github.svg', href: '#' },
  { name: 'X (Twitter)', icon: '/social/icons/x.svg', href: '#' },
  { name: 'LinkedIn', icon: '/social/icons/linkedin.svg', href: '#' },
  { name: 'YouTube', icon: '/social/icons/youtube.svg', href: '#' },
  { name: 'Telegram', icon: '/social/icons/telegram.svg', href: '#' },
  { name: 'Facebook', icon: '/social/icons/facebook.svg', href: '#' },
  { name: 'Instagram', icon: '/social/icons/instagram.svg', href: '#' },
];

export function SocialLinks({ className = '', size = 'md' }: SocialLinksProps) {
  const sizeClasses = {
    sm: 'w-7 h-7 p-1.5',
    md: 'w-8 h-8 p-1.5',
    lg: 'w-10 h-10 p-2',
  };

  return (
    <div className={`flex items-center flex-wrap gap-1.5 ${className}`}>
      {SOCIAL_ITEMS.map((item) => (
        <a
          key={item.name}
          href={item.href}
          aria-label={item.name}
          title={item.name}
          className={`${sizeClasses[size]} rounded-lg bg-white/[0.05] border border-white/[0.08] hover:border-[#635BFF]/60 hover:bg-white/[0.1] hover:scale-105 active:scale-95 transition-all duration-150 flex items-center justify-center group`}
        >
          <img
            src={item.icon}
            alt={item.name}
            className="w-full h-full object-contain filter group-hover:drop-shadow-[0_0_6px_rgba(99,91,255,0.7)] transition-all"
          />
        </a>
      ))}
    </div>
  );
}

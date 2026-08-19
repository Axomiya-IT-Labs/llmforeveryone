export interface LLMLauncher {
  id: 'chatgpt' | 'claude' | 'gemini' | 'grok';
  name: string;
  urlFn: (prompt: string) => string;
  color: string;
  badgeBg: string;
  badgeText: string;
  domain: string;
}

export const LLM_LAUNCHERS: LLMLauncher[] = [
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    urlFn: (q) => `https://chatgpt.com/?q=${encodeURIComponent(q)}`,
    color: '#10A37F',
    badgeBg: 'bg-[#10A37F]/10 hover:bg-[#10A37F]/20 border-[#10A37F]/30',
    badgeText: 'text-[#10A37F]',
    domain: 'chatgpt.com',
  },
  {
    id: 'claude',
    name: 'Claude',
    urlFn: (q) => `https://claude.ai/new?q=${encodeURIComponent(q)}`,
    color: '#D97706',
    badgeBg: 'bg-[#D97706]/10 hover:bg-[#D97706]/20 border-[#D97706]/30',
    badgeText: 'text-[#F59E0B]',
    domain: 'claude.ai',
  },
  {
    id: 'gemini',
    name: 'Gemini',
    urlFn: (_q) => `https://gemini.google.com/app`,
    color: '#00D4FF',
    badgeBg: 'bg-[#00D4FF]/10 hover:bg-[#00D4FF]/20 border-[#00D4FF]/30',
    badgeText: 'text-[#38BDF8]',
    domain: 'gemini.google.com',
  },
  {
    id: 'grok',
    name: 'Grok',
    urlFn: (q) => `https://grok.com/?q=${encodeURIComponent(q)}`,
    color: '#EC4899',
    badgeBg: 'bg-[#EC4899]/10 hover:bg-[#EC4899]/20 border-[#EC4899]/30',
    badgeText: 'text-[#F472B6]',
    domain: 'grok.com',
  },
];

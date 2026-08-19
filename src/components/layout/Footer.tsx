import { Heart, ExternalLink, AlertTriangle, ShieldCheck, Mail } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PROFESSIONS } from '../../data/professions';
import type { NavView } from '../../types';

// Real social links for Axomiya IT Labs
const SOCIAL = [
  {
    name: 'GitHub',
    icon: '/social/icons/github.svg',
    href: 'https://github.com/Axomiya-IT-Labs',
  },
  {
    name: 'X (Twitter)',
    icon: '/social/icons/x.svg',
    href: 'https://x.com/AxomiyaITLabs',
  },
  {
    name: 'YouTube',
    icon: '/social/icons/youtube.svg',
    href: 'https://www.youtube.com/@AxomiyaITLabs',
  },
  {
    name: 'Telegram',
    icon: '/social/icons/telegram.svg',
    href: 'https://t.me/AxomiyaITLabs',
  },
  {
    name: 'Facebook Page',
    icon: '/social/icons/facebook.svg',
    href: 'https://facebook.com/AxomiyaITLabs',
  },
  {
    name: 'Instagram',
    icon: '/social/icons/instagram.svg',
    href: 'https://www.instagram.com/axomiyaitlabs',
  },
];

export function Footer() {
  const { setView, openIndustryInExplorer } = useApp();
  const nav = (v: NavView) => { setView(v); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  return (
    <footer className="border-t border-white/[0.08] bg-[#06080F] text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">

        {/* 4-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">

          {/* Brand column */}
          <div className="lg:col-span-4 space-y-5">
            <button
              onClick={() => nav('home')}
              className="flex items-center gap-2.5 group text-left focus:outline-none"
            >
              <div className="w-8 h-8 rounded-xl bg-white/[0.06] border border-white/[0.1] p-1.5 flex items-center justify-center group-hover:border-[#635BFF]/60 transition-all">
                <img src="/brand/logo-mark.svg" alt="LLM For Everyone" className="w-full h-full object-contain" />
              </div>
              <span className="font-bold text-[15px] text-white tracking-tight group-hover:text-slate-100">
                LLM <span className="text-[#635BFF]">For Everyone</span>
              </span>
            </button>

            <p className="text-xs text-slate-400 leading-relaxed max-w-xs">
              The open-source AI discovery and context engineering platform — empowering students, professionals, and everyday life with high-leverage workflows.
            </p>

            {/* Social icons — real links */}
            <div className="flex flex-wrap gap-2 pt-1">
              {SOCIAL.map(s => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  title={s.name}
                  className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center p-1.5 hover:bg-white/[0.1] hover:border-[#635BFF]/40 transition-all group"
                >
                  <img src={s.icon} alt={s.name} className="w-full h-full object-contain opacity-60 group-hover:opacity-100 transition-opacity" />
                </a>
              ))}
              {/* Email icon */}
              <a
                href="mailto:axomiyaitlabs@gmail.com"
                aria-label="Email Axomiya IT Labs"
                title="axomiyaitlabs@gmail.com"
                className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center p-1.5 hover:bg-white/[0.1] hover:border-[#635BFF]/40 transition-all group"
              >
                <Mail className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
              </a>
            </div>

            {/* Community links */}
            <div className="space-y-1.5 text-xs">
              <p className="text-[11px] font-mono font-bold text-slate-500 uppercase tracking-widest">Community</p>
              <a
                href="https://www.facebook.com/groups/1556385872564016/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors"
              >
                <ExternalLink className="w-3 h-3" />
                Facebook Group
              </a>
              <a
                href="https://t.me/AxomiyaITLabs"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors"
              >
                <ExternalLink className="w-3 h-3" />
                Telegram Community
              </a>
            </div>
          </div>

          {/* Industry Pathways */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-[11px] font-mono font-bold text-white uppercase tracking-widest">Industry Pathways</h4>
            <ul className="space-y-2">
              {PROFESSIONS.map(p => (
                <li key={p.id}>
                  <button
                    onClick={() => openIndustryInExplorer(p.id)}
                    className="text-slate-400 hover:text-white text-xs transition-colors text-left"
                  >
                    {p.label}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => openIndustryInExplorer('student')}
                  className="text-slate-400 hover:text-white text-xs transition-colors text-left"
                >
                  Students &amp; Academics (K-12 to PhD)
                </button>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-[11px] font-mono font-bold text-white uppercase tracking-widest">Platform</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              {[
                { label: 'Prompt Catalog', view: 'explorer' as NavView },
                { label: 'Discovery Wizard', view: 'wizard' as NavView },
                { label: 'AI Tools Directory', view: 'tools' as NavView },
                { label: 'Path & Adoption Guide', view: 'guide' as NavView },
                { label: 'Articles & Blog', view: 'blog' as NavView },
              ].map(item => (
                <li key={item.view}>
                  <button onClick={() => nav(item.view)} className="hover:text-white transition-colors text-left">
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Project & Privacy Box */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-[11px] font-mono font-bold text-white uppercase tracking-widest">Open Source</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <a
                  href="https://github.com/Axomiya-IT-Labs/llmforeveryone"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  GitHub Repository <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Axomiya-IT-Labs/llmforeveryone/blob/main/CONTRIBUTING.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  Contributing Guidelines <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="mailto:axomiyaitlabs@gmail.com"
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  axomiyaitlabs@gmail.com <Mail className="w-3 h-3" />
                </a>
              </li>
            </ul>

            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.07] space-y-1 text-[11px] text-slate-400">
              <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>100% In-Browser Privacy</span>
              </div>
              <p className="leading-relaxed">Zero logins required. No cookies or server trackers. Your prompts remain strictly on your device.</p>
            </div>
          </div>

        </div>

        {/* ⚠️ AI Hallucination & Critical Thinking Notice */}
        <div className="p-4 sm:p-5 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex flex-col sm:flex-row items-start sm:items-center gap-3.5 text-amber-200/90 text-xs">
          <div className="p-2 rounded-xl bg-amber-500/20 text-amber-300 shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <p className="font-bold text-amber-100 text-[13px]">
              AI Hallucination &amp; Critical Verification Notice
            </p>
            <p className="leading-relaxed text-amber-200/80">
              Artificial Intelligence models (ChatGPT, Claude, Gemini, Grok, etc.) can hallucinate, omit critical context, or produce inaccurate information. Always use your brain, apply domain expertise, and rigorously cross-verify all AI-generated code, medical notes, legal citations, calculations, and factual assertions before real-world reliance.
            </p>
          </div>
        </div>

        {/* Bottom Bar with Axomiya IT Labs Credits */}
        <div className="pt-6 border-t border-white/[0.07] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-3 flex-wrap justify-center sm:justify-start">
            <p>© {new Date().getFullYear()} LLM For Everyone · Open Source MIT License</p>
            <span className="px-2 py-0.5 rounded-full bg-[#635BFF]/20 text-[#8F89FF] text-[10px] font-bold uppercase tracking-widest border border-[#635BFF]/30">
              BETA
            </span>
            <span className="px-2 py-0.5 rounded-full bg-white/[0.04] text-slate-400 text-[10px] font-mono tracking-widest border border-white/[0.06]">
              v1.0.0
            </span>
            <span className="px-2 py-0.5 rounded-full bg-white/[0.04] text-slate-400 text-[10px] font-bold uppercase tracking-widest border border-white/[0.06]">
              AI DISCOVERY PLATFORM
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-2 text-slate-400">
            <span>Created &amp; Maintained by</span>
            <a
              href="https://axomiyaitlabs.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-[#8F89FF] hover:text-white transition-colors underline decoration-[#8F89FF]/50 underline-offset-4 flex items-center gap-1"
            >
              <span>Axomiya IT Labs</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <p className="flex items-center gap-1 text-[11px] text-slate-500">
            Built with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500/30" /> for everyone
          </p>
        </div>

      </div>
    </footer>
  );
}

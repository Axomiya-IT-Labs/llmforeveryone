import { useState, type ReactNode, type HTMLAttributes, type TdHTMLAttributes, type ThHTMLAttributes } from 'react';
import { Copy, Check, Info, AlertTriangle, Lightbulb, ExternalLink } from 'lucide-react';

interface CodeBlockProps extends HTMLAttributes<HTMLPreElement> {
  children?: ReactNode;
}

export function CodeBlock({ children, ...props }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const extractText = (node: ReactNode): string => {
    if (typeof node === 'string') return node;
    if (Array.isArray(node)) return node.map(extractText).join('');
    if (node && typeof node === 'object' && 'props' in node) {
      return extractText((node as { props: { children?: ReactNode } }).props.children);
    }
    return '';
  };

  const handleCopy = () => {
    const text = extractText(children);
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group my-5 rounded-2xl overflow-hidden border border-white/[0.1] bg-[#070A14] shadow-xl">
      <div className="flex items-center justify-between px-4 py-2 bg-[#0C101E] border-b border-white/[0.06] text-[11px] font-mono text-slate-400">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
          <span className="ml-2 opacity-60">code</span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] text-white transition-all active:scale-95 text-[11px]"
          title="Copy code to clipboard"
        >
          {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
          <span>{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>
      <pre {...props} className="p-4 overflow-x-auto text-[13px] font-mono leading-relaxed text-[#38BDF8] select-all">
        {children}
      </pre>
    </div>
  );
}

export function Callout({ 
  type = 'info', 
  title, 
  children 
}: { 
  type?: 'info' | 'warning' | 'tip'; 
  title?: string; 
  children: ReactNode;
}) {
  const styles = {
    info: {
      bg: 'bg-[#635BFF]/10',
      border: 'border-[#635BFF]/30',
      text: 'text-[#8F89FF]',
      icon: Info,
    },
    warning: {
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/30',
      text: 'text-amber-300',
      icon: AlertTriangle,
    },
    tip: {
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/30',
      text: 'text-emerald-300',
      icon: Lightbulb,
    },
  }[type];

  const Icon = styles.icon;

  return (
    <div className={`my-5 p-4 sm:p-5 rounded-2xl ${styles.bg} border ${styles.border} space-y-2 text-xs sm:text-sm leading-relaxed`}>
      <div className={`flex items-center gap-2 font-bold ${styles.text}`}>
        <Icon className="w-4 h-4 shrink-0" />
        <span>{title || (type.charAt(0).toUpperCase() + type.slice(1))}</span>
      </div>
      <div className="text-slate-300 pl-6">{children}</div>
    </div>
  );
}

export function Heading1(props: HTMLAttributes<HTMLHeadingElement>) {
  return <h1 {...props} className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mt-8 mb-4 leading-tight" />;
}

export function Heading2(props: HTMLAttributes<HTMLHeadingElement>) {
  return <h2 {...props} className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-8 mb-3 pb-2 border-b border-white/[0.08]" />;
}

export function Heading3(props: HTMLAttributes<HTMLHeadingElement>) {
  return <h3 {...props} className="text-lg sm:text-xl font-bold text-slate-100 tracking-tight mt-6 mb-2" />;
}

export function Paragraph(props: HTMLAttributes<HTMLParagraphElement>) {
  return <p {...props} className="text-sm sm:text-base text-slate-300 leading-relaxed my-3" />;
}

export function Blockquote(props: HTMLAttributes<HTMLQuoteElement>) {
  return (
    <blockquote
      {...props}
      className="my-5 p-4 sm:p-5 rounded-2xl bg-[#635BFF]/10 border-l-4 border-[#635BFF] text-slate-200 text-sm sm:text-base italic leading-relaxed"
    />
  );
}

// ── Table components — full suite so MDX pipe tables render beautifully ────

export function TableWrapper(props: HTMLAttributes<HTMLTableElement>) {
  return (
    <div className="my-6 w-full overflow-x-auto rounded-2xl border border-white/[0.1] bg-[#090C19] shadow-lg">
      <table {...props} className="w-full text-left text-xs sm:text-sm text-slate-300 border-collapse" />
    </div>
  );
}

export function TableHead(props: HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <thead
      {...props}
      className="bg-[#111625] border-b border-white/[0.1] text-white"
    />
  );
}

export function TableBody(props: HTMLAttributes<HTMLTableSectionElement>) {
  return <tbody {...props} className="divide-y divide-white/[0.05]" />;
}

export function TableRow(props: HTMLAttributes<HTMLTableRowElement>) {
  return (
    <tr
      {...props}
      className="hover:bg-white/[0.03] transition-colors"
    />
  );
}

export function TableHeader(props: ThHTMLAttributes<HTMLTableCellElement>) {
  return (
    <th
      {...props}
      className="px-4 py-3 font-bold uppercase tracking-wider text-[11px] text-[#8F89FF] whitespace-nowrap"
    />
  );
}

export function TableCell(props: TdHTMLAttributes<HTMLTableCellElement>) {
  return (
    <td
      {...props}
      className="px-4 py-3 text-slate-300 leading-relaxed"
    />
  );
}

export function AnchorLink(props: HTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      {...props}
      target="_blank"
      rel="noopener noreferrer"
      className="text-[#8F89FF] hover:text-white underline decoration-[#8F89FF]/50 underline-offset-4 inline-flex items-center gap-0.5 transition-colors font-medium"
    >
      {props.children}
      <ExternalLink className="w-3 h-3 ml-0.5 opacity-60 inline" />
    </a>
  );
}

// ── Complete component map passed to every MDX <Component components={...} /> ──
export const MDX_CUSTOM_COMPONENTS = {
  pre: CodeBlock,
  Callout,
  h1: Heading1,
  h2: Heading2,
  h3: Heading3,
  p: Paragraph,
  blockquote: Blockquote,
  // Table — all 6 elements must be mapped for pipe-style MDX tables to render
  table: TableWrapper,
  thead: TableHead,
  tbody: TableBody,
  tr: TableRow,
  th: TableHeader,
  td: TableCell,
  a: AnchorLink,
};

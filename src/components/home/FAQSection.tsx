import { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, Sparkles } from 'lucide-react';
import { FAQS } from '../../data/faqData';
import { useApp } from '../../context/AppContext';

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { startWizard } = useApp();

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-20 sm:py-28 border-t border-white/[0.06] bg-[#070A14] relative overflow-hidden" id="faq">
      {/* Subtle ambient backdrop */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#635BFF]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="pill-divider">
            <HelpCircle className="w-3.5 h-3.5 text-[#00D4FF]" />
            Frequently Asked Questions
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Everything you need to know about LLM For Everyone
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Common questions about our pathways, supported frontier models, privacy architecture, and prompt customization.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3.5">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all overflow-hidden ${
                  isOpen 
                    ? 'bg-[#111628] border-[#635BFF]/40 shadow-lg shadow-[#635BFF]/10' 
                    : 'bg-[#0D1020]/70 border-white/[0.07] hover:border-white/[0.14]'
                }`}
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-5 sm:p-6 flex items-center justify-between gap-4 text-left transition-colors focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-bold text-white leading-snug">
                    {faq.question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                      isOpen ? 'bg-[#635BFF] text-white' : 'bg-white/[0.05] text-slate-400'
                    }`}
                  >
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/[0.04] animate-in fade-in duration-150">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Box */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#111628] to-[#0D1020] border border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="text-sm sm:text-base font-bold text-white">Still have questions or need a specific prompt?</h4>
            <p className="text-xs text-slate-400 mt-0.5">Use the 60s Discovery Wizard to find your personalized pathway.</p>
          </div>
          <button
            onClick={startWizard}
            className="px-4 py-2 rounded-xl bg-[#635BFF] hover:bg-[#5851EA] text-white text-xs font-semibold flex items-center gap-1.5 transition-all shrink-0 shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Launch Wizard</span>
          </button>
        </div>

      </div>
    </section>
  );
}

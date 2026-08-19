export interface FAQItem {
  question: string;
  answer: string;
}

export const FAQS: FAQItem[] = [
  {
    question: 'What is LLM For Everyone?',
    answer: 'LLM For Everyone is an open-source, client-side interactive platform built to help students (High School to PhD) and professionals (Doctors, Nurses, Software Developers, Teachers, Farmers, Homemakers, Founders, Lawyers, etc.) discover concrete, context-engineered prompt recipes and vetted AI toolstacks tailored specifically to their daily tasks.',
  },
  {
    question: 'How is this different from generic ChatGPT prompt lists?',
    answer: 'Generic prompt lists offer broad, one-line questions that yield generic AI responses. LLM For Everyone provides structured context engineering: domain roles, explicit constraints, step-by-step reasoning triggers, and live bracketed parameter inputs ([variables]) you can customize directly inside your browser before running.',
  },
  {
    question: 'Which AI models and LLMs are supported?',
    answer: 'Every prompt recipe includes direct 1-click launchers for the 4 leading LLMs: OpenAI ChatGPT, Anthropic Claude, Google Gemini, and xAI Grok. Prompts are formatted to work seamlessly across any modern frontier model.',
  },
  {
    question: 'Is my data, prompt history, or personal input stored on your servers?',
    answer: 'No. LLM For Everyone is 100% client-side and privacy-first. There are no backend databases, user logins, tracking cookies, or prompt loggers. All prompt customizations and state live strictly within your local browser session.',
  },
  {
    question: 'Is LLM For Everyone completely free and open-source?',
    answer: 'Yes! The entire project is free and distributed under the permissive MIT Open Source License. You are free to explore, customize, copy, and contribute new prompts and tools via our GitHub repository.',
  },
  {
    question: 'How are student academic tracks structured?',
    answer: 'We divide student tracks into 4 distinct educational tiers: High School (K-12), College Undergraduate (UG), Postgraduate (PG / Master’s), and PhD / Doctoral Researchers. Under each tier, students can select their exact discipline (Engineering & CS, Medicine, Arts & Humanities, Business & Commerce, Natural Sciences, or Law) for tailored prompts.',
  },
  {
    question: 'What non-tech professions are included?',
    answer: 'We provide specialized workflows for Farmers (crop rotation, soil health, agricultural grant writing), Homemakers & Family Managers (zero-waste weekly meal plans, 50/30/20 household budgeting), Nurses (SBAR clinical handoffs, care plans), Doctors (SOAP notes, patient education), Teachers (5E differentiated lesson plans), and Career Pivoters.',
  },
  {
    question: 'How do I edit or customize prompts before copying?',
    answer: 'Every prompt card features an interactive control bar: click "Fill Variables" to insert your own parameters into bracketed placeholders, or click "Edit Text" to switch into a live textarea where you can edit the prompt text freely before copying or launching in an LLM.',
  },
  {
    question: 'How can I contribute new prompts, tools, or articles?',
    answer: 'Anyone can contribute! Check our CONTRIBUTING.md guide on GitHub to add prompt recipes in src/data/studentTracks.ts or src/data/professionalTracks.ts, add AI tools in src/data/aiTools.ts, or write markdown articles in src/content/blog/.',
  },
];

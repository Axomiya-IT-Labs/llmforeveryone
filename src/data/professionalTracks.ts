import type { ContentModule, Profession } from '../types';
import { 
  Stethoscope, 
  HeartPulse, 
  BookOpen, 
  Code, 
  Megaphone, 
  Rocket, 
  Tractor, 
  Home, 
  Scale, 
  TrendingUp, 
  Palette, 
  Compass
} from 'lucide-react';

export interface ExtendedProfession extends Profession {
  categoryGroup: 'stem' | 'healthcare' | 'business_growth' | 'lifestyle_general' | 'creative';
  popularUseCases: string[];
}

export const ALL_PROFESSIONS: ExtendedProfession[] = [
  {
    id: 'doctor',
    label: 'Doctors & Physicians',
    icon: Stethoscope,
    color: '#10B981',
    description: 'Clinical documentation, differential diagnoses exploration, patient education, and research synthesis.',
    categoryGroup: 'healthcare',
    whyAI: 'Save 2-3 hours per clinic day on documentation and synthesize new medical guidelines instantly.',
    popularUseCases: ['SOAP Note Drafting', 'Patient Discharge Summaries', 'Medical Guideline Lookup', 'Drug Interaction Checks'],
    recommendedToolIds: ['claude', 'consensus', 'elicit', 'notebooklm'],
  },
  {
    id: 'nurse',
    label: 'Nurses & Healthcare Staff',
    icon: HeartPulse,
    color: '#00D4FF',
    description: 'Shift handoffs, nursing care plans, patient triage documentation, and patient-family communication.',
    categoryGroup: 'healthcare',
    whyAI: 'Standardize SBAR shift reports, reduce charting burnout, and produce bilingual patient instructions.',
    popularUseCases: ['SBAR Shift Handoff Reports', 'Nursing Care Plans', 'Post-Op Patient Instructions', 'Triage Protocol Checklists'],
    recommendedToolIds: ['chatgpt', 'notebooklm'],
  },
  {
    id: 'teacher',
    label: 'Teachers & Educators',
    icon: BookOpen,
    color: '#A855F7',
    description: 'Differentiated lesson plans, rubric generation, automated quiz creation, and student feedback.',
    categoryGroup: 'lifestyle_general',
    whyAI: 'Create a week of tailored lesson plans and tiered assignments in 30 minutes instead of an entire weekend.',
    popularUseCases: ['Differentiated Lesson Plans', 'Grading Rubric Formulator', 'Interactive Quiz Generator', 'Parent Progress Reports'],
    recommendedToolIds: ['chatgpt', 'notebooklm', 'elevenlabs'],
  },
  {
    id: 'software_developer',
    label: 'Software Developers & Engineers',
    icon: Code,
    color: '#635BFF',
    description: 'Architecture review, test suite generation, legacy refactoring, and complex regex/SQL queries.',
    categoryGroup: 'stem',
    whyAI: 'Eliminate boilerplate coding, trace stubborn bugs, and review pull requests 3x faster.',
    popularUseCases: ['Distributed Architecture Review', 'Unit & Integration Test Suites', 'SQL Query Optimizer', 'Regex & Parser Generation'],
    recommendedToolIds: ['cursor', 'claude', 'github-copilot', 'v0'],
  },
  {
    id: 'marketing_head',
    label: 'Marketing Heads & Growth Leads',
    icon: Megaphone,
    color: '#EC4899',
    description: 'Direct-response copy hooks, SEO cluster strategies, ICP persona generation, and campaign briefs.',
    categoryGroup: 'business_growth',
    whyAI: 'Test 20 creative hook variations in seconds and scale high-converting content across every channel.',
    popularUseCases: ['High-Converting Copy Hooks', 'Full-Funnel Campaign Briefs', 'SEO Pillar & Cluster Strategy', 'Competitor Ad Teardowns'],
    recommendedToolIds: ['chatgpt', 'jasper', 'midjourney', 'claude'],
  },
  {
    id: 'founder',
    label: 'Founders & Entrepreneurs',
    icon: Rocket,
    color: '#F59E0B',
    description: 'Investor pitch deck narratives, financial unit economics modeling, customer discovery, and hiring scorecards.',
    categoryGroup: 'business_growth',
    whyAI: 'Operate as a 10-person executive team: finance, product, marketing, and legal all in one interface.',
    popularUseCases: ['Pitch Deck Narrative Arc', 'Customer Discovery Interview Script', '90-Day GTM Milestone Tracker', 'Job Scorecard & Interview Rubric'],
    recommendedToolIds: ['claude', 'julius', 'chatgpt', 'perplexity'],
  },
  {
    id: 'farmer',
    label: 'Farmers & Agriculturalists',
    icon: Tractor,
    color: '#84CC16',
    description: 'Crop rotation planning, weather resilience strategies, agricultural grant applications, and soil health management.',
    categoryGroup: 'lifestyle_general',
    whyAI: 'Calculate precise fertilizer/seed requirements, navigate government subsidy applications, and model weather risks.',
    popularUseCases: ['Crop Rotation & Yield Planner', 'Agri-Grant & Subsidy Application', 'Pest & Soil Treatment Protocol', 'Equipment Maintenance Schedule'],
    recommendedToolIds: ['chatgpt', 'perplexity'],
  },
  {
    id: 'homemaker',
    label: 'Homemakers & Family Managers',
    icon: Home,
    color: '#F43F5E',
    description: 'Weekly family meal budgeting, pantry optimization, household chore systems, and kids’ home activities.',
    categoryGroup: 'lifestyle_general',
    whyAI: 'Eliminate household mental load, save 30% on groceries with smart meal planning, and organize home life effortlessly.',
    popularUseCases: ['Weekly Pantry-to-Plate Meal Plan', 'Household Budget & Expense Tracker', 'Kids Home STEM Activity Plan', 'Family Travel & Packing Planner'],
    recommendedToolIds: ['chatgpt', 'gemini'],
  },
  {
    id: 'lawyer',
    label: 'Lawyers & Legal Counsel',
    icon: Scale,
    color: '#EF4444',
    description: 'Contract risk analysis, deposition prep questions, legal research memorandums, and compliance checks.',
    categoryGroup: 'stem',
    whyAI: 'Review 80-page agreements for hidden liabilities in 4 minutes and draft airtight legal memos.',
    popularUseCases: ['Contract Redlining & Risk Matrix', 'Deposition Cross-Examination Qs', 'Legal Research Synthesis Memo', 'Privacy Policy & Terms Audit'],
    recommendedToolIds: ['claude', 'harvey', 'casetext', 'perplexity'],
  },
  {
    id: 'finance',
    label: 'Financial Analysts & Accountants',
    icon: TrendingUp,
    color: '#06B6D4',
    description: 'Three-statement financial modeling, variance commentary, DCF assumptions, and tax compliance memos.',
    categoryGroup: 'business_growth',
    whyAI: 'Automate formula checks, generate instant variance narratives, and stress-test revenue models in seconds.',
    popularUseCases: ['Financial Variance Analysis Narrative', 'DCF Scenario & Sensitivity Matrix', 'Python/Excel Automation Formula', 'Audit Risk Assessment'],
    recommendedToolIds: ['julius', 'chatgpt', 'claude'],
  },
  {
    id: 'designer',
    label: 'Designers & Creative Directors',
    icon: Palette,
    color: '#D946EF',
    description: 'UX copy micro-interactions, moodboard concept prompts, design system tokens, and client presentations.',
    categoryGroup: 'creative',
    whyAI: 'Generate creative concepts instantly, align stakeholders with crisp rationale, and prototype UI copy.',
    popularUseCases: ['Design Rationale & Client Pitch', 'UX Error & Onboarding Copy Matrix', 'Midjourney Style Prompt Formulas', 'Design System Token Spec'],
    recommendedToolIds: ['midjourney', 'figma-ai', 'v0', 'chatgpt'],
  },
  {
    id: 'career_pivot',
    label: 'Career Pivoters & Explorers',
    icon: Compass,
    color: '#3B82F6',
    description: 'Transferable skill mapping, resume ATS optimization, mock interview prep, and 90-day learning roadmap.',
    categoryGroup: 'lifestyle_general',
    whyAI: 'Bridge the gap from your past career to your dream field with hyper-tailored resume bullets and practice interviews.',
    popularUseCases: ['Transferable Skill Translator', 'ATS-Optimized Resume Rewrite', 'Role-Playing Mock Job Interview', '30-60-90 Day Career Transition Plan'],
    recommendedToolIds: ['claude', 'chatgpt', 'notebooklm'],
  },
];

export const PROFESSIONAL_MODULES: ContentModule[] = [
  // ── Farmers ──
  {
    id: 'farmer_crop_plan',
    title: 'Crop Rotation, Soil Nutrition & Yield Optimization',
    category: 'Agriculture & Farming',
    industry: 'farmer',
    content: 'Plan sustainable crop rotations based on soil type, acreage, local climate zones, and fertilizer requirements.',
    examples: [
      'Nitrogen-fixing legume rotation following corn/wheat',
      'Organic pest management schedule without synthetic chemicals',
      'Water conservation drip irrigation planning'
    ],
    prompt: `Act as a senior agricultural extension specialist and agronomist.
Farm Details:
- Region & Soil Type: [e.g. Midwest Loamy Clay / Black Soil in Deccan]
- Acreage & Water Availability: [e.g. 50 acres, drip + seasonal rain]
- Primary Crop Planned: [e.g. Soybean followed by Winter Wheat]

Provide:
1. Recommended multi-season crop rotation plan to maximize soil organic matter and break pest cycles.
2. Soil amendment and bio-fertilizer schedule (N-P-K and micronutrients).
3. Early warning signs for top 3 regional pest and fungal threats.
4. Estimated operational cost savings and yield risk mitigation strategy.`,
    icon: Tractor,
    difficulty: 'Intermediate',
    timeSaveEstimate: 'Saves days of season planning'
  },
  {
    id: 'farmer_grant_writer',
    title: 'Agricultural Grant & Government Subsidy Proposal',
    category: 'Agriculture & Farming',
    industry: 'farmer',
    content: 'Draft compelling grant proposals for farm modernization, solar pumps, organic certification, and sustainable equipment.',
    examples: [
      'USDA / Government farm equipment grant application',
      'Solar irrigation subsidy proposal',
      'Organic certification transition funding narrative'
    ],
    prompt: `Act as a professional grant writer specializing in agriculture and rural development.
Project: [e.g. Transitioning 30 acres to Solar-Powered Micro-Drip Irrigation].
Cost estimate: [$45,000 / Local Currency].
Draft a formal grant narrative:
1. Executive Summary & Statement of Need (water scarcity, energy cost reduction).
2. Project Objectives & Measurable Environmental Impact (water saved, carbon offset).
3. 12-Month Implementation Timeline with Milestones.
4. Budget Justification Breakdown table.`,
    icon: Tractor,
    difficulty: 'Intermediate',
    timeSaveEstimate: 'Saves $1,000+ grant writer fees'
  },

  // ── Homemakers & Family Managers ──
  {
    id: 'homemaker_pantry_planner',
    title: 'Zero-Waste Pantry-to-Plate Weekly Family Meal Plan',
    category: 'Home & Life Management',
    industry: 'homemaker',
    content: 'Turn whatever is in your fridge and pantry into 7 days of delicious, nutritious family dinners with zero grocery waste.',
    examples: [
      '7-day dinner plan using pantry staples and seasonal veggies',
      'High-protein, kid-friendly lunches in under 20 minutes',
      'Organized grocery shopping list categorized by supermarket aisle'
    ],
    prompt: `Act as an expert family nutritionist and home executive chef.
Family profile: [e.g. 2 adults, 2 kids aged 6 & 10, no nuts, preference for quick 30-min prep].
Ingredients currently in fridge/pantry: [e.g. Eggs, chicken breast, lentils, spinach, pasta, carrots, yogurt, canned tomatoes].

Generate:
1. 5-Day dinner menu that creatively cross-utilizes these ingredients with minimal fresh additions.
2. Step-by-step 30-minute prep instructions for each meal.
3. Categorized "Quick Grocery Run" checklist for items missing (Dairy, Produce, Spices).
4. One simple weekend meal-prep batch idea that saves 2 hours during the week.`,
    icon: Home,
    difficulty: 'Beginner',
    timeSaveEstimate: 'Saves 5 hrs cooking stress/week'
  },
  {
    id: 'homemaker_budget_tracker',
    title: 'Household Budget & Monthly Cash Flow Optimization',
    category: 'Home & Life Management',
    industry: 'homemaker',
    content: 'Categorize household expenses, identify recurring subscription leaks, and build a stress-free family savings plan.',
    examples: [
      '50/30/20 monthly family budget breakdown',
      'Utility bill audit and reduction checklist',
      'Annual holiday and emergency fund savings roadmap'
    ],
    prompt: `Act as a friendly, practical family financial counselor.
Monthly Household Income: [e.g. $5,500 / Monthly Amount].
Current Monthly Expenses:
- Housing/Rent: [$1,800]
- Groceries: [$800]
- Utilities & Internet: [$350]
- Kids Activities & School: [$400]
- Miscellaneous: [$600]

1. Structure a balanced 50/30/20 household budget table.
2. Highlight 3 areas where a family can cut $150-$300 without reducing quality of life.
3. Formulate a 12-month automated Emergency Fund plan.
4. Provide a simple weekly expense check-in template to stay on track.`,
    icon: Home,
    difficulty: 'Beginner',
    timeSaveEstimate: 'Saves $200-$500/month'
  },

  // ── Doctors ──
  {
    id: 'doctor_soap_discharge',
    title: 'Clinical SOAP Note & Discharge Education Formulator',
    category: 'Healthcare & Medicine',
    industry: 'doctor',
    content: 'Convert unstructured clinical impressions into standard hospital SOAP format and patient-friendly instructions.',
    examples: [
      'Hypertension and Type 2 Diabetes follow-up SOAP note',
      'Post-cholecystectomy discharge guidance at 6th-grade reading level',
      'Differential workup for unexplained persistent cough'
    ],
    prompt: `Act as an attending physician and clinical documentation specialist.
Consultation notes:
- Subjective: [Patient 58yo M reports 2-week worsening exertional shortness of breath, bilateral ankle edema]
- Objective: [BP 150/95, HR 88, lung bases bilateral crackles, JVP elevated 4cm]
- Current Meds: [Lisinopril 10mg daily]

Generate:
1. Formal SOAP note with clinical Assessment and differential diagnoses (CHF exacerbation, COPD, renal).
2. Diagnostic workup plan (Echo, BNP, CXR, basic metabolic panel).
3. Plain-language patient discharge summary explaining medications, warning symptoms, and diet in empathetic, clear terms.`,
    icon: Stethoscope,
    difficulty: 'Intermediate',
    timeSaveEstimate: 'Saves 2 hrs daily charting'
  },

  // ── Nurses ──
  {
    id: 'nurse_sbar_handoff',
    title: 'SBAR Shift Handoff & Triage Escalation Report',
    category: 'Healthcare & Medicine',
    industry: 'nurse',
    content: 'Standardize clinical handoffs using the Situation-Background-Assessment-Recommendation (SBAR) protocol.',
    examples: [
      'ICU-to-stepdown shift handoff report',
      'Escalation call to on-call physician for post-op hemorrhage',
      'Pediatric telemetry monitoring summary'
    ],
    prompt: `Act as a senior charge nurse. Structure an urgent SBAR clinical report for on-call provider communication:
- Patient: [e.g. 64yo F, Post-op Day 1 post-colectomy]
- Issue: [Sudden drop in BP 85/55, HR 122, surgical dressing with 150mL bright red strike-through]
- Relevant History: [On prophylactic enoxaparin, baseline BP 130/80]

Generate:
1. Concise 60-second verbal SBAR script to read to the physician.
2. Immediate independent nursing interventions while awaiting orders (IV fluids, vitals frequency, dressing reinforcement).
3. Standardized EHR nursing note entry documenting the escalation.`,
    icon: HeartPulse,
    difficulty: 'Intermediate',
    timeSaveEstimate: 'Saves critical minutes during emergencies'
  },

  // ── Teachers ──
  {
    id: 'teacher_differentiated_lesson',
    title: 'Differentiated 5E Lesson Plan with Tiered Activities',
    category: 'Education & Teaching',
    industry: 'teacher',
    content: 'Build engaging lesson plans across Engage, Explore, Explain, Elaborate, and Evaluate with tiered tasks for diverse learners.',
    examples: [
      'Middle school science lesson on Gravity & Orbits',
      'High school English lesson on Rhetorical Devices in speeches',
      'Primary math unit on fractions with hands-on manipulatives'
    ],
    prompt: `Act as a master curriculum designer and instructional coach.
Topic: [e.g. Ecosystem Energy Pyramids & Trophic Levels]
Grade Level: [e.g. 7th Grade Science, 45-minute period]

Create a comprehensive 5E Lesson Plan:
1. Engage (5 min): Hook question or puzzling phenomenon.
2. Explore (15 min): Hands-on inquiry activity.
3. Explain (10 min): Core conceptual definitions with diagrams.
4. Elaborate (10 min): Differentiated tiered activity (Tier 1: Emerging, Tier 2: On-grade, Tier 3: Advanced).
5. Evaluate (5 min): 3-question exit ticket with rubric criteria.`,
    icon: BookOpen,
    difficulty: 'Beginner',
    timeSaveEstimate: 'Saves 3 hrs lesson prep'
  },

  // ── Founders ──
  {
    id: 'founder_pitch_narrative',
    title: 'Venture Pitch Narrative & Problem-Solution Framing',
    category: 'Startups & Founders',
    industry: 'founder',
    content: 'Formulate an undeniable 10-slide narrative arc for pre-seed, seed, and Series A investor pitches.',
    examples: [
      'B2B AI SaaS investor pitch narrative',
      'Marketplace defensibility and network effect slide script',
      'Unit economics and customer acquisition cost payback deck'
    ],
    prompt: `Act as a partner at a top-tier venture fund (Sequoia / a16z).
Startup concept: [e.g. AI-powered clinical documentation tool for community health centers].
Target market: [1,400 Federally Qualified Health Centers, $4B TAM].
Key traction: [5 pilot clinics, 85% time saved, $12k ARR].

Structure a 10-Slide Investor Deck Outline:
1. The Hair-on-Fire Problem & Why Now (macro catalysts).
2. The Magical Product Solution & Secret Sauce.
3. Market Size & Bottom-Up TAM calculation.
4. Defensibility & Data Moat against Big Tech.
5. Go-To-Market & Unit Economics (CAC, LTV, Payback).
6. 18-Month Milestones with $1.5M capital ask.`,
    icon: Rocket,
    difficulty: 'Advanced',
    timeSaveEstimate: 'Saves weeks of pitch refinement'
  },

  // ── Career Pivoters ──
  {
    id: 'career_pivot_translator',
    title: 'Transferable Skill Translator & ATS Resume Re-Architect',
    category: 'Career Growth & Transition',
    industry: 'career_pivot',
    content: 'Reframe experience from non-tech or traditional roles into high-impact bullets tailored for new industries.',
    examples: [
      'Teacher transitioning to Corporate Instructional Designer / EdTech PM',
      'Accountant pivoting into Data Analytics & Business Intelligence',
      'Retail Manager pivoting to Customer Success Manager'
    ],
    prompt: `Act as an executive career coach and headhunter.
My Background: [e.g. 6 years as a High School Science Department Head].
Target Role: [e.g. Customer Success Manager or Product Manager at a B2B SaaS company].
Key Past Achievements: [e.g. Managed curriculum for 800 students, coordinated 12 staff, analyzed test performance data in Excel].

1. Map 5 core past responsibilities to high-demand B2B SaaS keywords (stakeholder management, churn reduction, data-driven decisions, onboarding).
2. Rewrite 4 resume bullet points into the Google XYZ formula ("Accomplished [X] as measured by [Y] by doing [Z]").
3. Draft a 3-paragraph compelling LinkedIn About summary explaining the authentic career pivot story.
4. List top 3 skills to demonstrate in the first interview.`,
    icon: Compass,
    difficulty: 'Beginner',
    timeSaveEstimate: 'Saves $300 resume service cost'
  },
];

import type { ElementType } from 'react';
import type { AcademicLevel, AcademicBranch, ContentModule } from '../types';
import { 
  School, 
  GraduationCap, 
  Microscope, 
  Award,
  Cpu,
  Stethoscope,
  Palette,
  Briefcase,
  Atom,
  Scale,
  Clock
} from 'lucide-react';

export interface AcademicLevelOption {
  id: AcademicLevel;
  label: string;
  sublabel: string;
  description: string;
  icon: ElementType;
  color: string;
}

export const ACADEMIC_LEVELS: AcademicLevelOption[] = [
  {
    id: 'high_school',
    label: 'High School / K-12',
    sublabel: 'Grades 9-12 & Foundation',
    description: 'Master core subjects, homework conceptual clarity, exam revision, and college prep.',
    icon: School,
    color: '#635BFF',
  },
  {
    id: 'undergraduate',
    label: 'College Undergraduate (UG)',
    sublabel: 'Bachelor Degrees (B.Tech, MBBS, B.A, B.Sc, B.Com)',
    description: 'Coursework mastery, lab reports, semester exam prep, coding projects, and internship prep.',
    icon: GraduationCap,
    color: '#00D4FF',
  },
  {
    id: 'postgraduate',
    label: 'Postgraduate (PG / Master’s)',
    sublabel: 'M.Tech, M.S, MBA, M.A, MD, M.Sc',
    description: 'Advanced seminar papers, capstone projects, case analysis, thesis proposals, and career pivot.',
    icon: Award,
    color: '#10B981',
  },
  {
    id: 'phd',
    label: 'PhD & Doctoral Researcher',
    sublabel: 'Doctoral Candidates & Postdocs',
    description: 'Systematic literature reviews, novel methodology, grant proposals, peer-review rebuttal, and dissertation defense.',
    icon: Microscope,
    color: '#F59E0B',
  },
];

export interface AcademicBranchOption {
  id: AcademicBranch;
  label: string;
  description: string;
  icon: ElementType;
  color: string;
}

export const ACADEMIC_BRANCHES: AcademicBranchOption[] = [
  {
    id: 'engineering',
    label: 'Engineering & CS',
    description: 'Software, Mechanical, Electrical, Civil, Data Science, AI/ML',
    icon: Cpu,
    color: '#00D4FF',
  },
  {
    id: 'medical',
    label: 'Medical & Paramedical',
    description: 'MBBS, Nursing, Pharmacy, Dentistry, Physiotherapy, Lab Sciences',
    icon: Stethoscope,
    color: '#10B981',
  },
  {
    id: 'arts_humanities',
    label: 'Arts & Humanities',
    description: 'Literature, History, Sociology, Philosophy, Political Science, Languages',
    icon: Palette,
    color: '#EC4899',
  },
  {
    id: 'business_commerce',
    label: 'Business & Commerce',
    description: 'Finance, Marketing, Management, Accounting, Economics, Supply Chain',
    icon: Briefcase,
    color: '#F59E0B',
  },
  {
    id: 'sciences',
    label: 'Natural Sciences & Math',
    description: 'Physics, Chemistry, Biology, Mathematics, Statistics, Environmental',
    icon: Atom,
    color: '#8B5CF6',
  },
  {
    id: 'law',
    label: 'Law & Legal Studies',
    description: 'LLB, Constitutional Law, Corporate Law, Moot Court, Case Briefs',
    icon: Scale,
    color: '#EF4444',
  },
];

export const STUDENT_MODULES: ContentModule[] = [
  // ── High School Track ──
  {
    id: 'hs_feynman_tutor',
    title: 'Socratic Concept Explainer (Feynman Technique)',
    category: 'High School Foundation',
    industry: 'student',
    academicLevel: 'high_school',
    content: 'Demystify difficult high school concepts in physics, chemistry, biology, or calculus using simple everyday analogies.',
    examples: [
      'Understand Photosynthesis vs Cellular Respiration intuitively',
      'Explain Newton’s Laws using skateboarding examples',
      'Break down quadratic equations step-by-step'
    ],
    prompt: `Act as a warm, world-class high school tutor. Explain the concept of [Topic, e.g. Mitochondria & ATP Synthesis] to a Grade 10 student.
1. Use an engaging real-world analogy (e.g. power grid, factory).
2. Break it down into 3 simple sequential steps.
3. List 3 common misconceptions students make on exams.
4. Give 1 practice multiple-choice question to test my understanding.`,
    icon: School,
    difficulty: 'Beginner',
    timeSaveEstimate: 'Saves 3 hrs study/week'
  },
  {
    id: 'hs_exam_schedule',
    title: 'Adaptive Exam Study Timetable & Spaced Repetition',
    category: 'High School Foundation',
    industry: 'student',
    academicLevel: 'high_school',
    content: 'Generate a realistic study calendar before finals incorporating active recall and spaced intervals.',
    examples: [
      'Build a 14-day timetable for Board / AP exams',
      'Schedule revision for weak topics with buffer days'
    ],
    prompt: `Act as an academic coach. I have final exams in [List Subjects, e.g. Math, Chemistry, History] in [Number of Days, e.g. 14 days].
I have [Number of Hours, e.g. 3 hours] available on weekdays and [6 hours] on weekends. My weakest topic is [insert topic].
Create an hourly day-by-day revision schedule integrating 25-minute Pomodoro sessions and active recall review slots.`,
    icon: Clock,
    difficulty: 'Beginner',
    timeSaveEstimate: 'Saves planning stress'
  },

  // ── Engineering & CS Undergrad Track ──
  {
    id: 'eng_algo_debugger',
    title: 'Algorithm Optimization & Dry-Run Trace',
    category: 'Engineering & CS',
    industry: 'student',
    academicLevel: 'undergraduate',
    academicBranch: 'engineering',
    content: 'Trace recursion, analyze asymptotic time/space complexity (Big-O), and spot edge case bugs in data structures and algorithms.',
    examples: [
      'Dry run Dijkstra’s or Dynamic Programming tables',
      'Debug memory leaks or off-by-one errors in C++/Python',
      'Optimize nested loops from O(n^2) to O(n log n)'
    ],
    prompt: `Act as a senior computer science TA. Analyze this algorithm/code snippet:
\`\`\`
[Paste Code or Problem Statement, e.g. LeetCode 3Sum / Graph DFS]
\`\`\`
1. Step-by-step dry run trace with input [e.g. nums = [-1, 0, 1, 2, -1, -4]].
2. Identify the time and auxiliary space complexity in Big-O notation.
3. Point out 2 subtle edge cases (empty array, duplicates, overflow).
4. Provide an optimized approach with clean comments.`,
    icon: Cpu,
    difficulty: 'Intermediate',
    timeSaveEstimate: 'Saves 5 hrs lab debugging'
  },
  {
    id: 'eng_system_design_primer',
    title: 'Undergrad Capstone & Architecture Blueprint',
    category: 'Engineering & CS',
    industry: 'student',
    academicLevel: 'undergraduate',
    academicBranch: 'engineering',
    content: 'Structure your final year engineering capstone project from database schema to API architecture and deployment.',
    examples: [
      'IoT smart agriculture architecture',
      'Full-stack Next.js + PostgreSQL database ER diagram design',
      'Hardware block diagram and component selection'
    ],
    prompt: `Act as a principal systems architect and university project advisor.
I am building a capstone project titled: "[Project Title, e.g. Real-Time Hospital Bed Allocation System]".
Tech stack: [e.g. React, Node.js, PostgreSQL, WebSockets].
Generate:
1. High-level architecture diagram in ASCII / Mermaid format.
2. Relational database schema with primary and foreign keys.
3. Top 5 REST / WebSocket API endpoints with request/response payloads.
4. Top 3 security and scalability considerations for the project viva evaluation.`,
    icon: Cpu,
    difficulty: 'Advanced',
    timeSaveEstimate: 'Saves 15 hrs design time'
  },

  // ── Medical & Paramedical Track ──
  {
    id: 'med_clinical_vignette',
    title: 'USMLE / MBBS Clinical Vignette & Differential Diagnosis',
    category: 'Medical & Healthcare',
    industry: 'student',
    academicLevel: 'undergraduate',
    academicBranch: 'medical',
    content: 'Practice high-yield clinical case vignettes, diagnostic workups, and pharmacological mechanism-of-action recall.',
    examples: [
      'Differential diagnosis for 45yo male with acute epigastric pain',
      'High-yield antibiotic mechanism and resistance pathways',
      'ECG interpretation and electrolyte abnormality correlations'
    ],
    prompt: `Act as an attending physician and clinical medical educator.
Create a clinical vignette case for a student studying [System/Topic, e.g. Cardiology - STEMI vs Pericarditis]:
1. Present patient history, vitals, physical exam, and initial lab values.
2. List 4 differential diagnoses in order of probability with clinical reasoning.
3. Specify the "Gold Standard" confirmatory test and initial acute management protocol.
4. Explain the mechanism of action of the first-line medication in simple pharmacological terms.`,
    icon: Stethoscope,
    difficulty: 'Intermediate',
    timeSaveEstimate: 'Saves 8 hrs USMLE prep'
  },
  {
    id: 'nursing_care_plan',
    title: 'Standardized Nursing Care Plan (NANDA / NIC / NOC)',
    category: 'Medical & Healthcare',
    industry: 'student',
    academicLevel: 'undergraduate',
    academicBranch: 'medical',
    content: 'Formulate accurate nursing care plans with assessments, nursing diagnoses, measurable goals, and nursing interventions.',
    examples: [
      'Post-operative care plan for total knee arthroplasty',
      'Pediatric asthma exacerbation nursing diagnosis',
      'Geriatric fall risk assessment and prevention interventions'
    ],
    prompt: `Act as a clinical nursing educator. Formulate a comprehensive Nursing Care Plan for a patient with [Condition, e.g. Type 2 Diabetes Mellitus with Diabetic Foot Ulcer]:
1. Assessment (Subjective & Objective findings).
2. 2 NANDA-approved Nursing Diagnoses (Problem, Etiology, Symptoms).
3. SMART patient-centered goals.
4. Independent and collaborative Nursing Interventions with clinical rationale.
5. Evaluation criteria.`,
    icon: Stethoscope,
    difficulty: 'Intermediate',
    timeSaveEstimate: 'Saves 4 hrs charting practice'
  },

  // ── Arts & Humanities Track ──
  {
    id: 'arts_thesis_critique',
    title: 'Critical Essay Argumentation & Literature Synthesis',
    category: 'Arts & Humanities',
    industry: 'student',
    academicLevel: 'undergraduate',
    academicBranch: 'arts_humanities',
    content: 'Sharpen literary analysis, historical historiography, and philosophical dialectic arguments.',
    examples: [
      'Comparative analysis of Post-Colonial themes in Achebe and Conrad',
      'Critique of Social Contract theory in Hobbes vs Locke',
      'Structuralist vs Post-Structuralist methodology essay'
    ],
    prompt: `Act as a humanities professor and journal editor. Review my essay thesis statement:
"[Paste Thesis Statement, e.g. The depiction of industrialization in 19th-century Victorian literature reflects existential alienation rather than economic triumph]".
1. Assess the strength, originality, and falsifiability of the thesis.
2. Suggest 3 strong counter-arguments a critic would raise.
3. Provide 4 primary or secondary textual evidence angles to strengthen the argument.
4. Outline a 5-paragraph logical essay structure with transitional topic sentences.`,
    icon: Palette,
    difficulty: 'Intermediate',
    timeSaveEstimate: 'Saves 6 hrs essay drafting'
  },

  // ── Business & Commerce Track ──
  {
    id: 'biz_case_study_solver',
    title: 'HBS Case Study Framework & Financial Valuation',
    category: 'Business & Commerce',
    industry: 'student',
    academicLevel: 'postgraduate',
    academicBranch: 'business_commerce',
    content: 'Analyze business case studies using Porter’s 5 Forces, SWOT, DCF modeling assumptions, and go-to-market strategies.',
    examples: [
      'Analyze Netflix’s pivot to ad-supported tiers',
      'Evaluate supply chain bottleneck for EV battery manufacturer',
      'Build unit economics model for D2C consumer brand'
    ],
    prompt: `Act as a McKinsey strategy consultant and business school professor.
Analyze this business scenario: [Briefly describe company/problem, e.g. SaaS startup expanding from SMB to Enterprise].
1. Apply the 3Cs and MECE framework to break down the core dilemma.
2. Outline 3 strategic options with pros, cons, and required capital.
3. Provide a recommended 90-day execution roadmap with key KPIs (CAC, LTV, Net Retention Rate).
4. Summarize an executive pitch suitable for a board meeting presentation.`,
    icon: Briefcase,
    difficulty: 'Advanced',
    timeSaveEstimate: 'Saves 10 hrs MBA prep'
  },

  // ── PhD & Doctoral Research Track ──
  {
    id: 'phd_lit_gap_finder',
    title: 'Systematic Literature Matrix & Research Gap Identifier',
    category: 'PhD & Research',
    industry: 'student',
    academicLevel: 'phd',
    content: 'Synthesize dozens of peer-reviewed papers to identify open research questions, methodological limitations, and novel contributions.',
    examples: [
      'Find research gaps in Transformers for low-resource NLP languages',
      'Critique methodology in CRISPR off-target cleavage papers',
      'Synthesize qualitative interview studies on tele-mental health'
    ],
    prompt: `Act as a senior journal peer reviewer and doctoral supervisor in [Field, e.g. Bio-Engineering / Deep Learning].
Here is a summary of recent literature in my focus area: [Paste paper abstracts or notes].
1. Synthesize the findings into a thematic comparison matrix (Authors, Methodology, Key Findings, Limitations).
2. Explicitly identify 3 unaddressed research gaps / open questions.
3. Formulate 2 rigorous research hypotheses with suggested experimental/empirical verification methods.
4. Highlight potential confounding variables and peer-review validity threats.`,
    icon: Microscope,
    difficulty: 'Advanced',
    timeSaveEstimate: 'Saves 25+ hrs lit review'
  },
  {
    id: 'phd_peer_review_rebuttal',
    title: 'Journal Reviewer Rebuttal & Point-by-Point Response',
    category: 'PhD & Research',
    industry: 'student',
    academicLevel: 'phd',
    content: 'Draft polite, bulletproof, and scientifically rigorous responses to harsh reviewer comments for major journal submissions.',
    examples: [
      'Address Reviewer 2’s concern regarding statistical sample size',
      'Clarify novelty compared to recent 2025 baseline paper',
      'Politely dispute reviewer misunderstanding of experimental design'
    ],
    prompt: `Act as an experienced academic journal author and principal investigator.
Reviewer comment: "[Paste harsh or critical reviewer feedback, e.g. The authors fail to demonstrate statistical significance across the benchmark datasets]".
Draft a formal, diplomatic, and compelling response:
1. Express courteous gratitude for the reviewer’s constructive observation.
2. State clearly what revisions or additional ablation experiments were performed.
3. Provide the precise excerpt inserted into Section [X] of the revised manuscript.
4. Address the concern with uncompromising scientific rigor without being defensive.`,
    icon: Microscope,
    difficulty: 'Advanced',
    timeSaveEstimate: 'Saves days of manuscript stress'
  },
];

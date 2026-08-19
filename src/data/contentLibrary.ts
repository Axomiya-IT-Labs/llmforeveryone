import type { ContentModule } from '../types';
import { 
  Code, Bug, Cpu, Server, 
  Stethoscope, FileText, Pill, HeartPulse,
  BookOpen, CheckSquare, Users, Gamepad,
  TrendingUp, Briefcase, Smile, Clock,
  Scale, FileSearch, Shield, Gavel,
  Megaphone, PenTool, BarChart,
  Palette, Image, Layout, Lightbulb,
  Calculator, PiggyBank, Wallet
} from 'lucide-react';

interface IndustryLibrary {
  title: string;
  description: string;
  modules: ContentModule[];
}

export const CONTENT_LIBRARY: {
  student: IndustryLibrary;
  professional: Record<string, IndustryLibrary>;
} = {
  student: {
    title: 'AI for Students',
    description: 'Learn how AI can help you study smarter, research better, and prepare for your career.',
    modules: [
      {
        id: 'study',
        title: 'Smarter Studying with AI',
        icon: BookOpen,
        content: 'Transform how you learn. AI can create personalized study guides, generate practice questions, and explain complex topics in simple terms. Use AI as your 24/7 study assistant.',
        examples: [
          'Create flashcards from your lecture notes automatically',
          'Generate practice exams with answer keys',
          'Explain difficult concepts in simple language',
          'Summarize long reading materials',
          'Create study schedules based on your exam dates'
        ],
        prompt: 'Help me understand [insert topic] by creating a simple study guide with key concepts, examples, and practice questions'
      },
      {
        id: 'research',
        title: 'Research Like a Pro',
        icon: FileText,
        content: 'AI accelerates your research. Find relevant sources, extract key insights, and organize your findings effortlessly. Perfect for essays, papers, and projects.',
        examples: [
          'Find academic papers on any topic in seconds',
          'Summarize research articles into key points',
          'Organize citations and references automatically',
          'Identify research gaps and new questions',
          'Generate literature review outlines'
        ],
        prompt: 'Find and summarize 5 key research papers on [insert topic] for my assignment'
      },
      {
        id: 'writing',
        title: 'Master Academic Writing',
        icon: PenTool,
        content: 'From brainstorming to final edits, AI helps you write better essays, improve clarity, and express ideas effectively. Get instant feedback on your writing.',
        examples: [
          'Generate essay outlines and structure',
          'Check grammar, style, and tone',
          'Improve sentence structure and flow',
          'Get writing feedback and suggestions',
          'Create compelling introductions and conclusions'
        ],
        prompt: 'Help me improve this essay on [insert topic]. Check grammar, structure, and suggest improvements'
      },
      {
        id: 'career',
        title: 'Career & Job Preparation',
        icon: Briefcase,
        content: 'AI assists with career planning, resume building, and interview preparation tailored to your goals. Stand out in the job market.',
        examples: [
          'Build ATS-friendly resumes that get noticed',
          'Practice interview questions with AI feedback',
          'Explore career paths and industry insights',
          'Write professional cover letters',
          'Research companies and roles'
        ],
        prompt: 'Help me prepare for a [insert role] interview. Provide common questions and how to answer them'
      },
      {
        id: 'productivity',
        title: 'Student Productivity with AI',
        icon: Clock,
        content: 'Manage your time better, reduce overwhelm, and stay organized with AI-powered productivity tools designed for students.',
        examples: [
          'Create weekly study schedules',
          'Track assignment deadlines automatically',
          'Manage group projects efficiently',
          'Prioritize tasks based on importance',
          'Reduce procrastination with AI tips'
        ],
        prompt: 'Help me create a study schedule for my [insert courses] finals week'
      }
    ]
  },
  professional: {
    technology: {
      title: 'AI in Technology',
      description: 'Discover how AI is transforming software development, system architecture, and engineering workflows.',
      modules: [
        {
          id: 'coding',
          title: 'AI-Assisted Development',
          icon: Code,
          content: 'AI tools like GitHub Copilot and LLM assistants are transforming coding. Write code faster, debug with confidence, and learn new technologies quickly.',
          examples: [
            'Generate boilerplate and algorithms from natural language descriptions',
            'Find and fix tricky bugs with AI root-cause analysis',
            'Optimize performance and refactor legacy code',
            'Write comprehensive documentation and API specs',
            'Learn new programming paradigms faster'
          ],
          prompt: 'Help me write code for [specific task]. Provide a well-documented, efficient TypeScript solution with error handling and unit tests.'
        },
        {
          id: 'testing',
          title: 'Testing & Quality Assurance',
          icon: Bug,
          content: 'AI automates testing, uncovers edge cases, and improves software quality with minimal effort. Reduce regressions and increase release confidence.',
          examples: [
            'Generate comprehensive unit and integration test cases automatically',
            'Find edge cases and boundary conditions',
            'Automate regression testing scripts',
            'Identify performance bottlenecks',
            'Suggest code improvements for fault tolerance'
          ],
          prompt: 'Create comprehensive test cases for this [component/function]. Include boundary conditions, mocking, and error handling scenarios.'
        },
        {
          id: 'architecture',
          title: 'System Architecture & Design',
          icon: Cpu,
          content: 'AI helps design scalable systems, suggests optimizations, and identifies architectural improvements. Build resilient distributed systems with AI insights.',
          examples: [
            'Design scalable microservice and serverless architectures',
            'Optimize database schemas for high concurrency',
            'Reduce technical debt and refactor monoliths',
            'Identify security vulnerabilities in design',
            'Compare tradeoffs between cloud infrastructure solutions'
          ],
          prompt: 'Review and suggest improvements for my system architecture. Consider scalability, latency, cost, and disaster recovery.'
        },
        {
          id: 'devops',
          title: 'DevOps & Infrastructure',
          icon: Server,
          content: 'AI optimizes deployment, predicts infrastructure issues, and automates CI/CD workflows. Keep systems running reliably 24/7.',
          examples: [
            'Optimize CI/CD deployment pipelines',
            'Detect anomalous logs and system alerts before outages',
            'Automate infrastructure-as-code configuration (Terraform, Docker, K8s)',
            'Reduce cloud compute expenses with smart autoscaling',
            'Monitor service health in real-time'
          ],
          prompt: 'Help me optimize my CI/CD pipeline. Suggest improvements for build caching, parallel execution, and automated rollback.'
        }
      ]
    },
    healthcare: {
      title: 'AI in Healthcare',
      description: 'Explore how AI is revolutionizing clinical workflows, medical documentation, and patient care.',
      modules: [
        {
          id: 'diagnosis',
          title: 'Clinical Workflow Assistance',
          icon: Stethoscope,
          content: 'AI assists in triaging information, analyzing clinical trends, and supporting clinicians with fast access to medical literature.',
          examples: [
            'Synthesize latest clinical guidelines and trial findings',
            'Identify symptom patterns and correlations for differential review',
            'Highlight potential drug-drug interaction warnings',
            'Summarize lab results trends over time',
            'Assist with clinical decision support workflows'
          ],
          prompt: 'Summarize current clinical practice guidelines and evidence-based considerations for managing [condition/symptoms].'
        },
        {
          id: 'records',
          title: 'Patient Records & Documentation',
          icon: FileText,
          content: 'AI automates clinical documentation, transcribes consultations, and generates clean SOAP notes. Spend more time caring, less on clerical work.',
          examples: [
            'Structure patient consultations into standard SOAP format',
            'Summarize extensive historical patient records',
            'Generate discharge summaries and follow-up plans',
            'Translate medical jargon into patient-friendly instructions',
            'Maintain organized and compliant chart records'
          ],
          prompt: 'Structure the following clinical notes into a clear SOAP format with key action items and patient instructions: [notes].'
        },
        {
          id: 'treatment',
          title: 'Care Planning & Patient Guidance',
          icon: Pill,
          content: 'AI provides evidence-backed guidance for care pathways and patient educational materials.',
          examples: [
            'Draft clear patient education handouts in multiple reading levels',
            'Outline comprehensive post-operative recovery timelines',
            'Support preventive health screening reminders',
            'Organize lifestyle and dietary support recommendations',
            'Help patients understand complex prescription regimens'
          ],
          prompt: 'Create a clear, empathetic patient education handout explaining [treatment/procedure] and what to expect during recovery.'
        },
        {
          id: 'prevention',
          title: 'Preventive Healthcare & Wellness',
          icon: HeartPulse,
          content: 'AI predicts health risks and suggests preventive measures for better patient outcomes proactively.',
          examples: [
            'Identify population health risk factors',
            'Formulate wellness and vaccination schedules',
            'Track lifestyle metrics and wellness interventions',
            'Formulate preventive screening checklists',
            'Develop patient engagement reminders'
          ],
          prompt: 'Create a preventive wellness plan and screening schedule for [demographic/patient profile].'
        }
      ]
    },
    education: {
      title: 'AI in Education',
      description: 'Discover how AI is transforming teaching, learning, and educational administration.',
      modules: [
        {
          id: 'planning',
          title: 'Lesson Planning & Curriculum',
          icon: BookOpen,
          content: 'AI helps create engaging lesson plans, learning objectives, and teaching materials. Save hours on planning, focus on inspiring students.',
          examples: [
            'Create comprehensive, standards-aligned lesson plans quickly',
            'Design interactive classroom activities and discussions',
            'Generate differentiated worksheets and study packs',
            'Plan formative assessments and rubrics',
            'Adapt curriculum for diverse learning paces'
          ],
          prompt: 'Create a 45-minute interactive lesson plan on [topic] for [grade level]. Include learning objectives, an icebreaker, main activity, and exit ticket.'
        },
        {
          id: 'grading',
          title: 'Formative Feedback & Assessment',
          icon: CheckSquare,
          content: 'AI assists in providing rapid, detailed constructive feedback, highlighting areas of excellence and growth opportunities.',
          examples: [
            'Draft constructive rubrics for assignments',
            'Provide individualized qualitative feedback points',
            'Identify common classroom misconceptions across test questions',
            'Generate practice quizzes with conceptual explanations',
            'Track conceptual mastery over time'
          ],
          prompt: 'Provide constructive feedback on this student essay excerpt with specific suggestions to strengthen thesis clarity and evidence: [excerpt].'
        },
        {
          id: 'personalization',
          title: 'Personalized Learning Paths',
          icon: Users,
          content: 'AI creates tailored learning paths, adjusting explanations to meet student strengths and interests.',
          examples: [
            'Adapt reading complexity for ESL or remedial students',
            'Create enrichment challenges for advanced learners',
            'Generate real-world analogies based on student hobbies',
            'Build scaffolded practice step-by-step',
            'Provide multi-modal explanation suggestions'
          ],
          prompt: 'Explain the concept of [topic] using analogies suited for someone passionate about [sports/music/gaming].'
        },
        {
          id: 'engagement',
          title: 'Gamified & Interactive Learning',
          icon: Gamepad,
          content: 'AI designs interactive learning games, roleplay simulations, and engaging challenges to make learning captivating.',
          examples: [
            'Create history roleplay scenarios with AI simulation',
            'Design science trivia and escape-room style challenges',
            'Generate debate topics with counter-argument prompts',
            'Formulate interactive coding or math puzzles',
            'Foster group collaboration dynamics'
          ],
          prompt: 'Design a 20-minute classroom simulation game to help students understand the economic concept of [topic].'
        }
      ]
    },
    business: {
      title: 'AI in Business',
      description: 'Explore how AI transforms executive strategy, market intelligence, customer experience, and operations.',
      modules: [
        {
          id: 'analytics',
          title: 'Business Analytics & Market Intelligence',
          icon: TrendingUp,
          content: 'AI analyzes messy market signals, financial reports, and competitor benchmarks into clear strategic takeaways.',
          examples: [
            'Identify market trends and whitespace opportunities',
            'Synthesize competitor earnings calls and public filings',
            'Spot operational bottlenecks and churn indicators',
            'Forecast revenue and sales pipeline trajectories',
            'Transform raw CSV data into executive summaries'
          ],
          prompt: 'Analyze the following quarterly sales data. Provide executive-level highlights, risk factors, and 3 high-impact recommendations: [data].'
        },
        {
          id: 'strategy',
          title: 'Strategic Planning & Scenario Modeling',
          icon: Briefcase,
          content: 'Model diverse business scenarios, analyze upside vs downside risks, and stress-test assumptions before executing.',
          examples: [
            'Draft SWOT and Porter’s 5 Forces analyses',
            'Evaluate expansion into new geographic or vertical markets',
            'Formulate OKRs and KPIs aligned with corporate vision',
            'Simulate pricing models and margin impacts',
            'Design contingency plans for supply chain disruptions'
          ],
          prompt: 'Act as a strategic management consultant. Help me stress-test a plan to [business initiative]. Outline top 5 risks and mitigation strategies.'
        },
        {
          id: 'customer',
          title: 'Customer Experience & Loyalty',
          icon: Smile,
          content: 'AI unlocks personalized customer journeys, automated resolution workflows, and deep sentiment analysis.',
          examples: [
            'Analyze Net Promoter Score (NPS) and customer reviews for recurring themes',
            'Design proactive customer retention playbooks',
            'Draft automated high-touch onboarding sequences',
            'Build intelligent support response templates',
            'Identify high-value cross-selling triggers'
          ],
          prompt: 'Analyze these 10 customer feedback quotes and categorize them into themes with priority action steps: [quotes].'
        },
        {
          id: 'operations',
          title: 'Operational Excellence & Automation',
          icon: Clock,
          content: 'Streamline standard operating procedures (SOPs), eliminate bureaucratic friction, and boost team throughput.',
          examples: [
            'Draft clear standard operating procedures in minutes',
            'Automate meeting synthesis and action item delegation',
            'Optimize vendor selection and procurement evaluations',
            'Eliminate repetitive internal communication overhead',
            'Streamline employee onboarding workflows'
          ],
          prompt: 'Create a clear SOP for [process/task], including roles, step-by-step instructions, quality checks, and escalation triggers.'
        }
      ]
    },
    law: {
      title: 'AI in Law',
      description: 'Discover how AI accelerates legal research, contract review, litigation strategy, and compliance.',
      modules: [
        {
          id: 'research',
          title: 'Legal Research & Case Analysis',
          icon: FileSearch,
          content: 'Accelerate case law synthesis, statutory interpretation, and legal reasoning with AI summarization.',
          examples: [
            'Summarize 50-page judicial opinions into holding, facts, and dissent',
            'Find relevant statutory frameworks and regulatory citations',
            'Compare jurisdictional nuances across circuit courts',
            'Identify relevant evidentiary standards',
            'Prepare concise case briefs for partner review'
          ],
          prompt: 'Summarize the legal standard for [legal issue] under [jurisdiction], citing key precedents and evidentiary burdens.'
        },
        {
          id: 'contracts',
          title: 'Contract Analysis & Due Diligence',
          icon: Scale,
          content: 'Scan agreements for non-standard clauses, liability caps, indemnification risks, and compliance pitfalls.',
          examples: [
            'Redline agreements against standard market terms',
            'Highlight ambiguous covenants or missing termination rights',
            'Verify compliance with data privacy regulations (GDPR, CCPA)',
            'Extract key dates, renewal deadlines, and obligations',
            'Draft custom addendums and protective clauses'
          ],
          prompt: 'Review this confidentiality clause for mutual protection risks and suggest balanced redline revisions: [clause].'
        },
        {
          id: 'strategy',
          title: 'Litigation Strategy & Brief Drafting',
          icon: Shield,
          content: 'Stress-test litigation theories, prepare deposition outlines, and structure persuasive appellate briefs.',
          examples: [
            'Brainstorm opposing counsel counter-arguments',
            'Generate targeted cross-examination questioning outlines',
            'Structure persuasive legal memos and motions',
            'Organize chronological timelines of documentary evidence',
            'Evaluate settlement risk-reward scenarios'
          ],
          prompt: 'What are the strongest counter-arguments to our position that [position]? How should we pre-emptively address them in our motion?'
        },
        {
          id: 'automation',
          title: 'Legal Drafting & Compliance',
          icon: Gavel,
          content: 'Draft standard agreements, resolutions, NDAs, and corporate filings with precision and consistency.',
          examples: [
            'Generate boilerplate clauses tailored to industry specifics',
            'Maintain consistency across high-volume transaction sets',
            'Ensure regulatory compliance checks are documented',
            'Draft board resolutions and corporate minutes',
            'Streamline client intake questionnaires'
          ],
          prompt: 'Draft a robust non-disclosure agreement (NDA) governed by Delaware law with a 2-year term and standard carve-outs.'
        }
      ]
    },
    marketing: {
      title: 'AI in Marketing',
      description: 'Discover how AI accelerates copywriting, campaign optimization, audience segmentation, and brand growth.',
      modules: [
        {
          id: 'content',
          title: 'High-Converting Copywriting',
          icon: PenTool,
          content: 'Generate captivating headlines, ad copy variations, organic social hooks, and long-form thought leadership.',
          examples: [
            'Generate 10 hook variations for social campaigns',
            'Draft long-form SEO blog posts with structured headers',
            'Create high-converting email nurture sequences',
            'Write punchy ad copy for paid social and search ads',
            'Repurpose podcasts/webinars into bite-sized newsletters'
          ],
          prompt: 'Write 5 compelling LinkedIn post hooks targeting [target persona] about the benefits of [product/topic].'
        },
        {
          id: 'analytics',
          title: 'Campaign Analytics & Attribution',
          icon: BarChart,
          content: 'Synthesize CAC, ROAS, LTV, and conversion funnels to pinpoint where marketing spend creates the highest return.',
          examples: [
            'Identify channel performance drop-offs in the funnel',
            'Calculate cohort retention and churn rates',
            'Optimize ad budget allocation across platforms',
            'Run A/B testing statistical significance checks',
            'Translate analytics reports into executive summaries'
          ],
          prompt: 'Analyze our conversion funnel: [funnel data]. Where is the largest drop-off and what experiments should we test first?'
        },
        {
          id: 'personalization',
          title: 'Audience Segmentation & Lifecycle',
          icon: Megaphone,
          content: 'Deliver tailored messaging based on user intent, past interactions, and lifecycle stage.',
          examples: [
            'Create personalized onboarding drip sequences',
            'Segment buyers by industry, company size, and pain points',
            'Craft re-engagement campaigns for churned users',
            'Personalize landing page value propositions',
            'Automate lead scoring and qualification triggers'
          ],
          prompt: 'Draft a 3-part re-engagement email sequence for SaaS users who were active during their trial but did not upgrade.'
        },
        {
          id: 'seo',
          title: 'SEO Strategy & Search Intent',
          icon: TrendingUp,
          content: 'Discover high-intent keyword clusters, analyze search intent, and optimize content structure to rank #1.',
          examples: [
            'Cluster keywords by user search intent (informational vs transactional)',
            'Generate comprehensive content briefs for writers',
            'Optimize meta titles and descriptions for higher CTR',
            'Audit existing articles for missing semantic entities',
            'Identify backlink and partnership opportunities'
          ],
          prompt: 'Create a comprehensive SEO content brief for the keyword "[target keyword]", including recommended H2/H3 headers, semantic terms, and FAQ.'
        }
      ]
    },
    design: {
      title: 'AI in Design',
      description: 'Explore how AI accelerates visual exploration, design systems, UX research, and creative brainstorming.',
      modules: [
        {
          id: 'visual',
          title: 'Visual Concepting & Generative Assets',
          icon: Palette,
          content: 'Generate rapid moodboards, color palettes, vector icon ideas, and visual variations with AI.',
          examples: [
            'Craft precision text prompts for image generators (Midjourney, DALL-E)',
            'Explore complementary color harmonies and typography pairings',
            'Generate 3D asset and texture concept ideas',
            'Create storyboard sketches for product videos',
            'Iterate on brand visual identities quickly'
          ],
          prompt: 'Generate 4 detailed Midjourney prompts to create modern, futuristic 3D glassmorphic icons for [app category].'
        },
        {
          id: 'ux',
          title: 'UX Research & Wireframing',
          icon: Layout,
          content: 'Synthesize user interview transcripts, map out customer journeys, and design frictionless interfaces.',
          examples: [
            'Extract user pain points from usability test transcripts',
            'Draft user persona profiles and job-to-be-done (JTBD) statements',
            'Map information architecture for web and mobile apps',
            'Formulate microcopy and error message states',
            'Audit interfaces for accessibility (WCAG 2.1) compliance'
          ],
          prompt: 'Write user-friendly error messages and recovery actions for these 5 common checkout edge cases: [cases].'
        },
        {
          id: 'creative',
          title: 'Creative Direction & Brainstorming',
          icon: Lightbulb,
          content: 'Push past creative blocks by generating bold design metaphors, theme concepts, and brand narratives.',
          examples: [
            'Brainstorm unexpected brand positioning metaphors',
            'Generate themes for product launch campaigns',
            'Combine contrasting design eras (e.g. brutalism meets neo-skeuomorphism)',
            'Formulate design sprint workshop exercises',
            'Write creative manifestos for brand redesigns'
          ],
          prompt: 'Brainstorm 5 distinct visual design directions for a next-generation [product type]. For each, define the mood, color palette, and typography style.'
        },
        {
          id: 'motion',
          title: 'Interaction & Micro-Animations',
          icon: Image,
          content: 'Plan intuitive micro-interactions, animation timings, and transition choreography that delight users.',
          examples: [
            'Define easing curves and duration guidelines for design systems',
            'Choreograph modal open/close and page transition states',
            'Script interactive feedback for button states and form validation',
            'Design skeleton loader animation flows',
            'Specify handoff notes for frontend developers'
          ],
          prompt: 'Describe the motion choreography and CSS/Framer Motion timing for a frictionless multi-step onboarding modal.'
        }
      ]
    },
    finance: {
      title: 'AI in Finance',
      description: 'Discover how AI empowers financial modeling, risk assessment, portfolio management, and compliance.',
      modules: [
        {
          id: 'analysis',
          title: 'Financial Modeling & Ratio Analysis',
          icon: Calculator,
          content: 'Synthesize balance sheets, cash flow statements, and financial models for deep quantitative evaluation.',
          examples: [
            'Calculate and interpret profitability, liquidity, and leverage ratios',
            'Build discounted cash flow (DCF) model frameworks',
            'Compare financial performance against peer industry averages',
            'Summarize 10-K and 10-Q SEC reports in minutes',
            'Spot anomalies in expense patterns'
          ],
          prompt: 'Explain how changes in [working capital/interest rates] impact our cash flow statement and provide formula examples.'
        },
        {
          id: 'investment',
          title: 'Investment Strategy & Asset Allocation',
          icon: Wallet,
          content: 'Evaluate asset diversification, risk-adjusted returns (Sharpe ratio), and macroeconomic market drivers.',
          examples: [
            'Assess asset correlation and portfolio variance',
            'Model inflation and interest rate sensitivity scenarios',
            'Formulate structured investment policy statements (IPS)',
            'Evaluate ESG metrics and compliance standards',
            'Automate market research updates across asset classes'
          ],
          prompt: 'Draft an investment memorandum template evaluating an investment in [asset/sector], covering thesis, risks, valuation, and exit strategy.'
        },
        {
          id: 'accounting',
          title: 'Accounting Operations & Reconciliation',
          icon: PiggyBank,
          content: 'Automate invoice categorizations, expense reconciliations, and close-of-month financial checklists.',
          examples: [
            'Draft automated audit trail verification procedures',
            'Categorize recurring transactions and ledger entries',
            'Speed up month-end and quarter-end close workflows',
            'Detect billing discrepancies and duplicate invoices',
            'Ensure GAAP and IFRS standard compliance checks'
          ],
          prompt: 'Create a comprehensive month-end financial closing checklist for a mid-sized company, categorized by department.'
        },
        {
          id: 'risk',
          title: 'Risk Management & Fraud Prevention',
          icon: Shield,
          content: 'Identify credit, liquidity, and operational risks early with AI pattern recognition and anomaly detection.',
          examples: [
            'Establish automated AML (anti-money laundering) flags and rules',
            'Model credit default probabilities and exposure limits',
            'Run stress tests for extreme market volatility events',
            'Ensure regulatory reporting accuracy (Basel, Dodd-Frank, SOX)',
            'Formulate cyber fraud prevention protocols'
          ],
          prompt: 'Outline a financial risk assessment matrix for [business model], ranking risks by likelihood, severity, and mitigation controls.'
        }
      ]
    }
  }
};
# Contributing to LLM For Everyone 🤝

Thank you for your interest in contributing to **LLM For Everyone**! Our goal is to democratize practical AI literacy, contextual workflows, and vetted prompt recipes for learners and professionals across every discipline.

Whether you're adding a new prompt recipe, profiling an AI tool, writing an educational MDX article, fixing a bug, or improving UI accessibility, your contributions are warmly welcomed.

---

## 📋 Table of Contents

1. [Code of Conduct & Privacy First](#-code-of-conduct--privacy-first)
2. [Development Setup](#-development-setup)
3. [How to Add a Prompt Recipe](#-how-to-add-a-prompt-recipe)
4. [How to Add an AI Tool](#-how-to-add-an-ai-tool)
5. [How to Add an MDX Blog Post](#-how-to-add-an-mdx-blog-post)
6. [Code Style & Best Practices](#-code-style--best-practices)
7. [Submitting a Pull Request](#-submitting-a-pull-request)
8. [Credits & Links](#-credits--links)

---

## 🔒 Code of Conduct & Privacy First

- **100% Client-Side Privacy**: We do **not** collect user credentials, prompt logs, or personal telemetry. Any new feature must execute strictly client-side within the browser.
- **No "AI Slop"**: All prompts must be production-tested, clear, and context-engineered (incorporating roles, constraints, step-by-step reasoning, or structured outputs).
- **Constructive & Respectful**: Be kind and collaborative in discussions, reviews, and issues.

---

## 💻 Development Setup

### 1. Fork & Clone
```bash
git clone https://github.com/Axomiya-IT-Labs/llmforeveryone.git
cd llmforeveryone
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Verify Build & Linter
```bash
npm run build
npm run lint
```
Both commands must pass with **0 errors**.

---

## 🎯 How to Add a Prompt Recipe

All prompts are data-driven and modular.

### For Student Tracks (`src/data/studentTracks.ts`):
1. Open [`src/data/studentTracks.ts`](src/data/studentTracks.ts).
2. Append a new `ContentModule` object to `STUDENT_MODULES`:

```typescript
{
  id: 'eng_graphql_migrator',
  title: 'REST to GraphQL Schema & Resolver Generator',
  category: 'Engineering & CS',
  industry: 'student',
  academicLevel: 'undergraduate', // 'high_school' | 'undergraduate' | 'postgraduate' | 'phd'
  academicBranch: 'engineering',   // 'engineering' | 'medical' | 'arts_humanities' | 'business_commerce' | 'sciences' | 'law'
  content: 'Transform legacy REST endpoints into clean, typed GraphQL schemas with resolvers and N+1 DataLoader batching.',
  examples: [
    'Convert Express REST endpoints to Apollo Server SDL',
    'Generate TypeScript resolver type mappings',
    'Mitigate N+1 database queries with Dataloader patterns'
  ],
  prompt: `Act as a senior backend architect. 
I am migrating this REST endpoint: [Paste REST route & response JSON]
Tech stack: [e.g. Node.js, Apollo Server, PostgreSQL].

1. Provide the complete GraphQL type definition (TypeDefs).
2. Write the query/mutation resolver with error handling.
3. Suggest a DataLoader batch function to prevent N+1 query bottlenecks.`,
  difficulty: 'Intermediate', // 'Beginner' | 'Intermediate' | 'Advanced'
  timeSaveEstimate: 'Saves 4 hrs backend migration'
}
```

### For Professional Tracks (`src/data/professionalTracks.ts`):
1. Open [`src/data/professionalTracks.ts`](src/data/professionalTracks.ts).
2. Append to `PROFESSIONAL_MODULES` matching the target profession (`'doctor'`, `'nurse'`, `'teacher'`, `'software_developer'`, `'farmer'`, `'homemaker'`, `'founder'`, `'lawyer'`, `'finance'`, etc.).

> **Variable Rule**: Wrap customizable user parameters in square brackets (e.g. `[Peak load]`, `[Patient vitals]`). The UI will automatically generate live input fields and direct edit options for them!

---

## 🛠️ How to Add an AI Tool

To add an AI tool to the directory:

1. Open [`src/data/aiTools.ts`](src/data/aiTools.ts).
2. Add a new tool entry to `AI_TOOLS`:

```typescript
{
  id: 'cursor',
  name: 'Cursor IDE',
  category: 'Developer & Code',
  targetIndustries: ['technology', 'student'],
  tagline: 'The AI-native code editor built on VS Code with codebase indexing',
  description: 'Indexes your entire repository to autocomplete multi-file edits, debug errors, and generate full features.',
  url: 'https://cursor.com',
  pricing: 'Freemium', // 'Free' | 'Freemium' | 'Paid' | 'Open Source'
  bestFor: 'Full-stack software engineering, refactoring, and multi-file codebases',
}
```

> **Automatic Favicon Resolution**: You do **not** need to upload icons! The application automatically resolves high-resolution favicons using DuckDuckGo (`https://icons.duckduckgo.com/ip3/{domain}.ico`).

---

## 📰 How to Add an MDX Blog Post

Our blog uses an **instant auto-discovery engine** (`import.meta.glob`). When you add an MDX file, it is automatically parsed, indexed, and rendered in the blog directory with full markdown table support (`remark-gfm`).

### Step 1: Create a Folder and `index.mdx`
Create a new folder in `src/content/blog/<your-slug>/` and add `index.mdx`:

**Path**: `src/content/blog/how-to-write-better-prompts/index.mdx`

```mdx
---
title: "How to Write Better Prompts: 5 Rules for Clearer AI Responses"
excerpt: "Stop getting vague AI answers. Learn the 5 structural rules that turn generic outputs into high-precision results."
author: "Rakibul"
date: "2026-08-20"
readTime: "7 min read"
category: "Technique"
tags: ["prompt-engineering", "productivity", "best-practices"]
---

# How to Write Better Prompts: 5 Rules for Clearer AI Responses

Large Language Models (LLMs) thrive on clear constraints and domain context.

## Recommended Stack

| Tool | Primary Strength | Access Tier |
| :--- | :--- | :--- |
| **ChatGPT** | General problem solving & ideation | Free / Plus |
| **Claude** | Long context synthesis & analysis | Freemium |
| **Perplexity** | Real-time research with citations | Free / Pro |

## 1. Define the Persona Early
When prompting, always set the role upfront...
```

> **Author Note**: Setting `author: "Rakibul"` in the frontmatter automatically links the author name to `x.com/rkblailabs` on the published article page.

---

## 🎨 Code Style & Best Practices

- **TypeScript Strictness**: Always specify explicit types. Avoid `any`.
- **Zero Unused Variables**: The project enforces strict linter rules. Remove any unused variables or imports before committing.
- **Tailwind CSS v4**: Use modern utility classes with semantic tokens (`--stripe-violet`, `--stripe-cyan`, etc.).
- **Component Modularity**: Keep components decoupled and responsive across mobile, tablet, and desktop viewports.

---

## 🚀 Submitting a Pull Request

1. **Branch Naming**:
   ```bash
   git checkout -b feat/add-farmer-prompts
   # or
   git checkout -b fix/table-mobile-wrap
   ```

2. **Commit Message Format**:
   Use standard conventional commits:
   - `feat: add nursing triage prompt recipes`
   - `fix: correct favicon resolution in tools directory`
   - `docs: update contributing guide for MDX blog`

3. **Verify Build**:
   ```bash
   npm run build
   npm run lint
   ```

4. **Push & Open PR**:
   Push your branch and open a Pull Request against the `main` branch. Provide a clear description and screenshot if UI changes were made.

---

## 🌐 Credits & Links

Created & Maintained with ❤️ by **[Axomiya IT Labs](https://axomiyaitlabs.vercel.app/)**.
- **Live App**: [https://llmforeveryone.netlify.app/](https://llmforeveryone.netlify.app/)
- **GitHub**: [https://github.com/Axomiya-IT-Labs/llmforeveryone](https://github.com/Axomiya-IT-Labs/llmforeveryone)
- **Organization**: [https://github.com/Axomiya-IT-Labs](https://github.com/Axomiya-IT-Labs)
- **X (Twitter)**: [https://x.com/AxomiyaITLabs](https://x.com/AxomiyaITLabs)
- **Author X**: [https://x.com/rkblailabs](https://x.com/rkblailabs)

import type { UserProfile, ContentModule } from '../types';
import { CONTENT_LIBRARY } from '../data/contentLibrary';
import { STUDENT_MODULES } from '../data/studentTracks';
import { PROFESSIONAL_MODULES, ALL_PROFESSIONS } from '../data/professionalTracks';
import { Sparkles } from 'lucide-react';

export function generateContent(user: UserProfile): ContentModule[] {
  const modules: ContentModule[] = [];

  if (user.type === 'student') {
    // 1. Level-specific student modules
    if (user.academicLevel) {
      const levelMods = STUDENT_MODULES.filter(m => m.academicLevel === user.academicLevel);
      modules.push(...levelMods);
    }

    // 2. Branch-specific student modules
    if (user.academicBranch) {
      const branchMods = STUDENT_MODULES.filter(m => m.academicBranch === user.academicBranch);
      branchMods.forEach(bm => {
        if (!modules.some(existing => existing.id === bm.id)) {
          modules.push(bm);
        }
      });
    }

    // 3. Fallback to general student library modules if needed
    if (modules.length === 0 && CONTENT_LIBRARY.student?.modules) {
      modules.push(...CONTENT_LIBRARY.student.modules);
    }
  } else {
    // Professional or Lifelong Learner track
    const profId = user.professionCategory || user.field;

    // 1. Look in new dedicated PROFESSIONAL_MODULES
    if (profId) {
      const specificMods = PROFESSIONAL_MODULES.filter(m => m.industry === profId);
      modules.push(...specificMods);
    }

    // 2. Look in existing CONTENT_LIBRARY professional map
    if (profId && CONTENT_LIBRARY.professional?.[profId]?.modules) {
      CONTENT_LIBRARY.professional[profId].modules.forEach(m => {
        if (!modules.some(existing => existing.id === m.id)) {
          modules.push(m);
        }
      });
    }

    // 3. If field matches a legacy profession or branch
    if (modules.length === 0 && user.field && CONTENT_LIBRARY.professional?.[user.field]?.modules) {
      modules.push(...CONTENT_LIBRARY.professional[user.field].modules);
    }

    // 4. Fallback default
    if (modules.length === 0) {
      modules.push(...PROFESSIONAL_MODULES.slice(0, 4));
    }
  }

  // Find human-readable label
  const roleLabel = user.type === 'student' 
    ? `${user.academicLevel ? user.academicLevel.replace('_', ' ').toUpperCase() : 'STUDENT'} • ${user.academicBranch ? user.academicBranch.replace('_', ' ').toUpperCase() : 'GENERAL'}`
    : ALL_PROFESSIONS.find(p => p.id === (user.professionCategory || user.field))?.label || user.field || 'PROFESSIONAL';

  // Add a personalized roadmap summary module at the end
  modules.push({
    id: 'tailored_action_plan',
    title: `30-Day ${roleLabel} AI Roadmap`,
    category: 'Action Strategy',
    icon: Sparkles,
    content: `Based on your personalized profile as ${roleLabel}, you now have a tailored action plan. Implement 1 high-leverage prompt weekly to compound your productivity and save 8-15 hours every week.`,
    examples: [
      'Day 1-7: Run your primary prompt daily and refine your standard bracket variables',
      'Day 8-14: Build a personal prompt library in Notion, Obsidian, or browser bookmarks',
      'Day 15-21: Integrate secondary AI tools (e.g. NotebookLM, Perplexity, Cursor)',
      'Day 22-30: Measure weekly time reclaimed and share proven templates with peers'
    ],
    prompt: `Act as a senior advisor and AI context engineer specializing in [${roleLabel}].
I want to establish a world-class AI workflow for my role.
My primary goals: [${user.interests?.join(', ') || 'Increase output, reduce routine drag, accelerate learning'}].
Experience level: [${user.experience || 'Intermediate'}].

Create a comprehensive 4-week execution blueprint:
1. Week 1: 3 quick-win automated prompt templates with input/output examples.
2. Week 2: Tool integration workflow (recommended models and extensions).
3. Week 3: Safety, accuracy verification, and ethical guardrails for my domain.
4. Week 4: Advanced prompt chaining technique for complex multi-step tasks.`,
    difficulty: 'Advanced',
    timeSaveEstimate: '10-15 hrs/week'
  });

  return modules;
}
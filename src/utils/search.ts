import { CONTENT_LIBRARY } from '../data/contentLibrary';
import { PROFESSIONS } from '../data/professions';
import { STUDENT_MODULES } from '../data/studentTracks';
import { PROFESSIONAL_MODULES, ALL_PROFESSIONS } from '../data/professionalTracks';
import type { ContentModule } from '../types';

export function getAllModules(): ContentModule[] {
  const list: ContentModule[] = [];
  const seenIds = new Set<string>();

  // 1. Add all new student modules
  STUDENT_MODULES.forEach((m) => {
    if (!seenIds.has(m.id)) {
      seenIds.add(m.id);
      list.push({
        ...m,
        industry: 'student',
        category: m.category || 'Students & Academics',
        timeSaveEstimate: m.timeSaveEstimate || '5-8 hrs/week',
        difficulty: m.difficulty || 'Intermediate',
      });
    }
  });

  // 2. Add all new professional modules
  PROFESSIONAL_MODULES.forEach((m) => {
    if (!seenIds.has(m.id)) {
      seenIds.add(m.id);
      const profMeta = ALL_PROFESSIONS.find(p => p.id === m.industry);
      list.push({
        ...m,
        industry: m.industry || 'professional',
        category: profMeta?.label || m.category || 'Professional Workflow',
        timeSaveEstimate: m.timeSaveEstimate || '8-15 hrs/week',
        difficulty: m.difficulty || 'Intermediate',
      });
    }
  });

  // 3. Add legacy student modules if not duplicate
  if (CONTENT_LIBRARY.student?.modules) {
    CONTENT_LIBRARY.student.modules.forEach((m: ContentModule) => {
      if (!seenIds.has(m.id)) {
        seenIds.add(m.id);
        list.push({
          ...m,
          industry: 'student',
          category: 'Students & Academics',
          timeSaveEstimate: '5-8 hrs/week',
          difficulty: 'Beginner',
        });
      }
    });
  }

  // 4. Add legacy professional modules
  if (CONTENT_LIBRARY.professional) {
    Object.keys(CONTENT_LIBRARY.professional).forEach((profKey) => {
      const prof = CONTENT_LIBRARY.professional[profKey];
      const profMeta = PROFESSIONS.find(p => p.id === profKey);
      if (prof?.modules) {
        prof.modules.forEach((m: ContentModule) => {
          if (!seenIds.has(m.id)) {
            seenIds.add(m.id);
            list.push({
              ...m,
              industry: profKey,
              category: profMeta?.label || prof.title,
              timeSaveEstimate: '8-15 hrs/week',
              difficulty: m.id.includes('architecture') || m.id.includes('risk') ? 'Advanced' : 'Intermediate',
            });
          }
        });
      }
    });
  }

  return list;
}

export function filterModules(
  modules: ContentModule[],
  industry: string,
  searchQuery: string
): ContentModule[] {
  let filtered = modules;

  if (industry && industry !== 'all') {
    filtered = filtered.filter(m => 
      m.industry === industry || 
      m.category?.toLowerCase().includes(industry.toLowerCase())
    );
  }

  if (searchQuery && searchQuery.trim()) {
    const q = searchQuery.toLowerCase().trim();
    filtered = filtered.filter(m => 
      m.title.toLowerCase().includes(q) ||
      m.content.toLowerCase().includes(q) ||
      (m.prompt && m.prompt.toLowerCase().includes(q)) ||
      (m.category && m.category.toLowerCase().includes(q)) ||
      (m.examples && m.examples.some(e => e.toLowerCase().includes(q)))
    );
  }

  return filtered;
}

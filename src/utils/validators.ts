import type { UserProfile } from '../types';

export function isStepComplete(user: UserProfile, step: number): boolean {
  switch (step) {
    case 0: // User Type
      return user.type !== '';
    case 1: // Profession
      return user.field !== '';
    case 2: // Interests
      return user.interests.length > 0;
    case 3: // Experience
      return user.experience !== '';
    case 4: // Usage
      return user.usage.length > 0;
    default:
      return false;
  }
}

export function getStepProgress(user: UserProfile): number {
  const steps = [0, 1, 2, 3, 4];
  const completed = steps.filter(step => isStepComplete(user, step)).length;
  return (completed / steps.length) * 100;
}

export function getMissingFields(user: UserProfile): string[] {
  const missing: string[] = [];
  if (!user.type) missing.push('User Type');
  if (!user.field) missing.push('Profession');
  if (user.interests.length === 0) missing.push('Interests');
  if (!user.experience) missing.push('Experience Level');
  if (user.usage.length === 0) missing.push('AI Usage');
  return missing;
}
import type { ElementType } from 'react';

export type UserRole = 'student' | 'professional' | 'lifelong_learner' | '';

export type AcademicLevel = 
  | 'high_school' 
  | 'undergraduate' 
  | 'postgraduate' 
  | 'phd' 
  | 'vocational';

export type AcademicBranch = 
  | 'engineering' 
  | 'medical' 
  | 'arts_humanities' 
  | 'business_commerce' 
  | 'sciences' 
  | 'law' 
  | 'general_studies';

export type UserProfile = {
  type: UserRole;
  academicLevel?: AcademicLevel;
  academicBranch?: AcademicBranch;
  professionCategory?: string;
  field: string;
  interests: string[];
  experience: string;
  usage: string[];
};

export type ContentModule = {
  id: string;
  title: string;
  category?: string;
  industry?: string;
  targetRole?: string;
  academicLevel?: AcademicLevel;
  academicBranch?: AcademicBranch;
  content: string;
  examples: string[];
  prompt: string;
  icon?: ElementType;
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
  timeSaveEstimate?: string;
};

export type AITool = {
  id: string;
  name: string;
  category: string;
  targetIndustries: string[];
  tagline: string;
  description: string;
  url: string;
  pricing: 'Free' | 'Freemium' | 'Paid' | 'Open Source';
  bestFor: string;
  iconName?: string;
  featured?: boolean;
};

export type Profession = {
  id: string;
  label: string;
  icon: ElementType;
  color: string;
  description: string;
  categoryGroup?: 'stem' | 'healthcare' | 'business_growth' | 'lifestyle_general' | 'creative';
  popularPrompt?: string;
  moduleCount?: number;
  recommendedToolIds?: string[];
  whyAI?: string;
  howToStart?: string[];
};

export type Interest = {
  id: string;
  label: string;
  icon: ElementType;
  description?: string;
};

export type ExperienceLevel = {
  id: string;
  label: string;
  description: string;
};

export type UserType = {
  id: 'student' | 'professional' | 'lifelong_learner';
  label: string;
  icon: ElementType;
  description: string;
  badge?: string;
};

export type NavView = 'home' | 'explorer' | 'wizard' | 'tools' | 'guide' | 'blog';

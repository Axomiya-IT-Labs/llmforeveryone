import type { Profession } from '../types';
import { 
  Zap, BookOpen, TrendingUp, Scale, 
  Megaphone, Palette, Briefcase, Stethoscope
} from 'lucide-react';

export const PROFESSIONS: Profession[] = [
  { 
    id: 'technology', 
    label: 'Technology & Engineering', 
    icon: Zap, 
    color: '#00d4ff',
    description: 'Software development, IT, engineering, and technical roles'
  },
  { 
    id: 'healthcare', 
    label: 'Healthcare & Medicine', 
    icon: Stethoscope, 
    color: '#00ff88',
    description: 'Doctors, nurses, medical researchers, and healthcare professionals'
  },
  { 
    id: 'education', 
    label: 'Education & Teaching', 
    icon: BookOpen, 
    color: '#a855f7',
    description: 'Teachers, professors, trainers, and educational professionals'
  },
  { 
    id: 'business', 
    label: 'Business & Management', 
    icon: Briefcase, 
    color: '#f59e0b',
    description: 'Business leaders, managers, entrepreneurs, and executives'
  },
  { 
    id: 'law', 
    label: 'Law & Legal', 
    icon: Scale, 
    color: '#ef4444',
    description: 'Lawyers, paralegals, legal researchers, and legal professionals'
  },
  { 
    id: 'marketing', 
    label: 'Marketing & Advertising', 
    icon: Megaphone, 
    color: '#ec4899',
    description: 'Marketers, advertisers, content creators, and brand managers'
  },
  { 
    id: 'design', 
    label: 'Design & Creative', 
    icon: Palette, 
    color: '#f472b6',
    description: 'Designers, artists, creative directors, and visual professionals'
  },
  { 
    id: 'finance', 
    label: 'Finance & Accounting', 
    icon: TrendingUp, 
    color: '#22d3ee',
    description: 'Financial analysts, accountants, investors, and banking professionals'
  },
];
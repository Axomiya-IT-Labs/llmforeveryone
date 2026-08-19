import type { UserType } from '../types';
import { GraduationCap, Briefcase } from 'lucide-react';

export const USER_TYPES: UserType[] = [
  { 
    id: 'student', 
    label: 'Student', 
    icon: GraduationCap, 
    description: 'Currently learning, studying, or exploring careers' 
  },
  { 
    id: 'professional', 
    label: 'Professional', 
    icon: Briefcase, 
    description: 'Working in a specific industry or role' 
  },
];
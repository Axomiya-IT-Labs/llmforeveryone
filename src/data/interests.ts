import type { Interest } from '../types';
import { 
  Zap, 
  BookOpen, 
  Bot, 
  BarChart3, 
  Palette, 
  Microscope, 
  PenLine, 
  Target 
} from 'lucide-react';

export const INTERESTS: Interest[] = [
  { id: 'productivity', label: 'Productivity & Efficiency', icon: Zap, description: 'Speed up workflows and eliminate repetitive tasks' },
  { id: 'learning', label: 'Learning & Development', icon: BookOpen, description: 'Master new topics and accelerate comprehension' },
  { id: 'automation', label: 'Automation & Process', icon: Bot, description: 'Build continuous AI-driven pipelines and agents' },
  { id: 'analysis', label: 'Data & Analytics', icon: BarChart3, description: 'Extract actionable insights and pattern analysis' },
  { id: 'creative', label: 'Creative & Content', icon: Palette, description: 'Brainstorm concepts, art, and visual ideas' },
  { id: 'research', label: 'Research & Discovery', icon: Microscope, description: 'Synthesize papers, trends, and evidence' },
  { id: 'communication', label: 'Communication & Writing', icon: PenLine, description: 'Draft emails, proposals, and polished copy' },
  { id: 'strategy', label: 'Strategy & Planning', icon: Target, description: 'Scenario modeling and roadmap planning' },
];
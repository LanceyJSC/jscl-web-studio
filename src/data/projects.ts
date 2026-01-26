import sceneburnPreview from '@/assets/projects/sceneburn-preview.png';
import noteflowPreview from '@/assets/projects/noteflow-preview.png';
import noteflowScreenshot from '@/assets/projects/noteflow-screenshot.png';
import refinematchPreview from '@/assets/projects/refinematch-preview.png';

export interface Project {
  id: number;
  slug: string;
  title: string;
  category: string;
  year: string;
  image: string;
  externalLink: string;
  // Detail page content
  headline: string;
  description: string;
  challenge: string;
  solution: string;
  technologies: string[];
  role: string;
  duration: string;
  screenshots: string[];
}

export const projects: Project[] = [
  {
    id: 1,
    slug: 'sceneburn',
    title: 'Sceneburn',
    category: 'Film & TV Tracker',
    year: '2025',
    image: sceneburnPreview,
    externalLink: 'https://sceneburn.com/',
    headline: 'A modern film and TV tracking experience',
    description: 'Sceneburn is a comprehensive film and television tracking platform that allows users to discover, track, and share their viewing experiences. The platform features a sleek, dark interface with rich media content and social features.',
    challenge: 'The challenge was to create an engaging platform that could compete with established players while offering a unique, more cinematic experience. Users needed an intuitive way to track their watch history, discover new content, and connect with other film enthusiasts.',
    solution: 'I designed a visually immersive interface that puts content first. The dark theme with vibrant accent colors creates a theater-like atmosphere. Smart recommendations and social features keep users engaged, while the clean UI ensures easy navigation through extensive libraries.',
    technologies: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'PostgreSQL', 'TMDB API'],
    role: 'Lead Designer & Frontend Developer',
    duration: '6 months',
    screenshots: [sceneburnPreview],
  },
  {
    id: 2,
    slug: 'noteflow',
    title: 'NoteFlow',
    category: 'Productivity App',
    year: '2025',
    image: noteflowPreview,
    externalLink: 'https://jscl.lovable.app',
    headline: 'Streamlined task and note management',
    description: 'NoteFlow is a modern productivity application that combines task management, note-taking, and project organization into one seamless experience. The dark-themed interface prioritizes focus and reduces eye strain during long work sessions.',
    challenge: 'Users often juggle multiple productivity tools, leading to fragmented workflows and lost information. The goal was to create a unified workspace that handles tasks, notes, and projects without overwhelming users.',
    solution: 'I designed an intuitive dashboard that surfaces the most important information first. The sidebar navigation provides quick access to all features, while the statistics overview helps users stay on track with their goals. Smart categorization and a clean visual hierarchy ensure nothing falls through the cracks.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Framer Motion'],
    role: 'Full Stack Developer & Designer',
    duration: '4 months',
    screenshots: [noteflowScreenshot],
  },
  {
    id: 3,
    slug: 'refinematch',
    title: 'RefineMatch',
    category: 'AI Career Tool',
    year: '2025',
    image: refinematchPreview,
    externalLink: 'https://refinematch.com/',
    headline: 'AI-powered CV optimization for job seekers',
    description: 'RefineMatch is an intelligent career optimization platform that analyzes CVs against job descriptions. It provides compatibility scores, identifies skill gaps, suggests keyword improvements, and generates tailored cover letters to maximize application success rates.',
    challenge: 'Job seekers often struggle to tailor their CVs for specific positions, missing crucial keywords and failing to highlight relevant experience. The disconnect between what hiring systems look for and how candidates present themselves leads to qualified applicants being overlooked.',
    solution: 'I built an AI-powered analysis engine that compares CVs against job requirements in real-time. The platform provides actionable insights including compatibility scores, keyword recommendations, and personalized cover letter generation - all wrapped in a clean, accessible interface.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'AI/LLM Integration', 'Supabase'],
    role: 'Solo Developer & Designer',
    duration: '3 months',
    screenshots: [refinematchPreview],
  },
];

export const getProjectBySlug = (slug: string): Project | undefined => {
  return projects.find(p => p.slug === slug);
};
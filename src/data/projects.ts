import sceneburnPreview from '@/assets/projects/sceneburn-preview.png';
import noteflowPreview from '@/assets/projects/noteflow-preview.png';

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
    solution: 'We designed a visually immersive interface that puts content first. The dark theme with vibrant accent colors creates a theater-like atmosphere. Smart recommendations and social features keep users engaged, while the clean UI ensures easy navigation through extensive libraries.',
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
    solution: 'We designed an intuitive dashboard that surfaces the most important information first. The sidebar navigation provides quick access to all features, while the statistics overview helps users stay on track with their goals. Smart categorization and a clean visual hierarchy ensure nothing falls through the cracks.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Framer Motion'],
    role: 'Full Stack Developer & Designer',
    duration: '4 months',
    screenshots: [noteflowPreview],
  },
];

export const getProjectBySlug = (slug: string): Project | undefined => {
  return projects.find(p => p.slug === slug);
};
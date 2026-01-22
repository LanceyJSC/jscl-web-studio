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
  {
    id: 3,
    slug: 'vanguard-capital',
    title: 'Vanguard Capital',
    category: 'Investment Banking',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop',
    externalLink: '#',
    headline: 'Redefining investment management',
    description: 'Vanguard Capital is an investment banking platform that streamlines portfolio management and client communications. The system integrates complex financial data into actionable insights.',
    challenge: 'Investment banks deal with vast amounts of data across multiple systems. Analysts needed a unified view of portfolios, market data, and client information without switching between applications.',
    solution: 'We created a centralized dashboard that aggregates data from multiple sources. Custom visualizations help analysts spot trends quickly, while automated reporting reduces manual work by 60%.',
    technologies: ['React', 'TypeScript', 'Python', 'PostgreSQL', 'AWS', 'Tableau'],
    role: 'Product Designer',
    duration: '10 months',
    screenshots: ['https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop'],
  },
  {
    id: 4,
    slug: 'helix-health',
    title: 'Helix Health',
    category: 'Biotech Dashboard',
    year: '2022',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2670&auto=format&fit=crop',
    externalLink: '#',
    headline: 'Data-driven healthcare innovation',
    description: 'Helix Health is a biotech analytics platform that helps researchers visualize complex genomic data and track clinical trial progress. The system democratizes access to cutting-edge research tools.',
    challenge: 'Genomic research generates massive datasets that are difficult to interpret. Researchers needed intuitive visualizations that could reveal patterns without requiring deep technical expertise.',
    solution: 'We designed interactive data visualizations that make complex genomic information accessible. Machine learning models highlight significant findings, while collaboration tools enable global research teams to work together seamlessly.',
    technologies: ['React', 'TypeScript', 'Python', 'TensorFlow', 'D3.js', 'AWS'],
    role: 'UI Designer & Data Visualization',
    duration: '12 months',
    screenshots: ['https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2670&auto=format&fit=crop'],
  },
  {
    id: 5,
    slug: 'mono-architectural',
    title: 'Mono Architectural',
    category: 'Real Estate',
    year: '2022',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop',
    externalLink: '#',
    headline: 'Architectural visualization reimagined',
    description: 'Mono Architectural is a real estate platform that showcases luxury properties through immersive 3D experiences. The platform combines stunning visuals with practical property management tools.',
    challenge: 'High-end real estate requires presentation that matches the quality of the properties. Traditional listings fail to capture the essence of luxury spaces and the experience of being there.',
    solution: 'We created an immersive viewing experience with 3D walkthroughs, drone footage integration, and interactive floor plans. The minimalist interface ensures the properties remain the focus while providing all necessary information.',
    technologies: ['React', 'Three.js', 'WebGL', 'Framer Motion', 'Sanity CMS', 'Vercel'],
    role: 'Creative Director',
    duration: '4 months',
    screenshots: ['https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop'],
  }
];

export const getProjectBySlug = (slug: string): Project | undefined => {
  return projects.find(p => p.slug === slug);
};
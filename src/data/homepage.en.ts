import type { HomepageCopy } from './homepage';

export const homepageEn: HomepageCopy = {
  hero: {
    title: {
      part1: 'Building with AI,',
      highlight: 'unstoppable',
      part2: ' development.',
    },
    subtitle:
      'From adopting and operationalizing AI-driven development (AI-DLC) to full-stack delivery including UI/UX — an engineer who makes AI run reliably.',
    ctaPrimary: 'View works',
    ctaSecondary: 'About me',
  },
  introduction: {
    title: 'About Me',
    subtitle: 'My profile and achievements',
    profile: {
      name: 'Akimasa Sugai',
      description:
        'I leverage a broad technical stack from frontend to backend and infrastructure to deliver solutions that contribute to business growth.',
      cta: 'View full profile',
    },
    metrics: {
      developmentExperience: {
        title: 'Experience',
        unit: 'yrs',
        cta: 'See career',
      },
      projectCount: {
        title: 'Projects',
        unit: '',
        cta: 'See works',
      },
      personalProjectCount: {
        title: 'Personal',
        unit: '',
        cta: 'See works',
      },
    },
    cards: {
      github: {
        title: 'GitHub',
        cta: 'View repositories',
      },
      interests: {
        title: 'Interests & Values',
        description: 'Interests and values',
        cta: 'Learn more',
      },
      techStack: {
        title: 'Tech Stack',
        description: 'Development experience with a modern tech stack',
        cta: 'See skills',
      },
    },
  },
  achievements: {
    scrollText: 'A few of my works',
    description: 'Click any item to see more details',
  },
  additionalAchievements: {
    title: 'Works',
    subtitle: 'A selection of past projects.',
    categories: {
      company: 'Company',
      freelance: 'Freelance',
      personal: 'Personal',
    },
    categoryPlaceholder: 'Category',
    all: 'All',
    searchPlaceholder: 'Search projects...',
    notFound: 'No projects match your filters',
    viewAll: 'View all works',
  },
  cta: {
    title: 'Contact',
    subtitle: 'Get in touch',
    contact: {
      title: 'Contact',
      description:
        'Feel free to reach out with any questions about\nproduct development or technology.',
      buttonText: 'Get in touch',
    },
    availability: {
      email: 'Email',
    },
  },
};

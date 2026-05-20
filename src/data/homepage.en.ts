import type { HomepageCopy } from './homepage';

export const homepageEn: HomepageCopy = {
  hero: {
    title: {
      part1: 'Creating ',
      highlight: 'maximum value',
      part2: ' from minimal resources',
    },
    subtitle: 'As a product engineer, turning your vision into reality',
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
    subtitle: 'Inquiries & estimates',
    contact: {
      title: 'Chat inquiry',
      description:
        'Feel free to reach out with any questions or requests.\nI respond in real time.',
      buttonText: 'Get in touch',
    },
    estimate: {
      title: 'Estimate',
      description:
        'Our AI-powered estimation system delivers\nfast and accurate quotes.',
      buttonText: 'Request an estimate',
    },
    availability: {
      title: 'Availability',
      timeSlot: 'Time slot',
      email: 'Email',
      phone: 'Phone',
      meetingSchedule: 'Schedule a meeting',
      status: {
        available: 'Available',
        consultation: 'On request',
        unavailable: 'Unavailable',
      },
      days: {
        monday: 'Mon',
        tuesday: 'Tue',
        wednesday: 'Wed',
        thursday: 'Thu',
        friday: 'Fri',
        saturday: 'Sat',
        sunday: 'Sun',
        holiday: 'Hol',
      },
    },
  },
};

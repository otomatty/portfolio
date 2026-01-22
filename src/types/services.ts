/**
 * Service type definition
 */
export interface Service {
  title: string;
  description: string;
  features: string[];
  price: string;
  technologies: string[];
}

/**
 * Process step type definition
 */
export interface ProcessStep {
  step: number;
  title: string;
  description: string;
  duration: string;
}

/**
 * FAQ item type definition
 */
export interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}

/**
 * Pricing plan type definition
 */
export interface PricingPlan {
  title: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  highlighted?: boolean;
}

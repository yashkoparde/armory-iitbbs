/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Plan {
  id: string;
  name: string;
  description: string;
  basePrice: number; // monthly price in USD
  features: string[];
  ctaText: string;
  popular?: boolean;
}

export type CurrencyCode = 'USD' | 'INR' | 'EUR';

export interface Currency {
  code: CurrencyCode;
  symbol: string;
  regionalMultiplier: number;
}

export interface PricingConfig {
  plans: Plan[];
  currencies: Currency[];
  annualDiscount: number; // multiplier, e.g., 0.8 for 20% discount
}

export interface CaseStudy {
  id: string;
  year: string;
  company: string;
  title: string;
  description: string;
  color: string;
  glowColor: string;
  logo: string;
}

export interface BentoItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  gridClass: string;
  badge?: string;
}

export interface WorkflowNode {
  id: string;
  type: 'trigger' | 'action' | 'condition' | 'agent';
  label: string;
  description: string;
  status?: 'idle' | 'running' | 'success' | 'failed';
  x: number;
  y: number;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQCategory {
  id: string;
  label: string;
  questions: FAQItem[];
}

export interface Testimonial {
  id: string;
  company: string;
  quote: string;
  author: string;
  role: string;
  rating: number;
  avatarLetter: string;
}

export interface Insight {
  id: string;
  title: string;
  category: string;
  readTime: string;
  date: string;
  description: string;
  imageAccent: string;
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CaseStudy, BentoItem, FAQCategory, Testimonial, Insight, PricingConfig } from '../types';

export const caseStudies: CaseStudy[] = [
  {
    id: 'cigna',
    year: '//2026',
    company: 'Cigna Health Systems',
    title: 'Automating patient document routing and diagnostic processing pipelines for health systems.',
    description: 'Automated 84% of clinical document indexing and ingestion, reducing processing queue backlogs to zero.',
    color: '#FFC801', // Forsythia
    glowColor: 'rgba(255, 200, 1, 0.25)',
    logo: 'Cigna'
  },
  {
    id: 'aetna',
    year: '//2026',
    company: 'Aetna Data Ecosystem',
    title: 'Secure patient record synchronization and access auditing for insurance networks.',
    description: 'Constructed an encrypted query engine serving 1.2M daily active policy audits with zero downtime.',
    color: '#FF9932', // Deep Saffron
    glowColor: 'rgba(255, 153, 50, 0.25)',
    logo: 'Aetna'
  },
  {
    id: 'anthem',
    year: '//2026',
    company: 'Anthem Networks',
    title: 'Automated provider inquiry routing and support dispatching for regional networks.',
    description: 'Connected 12 isolated database endpoints into a singular unified pipeline answering custom inquiries.',
    color: '#D9E8E2', // Mystic Mint
    glowColor: 'rgba(217, 232, 226, 0.25)',
    logo: 'Anthem'
  }
];

export const bentoItems: BentoItem[] = [
  {
    id: 'canvas',
    title: 'Infinite Visual Canvas',
    subtitle: 'INTERACTIVE ARCHITECTURE',
    description: 'Map out workflow steps on a high-precision grid. Drag and drop triggers, logic gates, and data actions to construct pipelines in real-time.',
    gridClass: 'md:col-span-2 md:row-span-1',
    badge: 'Core Engine'
  },
  {
    id: 'autonomous',
    title: 'Automated Execution',
    subtitle: 'SELF-HEALING FLOWS',
    description: 'Run complex data workflows without manual intervention. Our active handler intercepts exceptions, triggers failovers, and auto-recovers state.',
    gridClass: 'md:col-span-1 md:row-span-1'
  },
  {
    id: 'encryption',
    title: 'End-to-End Encryption',
    subtitle: 'ENTERPRISE GUARD',
    description: 'Every connection endpoint, API credential, and data transfer pipeline is shielded by AES-256 and TLS 1.3 encryption. Complete zero-knowledge workspace guarantees.',
    gridClass: 'md:col-span-1 md:row-span-1'
  },
  {
    id: 'stack',
    title: 'Production-Ready Stack',
    subtitle: 'NATIVE CONNECTORS',
    description: 'Connect core databases, mainframe systems, and external APIs in seconds. Scale horizontally with zero pipeline friction or compilation bottlenecks.',
    gridClass: 'md:col-span-2 md:row-span-1',
    badge: 'Hot-Swap'
  }
];

export const pricingConfig: PricingConfig = {
  plans: [
    {
      id: 'starter',
      name: 'Starter Plan',
      description: 'Ideal for teams introducing automated data pipelines and processes.',
      basePrice: 149,
      features: [
        'Up to 3 active workflow pipelines',
        '10,000 monthly execution runs',
        'Standard visual canvas access',
        'Standard database connectors',
        'Next-day email support',
        '99.5% uptime SLA'
      ],
      ctaText: 'Start Starter Trial'
    },
    {
      id: 'pro',
      name: 'Professional',
      description: 'Our most popular plan for scaling operations with dedicated workflow pipelines.',
      basePrice: 499,
      features: [
        'Up to 15 active workflow pipelines',
        '100,000 monthly execution runs',
        'Self-healing workflow engines',
        'All standard & premium connectors',
        'Dedicated workspace team chat',
        '99.9% uptime SLA',
        'Administrative audit logs'
      ],
      ctaText: 'Deploy Pro Account',
      popular: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise Matrix',
      description: 'Custom solutions for high-frequency infrastructure and total compliance.',
      basePrice: 1249,
      features: [
        'Unlimited custom workflow pipelines',
        'Unlimited monthly runs',
        'Dedicated virtual machine instances',
        'SOC 2 Type II compliance reporting',
        'Guaranteed <15min priority support',
        '99.99% custom uptime SLA contract',
        'On-premise hybrid networking options'
      ],
      ctaText: 'Initiate Enterprise Demo'
    }
  ],
  currencies: [
    { code: 'USD', symbol: '$', regionalMultiplier: 1.0 },
    { code: 'EUR', symbol: '€', regionalMultiplier: 0.92 },
    { code: 'INR', symbol: '₹', regionalMultiplier: 83.4 }
  ],
  annualDiscount: 0.8 // 20% discount applied to annual billing (annualPrice = baseMonthlyPrice * 12 * 0.8)
};

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    company: 'Vertex Labs',
    quote: 'The reliability of Armory is unmatched. We migrated our entire data processing pipeline to their edge servers with zero downtime for our active enterprise customers.',
    author: 'Sarah Jenkins',
    role: 'VP of Platform Engineering',
    rating: 5,
    avatarLetter: 'S'
  },
  {
    id: 't2',
    company: 'Resolute AI',
    quote: 'Instead of building our own custom workflow handlers from scratch, we adopted Armory. We went from a primitive sandbox demo to a scalable production deployment in weeks.',
    author: 'David Chen',
    role: 'Principal Architect',
    rating: 5,
    avatarLetter: 'D'
  },
  {
    id: 't3',
    company: 'Neural Sync',
    quote: 'The real-time telemetry logs let our monitoring systems observe pipeline outputs instantly. It has become a foundational component of our active validation workflows.',
    author: 'Elena Rostova',
    role: 'Director of Platform Safety',
    rating: 5,
    avatarLetter: 'E'
  },
  {
    id: 't4',
    company: 'Sentinel Ops',
    quote: 'Armory\'s visual workflow builder was a complete game-changer for our non-technical teams. Now they can audit and tune automation triggers without writing code.',
    author: 'Marcus Vance',
    role: 'Head of Operations',
    rating: 5,
    avatarLetter: 'M'
  }
];

export const faqCategories: FAQCategory[] = [
  {
    id: 'overview',
    label: 'Overview',
    questions: [
      {
        question: 'What is the Armory platform?',
        answer: 'Armory is an enterprise-grade Data Automation Platform designed to orchestrate, execute, and monitor complex data pipelines. It provides an intuitive, high-performance visual canvas alongside bulletproof security and instant API connectors.'
      },
      {
        question: 'Who is this template and platform designed for?',
        answer: 'Armory is built specifically for software engineering groups, database architects, and automation teams who require highly reliable data pipelines and can\'t afford the downtime or high overhead of unmonitored scripts or brittle custom handlers.'
      },
      {
        question: 'Does Armory provide pre-built templates?',
        answer: 'Yes! Armory ships with a wide array of ready-to-use template workflow blocks for data ingestion, document parsing, system health monitoring, notification dispatching, and automated compliance auditing.'
      }
    ]
  },
  {
    id: 'security',
    label: 'Security',
    questions: [
      {
        question: 'How is our database and workflow data encrypted?',
        answer: 'All data is encrypted in transit using TLS 1.3 and at rest via AES-256. API keys and passwords are stored in a dedicated zero-knowledge hardware security module (HSM) that Armory servers cannot access directly.'
      },
      {
        question: 'Is Armory compliant with industry standards like SOC2?',
        answer: 'Absolutely. We are fully SOC 2 Type II certified and offer automated compliance reports for GDPR, HIPAA, and CCPA standards. Our enterprise tier includes isolated workspace deployments with full network egress policies.'
      }
    ]
  },
  {
    id: 'protocols',
    label: 'Protocols',
    questions: [
      {
        question: 'What integrations and database protocols do you support?',
        answer: 'We support PostgreSQL, MongoDB, Snowflake, Amazon S3, Google Sheets, Slack, Teams, GitHub, and custom REST/GraphQL endpoints. If you have legacy mainframe needs, we provide gRPC bridge services.'
      },
      {
        question: 'Can we run Armory pipelines entirely on-premise?',
        answer: 'Yes. Enterprise tiers support hybrid networking where pipelines run inside your private VPC while receiving visual workspace updates securely from our cloud coordinator.'
      }
    ]
  },
  {
    id: 'licensing',
    label: 'Licensing',
    questions: [
      {
        question: 'Is there a limit on how many active pipelines I can build?',
        answer: 'Limits are based on your selected tier. The Starter plan permits up to 3 active pipelines, Pro permits up to 15, and our Enterprise tier provides completely unlimited custom pipeline definitions.'
      },
      {
        question: 'How do you structure your billing regional multiplier?',
        answer: 'To ensure global accessibility, we utilize a regional purchasing parity pricing model with a multidimensional config engine, translating baseline USD to EUR or INR fairly based on regional standard purchasing indices.'
      }
    ]
  }
];

export const insights: Insight[] = [
  {
    id: 'i1',
    title: 'What It Takes to Turn Automation Into a Business Asset',
    category: 'STRATEGY',
    readTime: '3 MINS READ',
    date: 'APR 29, 2026',
    description: 'Going beyond simple chat interactions to build deterministic data flows that actively complete production work.',
    imageAccent: 'from-forsythia to-saffron'
  },
  {
    id: 'i2',
    title: 'From Scripts to Systems: The Real Shift in Automation',
    category: 'ARCHITECTURE',
    readTime: '4 MINS READ',
    date: 'APR 20, 2026',
    description: 'How to transition your team from writing custom batch scripts to constructing multi-module, self-healing data orchestrations.',
    imageAccent: 'from-nocturnal to-mystic'
  },
  {
    id: 'i3',
    title: 'Why Your Data Outputs Feel Brittle & Inconsistent',
    category: 'ENGINEERING',
    readTime: '2 MINS READ',
    date: 'APR 12, 2026',
    description: 'Analyzing the network routing, cache hits, and queue latency that determine pipeline accuracy in complex business flows.',
    imageAccent: 'from-saffron to-nocturnal'
  }
];

/**
 * All repeated page content lives here so copy edits never touch markup.
 * Longer prose paragraphs stay inline in their section components.
 */

export interface Service {
  color: string;
  title: string;
  body: string;
}

export const services: Service[] = [
  {
    color: 'var(--blue)',
    title: 'Built on your philosophy',
    body: 'Your beliefs and expertise become the backbone of the product, so it sounds like you and stands behind what you teach.',
  },
  {
    color: 'var(--pink)',
    title: 'We handle everything',
    body: 'Research, writing, design, structure, and the storefront. You review, you approve, you launch.',
  },
  {
    color: 'var(--yellow)',
    title: 'Your brand stays front',
    body: 'The product carries your name and your voice. Your audience sees you, not us.',
  },
  {
    color: 'var(--green)',
    title: 'We share the upside',
    body: 'You earn the majority on every sale with nothing upfront. We win only when you win.',
  },
];

export interface Step {
  color: string;
  num: string;
  title: string;
  body: string;
}

export const steps: Step[] = [
  {
    color: 'var(--blue)',
    num: '01',
    title: 'Philosophy',
    body: 'A structured questionnaire captures how you think, who your audience is, and the lines you will not cross. The product is yours from the first page.',
  },
  {
    color: 'var(--pink)',
    num: '02',
    title: 'Build',
    body: 'Our team writes and designs the full product to an expert standard. Every claim is grounded, every section earns its place, nothing is filler.',
  },
  {
    color: 'var(--yellow)',
    num: '03',
    title: 'Review',
    body: 'You see everything before your audience does. We refine until it reads like you wrote it yourself.',
  },
  {
    color: 'var(--green)',
    num: '04',
    title: 'Launch',
    body: 'We set up your storefront and hand you a product ready to sell. You post, your audience buys, you get paid.',
  },
];

export const standards: string[] = [
  'Grounded in current science',
  'Written by specialists',
  'Built to be finished, not abandoned',
  'Reviewed line by line',
];

export const fitYes: string[] = [
  '10K+ engaged followers',
  'Consistent posting and presence',
  'A clear point of view in your niche',
  'An audience that asks you for guidance',
];

export const fitNo: string[] = [
  'Low engagement relative to following',
  'Inconsistent or paused posting',
  'No clear niche or point of view',
  'Followers without trust',
];

export interface Faq {
  question: string;
  answer: string;
}

export const faqs: Faq[] = [
  {
    question: 'Is the product really mine?',
    answer:
      'Yes. It is built around your philosophy, carries your name, and your audience only ever sees you. The work happens behind the scenes so you can stand fully behind it.',
  },
  {
    question: 'What does it cost me?',
    answer:
      'Nothing upfront. We share revenue on each sale, with the majority going to you. We earn only when you do, which keeps our work tied to your results.',
  },
  {
    question: 'How much time does this take from me?',
    answer:
      'A questionnaire at the start and a review near the end. Most of your time is spent approving, not creating.',
  },
  {
    question: 'Who is on the team?',
    answer:
      'A founder-led group of writers, designers, and subject specialists. We keep the operation lean and the work senior.',
  },
  {
    question: 'Why do you stay behind the scenes?',
    answer:
      'Because the brand that matters is yours. Our job is to make you look like the expert your audience already believes you are.',
  },
];

/**
 * Application form qualification selects.
 * `tier: 'low'` on a chosen option disqualifies the applicant;
 * the submitted value is the human-readable label.
 */
export type Tier = 'ok' | 'low';

export interface SelectOption {
  label: string;
  tier: Tier;
}

export interface ApplySelect {
  id: string;
  label: string;
  placeholder: string;
  options: SelectOption[];
}

export const applySelectRows: ApplySelect[][] = [
  [
    {
      id: 'followers',
      label: 'Follower count',
      placeholder: 'Select range',
      options: [
        { label: 'Under 10K', tier: 'low' },
        { label: '10K to 50K', tier: 'ok' },
        { label: '50K to 100K', tier: 'ok' },
        { label: 'Over 100K', tier: 'ok' },
      ],
    },
    {
      id: 'engagement',
      label: 'Average engagement',
      placeholder: 'Select range',
      options: [
        { label: 'Under 1%', tier: 'low' },
        { label: '1% to 3%', tier: 'ok' },
        { label: '3% to 6%', tier: 'ok' },
        { label: 'Over 6%', tier: 'ok' },
      ],
    },
  ],
  [
    {
      id: 'niche',
      label: 'Your niche',
      placeholder: 'Select',
      options: [
        { label: 'Fitness and health', tier: 'ok' },
        { label: 'Business and finance', tier: 'ok' },
        { label: 'Lifestyle', tier: 'ok' },
        { label: 'Beauty and fashion', tier: 'ok' },
        { label: 'Food and cooking', tier: 'ok' },
        { label: 'Education', tier: 'ok' },
        { label: 'Other', tier: 'ok' },
      ],
    },
    {
      id: 'consistency',
      label: 'Posting consistency',
      placeholder: 'Select',
      options: [
        { label: 'Several times a week', tier: 'ok' },
        { label: 'About weekly', tier: 'ok' },
        { label: 'A few times a month', tier: 'low' },
        { label: 'Rarely or paused', tier: 'low' },
      ],
    },
  ],
];

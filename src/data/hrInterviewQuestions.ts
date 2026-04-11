export interface HRInterviewQuestion {
  id: number;
  question: string;
  category: string;
  tips: string[];
  maxDuration: number; // seconds for video
}

export const hrInterviewQuestions: HRInterviewQuestion[] = [
  {
    id: 1,
    question: 'Tell me about yourself.',
    category: 'Introduction',
    tips: [
      'Start with your current role/education',
      'Mention 2-3 key achievements',
      'End with why you\'re excited about this opportunity',
      'Keep it under 2 minutes',
    ],
    maxDuration: 120,
  },
  {
    id: 2,
    question: 'What are your key skills and strengths?',
    category: 'Skills',
    tips: [
      'Focus on skills relevant to the role',
      'Give specific examples for each skill',
      'Quantify achievements when possible',
      'Mention both technical and soft skills',
    ],
    maxDuration: 120,
  },
  {
    id: 3,
    question: 'Why do you want to work at our company?',
    category: 'Motivation',
    tips: [
      'Research the company beforehand',
      'Align your goals with company values',
      'Mention specific projects or initiatives',
      'Show genuine enthusiasm',
    ],
    maxDuration: 90,
  },
  {
    id: 4,
    question: 'Describe a challenging project you worked on.',
    category: 'Experience',
    tips: [
      'Use the STAR method (Situation, Task, Action, Result)',
      'Focus on your specific contribution',
      'Highlight problem-solving skills',
      'Mention the positive outcome',
    ],
    maxDuration: 150,
  },
  {
    id: 5,
    question: 'Where do you see yourself in 5 years?',
    category: 'Career Goals',
    tips: [
      'Show ambition aligned with the role',
      'Mention desire for growth and learning',
      'Connect your goals to the company\'s trajectory',
      'Be realistic but aspirational',
    ],
    maxDuration: 90,
  },
];

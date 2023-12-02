import { AtomIcon, BookIcon, BookKey, BriefcaseIcon, Brush, CalculatorIcon, ChefHat, Code, Cog, Coins, Dna, EyeIcon, FlagIcon, Globe, Globe2, Hammer, Hourglass, ImageIcon, JapaneseYen, LineChart, Lock, LockIcon, MessageSquare, Music, Music2, Orbit, Pencil, PizzaIcon, Sheet, Soup, Sun, Swords, TestTube, TestTubes, Vegan, VideoIcon } from "lucide-react";
import { env } from "process";

var environment = 'production';
try {
  environment = process.env.ENVIRONMENT!;
} catch (error) {
  console.log("Environment variable not set.");
}
export const MAX_FREE_COUNTS = environment === 'production' ? 10 : 1000;

export const proFeatures = [
  {
    label: 'All questions broken down by topic each year',
    icon: LockIcon,
    href: '/conversation',
    color: "text-blue-700",
    bgColor: "bg-violet-500/10",
  },
  {
    label: 'Topic breakdown for individual papers',
    icon: EyeIcon,
    href: '/conversation',
    color: "text-blue-700",
    bgColor: "bg-violet-500/10",
    badge: 'New',
  },
  {
    label: 'Early bird discounted rate (€7.99/month) for life.',
    icon: Coins,
    color: "text-blue-700",
    bgColor: "bg-pink-700/10",
    href: '/image',
  },
  {
    label: 'Full access to AI chat feature.',
    icon: MessageSquare,
    color: "text-blue-700",
    bgColor: "bg-orange-700/10",
    href: '/video',
  },
];

export const subjectsWithDefinitions = [
  "lc_biology",
  "lc_chemistry",
  "lc_physics",
]


export const lcSubjects = [
  {
    label: 'English',
    icon: BookIcon,
    color: "text-blue-500",
    imageIconPath: "/subject-icons/english-light.png",
    bgColor: "bg-blue-500/10",
    href: '/english',
    questionExample: 'What happens Hamlet in Act 1 Scene 1?',
  },
  {
    label: 'Irish',
    icon: Soup,
    color: "text-green-500",
    imageIconPath: "/subject-icons/irish-light.png",
    bgColor: "bg-green-500/10",
    href: '/irish',
    questionExample: 'What is the Irish for "I am living in an apartment"?',
  },
  {
    label: 'Mathematics',
    icon: CalculatorIcon,
    color: "text-yellow-500",
    imageIconPath: "/subject-icons/mathematics-light.png",
    bgColor: "bg-yellow-500/10",
    href: '/mathematics',
  },
  {
    label: 'French',
    icon: Globe2,
    imageIconPath: "/subject-icons/french-light.png",
    color: "text-pink-500",
    bgColor: "bg-pink-500/10",
    href: '/french',
    questionExample: 'What is the French for "I am going to the cinema"?',
  },
  {
    label: 'German',
    icon: Globe2,
    color: "text-brown-500",
    imageIconPath: "/subject-icons/german-light.png",
    bgColor: "bg-brown-500/10",
    href: '/german',
    questionExample: 'What is the German for "I am going to the cinema"?',
  },
  {
    label: 'Spanish',
    icon: Sun,
    color: "text-red-500",
    imageIconPath: "/subject-icons/spanish-light.png",
    bgColor: "bg-red-500/10",
    href: '/spanish',
    questionExample: 'What is the Spanish for "I am going to the party"?',
  },
  {
    label: 'Physics',
    icon: AtomIcon,
    imageIconPath: "/subject-icons/physics-light.png",
    color: "text-purple-600",
    bgColor: "bg-purple-600/10",
    href: '/physics',
    questionExample: 'What is the speed of light?',
  },
  {
    label: 'Chemistry',
    icon: TestTube,
    color: "text-teal-500",
    imageIconPath: "/subject-icons/chemistry-light.png",
    bgColor: "bg-teal-500/10",
    href: '/chemistry',
    questionExample: 'What is the atomic number of carbon?',
  },
  {
    label: 'Biology',
    icon: Dna,
    color: "text-green-600",
    imageIconPath: "/subject-icons/biology-light.png",
    bgColor: "bg-green-600/10",
    href: '/biology',
    questionExample: 'What is the function of the mitochondria?',
  },
  {
    label: 'Agricultural Science',
    icon: Vegan,
    color: "text-green-700",
    imageIconPath: "/subject-icons/agricultural-science-light.png",
    bgColor: "bg-green-700/10",
    href: '/agricultural-science',
    questionExample: 'Explain what 10-10-20 means.',
  },
  {
    label: 'Applied Mathematics',
    icon: Orbit,
    color: "text-yellow-600",
    imageIconPath: "/subject-icons/applied-mathematics-light.png",
    bgColor: "bg-yellow-600/10",
    href: '/applied-mathematics',
  },
  {
    label: 'Physics and Chemistry',
    icon: TestTubes,
    color: "text-indigo-500",
    imageIconPath: "/subject-icons/physics-and-chemistry-light.png",
    bgColor: "bg-indigo-500/10",
    href: '/physics-and-chemistry',
  },
  {
    label: 'Accounting',
    icon: Sheet,
    color: "text-gray-500",
    imageIconPath: "/subject-icons/accounting-light.png",
    bgColor: "bg-gray-500/10",
    href: '/accounting',
    questionExample: 'What is a balance sheet?',
  },
  {
    label: 'Business',
    icon: BriefcaseIcon,
    color: "text-gray-600",
    imageIconPath: "/subject-icons/business-light.png",
    bgColor: "bg-gray-600/10",
    href: '/business',
    questionExample: 'What is a sole trader?',
  },
  {
    label: 'Economics',
    icon: LineChart,
    color: "text-pink-600",
    imageIconPath: "/subject-icons/economics-light.png",
    bgColor: "bg-pink-600/10",
    href: '/economics',
    questionExample: 'What is the difference between a recession and a depression?',
  },
  {
    label: 'Construction Studies',
    icon: LineChart,
    color: "text-pink-600",
    imageIconPath: "/subject-icons/construction-studies-light.png",
    bgColor: "bg-pink-600/10",
    href: '/construction-studies',
    questionExample: "What is a birds mouth?",
  },
  {
    label: 'Geography',
    icon: Globe,
    color: "text-blue-700",
    imageIconPath: "/subject-icons/geography-light.png",
    bgColor: "bg-blue-700/10",
    href: '/geography',
    questionExample: 'What is a drumlin?',
  },
  {
    label: 'History',
    icon: Hourglass,
    color: "text-red-700",
    imageIconPath: "/subject-icons/history-light.png",
    bgColor: "bg-red-700/10",
    href: '/history',
    questionExample: 'What is the significance of the Battle of the Boyne?',
  },
  // {
  //   label: 'Classical Studies',
  //   icon: Swords,
  //   color: "text-white",
  //   bgColor: "bg-gray-700/10",
  //   href: '/classical-studies',
  // },
  {
    label: 'Engineering',
    icon: Cog,
    color: "text-gray-800",
    imageIconPath: "/subject-icons/engineering-light.png",
    bgColor: "bg-gray-800/10",
    href: '/engineering',
    questionExample: "What are the main safety precautions when using a lathe?",
  },
  {
    label: 'Design and Communication Graphics',
    icon: Pencil,
    color: "text-yellow-700",
    imageIconPath: "/subject-icons/design-and-communication-graphics-light.png",
    bgColor: "bg-yellow-700/10",
    href: '/design-and-communication-graphics',
  },
  {
    label: 'Home Economics',
    icon: ChefHat,
    color: "text-gray-700",
    imageIconPath: "/subject-icons/home-economics-light.png",
    bgColor: "bg-gray-700/10",
    href: '/home-economics',
  },
  {
    label: "Physical Education",
    icon: FlagIcon,
    color: "text-green-800",
    imageIconPath: "/subject-icons/physical-education-light.png",
    bgColor: "bg-green-800/10",
    href: '/physical-education',
  },
  {
    label: 'Technology',
    icon: BookKey,
    color: "text-blue-800",
    bgColor: "bg-blue-800/10",
    href: '/technology',
    questionExample: 'What is a cam?',
    imageIconPath: "/subject-icons/technology-light.png",
  },
  // {
  //   label: 'Art',
  //   icon: Brush,
  //   color: "text-indigo-600",
  //   bgColor: "bg-indigo-600/10",
  //   href: '/art',
  // },
  // {
  //   label: 'Music',
  //   icon: Music2,
  //   color: "text-purple-700",
  //   bgColor: "bg-purple-700/10",
  //   href: '/music',
  // },
  // {
  //   label: 'Religious Education',
  //   icon: BookKey,
  //   color: "text-blue-800",
  //   bgColor: "bg-blue-800/10",
  //   href: '/religious-education',
  // },
];

export function getSubjectsFromHref(href: string) {
  return lcSubjects.filter((subject) => subject.href === href);
}

export function getSubjectFromHref(href: string) {
  return lcSubjects.find((subject) => subject.href === href);
}
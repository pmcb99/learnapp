import { AtomIcon, BookIcon, BookKey, BriefcaseIcon, Brush, CalculatorIcon, ChefHat, Code, Cog, Coins, Dna, EyeIcon, FlagIcon, Globe, Globe2, Hammer, Hourglass, ImageIcon, JapaneseYen, LineChart, Lock, LockIcon, MessageSquare, Music, Music2, Orbit, Pencil, PizzaIcon, Sheet, Soup, Sun, Swords, TestTube, TestTubes, Vegan, VideoIcon } from "lucide-react";

export const MAX_FREE_COUNTS = 5;

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
    label: 'Early bird discounted rate (€4.99/month)',
    icon: Coins,
    color: "text-blue-700",
    bgColor: "bg-pink-700/10",
    href: '/image',
  },
  {
    label: 'Beta access to AI chat features',
    icon: MessageSquare,
    color: "text-blue-700",
    bgColor: "bg-orange-700/10",
    href: '/video',
  },
];

export const subjectsWithDefinitions = [
  "lc_biology",
  "lc_chemistry"
]


export const lcSubjects = [
  {
    label: 'English',
    icon: BookIcon,
    color: "text-blue-500",
    imageIconPath: "/subject-icons/english-light.png",
    bgColor: "bg-blue-500/10",
    href: '/english',
  },
  // {
  //   label: 'Irish',
  //   icon: Soup,
  //   color: "text-green-500",
  //   imageIconPath: "/subject-icons/irish-light.png",
  //   bgColor: "bg-green-500/10",
  //   href: '/irish',
  // },
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
  },
  // {
  //   label: 'German',
  //   icon: Globe2,
  //   color: "text-brown-500",
  //   bgColor: "bg-brown-500/10",
  //   href: '/german',
  // },
  // {
  //   label: 'Spanish',
  //   icon: Sun,
  //   color: "text-red-500",
  //   bgColor: "bg-red-500/10",
  //   href: '/spanish',
  // },
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
  },
  // {
  //   label: 'Business',
  //   icon: BriefcaseIcon,
  //   color: "text-gray-600",
  //   imageIconPath: "/subject-icons/economics-light.png",
  //   bgColor: "bg-gray-600/10",
  //   href: '/business',
  // },
  {
    label: 'Economics',
    icon: LineChart,
    color: "text-pink-600",
    imageIconPath: "/subject-icons/economics-light.png",
    bgColor: "bg-pink-600/10",
    href: '/economics',
  },
  {
    label: 'Construction Studies',
    icon: LineChart,
    color: "text-pink-600",
    imageIconPath: "/subject-icons/construction-studies-light.png",
    bgColor: "bg-pink-600/10",
    href: '/construction-studies',
  },
  {
    label: 'Geography',
    icon: Globe,
    color: "text-blue-700",
    imageIconPath: "/subject-icons/geography-light.png",
    bgColor: "bg-blue-700/10",
    href: '/geography',
  },
  {
    label: 'History',
    icon: Hourglass,
    color: "text-red-700",
    imageIconPath: "/subject-icons/history-light.png",
    bgColor: "bg-red-700/10",
    href: '/history',
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
  },
  // {
  //   label: 'Design and Communication Graphics',
  //   icon: Pencil,
  //   color: "text-yellow-700",
  //   imageIconPath: "/subject-icons/design-and-communication-graphics-light.png",
  //   bgColor: "bg-yellow-700/10",
  //   href: '/design-and-communication-graphics',
  // },
  // {
  //   label: 'Home Economics',
  //   icon: ChefHat,
  //   color: "text-gray-700",
  //   imageIconPath: "/subject-icons/home-economics-light.png",
  //   bgColor: "bg-gray-700/10",
  //   href: '/home-economics',
  // },
  {
    label: "Physical Education",
    icon: FlagIcon,
    color: "text-green-800",
    imageIconPath: "/subject-icons/physical-education-light.png",
    bgColor: "bg-green-800/10",
    href: '/physical-education',
  }
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
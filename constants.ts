import { AtomIcon, BookIcon, BookKey, BookOpenCheck, Bot, BriefcaseIcon, Brush, CalculatorIcon, ChefHat, Code, Cog, Coins, Dna, EyeIcon, FlagIcon, Globe, Globe2, Hammer, Hourglass, ImageIcon, JapaneseYen, LineChart, Lock, LockIcon, MessageSquare, Music, Music2, Orbit, Pencil, PizzaIcon, Sheet, Soup, Sun, Swords, TestTube, TestTube2, TestTubes, Vegan, VideoIcon } from "lucide-react";
import { env } from "process";

const environment = process.env.ENVIRONMENT?.trim();
console.log(environment);
export const MAX_FREE_COUNTS = environment == 'development' ? 1000 : 10;
console.log(environment == 'development')
console.log(MAX_FREE_COUNTS)

export const freeFeatures = [
  {
    label: '5 exam questions on each topic and year',
    icon: BookOpenCheck,
    href: '/conversation',
    color: "text-blue-700",
    bgColor: "bg-violet-500/10",
  },
  {
    label: '10 trial chat questions',
    icon: Bot,
    href: '/conversation',
    color: "text-blue-700",
    bgColor: "bg-violet-500/10",
    badge: 'New',
  },
  {
    label: 'Definitions for science subjects',
    icon: TestTube2,
    color: "text-blue-700",
    bgColor: "bg-orange-700/10",
    href: '/video',
  },
];

export const proFeaturesMonthly = [
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
    label: 'Pro membership by month',
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

export const proFeaturesYearly = [
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
    label: 'Pro membership until exams are finished in June.',
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


export const lcHigherSubjects = [
  {
    label: 'English',
    icon: BookIcon,
    color: "text-blue-500",
    imageIconPath: "/subject-icons/english-light.png",
    bgColor: "bg-blue-500/10",
    href: '/english',
    questionExample: 'What happens Hamlet in Act 1 Scene 1?',
    questionExamples: [
      "What happens Hamlet in Act 1 Scene 1?",
      "What was the question in 2018 Section 1?",
      "What is the main theme of Hopkins' poem 'No worst, there is none'?"]
  },
  {
    label: 'Irish',
    icon: Soup,
    color: "text-green-500",
    imageIconPath: "/subject-icons/irish-light.png",
    bgColor: "bg-green-500/10",
    href: '/irish',
    questionExample: 'What is the Irish for "I am living in an apartment"?',
    questionExamples: [
      "How can I count to ten in Irish?",
      "What came up in Question 1 of the 2019 paper?",
      "What is the Irish word for 'hospital'?"]
  },
  {
    label: 'Mathematics',
    icon: CalculatorIcon,
    color: "text-yellow-500",
    imageIconPath: "/subject-icons/mathematics-light.png",
    bgColor: "bg-yellow-500/10",
    href: '/mathematics',
    questionExamples: [
      "What is the empirical rule?",
      "Explain the difference between orthocentre and circumcentre.",
      "What is a theorem?"]
  },
  {
    label: 'French',
    icon: Globe2,
    imageIconPath: "/subject-icons/french-light.png",
    color: "text-pink-500",
    bgColor: "bg-pink-500/10",
    href: '/french',
    questionExample: 'What is the French for "I am going to the cinema"?',
    questionExamples: [
      "How can I count to ten in French?",
      "What came up in Question 1 of the 2015 paper?",
      "What is the French word for 'hospital'?"]
  },
  {
    label: 'German',
    icon: Globe2,
    color: "text-brown-500",
    imageIconPath: "/subject-icons/german-light.png",
    bgColor: "bg-brown-500/10",
    href: '/german',
    questionExample: 'What is the German for "I am going to the cinema"?',
    questionExamples: [
      "How can I count to ten in German?",
      "What came up in Question 3 of the 2017 paper?",
      "What is the French word for 'hospital'?"]
  },
  {
    label: 'Spanish',
    icon: Sun,
    color: "text-red-500",
    imageIconPath: "/subject-icons/spanish-light.png",
    bgColor: "bg-red-500/10",
    href: '/spanish',
    questionExample: 'What is the Spanish for "I am going to the party"?',
    questionExamples: [
      "How can I count to ten in Spanish?",
      "What came up in Question 2 of the 2012 paper?",
      "What is the Spanish word for 'house'?"]
  },
  {
    label: 'Physics',
    icon: AtomIcon,
    imageIconPath: "/subject-icons/physics-light.png",
    color: "text-purple-600",
    bgColor: "bg-purple-600/10",
    href: '/physics',
    questionExample: 'What is the speed of light?',
    questionExamples: [
      "What is the difference in reflection and refraction?",
      "What came up in 2015 Question 2?",
      "Explain how electrons behave like waves."]
  },
  {
    label: 'Chemistry',
    icon: TestTube,
    color: "text-teal-500",
    imageIconPath: "/subject-icons/chemistry-light.png",
    bgColor: "bg-teal-500/10",
    href: '/chemistry',
    questionExample: 'What is the atomic number of carbon?',
    questionExamples: [
      "What came up in 2015 Question 2?",
      "What is the difference between an isotope and an ion?",
      "Is rust an example of oxidation or reduction?"]
  },
  {
    label: 'Biology',
    icon: Dna,
    color: "text-green-600",
    imageIconPath: "/subject-icons/biology-light.png",
    bgColor: "bg-green-600/10",
    href: '/biology',
    questionExample: 'What is the function of the mitochondria?',
    questionExamples: [
      "What came up in 2014 Question 2?",
      "Explain mitosis using an analogy.",
      "What is the answer to 2019 Question 3?"]
  },
  {
    label: 'Agricultural Science',
    icon: Vegan,
    color: "text-green-700",
    imageIconPath: "/subject-icons/agricultural-science-light.png",
    bgColor: "bg-green-700/10",
    href: '/agricultural-science',
    questionExample: 'Explain what 10-10-20 means.',
    questionExamples: [
      "What is the answer to 2019 Question 3?",
      "What is 10 - 10 - 20 fertiliser?",
      "Did I need to study pigs for the 2023 exam paper?"]
  },
  {
    label: 'Applied Mathematics',
    icon: Orbit,
    color: "text-yellow-600",
    imageIconPath: "/subject-icons/applied-mathematics-light.png",
    bgColor: "bg-yellow-600/10",
    href: '/applied-mathematics',
    questionExamples: [
      "What are some topics that came up in the 2019 exam?",
      "Did projectile motion come up in 2018 and which question?",
      "What is the difference between a vector and a scalar?"]
  },
  {
    label: 'Physics and Chemistry',
    icon: TestTubes,
    color: "text-indigo-500",
    imageIconPath: "/subject-icons/physics-and-chemistry-light.png",
    bgColor: "bg-indigo-500/10",
    href: '/physics-and-chemistry',
    questionExamples: [
      "What is the answer to 2014 Question 3?",
      "Name one acidic oxide of sulfur.",
      "What does the marking scheme say about Charles' Law?"] 
  },
  {
    label: 'Accounting',
    icon: Sheet,
    color: "text-gray-500",
    imageIconPath: "/subject-icons/accounting-light.png",
    bgColor: "bg-gray-500/10",
    href: '/accounting',
    questionExample: 'What is a balance sheet?',
    questionExamples: [
      "What is the answer to 2019 Question 3?",
      "Explain the Financial Reporting Standard",
      "Which topics came up in the 2018 exam?"] 
  },
  {
    label: 'Business',
    icon: BriefcaseIcon,
    color: "text-gray-600",
    imageIconPath: "/subject-icons/business-light.png",
    bgColor: "bg-gray-600/10",
    href: '/business',
    questionExample: 'What is a sole trader?',
    questionExamples: [
      "What is the answer to 2013 Question 3?",
      "Explain one implication of underinsurance.",
      "Explain the term public liability insurance."] 
  },
  {
    label: 'Economics',
    icon: LineChart,
    color: "text-pink-600",
    imageIconPath: "/subject-icons/economics-light.png",
    bgColor: "bg-pink-600/10",
    href: '/economics',
    questionExample: 'What is the difference between a recession and a depression?',
    questionExamples: [
      "List 3 characteristics of a perfectly competitive market.",
      "Did monopolies come up in the 2019 exam and what question was it?",
      "Give me one advantage/disadvantage of globalisation."] 
  },
  {
    label: 'Construction Studies',
    icon: LineChart,
    color: "text-pink-600",
    imageIconPath: "/subject-icons/construction-studies-light.png",
    bgColor: "bg-pink-600/10",
    href: '/construction-studies',
    questionExample: "What is a birds mouth?",
    questionExamples: [
      "What is the answer to 2016 Question 3?",
      "What is a pressure release valve?",
      "How can I start studying solar collectors?"] 
  },
  {
    label: 'Geography',
    icon: Globe,
    color: "text-blue-700",
    imageIconPath: "/subject-icons/geography-light.png",
    bgColor: "bg-blue-700/10",
    href: '/geography',
    questionExample: 'What is a drumlin?',
    questionExamples: [
      "What came up in the Options section of the 2019 exam?",
      "What is longshore drift?",
      "How do I start studying Karst regions?"] 
  },
  {
    label: 'History',
    icon: Hourglass,
    color: "text-red-700",
    imageIconPath: "/subject-icons/history-light.png",
    bgColor: "bg-red-700/10",
    href: '/history',
    questionExample: 'What is the significance of the Battle of the Boyne?',
    questionExamples: [
      "What is the answer to 2014 Question 3?",
      "During the period 1912-1940, what were the strengths and weaknesses of James Craig as a political leader?",
      "Why was there an uprising in Hungary in 1956 and why did the Soviet Union take steps to crush it?"] 
  },
  {
    label: 'Engineering',
    icon: Cog,
    color: "text-gray-800",
    imageIconPath: "/subject-icons/engineering-light.png",
    bgColor: "bg-gray-800/10",
    href: '/engineering',
    questionExample: "What are the main safety precautions when using a lathe?",
    questionExamples: [
      "What is the answer to 2020 Question 3?",
      "Describe the floatation process to separate ores.",
      "How do I start studying polymers?"] 
  },
  {
    label: 'Design and Communication Graphics',
    icon: Pencil,
    color: "text-yellow-700",
    imageIconPath: "/subject-icons/design-and-communication-graphics-light.png",
    bgColor: "bg-yellow-700/10",
    href: '/design-and-communication-graphics',
    questionExamples: [
      "What are some topics came up in the 2014 paper?",
      "Did the 2019 paper have any questions on the axonometric projection?",
      "What are some questions that ask about structural forms?"] 
  },
  {
    label: 'Home Economics',
    icon: ChefHat,
    color: "text-gray-700",
    imageIconPath: "/subject-icons/home-economics-light.png",
    bgColor: "bg-gray-700/10",
    href: '/home-economics',
    questionExamples: [
      "What came up in the 2018 exam Question 3?",
      "Do I need to know about interest rates for the exam?",
      "How can I start studying home appliances?"] 
  },
  {
    label: "Physical Education",
    icon: FlagIcon,
    color: "text-green-800",
    imageIconPath: "/subject-icons/physical-education-light.png",
    bgColor: "bg-green-800/10",
    href: '/physical-education',
    questionExamples: [
      "Which exam did Newtons Law come up in and what law was it? ",
      "Name a fitness test that can measure muscular endurance.",
      "Did hegemony come up in the 2023 exam?"] 
  },
  {
    label: 'Technology',
    icon: BookKey,
    color: "text-blue-800",
    bgColor: "bg-blue-800/10",
    href: '/technology',
    questionExample: 'What is a cam?',
    imageIconPath: "/subject-icons/technology-light.png",
    questionExamples: [
      "What is the answer to 2022 Question 8?",
      "Give two advantages of hybrid buses over diesel buses.",
      "What exam years did barcode systems come up in?"] 
  },
  {
    label: 'Art',
    icon: Brush,
    color: "text-indigo-600",
    bgColor: "bg-indigo-600/10",
    imageIconPath: "/subject-icons/art-light.png",
    href: '/art',
    questionExample: "What is cubism?",
    questionExamples: [
      "What is the answer to 2014 Question 3?",
      "Did the Ardagh Chalice come up recently in any exams?",
      "Give a brief description and discussion of one named work by Seurat."] 
  },
  // {
  //   label: 'Music',
  //   icon: Music2,
  //   color: "text-purple-700",
  //   bgColor: "bg-purple-700/10",
  //   href: '/music',
  // },
  {
    label: 'Politics and Society',
    icon: Swords,
    color: "text-white",
    imageIconPath: "/subject-icons/politics-and-society-light.png",
    bgColor: "bg-gray-700/10",
    href: '/politics-and-society',
    questionExample: "What is the Dáil?",
    questionExamples: [
      "What was 2022 Question 3? And give a sample answer.",
      "List the year and question number that asked about the importance of media in politics?",
      "How universal is the UDHR? Give a sample answer."] 
  },
  {
    label: 'Religious Education',
    icon: BookKey,
    color: "text-blue-800",
    imageIconPath: "/subject-icons/religious-education-light.png",
    bgColor: "bg-blue-800/10",
    href: '/religious-education',
    questionExample: "What is monotheism?",
    questionExamples: [
      "Why was Jesus put on trial before the Sanhedrin?",
      "Give a sample answer for 2023 - Section 1 - Question 1",
      "What years/questions can I use to study the Old Testament?"] 
  },
  // {
  //   label: 'Classical Studies',
  //   icon: Swords,
  //   color: "text-white",
  //   imageIconPath: "/subject-icons/classical-studies-light.png",
  //   bgColor: "bg-gray-700/10",
  //   href: '/classical-studies',
  //   questionExample: "What did Plato introduce to the world?",
  // },
];

export function getSubjectsFromHref(href: string) {
  return lcHigherSubjects.filter((subject) => subject.href === href);
}

export function getSubjectFromHref(href: string) {
  const level = href.split('/')[1];
  const subjectPath = href.split('/')[2];
  return lcHigherSubjects.find((subject) => subject.href === `/${subjectPath}`);
}
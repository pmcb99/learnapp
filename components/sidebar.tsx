"use client";

import Link from "next/link";
import Image from "next/image";
import { Montserrat } from 'next/font/google'
import { ImageIcon, Settings, Sun, Moon, VideoIcon, Speaker } from "lucide-react";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { FreeCounter } from "@/components/free-counter";

const poppins = Montserrat ({ weight: '600', subsets: ['latin'] });

const routes = [
  // {
  //   label: 'Dashboard',
  //   icon: LayoutDashboard,
  //   href: '/lc/single-year',
  //   color: "text-sky-500"
  // },
  {
    label: 'Chat',
    icon: Speaker,
    href: '/lc/higher/chat',
    color: "text-pink-700",
    imageIcon: "/icons/chat-book-dark.png"
  },
  // {
  //   label: 'Quiz',
  //   icon: ImageIcon,
  //   href: '/lc/higher/single-year',
  //   color: "text-pink-700",
  // },
  {
    label: 'Papers by Year',
    icon: ImageIcon,
    href: '/lc/higher/single-year',
    color: "text-pink-700",
    imageIcon: "/icons/open-book-dark.png"
  },
  {
    label: 'Papers by Topic',
    icon: ImageIcon,
    href: '/lc/higher/multi-year',
    color: "text-pink-700",
    imageIcon: "/icons/book-stack-dark.png"
  },
  {
    label: 'Settings',
    icon: Settings,
    href: '/settings',
    imageIcon: "/icons/settings-dark.png"
  },
  // {
  //   label: 'Image Generation',
  //   icon: ImageIcon,
  //   color: "text-pink-700",
  //   href: '/image',
  // },
  // {
  //   label: 'Video Generation',
  //   icon: VideoIcon,
  //   color: "text-orange-700",
  //   href: '/video',
  // },
  // {
  //   label: 'Music Generation',
  //   icon: Music,
  //   color: "text-emerald-500",
  //   href: '/music',
  // },
  // {
  //   label: 'Code Generation',
  //   icon: Code,
  //   color: "text-green-700",
  //   href: '/code',
  // },
];

export const Sidebar = ({
  apiLimitCount = 0,
  isPro = false,
  userHasAccessCode = false,
  setIsOpen
}: {
  apiLimitCount: number;
  isPro: boolean;
  userHasAccessCode: boolean;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const pathname = usePathname();


  return (
    <div className="flex">
    <div className="space-y-4 py-4 flex flex-col h-full bg-primary dark:bg-slate-900 fixed">
      <div className="px-3 py-2 flex-1">



        <Link href="/lc/higher/single-year" className="flex items-center pl-3 mb-14">
          <div className="relative h-9 w-9 ">
            <Image fill alt="Logo" src="/logoR-dark.png" className="scale-110" />
          </div>
          <h1 className={cn("text-2xl font-bold text-white", poppins.className)}>
            ewise 
          </h1>
          {/* <h4 className="text-slate-600 pl-2">beta</h4> */}
        </Link>



        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              key={route.href} 
              href={route.href}
              onClick={() => setIsOpen && setIsOpen(false)}
              className={cn(
                "text-sm group flex p-3 text-white w-full justify-start font-medium cursor-pointer rounded-lg transition-all ease-in-out duration-200 hover:border border hover:border-slate-700 border-transparent",
                pathname.includes(route.href) ? "bg-white/10" : "",
              )}
            >
              <div className="flex items-center flex-1">
                {/* <route.icon className={cn("h-5 w-5 mr-3", route.color)} /> */}
                <Image src={route.imageIcon || ""} alt="" width={50} height={50} className=""/>
                {route.label}
                {/* {route.label === 'Chat' && (
                  <Badge className="ml-4 mt-1 uppercase" variant="secondary">beta</Badge>
                )} */}
              </div>
            </Link>
          ))}
        </div>
      </div>
      <FreeCounter 
        apiLimitCount={apiLimitCount} 
        isPro={isPro}
        userHasAccessCode={userHasAccessCode}
      />
    </div>
    </div>
  );
};

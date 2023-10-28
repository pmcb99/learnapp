"use client";

import Link from "next/link";
import Image from "next/image";
import { Montserrat } from 'next/font/google'
import { Code, Dna, ImageIcon, LayoutDashboard, MessageSquare, Music, Settings, Sun, Moon, VideoIcon } from "lucide-react";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { FreeCounter } from "@/components/free-counter";
import { Accordion } from "./ui/accordion";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { useTheme } from "next-themes";

const poppins = Montserrat ({ weight: '600', subsets: ['latin'] });

const routes = [
  {
    label: 'Dashboard',
    icon: LayoutDashboard,
    href: '/lc/dashboard',
    color: "text-sky-500"
  },
  {
    label: 'Papers by Year',
    icon: ImageIcon,
    href: '/lc/higher/biology/papers',
    color: "text-pink-700",
  },
  {
    label: 'Papers by Topic',
    icon: ImageIcon,
    href: '/lc/higher/biology/papers/topics',
    color: "text-pink-700",
  },
  {
    label: 'Settings',
    icon: Settings,
    href: '/settings',
  },
  {
    label: 'Biology',
    icon: Dna,
    href: '/lc/higher/biology',
    color: "text-violet-500",
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
  isPro = false
}: {
  apiLimitCount: number;
  isPro: boolean;
}) => {
  const pathname = usePathname();



  return (
    <div className="space-y-4 py-4 flex flex-col h-full dark:bg-slate-900">
      <div className="px-3 py-2 flex-1">



        <Link href="/dashboard" className="flex items-center pl-3 mb-14">
          <div className="relative h-9 w-9 ">
            <Image fill alt="Logo" src="/logo-dark.png" className="scale-110" />
          </div>
          <h1 className={cn("text-2xl font-bold text-white", poppins.className)}>
            Rewise
          </h1>
        </Link>



        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              key={route.href} 
              href={route.href}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer rounded-lg transition dark: text-white",
                pathname === route.href ? "bg-white/10" : "",
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
      <FreeCounter 
        apiLimitCount={apiLimitCount} 
        isPro={isPro}
      />
    </div>
  );
};

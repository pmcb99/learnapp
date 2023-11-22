"use client";

import TypewriterComponent from "typewriter-effect";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";

export const LandingHero = () => {
  const { isSignedIn } = useAuth();

  return (
    <div className="text-white font-bold py-36 text-center space-y-5 bg-[#000310]">
      <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold">
        <h1 className="">Learn faster with Rewise.</h1>
      <div className="text-sm md:text-xl font-light text-zinc-400">
        Leaving Certificate learning platform.
      </div>
        <div className="text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-800/90">
          <TypewriterComponent
            options={{
              strings: [
                "Stop wasting time.",
                "Start learning fast.",
              ],
              autoStart: true,
              loop: true,
            }}
          />
        </div>
      </div>
      <div className="text-sm md:text-xl font-light text-zinc-400">
        Exam questions broken down by topic, quizes and AI tutor.
      </div>
      <div>
        <Link href={isSignedIn ? "/lc/higher/chat" : "/sign-up"}>
          <Button variant="premium" className="md:text-lg p-4 md:p-6 rounded-full font-semibold">
            Get Started
          </Button>
        </Link>
      </div>
      <div className="text-zinc-400 text-xs md:text-sm font-normal">
        Try for free.
      </div>
    </div>
  );
};

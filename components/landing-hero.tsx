"use client";

import TypewriterComponent from "typewriter-effect";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import Image from "next/image";

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
                "\"Summarize Hamlet Act 1 Scene 1.\"",
                "\"Quiz me on volcanos.\"",
                "\"Explain the laws of motion.\"",
                "\"What is DNA made of?.\"",
                "\"Who invented the lightbulb?\"",
              ],
              autoStart: true,
              loop: true,
            }}
          />
        </div>
      </div>
      <div className="text-sm md:text-xl font-light text-zinc-400">
        Exam questions broken down by topic, and AI tutor.
      </div>
      <div className="text-white-400 text-xs md:text-lg font-normal">
        Try for free.
      </div>
      <div className="grid grid-cols-3">
        <div className="flex items-center justify-center">
        <Image src="/landing/papers-overlay.png" className="" width={150} height={150} alt='wkw'/>
        </div>
        <Link href={isSignedIn ? "/lc/higher/chat" : "/sign-up"}>
          <Button variant="premium" className="md:text-lg p-4 md:p-6 rounded-full font-semibold">
            Get Started
          </Button>
        </Link>
        <Image src="/landing/owl.png" className="" width={300} height={200} alt='wkw'/>
      </div>
    </div>
  );
};

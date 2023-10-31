"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const testimonials = [
  {
    name: "Sam S.",
    avatar: "J",
    title: "Leaving Cert Student",
    description: "Better and cheaper than what I tried before.",
  },
  {
    name: "Shauna L.",
    avatar: "J",
    title: "Leaving Cert Student",
    description: "The chat feature is so useful.",
  },
  {
    name: "Jason D.",
    avatar: "A",
    title: "Grinds Teacher",
    description: "Makes my job easier.",
  },
  {
    name: "James M.",
    avatar: "M",
    title: "PE/Biology Teacher",
    description: "I recommend this to all my students.",
  },
];

export const LandingContent = () => {
  return (
    <div className="px-10 pb-20 bg-[#000310]">
      <h2 className="text-center text-4xl text-white font-extrabold mb-10">Testimonials</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {testimonials.map((item) => (
          <Card key={item.description} className="bg-[#192339] border-none text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-x-2">
                <div>
                  <p className="text-lg">{item.name}</p>
                  <p className="text-zinc-400 text-sm">{item.title}</p>
                </div>
              </CardTitle>
              <CardContent className="pt-4 px-0">
                {item.description}
              </CardContent>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  )
}
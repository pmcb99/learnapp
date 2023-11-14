"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const testimonials = [
  // {
  //   name: "Sam S.",
  //   avatar: "J",
  //   title: "Leaving Cert Student",
  //   description: "Better and cheaper than what I tried before.",
  // },
  {
    name: "Ronan",
    avatar: "J",
    title: "Leaving Cert Student, Cork",
    description: "So handy.",
  },
  {
    name: "Gavin",
    avatar: "M",
    title: "Physics Teacher, Cavan",
    description: "I recommend this to all my students.",
  },
  {
    name: "Shauna",
    avatar: "A",
    title: "Student",
    description: "It took the stress out of studying.",
  },
  {
    name: "James",
    avatar: "M",
    title: "Biology Teacher, Dublin",
    description: "I recommend this to all my students.",
  },
];

export const LandingContent = () => {
  return (
    <div className="px-10 pb-20 bg-[#000310]">
      <h2 className="text-center text-4xl text-white font-extrabold mb-10">Reviews</h2>
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
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';

type TestimonialType = {
  id: number;
  name: string;
  avatar: string;
  title: string;
  description: string;
};

const testimonials: TestimonialType[] = [
  {
    id: 1,
    name: 'Ronan',
    avatar: '/avatars/ronan.jpg', // Replace with the path to the avatar image
    title: 'Leaving Cert Student, Cork',
    description: 'So handy.',
  },
  {
    id: 2,
    name: 'Gavin',
    avatar: '/avatars/gavin.jpg',
    title: 'Physics Teacher, Cavan',
    description: 'I love how it teaches the paper structure.',
  },
  {
    id: 3,
    name: 'Shauna',
    avatar: '/avatars/shauna.jpg',
    title: 'Student',
    description: 'It took the stress out of studying.',
  },
  {
    id: 4,
    name: 'Stephen',
    avatar: '/avatars/stephen.jpg',
    title: 'Maths Teacher, Dublin',
    description: 'I recommend this to all my students.',
  },
  // Add additional testimonials as needed
];

export const LandingContent: React.FC = () => {
  return (
    <section className="py-20 px-10 bg-neutral-900">
      <h2 className="text-4xl font-extrabold text-center text-white mb-12">What Our Users Are Saying</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.id} className="bg-neutral-800 border border-neutral-700 rounded-lg overflow-hidden transform transition-all hover:scale-105 hover:shadow-xl">
            <CardHeader className="flex items-center p-4 bg-neutral-700">
              <Image src={testimonial.avatar} width={40} height={40} alt={testimonial.name} className="rounded-full" />
              <div className="ml-4">
                <CardTitle className="text-lg text-white">{testimonial.name}</CardTitle>
                <p className="text-sm text-neutral-400">{testimonial.title}</p>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <p className="text-white">{testimonial.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default LandingContent;

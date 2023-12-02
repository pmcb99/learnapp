import React from 'react';

type TestimonialCardProps = {
  name: string;
  title: string;
  description: string;
  avatar: string;
};

const TestimonialCard: React.FC<TestimonialCardProps> = ({ name, title, description, avatar }) => {
  return (
    <div className="bg-[#192339] border-none text-white p-6 rounded-lg">
      <header className="flex items-center gap-x-2 mb-4">
        {/* Placeholder for avatar */}
        <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center uppercase font-bold text-black">
          {avatar}
        </div>
        <div>
          <p className="text-lg font-bold">{name}</p>
          <p className="text-sm text-zinc-400">{title}</p>
        </div>
      </header>
      <p>{description}</p>
    </div>
  );
};

export default TestimonialCard;

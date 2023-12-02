import React from 'react';
import Typewriter from 'typewriter-effect';

const TypewriterEffect: React.FC = () => {
  return (
    <Typewriter
    options={{
        strings: [
          "\"Summarize Hamlet Act 1 Scene 1.\"",
          "\"Quiz me on volcanos.\"",
          "\"Explain the laws of motion.\"",
          "\"What is DNA made of?\"",
          "\"Who invented the lightbulb?\"",
        ],
        autoStart: true,
        loop: true,
      }}
    />
  );
};

export default TypewriterEffect;

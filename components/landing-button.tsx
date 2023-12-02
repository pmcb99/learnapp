import React from 'react';

type ButtonProps = {
  children: React.ReactNode;
  variant: 'premium' | 'outline';
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({ children, variant, ...props }) => {
  const baseStyle = "p-4 rounded-full font-semibold transition-colors duration-300";
  const variantStyle = variant === "premium" ? "text-lg bg-blue-500 hover:bg-blue-700 text-white" : "";

  return (
    <button className={`${baseStyle} ${variantStyle}`} {...props}>
      {children}
    </button>
  );
};

export default Button;

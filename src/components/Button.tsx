// src/components/Button.tsx
import React from "react";

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode; // New optional icon prop
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  className,
  icon,
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center bg-blue-500 text-white font-bold py-2 px-4 rounded cursor-pointer disabled:cursor-not-allowed hover:bg-blue-600 transition ${className}`}
    >
      {icon && <span className="mr-2">{icon}</span>}{" "}
      {/* Render icon if provided */}
      {children}
    </button>
  );
};

export default Button;

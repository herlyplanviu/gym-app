import React from "react";

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
  type?: "button" | "submit" | "reset" | undefined;
  variant?: "primary" | "error" | "info" | "warning" | "text";
  loading?: boolean;
}

const variantClasses = {
  primary: "bg-blue-500 hover:bg-blue-600 text-white",
  error: "bg-red-500 hover:bg-red-600 text-white",
  info: "bg-teal-500 hover:bg-teal-600 text-white",
  warning: "bg-yellow-500 hover:bg-yellow-600 text-white",
  text: "bg-transparent text-black hover:underline",
};

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  className,
  icon,
  type = "button",
  variant = "primary",
  loading = false,
}) => {
  return (
    <button
      type={type}
      onClick={(e) => {
        e.preventDefault();
        if (!loading && onClick) onClick();
      }}
      disabled={loading}
      className={`flex items-center font-bold py-2 px-4 rounded cursor-pointer disabled:cursor-not-allowed transition ${variantClasses[variant]} ${className}`}
    >
      {loading ? (
        <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4 mr-2"></span>
      ) : (
        icon && <span className="mr-2">{icon}</span>
      )}
      {loading ? "Loading..." : children}
    </button>
  );
};

export default Button;

import React from "react";

interface InputProps {
  label?: string;
  value: string | number;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  placeholder?: string;
  className?: string;
  type?: string;
  errors?: string;
  options?: { value: string; label: string }[];
  as?: "input" | "textarea" | "select";
  autoFocus?: boolean;
  onBlur?: (e: React.FocusEvent) => void;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  ref?:
    | React.RefObject<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    | undefined;
}

const Input: React.FC<InputProps> = ({
  label,
  value,
  onChange,
  placeholder,
  className,
  type = "text",
  errors,
  options = [],
  as = "input",
  autoFocus = false,
  onBlur,
  onKeyDown,
  ref,
}) => {
  const baseClasses = `border border-gray-300 rounded py-2 px-4 ${errors ? "border-red-500" : ""} ${className}`;

  return (
    <div className="flex flex-col w-full">
      {label && <label className="mb-1 font-medium">{label}</label>}
      {as === "input" && (
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={baseClasses}
          autoFocus={autoFocus}
          onBlur={onBlur}
          ref={ref as React.RefObject<HTMLInputElement>}
          onKeyDown={onKeyDown}
        />
      )}
      {as === "textarea" && (
        <textarea
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={baseClasses}
          rows={4}
        />
      )}
      {as === "select" && (
        <select value={value} onChange={onChange} className={baseClasses}>
          <option value="">Select options</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      )}
      {errors && <p className="text-red-500 text-sm mt-1">{errors}</p>}
    </div>
  );
};

export default Input;

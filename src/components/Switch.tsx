/* eslint-disable @typescript-eslint/no-unused-expressions */

interface SwitchProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
}

export default function Switch({
  checked = false,
  onChange,
  label,
}: SwitchProps) {
  const toggleSwitch = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // const newState = !isOn;
    // setIsOn(newState);
    onChange && onChange(!checked);
  };

  return (
    <div className="flex flex-col items-start">
      {label && <label className="mb-1 font-medium">{label}</label>}
      <button
        type="button"
        onClick={(e) => toggleSwitch(e)}
        className={`relative w-12 h-6 flex items-center rounded-full transition duration-300
          ${checked ? "bg-blue-500" : "bg-gray-300"}`}
      >
        <span
          className={`absolute left-1 w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300
            ${checked ? "translate-x-6" : "translate-x-0"}`}
        />
      </button>
    </div>
  );
}

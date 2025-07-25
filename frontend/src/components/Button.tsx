interface ButtonProps {
  onClick: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  text: string;
  disabled?: boolean;
}

export const Button = ({
  onClick,
  className,
  type = "button",
  text,
  disabled = false,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-200 ${className}`}
      type={type}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

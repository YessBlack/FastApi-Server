interface InputProps {
  value: string;
  onChange: (value: string) => void;
  type?: string;
  id?: string;
  name?: string;
  autoComplete?: string;
  required?: boolean;
  className?: string;
  label: string;
  placeholder?: string;
}

export const Input = ({
  value,
  onChange,
  type,
  id,
  name,
  autoComplete,
  required,
  className,
  label,
  placeholder,
}: InputProps) => {
  return (
    <div>
      <label className="block text-gray-700 mb-1 font-bold">{label}</label>
      <input
        type={type || "text"}
        id={id}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${className}`}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
      />
    </div>
  );
};

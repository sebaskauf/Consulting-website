// Example component showing how 21st.dev components work
// Replace this with actual components from 21st.dev

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
}

export function ExampleButton({
  children,
  variant = 'primary',
  onClick
}: ButtonProps) {
  const baseStyles = "px-6 py-3 rounded-lg font-medium transition-all duration-200";
  const variants = {
    primary: "bg-black text-white hover:bg-gray-800 hover:shadow-lg",
    secondary: "border border-gray-300 hover:bg-gray-50 hover:border-gray-400"
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

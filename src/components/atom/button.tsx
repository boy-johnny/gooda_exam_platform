/**
 * Button component with customizable size and variant props
 * @param {React.ReactNode} children - Button content
 * @param {() => void} onClick - Click handler function
 * @param {string} size - Button size (xs, sm, md, lg, xl)
 * @param {string} variant - Button style variant (primary, secondary, outline)
 */
export default function Button({
  children,
  onClick,
  size = "md",
  variant = "primary",
}: {
  children: React.ReactNode;
  onClick: () => void;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  variant?: "primary" | "secondary" | "outline";
}) {
  // Size classes mapping
  const sizeClasses = {
    xs: "px-2.5 py-1 text-xs",
    sm: "px-2.5 py-1 text-sm",
    md: "px-3 py-1.5 text-sm",
    lg: "px-3.5 py-2 text-sm",
    xl: "px-4 py-2.5 text-sm",
  };

  // Variant classes mapping
  const variantClasses = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-500",
    secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300",
    outline: "border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50",
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full font-semibold shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${sizeClasses[size]} ${variantClasses[variant]}`}
    >
      {children}
    </button>
  );
}

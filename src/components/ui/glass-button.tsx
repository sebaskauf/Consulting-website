import * as React from "react";

function cn(...inputs: (string | undefined | null | false)[]): string {
  return inputs.filter(Boolean).join(" ");
}

type ButtonSize = "default" | "sm" | "lg" | "icon";

function getButtonVariantClasses(size?: ButtonSize): string {
  const baseClasses = "relative isolate all-unset cursor-pointer rounded-full transition-all";

  const sizeClasses = {
    default: "text-base font-medium",
    sm: "text-sm font-medium",
    lg: "text-lg font-medium",
    icon: "h-10 w-10",
  };

  return cn(baseClasses, sizeClasses[size || "default"]);
}

function getButtonTextVariantClasses(size?: ButtonSize): string {
  const baseClasses = "glass-button-text relative block select-none tracking-tighter";

  const sizeClasses = {
    default: "px-6 py-3.5",
    sm: "px-4 py-2",
    lg: "px-8 py-4",
    icon: "flex h-10 w-10 items-center justify-center",
  };

  return cn(baseClasses, sizeClasses[size || "default"]);
}

export interface GlassButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
  contentClassName?: string;
}

const GlassButton = React.forwardRef<HTMLButtonElement, GlassButtonProps>(
  ({ className, children, size, contentClassName, ...props }, ref) => {
    return (
      <div
        className={cn(
          "glass-button-wrap cursor-pointer rounded-full",
          className
        )}
      >
        <button
          className={cn("glass-button", getButtonVariantClasses(size))}
          ref={ref}
          {...props}
        >
          <span
            className={cn(
              getButtonTextVariantClasses(size),
              contentClassName
            )}
          >
            {children}
          </span>
        </button>
        <div className="glass-button-shadow rounded-full"></div>
      </div>
    );
  }
);
GlassButton.displayName = "GlassButton";

export { GlassButton };

import {
  cloneElement,
  isValidElement,
  type ButtonHTMLAttributes,
  type ReactElement,
} from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  asChild?: boolean;
  children?: ReactElement | string;
};

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-200 disabled:text-white disabled:opacity-70",
  secondary:
    "bg-gray-200 text-gray-900 hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400 disabled:opacity-70",
  ghost:
    "bg-transparent text-blue-600 hover:bg-blue-50 disabled:text-blue-300 disabled:hover:bg-transparent",
  danger:
    "bg-red-600 text-white hover:bg-red-700 disabled:bg-red-200 disabled:text-white disabled:opacity-70",
};

export default function Button({
  variant = "primary",
  className = "",
  type = "button",
  asChild = false,
  children,
  ...props
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition ${variantStyles[variant]} ${className}`;
  const buttonProps = { ...props } as ButtonHTMLAttributes<HTMLButtonElement> & {
    asChild?: boolean;
  };

  delete buttonProps.asChild;

  if (asChild && isValidElement(children)) {
    return cloneElement(children, {
      ...buttonProps,
      className: `${classes} ${children.props.className ?? ""}`.trim(),
    });
  }

  return (
      <button
        type={type}
        className={classes}
        {...buttonProps}
      >
        {children}
      </button>
  );
}

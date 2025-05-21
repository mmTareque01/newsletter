import  React from "react";
import Link from "next/link";

interface DropdownItemProps {
  tag?: "a" | "button";
  to?: string;
  onClick?: () => void;
  onItemClick?: () => void;
  baseClassName?: string;
  className?: string;
  children: React.ReactNode;
}

export const DropdownItem = ({
  tag = "button",
  to,
  onClick,
  onItemClick,
  baseClassName = "block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900",
  className = "",
  children,
}: DropdownItemProps) => {
  const combinedClasses = `${baseClassName} ${className}`.trim();



  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
  if (tag === "button") {
    event.preventDefault();
  }
  if (onClick) onClick();  // Pass the event to onClick if needed
  if (onItemClick) onItemClick();  // Pass the event to onItemClick if needed
};

  if (tag === "a" && to) {
    return (
      <Link href={to} className={combinedClasses} onClick={handleClick}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={handleClick} className={combinedClasses}>
      {children}
    </button>
  );
};
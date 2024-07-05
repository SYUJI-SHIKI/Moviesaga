import React, { ReactNode } from "react";
import Link from "next/link";

interface ButtonProps {
  href: string;
  className?: string;
  children: ReactNode;
}

const Button: React.FC<ButtonProps> =({ href, className, children }) => (
  <Link href={href}>
    <button className={`relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium rounded-lg group ${className}`}>
      <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-gray-900 dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
        {children}
      </span>
    </button>
  </Link>
);

export default Button;
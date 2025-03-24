import React from 'react';

/**
 * Customizable Button Component (no clsx)
 * @param {string} bgColor - Tailwind background color (e.g. 'bg-[#1E2A78]')
 * @param {string} textColor - Tailwind text color (e.g. 'text-white')
 * @param {string} hoverColor - Tailwind hover color (e.g. 'hover:bg-[#3142a0]')
 * @param {string} focusColor - Tailwind focus ring color (e.g. 'focus:ring-[#1E2A78]')
 * @param {string} rounded - Tailwind border radius (e.g. 'rounded-lg')
 * @param {string} width - Tailwind width class (e.g. 'w-full')
 * @param {string} className - Additional custom classes
 * @param {ReactNode} children - Button text/content
 * @param {function} onClick - Click handler
 */
import { ReactNode } from 'react';

interface CustomButtonProps {
  bgColor?: string;
  textColor?: string;
  hoverColor?: string;
  focusColor?: string;
  rounded?: string;
  width?: string;
  className?: string;
  children?: ReactNode;
  onClick?: () => void;
}

const CustomButton = ({
  bgColor = 'bg-[#1E2A78]',
  textColor = 'text-white',
  hoverColor = 'hover:bg-[#3142a0]',
  focusColor = 'focus:ring-[#1E2A78]',
  rounded = 'rounded-lg',
  width = 'w-fit',
  className = '',
  children,
  onClick,
}: CustomButtonProps) => {
  const baseStyles = `px-6 py-3 font-semibold transition-colors duration-200 focus:outline-none text-center focus:ring-2 clickable-button`;
  const combinedClasses = `${baseStyles} ${bgColor} ${textColor} ${hoverColor} ${focusColor} ${width} ${rounded} ${className} `;

  return (
    <div onClick={onClick} className={combinedClasses}>
      {children}
    </div>
  );
};

export default CustomButton;
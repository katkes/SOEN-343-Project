import React from 'react';

import { ReactNode } from 'react';

interface CustomButtonProps {
  bgColor?: string;
  textColor?: string;
  hoverColor?: string;
  focusColor?: string;
  rounded?: string;
  width?: string;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
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

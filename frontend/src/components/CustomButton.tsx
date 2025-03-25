import { ReactNode } from 'react';

interface CustomButtonProps {
  bgColor?: string;
  textColor?: string;
  hoverColor?: string;
  focusColor?: string;
  rounded?: string;
  width?: string;
  padding?: string;
  borderColor?: string;
  borderRounded?: string;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  children?: ReactNode;
  textSizes?: string;
  onClick?: () => void;
  disableDefaults?: boolean; // new prop to disable default styling
}

const CustomButton = ({
  bgColor = 'bg-[#1E2A78]',
  textColor = 'text-white',
  hoverColor = 'hover:bg-[#3142a0]',
  focusColor = 'focus:ring-[#1E2A78]',
  rounded = 'rounded-lg',
  width = 'w-fit',
  padding = 'px-6 py-3',
  borderColor = '',
  borderRounded = '',
  textSizes = '',
  className = '',
  disableDefaults = false,
  children,
  type,
  onClick,
}: CustomButtonProps) => {
  const baseStyles = `font-semibold transition-colors duration-200 focus:outline-none text-center focus:ring-2 clickable-button`;
  const borderClasses = borderColor ? `border ${borderColor} ${borderRounded}` : '';
  // Use computed values based on disableDefaults flag
  const computedBgColor = disableDefaults ? '' : bgColor;
  const computedTextColor = disableDefaults ? '' : textColor;
  const computedHoverColor = disableDefaults ? '' : hoverColor;
  const computedFocusColor = disableDefaults ? '' : focusColor;
  const computedRounded = disableDefaults ? '' : rounded;
  const computedPadding = disableDefaults ? '' : padding;
  const computedWidth = disableDefaults ? '' : width;

  const combinedClasses = `${baseStyles} ${computedPadding} ${computedBgColor} ${computedTextColor} ${computedHoverColor} ${computedFocusColor} ${computedWidth} ${computedRounded} ${borderClasses} ${textSizes} ${className}`;

  return (
    <button type={type} onClick={onClick} className={combinedClasses}>
      {children}
    </button>
  );
};

export default CustomButton;

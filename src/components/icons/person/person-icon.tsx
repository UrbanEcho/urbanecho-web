import React from "react";
import { styled } from "styled-components";

interface IconProps {
  size?: number;
  className?: string;
}

const StyledSvg = styled.svg`
  display: inline-block;
  vertical-align: middle;
  overflow: hidden;
`;

export const PersonIcon: React.FC<IconProps> = ({ size = 24, className }) => {
  return (
    <StyledSvg
      data-testid="person-icon"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Path data for a person icon (head and shoulders) */}
      <circle cx="12" cy="7" r="4" /> {/* The head */}
      <path d="M12 15c-3.1 0-5.9 1.4-8 3.5V20h16v-1.5c-2.1-2.1-4.9-3.5-8-3.5z" />{" "}
      {/* The shoulders/body */}
    </StyledSvg>
  );
};

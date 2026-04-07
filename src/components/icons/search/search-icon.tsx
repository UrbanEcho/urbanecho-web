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

export const SearchIcon: React.FC<IconProps> = ({ size = 24, className }) => {
  return (
    <StyledSvg
      data-testid="search-icon"
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
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </StyledSvg>
  );
};

import React from "react";
import { styled } from "styled-components";

interface IconProps {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

const StyledSvg = styled.svg`
  display: inline-block;
  vertical-align: middle;
  overflow: hidden;
`;

export const ArrowClockwiseIcon: React.FC<IconProps> = ({
  size = 24,
  className,
  style,
}) => {
  return (
    <StyledSvg
      data-testid="arrow-clockwise-icon"
      className={className}
      style={style}
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 256 256"
      fill="none"
      stroke="currentColor"
      strokeWidth="16"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Arrowhead (top right corner) */}
      <polyline points="184 104 232 104 232 56" />
      {/* Main arc path (rotation) */}
      <path d="M188.4,192a88,88,0,1,1,1.83-126.23L232,104" />
    </StyledSvg>
  );
};

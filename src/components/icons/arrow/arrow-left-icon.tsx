import React from "react";
import { styled } from "styled-components";

interface IconProps {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
  isBold?: boolean;
}

const StyledSvg = styled.svg`
  display: inline-block;
  vertical-align: middle;
  overflow: hidden;
`;

export const ArrowLeftIcon: React.FC<IconProps> = ({
  size = 24,
  className,
  style,
  isBold,
}) => {
  const strokeWeight = isBold ? "20" : "16";

  return (
    <StyledSvg
      data-testid="arrow-left-icon"
      className={className}
      style={style}
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 256 256"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWeight}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="216" y1="128" x2="40" y2="128" />
      <polyline points="112 56 40 128 112 200" />
    </StyledSvg>
  );
};

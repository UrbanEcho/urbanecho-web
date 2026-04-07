import React from "react";
import { styled } from "styled-components";

interface IconProps {
  size?: number;
  className?: string;
  isBold?: boolean; // New prop to simulate "bold" weight
}

const StyledSvg = styled.svg`
  display: inline-block;
  vertical-align: middle;
  overflow: hidden;
`;

export const ArrowRightIcon: React.FC<IconProps> = ({
  size = 24,
  className,
  isBold,
}) => {
  const strokeWeight = isBold ? "2.5" : "2";

  return (
    <StyledSvg
      data-testid="arrow-right-icon"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWeight}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Line (Shaft of the arrow) */}
      <line x1="5" y1="12" x2="19" y2="12" />
      {/* Arrowhead (Chevrons) */}
      <polyline points="12 5 19 12 12 19" />
    </StyledSvg>
  );
};

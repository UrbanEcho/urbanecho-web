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

export const DashboardIcon: React.FC<IconProps> = ({
  size = 24,
  className,
}) => {
  return (
    <StyledSvg
      data-testid="dashboard-icon"
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
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
    </StyledSvg>
  );
};

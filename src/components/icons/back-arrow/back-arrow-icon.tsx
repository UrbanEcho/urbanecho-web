import styled from "styled-components";

interface IconProps {
  size?: number;
  className?: string;
}

const StyledSvg = styled.svg`
  display: inline-block;
  vertical-align: middle;
  overflow: hidden;
`;

export const BackArrowIcon = ({ size = 24, className }: IconProps) => {
  return (
    <StyledSvg
      data-testid="back-arrow-icon"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="#FFFFFF"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15.41 7.41L14 6L8 12L14 18L15.41 16.59L10.83 12L15.41 7.41Z" />
    </StyledSvg>
  );
};

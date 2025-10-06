import styled from "styled-components";

export const CompanyOurStorySectionWrapper = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const CompanyOurStoryContent = styled.section<{ bgImg: string }>`
  position: relative;
  display: flex;
  align-items: flex-end;
  width: 100%;
  min-height: 48rem; /** 768px */
  max-width: ${({ theme: { layout } }) => layout.container.desktop.maxWidth};
  overflow: hidden;
  margin: 0 auto;
  background-image: linear-gradient(
      180deg,
      rgba(22, 65, 63, 0) 0%,
      rgba(22, 65, 63, 0.32) 40%,
      rgba(22, 65, 63, 0.76) 72%,
      rgba(22, 65, 63, 0.94) 90%,
      rgb(22, 65, 63) 100%
    ),
    url(${(props) => props.bgImg});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

export const CompanyOurStoryCopy = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing["24"]};
  max-width: 62.5rem; /** 1000px */
  padding: ${({ theme }) => theme.spacing["64"]} ${({ theme }) => theme.spacing["128"]};
  @media (max-width: ${({ theme }) => theme.layout.container.tablet.maxWidth}) {
    padding: ${({ theme }) => theme.spacing["16"]} ${({ theme }) => theme.spacing["16"]};
    max-width: 100%;
    height: 38.75rem; /** 620px */
    justify-content: flex-end
  }
  h2 {
    ${({ theme }) => theme.typography.heading["20/bold"]}
    color: ${({ theme }) => theme.primitivesColors.neutral['50'].hex};
  }

  p {
    ${({ theme }) => theme.typography.heading["16/medium"]}
    color: ${({ theme }) => theme.primitivesColors.neutral['100'].hex};
  }

 
  
`;

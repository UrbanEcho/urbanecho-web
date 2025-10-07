import styled from "styled-components";

export const CompanyTeamSectionWrapper = styled.section<{ bgColor: string }>`
  width: 100%;
  background-color: ${({ bgColor }) => bgColor};
  display: flex;
  justify-content: center;
  padding: ${({ theme }) => `${theme.spacing["40"]} `};
  overflow: hidden;
  position: relative;
  & .mask {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    /* background-image: linear-gradient(to bottom,#D9D9D9,#73737333 ); */
    /* background-color: red; */
    z-index: 2;
    @media (min-width: ${({ theme }) => theme.layout.container.tablet.maxWidth}) {
      display: none;
    }
  }
`;

export const CompanyTeamContent = styled.div<{
  headerColor: string;
  paragraphColor: string;
  backgroundColor: string;
}>`
  position: relative;
  display: grid;
  place-items: center;
  text-align: center;
  width: 800px;
  height: 800px;
  aspect-ratio: 1;
  z-index: 1;

  @media (max-width: ${({ theme }) => theme.layout.container.tablet.maxWidth}) {
    height: 360px;
    width: 360px;
  }

  filter: drop-shadow(-10.91px 11.82px 36.36px rgba(1, 57, 54, 0.17) )
    drop-shadow(-43.64px 49.09px 65.45px rgba(1, 57, 54, 0.15))
    drop-shadow(-99.09px 110px 89.09px rgba(1, 57, 54, 0.09))
    drop-shadow(-175.45px 196.36px 105.45px rgba(1, 57, 54, 0.03))
    drop-shadow(-274.55px 306.36px 115.45px rgba(1, 57, 54, 0))  ;

  @media (max-width: ${({ theme }) => theme.layout.container.tablet.maxWidth}) {
    /* background-image: linear-gradient(
      to-bottom,
      rgba(255, 255, 255, 0.6),
      rgba(255, 255, 255, 0)
    ); */
  }

  & .team-section-content {
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing["16"]};
    max-width: 26.5rem; /** 424px */
    z-index:100;
    @media (max-width: ${({ theme }) => theme.layout.container.tablet.maxWidth}) {
      max-width: 13rem; /** 208px */
    }
    h2 {
      ${({ theme }) => theme.typography.heading["40/medium"]}
      @media (max-width: ${({ theme }) =>theme.layout.container.tablet.maxWidth}) {
        z-index: 20;
        ${({ theme }) => theme.typography.heading["20/medium"]}
      }
    }
    & p {
      ${({ theme }) => theme.typography.paragraph["16/400"]}
      color: ${({ paragraphColor }) => paragraphColor};
      @media (max-width: ${({ theme }) =>theme.layout.container.tablet.maxWidth}) {
        ${({ theme }) => theme.typography.paragraph["14/400"]}
      }
    }
  }
  
`;

export const BaseSvgContainer = styled.svg`
opacity: 0.2;
  width: 800px;
  height: 800px;
  display: block;
  z-index: 1;
  position: absolute;

  @media (max-width: ${({ theme }) => theme.layout.container.tablet.maxWidth}) {
    width: 360px;
    height: 360px;
  }
`;

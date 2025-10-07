import styled from "styled-components";

export const BaseCompanyAboutContainer = styled.section<{
  bgColor: string;
}>`
  background-color: ${({ bgColor }) => bgColor};
`;

export const CompanyAboutContent = styled.div<{
  imgBorderColor: string;
  headerColor: string;
  paragraphColor: string;
}>`
  max-width: ${({ theme: { layout } }) => layout.container.desktop.maxWidth};
  margin: 0 auto;
  padding: ${({ theme }) => `${theme.spacing["120"]} ${theme.spacing["128"]}`};
 @media (max-width:${({ theme }) => theme.layout.container.desktop.maxWidth}) {
    padding: ${({ theme }) => `${theme.spacing["64"]}  ${theme.spacing["16"]} ${theme.spacing["40"]} ${theme.spacing["16"]}`};
  }
  & .about-section-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    gap: ${({ theme }) => theme.spacing["80"]};
    @media (max-width:${({ theme }) => theme.layout.container.tablet.maxWidth}) {
      display: flex;
      flex-direction: column-reverse;
      gap: ${({ theme }) => theme.spacing["24"]};
    }
    .image-container {
      overflow: hidden;
      border: 0.5px solid ${({ imgBorderColor }) => imgBorderColor};
      height: 520px;
      width: 681px;
      @media (max-width:${({ theme }) => theme.layout.container.tablet.maxWidth}) {
        width: 100%;
        height: 280px;
      }
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
      }
    }
    .text-container {
      display: flex;
      flex-direction: column;
      gap: ${({ theme }) => theme.spacing["16"]};
      h2 {
        color: ${({ headerColor }) => headerColor};
        ${({ theme }) => theme.typography.heading["20/bold"]}
      }
      p {
        color: ${({ paragraphColor }) => paragraphColor};
        ${({ theme }) => theme.typography.heading["16/medium"]}
      }
    }
  }
`;

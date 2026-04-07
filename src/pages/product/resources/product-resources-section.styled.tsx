import styled from "styled-components";

export const ProductResourcesSectionMainContainer = styled.div<{
  $backgroundColor: string;
}>`
  width: 100%;
  background-color: ${({ $backgroundColor }) => $backgroundColor};
`;

export const ResourcesContainer = styled.div<{
  $cardBorderColor: string;
  $cardContentBg: string;
  $badgeColor: string;
  $badgeBg: string;
  $subtitleColor: string;
  $dateColor: string;
}>`
  max-width: ${({ theme: { layout } }) => layout.container.desktop.maxWidth};
  margin: 0 auto;
  padding: ${({ theme }) => `${theme.spacing["80"]}`};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[64]};
  @media (max-width: ${({ theme }) => theme.layout.container.tablet.maxWidth}) {
    padding: ${({ theme }) =>
      `${theme.spacing[40]} ${theme.spacing[16]} ${theme.spacing[40]} ${theme.spacing[16]}`};
    gap: ${({ theme }) => theme.spacing[40]};
  }
  & > h2 {
    max-width: 74rem; /** 1184px */
    ${({ theme }) => theme.typography.heading["40/medium"]}
    text-align: center;
    @media (max-width: ${({ theme }) =>
        theme.layout.container.tablet.maxWidth}) {
      ${({ theme }) => theme.typography.heading["32/medium"]}
    }
  }

  & .resources-content-wrapper {
    display: flex;
    gap: ${({ theme }) => theme.spacing[40]};
    flex-direction: column;

    & .cards-container {
      display: flex;
      gap: ${({ theme }) => theme.spacing[24]};
      @media (max-width: ${({ theme: { layout } }) =>
          layout.container.tablet.maxWidth}) {
        flex-direction: column;
        gap: ${({ theme }) => theme.spacing[40]};
      }
      & .resource-card {
        display: flex;
        flex-direction: column;
        flex: 1;
        min-width: 0;
        border: 0.5px solid ${({ $cardBorderColor }) => $cardBorderColor};
        width: 100%;

        & .badge {
          background-color: ${({ $badgeBg }) => $badgeBg};
          color: ${({ $badgeColor }) => $badgeColor};
          width: fit-content;
          ${({ theme }) => theme.typography.paragraph["12/400"]}
          padding: ${({ theme }) => theme.spacing["04"]};
        }
        & img {
          height: 20.5rem; /** 328px */
          width: 100%;
          object-fit: cover;
          @media (max-width: ${({ theme }) =>
              theme.layout.container.tablet.maxWidth}) {
            height: 328px;
          }
        }
        & h3 {
          ${({ theme }) => theme.typography.heading["20/medium"]}
        }
        & .resource-subtitle {
          margin: 0;
          color: ${({ $subtitleColor }) => $subtitleColor};
          ${({ theme }) => theme.typography.paragraph["14/400"]}
        }
        & .resource-date {
          margin: 0;
          color: ${({ $dateColor }) => $dateColor};
          ${({ theme }) => theme.typography.paragraph["12/400"]}
        }
        & .resource-resource-card-content {
          display: flex;
          flex-direction: column;
          flex: 1;
          padding: ${({ theme }) => theme.spacing["24"]};
          gap: ${({ theme }) => theme.spacing["08"]};
          background-color: ${({ $cardContentBg }) => $cardContentBg};
        }
        & .resource-card-actions {
          display: flex;
          flex-direction: column;
          align-self: stretch;
          width: 100%;
          margin-top: auto;
          padding-top: ${({ theme }) => theme.spacing["16"]};
        }
      }
    }

    & .resources-cta-container {
      display: flex;
      justify-content: center;
      align-items: center;
      padding-top: ${({ theme }) => theme.spacing[40]};
      & h2 {
        max-width: 552px;
        ${({ theme }) => theme.typography.heading["24/medium"]};
        text-align: center;
      }
      & .content-wrapper {
        width: 100%;
        max-width: 552px;
        align-self: center;
        display: flex;
        flex-direction: column;
        gap: ${({ theme }) => theme.spacing[24]};
        align-items: center;
        & a {
          text-decoration: none;
          display: inline-flex;
        }
      }
    }
  }
`;

export const ResourceCardsContainer = styled.div``;
// export const ResourceCardB

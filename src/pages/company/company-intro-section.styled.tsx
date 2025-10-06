import styled from "styled-components";

export const BaseCompanyIntroContainer = styled.div<{
  backgroundColor: string;
}>`
  background-color: ${(props) => props.backgroundColor};
`;

export const CompanyIntroContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[40]};
  max-width: ${({ theme: { layout } }) => layout.container.desktop.maxWidth};
  margin: 0 auto;
  padding-top: ${({ theme }) => theme.spacing[80]};
  @media (max-width: ${({ theme }) => theme.layout.container.tablet.maxWidth}) {
    padding: 0;
    gap: ${({ theme }) => theme.spacing[24]};
  }
  & .header-section {
    @media (max-width: ${({ theme }) =>theme.layout.container.tablet.maxWidth}) {
      padding: ${({ theme }) => `${theme.spacing[40]} 0 0 0`};
    }
    h2 {
      text-align: center;
      ${({ theme }) => theme.typography.heading["56/medium"]}
      max-width: 992px;
      @media (max-width: ${({ theme }) =>theme.layout.container.tablet.maxWidth}) {
        ${({ theme }) => theme.typography.heading["32/medium"]}
      }
    }
  }
  & img {
    height: 52rem; /** 832px */
    width: 100%;
    @media (max-width: ${({ theme }) =>theme.layout.container.tablet.maxWidth}) {
      height: 620px;
      width: 100%;
      object-fit: cover;
      object-position: center;
    }
  }
`;

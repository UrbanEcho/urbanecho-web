import styled from "styled-components";

export const MiddleHeaderSectionContainer = styled.div<{
  $linkActiveColor: string;
  $linkHoverColor: string;
  $linkInactiveColor: string;
}>`
  display: flex;
  align-items: center;
  padding: 0 16px;
  @media (max-width: ${({ theme }) => theme.layout.container.tablet.maxWidth}) {
    display: none;
  }
  nav {
    ul {
      display: flex;
      gap: ${({ theme }) => theme.spacing[40]};
      list-style: none;
      li {
        a {
          ${({ theme }) => theme.typography.paragraph["16/600"]}
          text-decoration: none;
          color: ${({ $linkInactiveColor }) => $linkInactiveColor};
          &:hover {
            text-decoration: none;
            color: ${({ $linkHoverColor: linkHoverColor }) => linkHoverColor};
          }
          &.inactive {
            color: ${({ $linkInactiveColor: linkInactiveColor }) =>
              linkInactiveColor};
          }
          &.active {
            text-decoration: none;
            color: ${({ $linkActiveColor: linkActiveColor }) =>
              linkActiveColor};
          }
        }
      }
    }
  }
`;

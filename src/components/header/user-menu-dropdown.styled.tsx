import styled from "styled-components";
import { MenuItem } from "@headlessui/react";

export const UserMenuDropDownMenu = styled.div`
  position: relative;
`;

export const UserMenuDropDownMenuButton = styled.button<{
  $textColor: string;
  $bgColor: string;
  $badgeColor: string;
  $badgeBorderColor: string;
}>`
  height: ${(props) => props.theme.spacing[40]};
  width: ${(props) => props.theme.spacing[40]};
  border-radius: ${(props) => props.theme.spacing["20"]};
  position: relative;
  border: none;
  background-color: ${(props) => props.$bgColor};
  ${(props) => props.theme.typography.paragraph["20/600"]}
  color: ${(props) => props.$textColor};
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    opacity: 0.9;
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(4, 83, 78, 0.3);
  }
  
  @media (max-width: ${(props) =>props.theme.layout.container.tablet.maxWidth}) {
    display: none;
  }

  .badge {
    height: ${(props) => props.theme.spacing["10"]};
    width: ${(props) => props.theme.spacing["10"]};
    border-radius: 5px;
    background-color: ${(props) => props.$badgeColor};
    border: 1px solid ${(props) => props.$badgeBorderColor};
    position: absolute;
    top: 0;
    right: 0;
  }
`;

export const UserMenuDropDownMenuItems = styled.div<{
  $bgColor: string;
}>`
  position: absolute;
  right: 0;
  z-index: 30000000;
  top: calc(100% + 0.5rem);
  background-color: ${(props) => props.$bgColor};
  width: 16.5rem; /** 264px */
  padding: ${(props) => props.theme.spacing["16"]};
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing["16"]};
  border-radius: 8px;
  box-shadow: -3px 5px 12px 0px #04534e1a, -10px 20px 23px 0px #04534e17,
    -24px 45px 31px 0px #04534e0d, -42px 80px 36px 0px #04534e03,
    -65px 125px 40px 0px #04534e00;
  outline: none;
`;

export const UserMenuDropDownMenuItem = styled(MenuItem)``;

export const UserMenuAvatarWrapper = styled.div<{
  $headerColor: string;
}>`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing["04"]};
  img {
    border-radius: ${(props) => props.theme.spacing["16"]};
    height: ${(props) => props.theme.spacing["32"]};
    width: ${(props) => props.theme.spacing["32"]};
  }
  h4 {
    color: ${(props) => props.$headerColor};
    ${(props) => props.theme.typography.label["14/regular"]}
    margin: 0;
  }
  p {
    ${(props) => props.theme.typography.paragraph["10/400"]}
    margin: 0;
  }
`;

export const UserMenuDivider = styled.hr<{ $borderColor: string }>`
  border: none;
  border-top: 1px solid ${(props) => props.$borderColor};
  margin: 0;
`;

export const UserNavLinksWrapper = styled.div<{
  $linksColor: string;
}>`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing["08"]};
  
  .menu-item-link {
    display: flex;
    ${(props) => props.theme.typography.label["16/regular"]}
    align-items: center;
    gap: ${(props) => props.theme.spacing["04"]};
    padding: ${(props) => props.theme.spacing["08"]};
    border-radius: 4px;
    transition: background-color 0.15s ease;
    
    &:hover, &.active {
      background-color: rgba(4, 83, 78, 0.05);
    }
    
    .menu-item-icon {
      height: ${(props) => props.theme.spacing["20"]};
      width: ${(props) => props.theme.spacing["20"]};
      fill: ${(props) => props.$linksColor};
    }
    
    color: ${(props) => props.$linksColor};
    text-decoration: none;
  }
`;

export const LogoutWrapper = styled.div<{
  $logoutColor: string;
}>`
  color: ${(props) => props.$logoutColor};
  display: flex;
  
  & button {
    ${(props) => props.theme.typography.paragraph["16/600"]}
    color: ${(props) => props.$logoutColor};
    padding: ${(props) => props.theme.spacing["08"]};
    width: 100%;
    border: none;
    background: none;
    display: flex;
    align-items: center;
    gap: ${(props) => props.theme.spacing["04"]};
    justify-content: flex-start;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.15s ease;
    
    &:hover, &.active {
      background-color: rgba(220, 38, 38, 0.05);
    }
  }
  
  & .logout-icon {
    fill: ${(props) => props.$logoutColor};
    height: ${(props) => props.theme.spacing["20"]};
    width: ${(props) => props.theme.spacing["20"]};
  }
`;

import { ListIcon } from "@phosphor-icons/react";
import styled from "styled-components";
import Button from "../ui/button";

export const AccountMenuContainer = styled.div``;

export const HamburgerButton = styled(Button)`
  display: flex;
  @media (min-width: ${({ theme }) => theme.layout.container.tablet.maxWidth}) {
    display: none;
  }
`;

export const HamburgerIcon = styled(ListIcon)`
  height: ${({ theme }) => theme.spacing["16"]};
  width: ${({ theme }) => theme.spacing["16"]};
`;

export const LoggedInUserButton = styled(Button)<{
  $borderColor: string;
  $color: string;
  $hoverBgColor: string;
  $tertiaryColor: string;
}>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing["08"]};
  padding: ${({ theme }) => `${theme.spacing["08"]} ${theme.spacing["12"]}`};
  border: 1px solid ${({ $borderColor }) => $borderColor};
  color: ${({ $color }) => $color};
  border-radius: 6px;
  
  &:hover {
    background-color: ${({ $hoverBgColor }) => $hoverBgColor};
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #4CD5CF;
  }
`;

export const UserMenuContainer = styled.div<{
  $backgroundColor: string;
  $borderColor: string;
  $textColor: string;
}>`
  position: absolute;
  right: 0;
  top: 100%;
  margin-top: ${({ theme }) => theme.spacing["08"]};
  width: 280px;
  background-color: ${({ $backgroundColor }) => $backgroundColor};
  border: 1px solid ${({ $borderColor }) => $borderColor};
  border-radius: 8px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  z-index: 50;
  color: ${({ $textColor }) => $textColor};
`;

export const UserInfo = styled.div`
  padding: ${({ theme }) => theme.spacing["16"]};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing["12"]};
`;

export const UserAvatar = styled.img<{ size?: 'small' | 'large' }>`
  width: ${({ size = 'small', theme }) => size === 'large' ? theme.spacing["48"] : theme.spacing["32"]};
  height: ${({ size = 'small', theme }) => size === 'large' ? theme.spacing["48"] : theme.spacing["32"]};
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
`;

export const UserDetails = styled.div`
  flex: 1;
  min-width: 0;
`;

export const UserName = styled.div`
  font-weight: 600;
  font-size: 14px;
  line-height: 1.2;
  margin-bottom: ${({ theme }) => theme.spacing["04"]};
`;

export const UserEmail = styled.div`
  font-size: 12px;
  line-height: 1.2;
  color: #6b7280;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const MenuDivider = styled.div<{ $borderColor: string }>`
  height: 1px;
  background-color: ${({ $borderColor }) => $borderColor};
  margin: 0;
`;

export const MenuItemContent = styled.a<{
  $focused: boolean;
  $hoverBgColor: string;
  $isLogout?: boolean;
  $dangerColor?: string;
}>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing["12"]};
  padding: ${({ theme }) => `${theme.spacing["12"]} ${theme.spacing["16"]}`};
  text-decoration: none;
  color: inherit;
  width: 100%;
  border: none;
  background: none;
  cursor: pointer;
  font-family: inherit;
  font-size: 14px;
  line-height: 1.2;
  
  ${({ $focused, $hoverBgColor }) => $focused && `
    background-color: ${$hoverBgColor};
  `}
  
  ${({ $isLogout, $dangerColor }) => $isLogout && `
    color: ${$dangerColor};
  `}
  
  &:hover {
    background-color: ${({ $hoverBgColor }) => $hoverBgColor};
  }
`;

export const MenuItemIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

export const MenuItemText = styled.span`
  flex: 1;
`;

export const VersionText = styled.span<{ $color: string }>`
  font-size: 12px;
  line-height: 1.2;
  color: ${({ $color }) => $color};
  font-weight: 500;
`;

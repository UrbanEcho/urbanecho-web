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
  height: ${({ theme }) => theme.spacing[16]};
  width: ${({ theme }) => theme.spacing[16]};
`;

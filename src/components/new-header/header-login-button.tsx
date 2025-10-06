import { useColor } from "@/providers/theme-provider";
import { useAuthStore } from "@/stores/auth-store";
import { Link } from "react-router-dom";
import styled from "styled-components";
const StyledLink = styled(Link)<{
  $borderColor: string;
  $color: string;
}>`
  text-decoration: none;
  padding: ${(props) =>
    `${props.theme.spacing["12"]} ${props.theme.spacing["16"]}`};
  border: 1px solid ${(props) => props.$borderColor};
  color: ${(props) => props.$color};
  width: ${(props) => props.theme.spacing["120"]};
  display: inline-block;
    text-align: center;
    @media (max-width: ${({ theme }) => theme.layout.container.tablet.maxWidth}) {
      display: none;
    }
`;

export default function HeaderLoginButton() {
  const colors = {
    border: useColor("border.border-brand"),
    color: useColor("content.content-brand"),
  };
  const auth = useAuthStore();
  if (auth.isAuthenticated) {
    return null;
  }
  return (
    <StyledLink to="/login" $borderColor={colors.border} $color={colors.color}>
      Log in
    </StyledLink>
  );
}

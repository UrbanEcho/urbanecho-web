import styled from "styled-components";
import { Link } from "react-router-dom";

import { useTheme } from "@/providers/theme-provider";
import { urbanEchoDarkBG, urbanEchoPrimary } from "@/assets";

const LogoContainer = styled(Link)`
  display: flex;
  align-items: center;

  img {
    height: 32px;
  }
`;

type HeaderLogoProps = {
  className?: string;
};

export default function SiteLogo(props: HeaderLogoProps) {
  const { theme } = useTheme();

  return (
    <LogoContainer to={"/"} className={props.className}>
      {theme === "light" ? (
        <img src={urbanEchoPrimary} alt="Logo" />
      ) : (
        <img src={urbanEchoDarkBG} alt="Logo" />
      )}
    </LogoContainer>
  );
}

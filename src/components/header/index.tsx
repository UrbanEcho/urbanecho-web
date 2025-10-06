import styled from "styled-components";
import LeftHeaderSection from "./LeftHeaderSection";
import MiddleHeaderSection from "./MiddleHeaderSection";
import RightHeaderSection from "./RightHeaderSection";
import { useColor } from "@/providers/theme-provider";
import HeaderMobileNavOverlay from "./header-mobile-nav-overlay";
import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const BaseWrapper = styled.div<{
  backgroundColor: string;
  borderColor: string;
}>`
  background-color: ${(props) => props.backgroundColor};
  border: 1px solid ${(props) => props.borderColor};
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 999999;
  & header {
    max-width: ${({ theme }) => theme.layout.container.desktop.maxWidth};
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 80px;
    position: relative ;
    padding: ${({ theme }) => `${theme.spacing["16"]} ${theme.spacing["64"]}`};
    @media (max-width: ${({ theme: { layout: { container },}, }) => container.tablet.maxWidth}) {
      padding: ${({ theme }) => theme.spacing["16"]};
    }
  }
`;

export default function Header() {
  const pathName = useLocation().pathname;
  const colors = {
    headerBg: useColor("surface.surface-l0"),
    border: useColor("border.border-subtle"),
  };
  const [isNavOpen, setIsNavOpen] = useState(false);

  const handleEscapeKey = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsNavOpen(false);
    }
  }, []);
  // Close nav when path changes
  useEffect(() => {
    setIsNavOpen(false);
  }, [pathName]);

  // Close nav when escape key is pressed
  useEffect(() => {
    window.addEventListener("keydown", handleEscapeKey);
    return () => {
      window.removeEventListener("keydown", handleEscapeKey);
    };
  }, [handleEscapeKey]);
  return (
    <BaseWrapper backgroundColor={colors.headerBg} borderColor={colors.border}>
      <header>
        <HeaderMobileNavOverlay
          isOpen={isNavOpen}
          toggleNavOpen={setIsNavOpen}
        />
        <LeftHeaderSection />
        <MiddleHeaderSection />
        <RightHeaderSection isOpen={isNavOpen} toggleNavOpen={setIsNavOpen} />
      </header>
    </BaseWrapper>
  );
}

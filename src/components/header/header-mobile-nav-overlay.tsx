import { useColor, useTheme } from "@/providers/theme-provider";
import {
  AppearanceWrapper,
  LoginButton,
  LogoutButton,
  MobileNavOverlayContainer,
  NavAvatarWrapper,
  OverlayHeader,
} from "./header-mobile-nav-overlay.styled";
import { useAuthStore } from "@/stores/auth-store";
import Button from "../ui/button";
import { MoonStarsIcon, SunIcon, XIcon } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import HeaderLogo from "./header-logo";
import type React from "react";

type NavItem = {
  name: string;
  link: string;
  requiresAuth?: boolean;
};
const navItems: Record<string, NavItem[]> = {
  open: [
    {
      name: "Product",
      link: "/product",
      requiresAuth: false,
    },
    {
      name: "Company",
      link: "/company",
      requiresAuth: false,
    },
    {
      name: "Blog",
      link: "/blog",
      requiresAuth: false,
    },
  ],
  auth: [
    {
      name: "View Dashboard",
      link: "/dashboard",
      requiresAuth: true,
    },
    {
      name: "My Scenarios",
      link: "#",
      requiresAuth: true,
    },
    {
      name: "Help & Support",
      link: "#",
      requiresAuth: true,
    },
  ],
};

type HeaderMobileNavOverlayProps = {
  isOpen: boolean;
  toggleNavOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function HeaderMobileNavOverlay({
  isOpen,
  toggleNavOpen,
}: HeaderMobileNavOverlayProps) {
  const colors = {
    background: useColor("surface.surface-l0"),
    logoutColor: useColor("content.content-negative"),
    loginColor: useColor("content.content-brand"),
    primaryColor: useColor("content.content-primary"),
    tertiaryColor: useColor("content.content-tertiary"),
  };
  const { isAuthenticated, user,logout } = useAuthStore();
  const { setTheme } = useTheme();
  return (
    <MobileNavOverlayContainer
      bgColor={colors.background}
      $primaryColor={colors.primaryColor}
      $tertiaryColor={colors.tertiaryColor}
      $isOpen={isOpen}
    >
      <OverlayHeader className="header">
        <HeaderLogo />
        <Button variant="secondary" onClick={() => toggleNavOpen(false)}>
          <XIcon />
        </Button>
      </OverlayHeader>
      {isAuthenticated ? (
        <NavAvatarWrapper
          className="avatar-section"
          $tertiaryColor={colors.tertiaryColor}
        >
          <img src={user?.avatar} alt="User Avatar" />
          <div className="user-data">
            <h3>{user?.name}</h3>
            <p>{user?.email}</p>
          </div>
        </NavAvatarWrapper>
      ) : null}
      <div className="menu-section">
        <h4>Menu</h4>
        {isAuthenticated && (
          <ul className="nav-links">
            {navItems.auth.map((item) => (
              <li key={item.name}>
                <Link to={item.link}>{item.name}</Link>
              </li>
            ))}
          </ul>
        )}
        <ul className="nav-links">
          {navItems.open.map((item) => (
            <li key={item.name}>
              <Link to={item.link}>{item.name}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="login-action">
        {isAuthenticated ? (
          <LogoutButton $color={colors.logoutColor}
          onClick={logout}
          >Log out</LogoutButton>
        ) : (
          <LoginButton to="/login" $color={colors.loginColor}>
            Login
          </LoginButton>
        )}
      </div>
      <AppearanceWrapper className="appearance-section" $isAuthenticated={isAuthenticated}>
        <h4>Appearance</h4>
        <div className="theme-actions">
          <Button onClick={() => setTheme("dark")} variant="secondary">
            <MoonStarsIcon size={16} weight="bold" />
            Dark
          </Button>
          <Button onClick={() => setTheme("light")} variant="secondary">
            <SunIcon size={16} weight="bold" />
            Light
          </Button>
        </div>
      </AppearanceWrapper>
    </MobileNavOverlayContainer>
  );
}

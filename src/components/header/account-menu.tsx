import { useAuthStore } from "@/stores/auth-store";
import HeaderLoginButton from "./header-login-button";
import {
  AccountMenuContainer,
  HamburgerButton,
  HamburgerIcon,
} from "./account-menu.styled";
import useShowHeaderThemeToggleOnMobile from "@/lib/hooks/use-show-header-theme-toggle-on-mobile";
type AccountMenuProps = {
    isOpen: boolean;
  toggleNavOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
export const AccountMenu = (props: AccountMenuProps) => {
  const { isAuthenticated } = useAuthStore();
  const { hamburger: showHamburger } = useShowHeaderThemeToggleOnMobile();
  return (
    <AccountMenuContainer>
      <HeaderLoginButton />
      <>
        {showHamburger && !isAuthenticated ? (
          <HamburgerButton variant="secondary" 
          onClick={()=>props.toggleNavOpen(true)}
          >
            <HamburgerIcon />
          </HamburgerButton>
        ) : showHamburger && isAuthenticated ? (
          <>Logged in</>
        ) : null}
      </>
    </AccountMenuContainer>
  );
};

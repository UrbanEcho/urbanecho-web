import {
  LogoutWrapper,
  UserMenuAvatarWrapper,
  UserMenuDivider,
  UserMenuDropDownMenu,
  UserMenuDropDownMenuButton,
  UserMenuDropDownMenuItems,
  UserNavLinksWrapper,
} from "./user-menu-dropdown.styled";
import { useAuthStore } from "@/stores/auth-store";
import { useColor } from "@/providers/theme-provider";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import {
  MapTrifoldIcon,
  QuestionIcon,
  SignOutIcon,
  TreeStructureIcon,
} from "@phosphor-icons/react";
import { Link } from "react-router-dom";

export default function UserMenuDropDown() {
  const { user, logout } = useAuthStore();
  const colors = {
    badgeBorderColor: useColor("border.border-inverse"),
    badgeColor: useColor("background.background-negative"),
    backgroundColor: useColor("background.background-brand"),
    textColor: useColor("content.content-primary-inverse"),
    menuItemsBg: useColor("surface.surface-l0"),
    avatarHeaderColor: useColor("content.content-primary"),
    dividerBorderColor: useColor("border.border-subtle"),
    logoutColor: useColor("content.content-negative"),
    linksColor: useColor("content.content-tertiary"),
  };
  
  const links = [
    {
      label: "View Dashboard",
      link: "/dashboard",
      Icon: MapTrifoldIcon,
    },
    {
      label: "My Scenarios",
      link: "/scenarios",
      Icon: TreeStructureIcon,
    },
    {
      label: "Help & Support",
      link: "/support",
      Icon: QuestionIcon,
    },
  ];

  const handleLogout = () => {
    logout();
    // Optionally redirect to home or login page
    window.location.href = "/";
  };

  return (
    <UserMenuDropDownMenu>
      <Menu>
        <MenuButton as={UserMenuDropDownMenuButton}
          $badgeBorderColor={colors.badgeBorderColor}
          $badgeColor={colors.badgeColor}
          $bgColor={colors.backgroundColor}
          $textColor={colors.textColor}
        >
          <div className="user-menu-dropdown-content">
            {user?.name?.[0]?.toUpperCase() || 'U'}
          </div>
          <span className="badge"></span>
        </MenuButton>
        
        <MenuItems as={UserMenuDropDownMenuItems}
          $bgColor={colors.menuItemsBg}
        >
          <UserMenuAvatarWrapper
            $headerColor={colors.avatarHeaderColor}
          >
            <img src={user?.avatar} alt="" />
            <div>
              <h4>{user?.name}</h4>
              <p>{user?.email}</p>
            </div>
          </UserMenuAvatarWrapper>
          
          <UserMenuDivider $borderColor={colors.dividerBorderColor} />
          
          <UserNavLinksWrapper $linksColor={colors.linksColor}>
            {links.map(({ label, link, Icon }) => (
              <MenuItem key={label}>
                {({ active }) => (
                  <Link to={link} className={`menu-item-link ${active ? 'active' : ''}`}>
                    <Icon className="menu-item-icon" />
                    {label}
                  </Link>
                )}
              </MenuItem>
            ))}
          </UserNavLinksWrapper>
          
          <UserMenuDivider $borderColor={colors.dividerBorderColor} />
          
          <MenuItem>
            {({ active }) => (
              <LogoutWrapper $logoutColor={colors.logoutColor}>
                <button 
                  onClick={handleLogout}
                  className={active ? 'active' : ''}
                >
                  <SignOutIcon className="logout-icon" />
                  Log out
                </button>
              </LogoutWrapper>
            )}
          </MenuItem>
        </MenuItems>
      </Menu>
    </UserMenuDropDownMenu>
  );
}

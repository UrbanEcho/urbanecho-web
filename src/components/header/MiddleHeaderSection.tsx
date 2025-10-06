import { NavLink } from "react-router-dom";
import { MiddleHeaderSectionContainer } from "./MiddleHeaderSection.styled";
import { useColor } from "@/providers/theme-provider";
import useShowMiddleNav from "@/lib/hooks/use-show-middle-nav";

export default function MiddleHeaderSection() {
  const menuItems = [
    { name: "Product", link: "/product" },
    { name: "Company", link: "/company" },
    { name: "Blog", link: "/blog" },
  ];
  const colors = {
    linkActive: useColor("content.content-brand"),
    linkInactive: useColor("content.content-tertiary"),
    linkHover: useColor("content.content-brand"),
  };
  const showMiddleNav = useShowMiddleNav();
  return showMiddleNav ? (
    <MiddleHeaderSectionContainer
      $linkActiveColor={colors.linkActive}
      $linkInactiveColor={colors.linkInactive}
      $linkHoverColor={colors.linkHover}
    >
      <nav>
        <ul>
          {menuItems.map((item) => (
            <li key={item.name}>
              <NavLink to={item.link}>{item.name}</NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </MiddleHeaderSectionContainer>
  ) : null;
}

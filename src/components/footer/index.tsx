import {
  FooterContainer,
  FooterContent,
  FooterContentBottomLegal,
  FooterContentTop,
  FooterMapBottom,
} from "./footer.styled";
import { Link } from "react-router-dom";
import HeaderLogo from "../header/header-logo";
import { useColor } from "@/providers/theme-provider";
import useShowFooter from "@/lib/hooks/use-show-footer";

type QuickLink = {
  type: "link" | "email" | "phone" | "external-link";
  label: string;
  href: string;
  highlight?: "highlight";
};
type QuickLinkCategory = "quick" | "contact" | "legal";
const quickLinks: Record<QuickLinkCategory, QuickLink[]> = {
  quick: [
    //echo paltform,about us,blog
    {
      type: "link",
      label: "Echo Platform",
      href: "/",
    },
    {
      type: "link",
      label: "About Us",
      href: "/company",
    },
    {
      type: "link",
      label: "Blog",
      href: "/blog",
    },
  ],
  contact: [
    {
      type: "email",
      label: "info@urbanecho.com",
      href: "mailto:info@urbanecho.com",
    },
    {
      type: "external-link",
      label: "LinkedIn",
      href: "https://www.linkedin.com/company/urbanecholab/",
    },
  ],
  legal: [
    {
      type: "link",
      label: "Privacy Policy",
      href: "/privacy-policy",
    },
    {
      type: "link",
      label: "Terms of Service",
      href: "/terms-of-service",
    },
  ],
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const showFooter = useShowFooter();
  const bgColor = useColor("surface.surface-l0");
  const headerColor = useColor("content.content-tertiary");
  const textColor = useColor("content.content-secondary");
  return showFooter ? (
    <FooterContainer bgColor={bgColor}>
      <FooterContent>
        <FooterContentTop headerColor={headerColor} textColor={textColor}>
          <div className="logo-section">
            {/* <img src="/images/logo_white.svg" alt="UrbanEcho Logo" /> */}
            <HeaderLogo />
            <p>
              UrbanEcho is an ETH Zurich spin-off. We provide AI-powered urban
              digital twins to help planners build more resilient and inclusive
              cities worldwide.
            </p>
          </div>
          <div className="quick-links">
            <div className="quick-access-links">
              <h4>Quick Links</h4>
              <ul>
                {quickLinks.quick.map((link) => (
                  <li key={link.label}>
                    <Link to={link.href}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="contact">
              <h4>Contact</h4>
              <ul>
                {quickLinks.contact.map((link) => (
                  <li
                    key={link.label}
                    className={link.highlight ? "highlight" : ""}
                  >
                    <a href={link.href}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="legal">
              <h4>Legal</h4>
              <ul>
                {quickLinks.legal.map((link) => (
                  <li key={link.label}>
                    <Link to={link.href}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </FooterContentTop>
        <FooterContentBottomLegal>
          <p>© UrbanEcho {currentYear}. All Rights Reserved</p>
        </FooterContentBottomLegal>
      </FooterContent>
      <FooterMapBottom bgImgPath="/images/footer_img.png" />
    </FooterContainer>
  ) : null;
}

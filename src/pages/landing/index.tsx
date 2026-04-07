import styled from "styled-components";

import MapCta from "@/components/map-cta";
import { useColor } from "@/providers/theme-provider";
import HomeHeroSection from "./hero/home-hero-section";
import HomePartnersLogo from "./partners/home-partners-logo";
import HomeBenefitsSection from "./benefits/home-benefits-section";
import HomeHowWeWorkSection from "./how-we-work/home-how-we-work-section";

const Container = styled.div<{ $bgColor: string; $textColor: string }>`
  min-height: 100vh;
  background-color: ${(props) => props.$bgColor};
  color: ${(props) => props.$textColor};
`;

export default function LandingPage() {
  const backgroundColor = useColor("background.background-primary");
  const textColor = useColor("content.content-primary");

  return (
    <Container $bgColor={backgroundColor} $textColor={textColor}>
      <HomeHeroSection />

      <HomePartnersLogo />

      <HomeBenefitsSection />

      <HomeHowWeWorkSection />

      <MapCta />
    </Container>
  );
}

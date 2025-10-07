import { useColor } from "@/providers/theme-provider";
import {
  HomeHeroSectionMainContainer,
  HomeHeroSectionContentWrapper,
  HomeheroSectionLeftContainer,
  HomeheroSectionLeftCtaButton,
  HomeheroSectionLeftCtaContainer,
  HomeheroSectionLeftTopHeader,
  HomeheroSectionRightContainer,
  HomeheroSectionRightContainerImage,
  HomeheroSectionLeftTopHeaderSpecialText,
} from "./home-hero-section.styled";
import { useNavigate } from "react-router-dom";

export default function HomeHeroSection() {
   const navigate = useNavigate();
  const handleBookDemo = () => {
    navigate("/schedule-demo");
  };
  return (
    <HomeHeroSectionMainContainer>
      <HomeHeroSectionContentWrapper>
        <HomeheroSectionLeftContainer>
          <HomeheroSectionLeftTopHeader>
            Advanced Urban Intelligence to Transform Cities of Tomorrow,
            <HomeheroSectionLeftTopHeaderSpecialText color={useColor('content.content-brand')}>
              Today
            </HomeheroSectionLeftTopHeaderSpecialText>
          </HomeheroSectionLeftTopHeader>
          <HomeheroSectionLeftCtaContainer>
            <HomeheroSectionLeftCtaButton variant="primary"
            onClick={handleBookDemo}>
              Book a Demo
            </HomeheroSectionLeftCtaButton>
            <HomeheroSectionLeftCtaButton variant="secondary">
              Learn More
            </HomeheroSectionLeftCtaButton>
          </HomeheroSectionLeftCtaContainer>
        </HomeheroSectionLeftContainer>
        <HomeheroSectionRightContainer >
          <HomeheroSectionRightContainerImage
            src="/images/product-Mockup.png"
            alt="Hero Image"
          />
        </HomeheroSectionRightContainer>
      </HomeHeroSectionContentWrapper>
    </HomeHeroSectionMainContainer>
  );
}

import { useNavigate } from "react-router-dom";

import { worldMapImg } from "@/assets";
import { useColor } from "@/providers/theme-provider";
import {
  MapCtaContentWrapper,
  MapCtaMainContainer,
  MapCtaWrapper,
  MapCtaHeading,
  MapCtaButton,
} from "./map-cta.styled";

export default function MapCta() {
  const background = useColor("background.background-brand-surface");
  const navigate = useNavigate();
  const handleBookDemo = () => {
    navigate("/schedule-demo");
  };

  return (
    <MapCtaMainContainer $bg={background}>
      <MapCtaContentWrapper $imgPath={worldMapImg}>
        <MapCtaWrapper>
          <MapCtaHeading $color={useColor("content.content-primary-inverse")}>
            Your City Evolves, Your Insights Should Too
          </MapCtaHeading>
          <MapCtaButton
            $ctaBg={useColor("surface.surface-l0")}
            $textColor={useColor("content.content-brand")}
            $hoverBg={useColor("content.content-brand-hover")}
            onClick={handleBookDemo}
          >
            Book a Demo
          </MapCtaButton>
        </MapCtaWrapper>
      </MapCtaContentWrapper>
    </MapCtaMainContainer>
  );
}

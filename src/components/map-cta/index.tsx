import { useColor } from "@/providers/theme-provider";
import {
  MapCtaContentWrapper,
  MapCtaMainContainer,
  MapCtaWrapper,
  MapCtaHeading,
  MapCtaButton,
} from "./map-cta.styled";
import { useNavigate } from "react-router-dom";

export default function MapCta() {
  const background = useColor("background.background-brand-surface");
  const navigate = useNavigate();
  const handleBookDemo = () => {
    navigate("/schedule-demo");
  };
  return (
    <MapCtaMainContainer bg={background}>
      <MapCtaContentWrapper  imgPath="/images/world map.png" >
        <MapCtaWrapper>
          <MapCtaHeading color={useColor("content.content-primary-inverse")}>
            Your City Evolves, Your Insights Should Too
          </MapCtaHeading>
          <MapCtaButton
            ctaBg={useColor("surface.surface-l0")}
            textColor={useColor("content.content-brand")}
            hoverBg={useColor("content.content-brand-hover")}
            onClick={handleBookDemo}
          >
            Book a Demo
          </MapCtaButton>
        </MapCtaWrapper>
      </MapCtaContentWrapper>
    </MapCtaMainContainer>
  );
}

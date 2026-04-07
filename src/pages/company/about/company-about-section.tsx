import { companyMissionImg } from "@/assets";
import {
  BaseCompanyAboutContainer,
  CompanyAboutContent,
} from "./company-about-section.styled";
import { useColor } from "@/providers/theme-provider";

export default function CompanyAboutSection() {
  return (
    <BaseCompanyAboutContainer
      bgColor={useColor("background.background-brand-subtle")}
    >
      <CompanyAboutContent
        imgBorderColor={useColor("border.border-tertiary")}
        headerColor={useColor("content.content-primary")}
        paragraphColor={useColor("content.content-tertiary")}
      >
        <div className="about-section-content">
          <div className="image-container">
            <img src={companyMissionImg} alt="" />
          </div>
          <div className="text-container">
            <h2>Our Mission</h2>
            <p>
              We create advanced solutions for sustainable urban and transport
              development that empower planners, decision makers and local
              governments to make informed decisions, even in data-limited
              contexts. We turn complexity into clarity for planners and
              decision-makers.
            </p>
          </div>
        </div>
      </CompanyAboutContent>
    </BaseCompanyAboutContainer>
  );
}

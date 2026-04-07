import { companyIntroImg } from "@/assets";
import {
  BaseCompanyIntroContainer,
  CompanyIntroContent,
} from "./company-intro-section.styled";
import { useColor } from "@/providers/theme-provider";

export default function CompanyIntroSection() {
  return (
    <BaseCompanyIntroContainer backgroundColor={useColor("surface.surface-l0")}>
      <CompanyIntroContent>
        <div className="header-section">
          <h2>We help you model how people respond to changes in your city</h2>
        </div>
        <img src={companyIntroImg} alt="Company Introduction" />
      </CompanyIntroContent>
    </BaseCompanyIntroContainer>
  );
}

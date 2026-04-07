import MapCta from "@/components/map-cta";
import CompanyTeamSection from "./team/company-team-section";
import CompanyIntroSection from "./hero/company-intro-section";
import CompanyAboutSection from "./about/company-about-section";
import CompanyValuesSection from "./values/company-values-section";
import CompanyLogosSection from "./partners/company-logos-section";
import CompanyOurStorySection from "./our-story/company-our-story-section";

export default function CompanyPage() {
  return (
    <>
      <CompanyIntroSection />
      <CompanyOurStorySection />
      <CompanyAboutSection />
      <CompanyTeamSection />
      <CompanyValuesSection />
      <CompanyLogosSection />
      <MapCta />
    </>
  );
}

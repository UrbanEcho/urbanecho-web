import { useColor } from "@/providers/theme-provider";

import { motion } from "framer-motion";
import {
  CompanyLogosContent,
  MainCompanyLogosContainer,
} from "./company-logo-section.styled";
import { SecoIcon } from "@/components/icons/seco/seco-icon";
import { ZurichIcon } from "@/components/icons/zurich/zurich-icon";

const LogoList = () => {
  const logos = [SecoIcon, ZurichIcon, SecoIcon, ZurichIcon];

  // Duplicate the logos array to create seamless infinite loop
  const duplicatedLogos = [...logos, ...logos];

  return (
    <div className="carousel-container">
      <motion.div
        className="logos-container"
        animate={{
          x: ["0%", "-50%"],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 20,
            ease: "linear",
          },
        }}
      >
        {duplicatedLogos.map((Logo, index) => (
          <div key={index} className="logo-item">
            <Logo />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default function CompanyLogosSection({
  showTitle = true,
}: {
  showTitle?: boolean;
}) {
  return (
    <MainCompanyLogosContainer $bgColor={useColor("surface.surface-l0")}>
      <CompanyLogosContent $headerColor={useColor("content.content-primary")}>
        {showTitle && <h2>Our Partners</h2>}
        <LogoList />
      </CompanyLogosContent>
    </MainCompanyLogosContainer>
  );
}

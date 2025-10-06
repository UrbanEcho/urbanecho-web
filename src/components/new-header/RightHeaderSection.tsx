import HeaderThemeToggle from "./header-theme-toggle";
import { RightHeaderSectionWrapper } from "./RightHeaderSection.styled";
import { AccountMenu } from "./account-menu";
type RightHeaderSectionProps = {
  isOpen: boolean;
  toggleNavOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function RightHeaderSection(props:RightHeaderSectionProps) {
  return (
    <RightHeaderSectionWrapper>
      <HeaderThemeToggle />
      <AccountMenu isOpen={props.isOpen} toggleNavOpen={props.toggleNavOpen} />
    </RightHeaderSectionWrapper>
  );
}



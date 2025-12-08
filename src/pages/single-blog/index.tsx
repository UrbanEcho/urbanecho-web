import { useColor } from "@/providers/theme-provider";
import styled from "styled-components";

const PageContainer = styled.div<{ $bgColor: string }>`
  background-color: ${({ $bgColor }) => $bgColor};
  min-height: calc(100vh - 80px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: ${({ theme }) => theme.spacing["48"]};
  color: ${({ theme }) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const contentColors = (theme.colors as any)?.content;
    const color = contentColors?.["content-primary"];
    return typeof color === "object" && color !== null && "light" in color
      ? color.light
      : "#000000";
  }};
`;

const Title = styled.h1`
  /* Use your theme's bold heading size and color */
  font-size: ${({ theme }) => theme.typography.heading["64/bold"].fontSize};
  font-weight: ${({ theme }) => theme.typography.heading["64/bold"].fontWeight};
  font-family: ${({ theme }) => theme.typography.heading["64/bold"].fontFamily};
  margin-bottom: ${({ theme }) => theme.spacing["24"]};
  color: ${({ theme }) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const contentColors = (theme.colors as any)?.content;
    const color = contentColors?.["content-brand"];
    return typeof color === "object" && color !== null && "light" in color
      ? color.light
      : "#000000";
  }};
`;

const Subtitle = styled.p<{ $color: string }>`
  /* Use your theme's paragraph style for body text */
  font-size: ${({ theme }) => theme.typography.paragraph["24/400"].fontSize};
  font-weight: ${({ theme }) =>
    theme.typography.paragraph["24/400"].fontWeight};
  font-family: ${({ theme }) =>
    theme.typography.paragraph["24/400"].fontFamily};
  color: ${(p) => p.$color};
  max-width: 600px;
`;

export const SingleBlogPage = () => {
  const titleColor = useColor("content.content-primary");

  return (
    <PageContainer $bgColor={useColor("surface.surface-l0")}>
      <Title>Coming Soon</Title>
      <Subtitle $color={titleColor}>
        We're working hard to bring you a stream of fresh, insightful content.
        Check back soon for the full blog experience!
      </Subtitle>
    </PageContainer>
  );
};

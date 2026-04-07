import styled from "styled-components";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Link, useParams } from "react-router-dom";

import { useColor } from "@/providers/theme-provider";
import { getCityBySlug } from "./city-content";

const PageContainer = styled.div<{ $bgColor: string }>`
  background-color: ${({ $bgColor }) => $bgColor};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${({ theme }) => theme.spacing["48"]};
  padding-bottom: ${({ theme }) => theme.spacing["64"]};
  box-sizing: border-box;
`;

const ContentContainer = styled.article`
  width: 100%;
  max-width: 880px;
  margin-left: auto;
  margin-right: auto;
  box-sizing: border-box;
`;

const BackLink = styled(Link)`
  display: inline-block;
  margin-bottom: ${({ theme }) => theme.spacing["24"]};
  text-decoration: underline;
`;

const Title = styled.h1<{ $titleColor: string }>`
  font-size: ${({ theme }) => theme.typography.heading["48/bold"].fontSize};
  font-weight: ${({ theme }) => theme.typography.heading["48/bold"].fontWeight};
  font-family: ${({ theme }) => theme.typography.heading["48/bold"].fontFamily};
  margin-bottom: ${({ theme }) => theme.spacing["08"]};
  color: ${({ $titleColor }) => $titleColor};
`;

const Subtitle = styled.p<{ $subtitleColor: string }>`
  font-size: ${({ theme }) => theme.typography.paragraph["16/400"].fontSize};
  font-weight: ${({ theme }) =>
    theme.typography.paragraph["16/400"].fontWeight};
  font-family: ${({ theme }) =>
    theme.typography.paragraph["16/400"].fontFamily};
  margin-bottom: ${({ theme }) => theme.spacing["24"]};
  color: ${({ $subtitleColor }) => $subtitleColor};
`;

const MarkdownBody = styled.div`
  line-height: 1.8;
  display: grid;
  gap: ${({ theme }) => theme.spacing["16"]};

  p,
  li {
    ${({ theme }) => theme.typography.paragraph["16/400"]}
  }

  h2,
  h3 {
    margin-top: ${({ theme }) => theme.spacing["12"]};
  }

  img,
  video {
    width: 100%;
    max-height: min(440px, 50vh);
    object-fit: cover;
    object-position: center;
    border-radius: 12px;
    display: block;
  }
`;

const isVideoSource = (src: string): boolean =>
  [".mp4", ".webm", ".ogg"].some((ext) => src.toLowerCase().includes(ext));

const statusLabel = (status: "live" | "coming-soon"): string =>
  status === "live" ? "Live" : "Coming soon";

export default function CityBlogDetailPage() {
  const { citySlug = "" } = useParams<{ citySlug: string }>();
  const city = getCityBySlug(citySlug);
  const backgroundColor = useColor("surface.surface-l0");
  const titleColor = useColor("content.content-brand");
  const subtitleColor = useColor("content.content-secondary");

  if (!city) {
    return (
      <PageContainer $bgColor={backgroundColor}>
        <ContentContainer>
          <BackLink to="/blog#cities">Back to Blog Cities</BackLink>
          <Title $titleColor={titleColor}>City not found</Title>
          <Subtitle $subtitleColor={subtitleColor}>
            We could not find this city page.
          </Subtitle>
        </ContentContainer>
      </PageContainer>
    );
  }

  return (
    <PageContainer $bgColor={backgroundColor}>
      <ContentContainer>
        <BackLink to="/blog#cities">Back to Blog Cities</BackLink>
        <Title $titleColor={titleColor}>{city.title}</Title>
        <Subtitle $subtitleColor={subtitleColor}>
          {statusLabel(city.status)} · {city.country}
        </Subtitle>
        <MarkdownBody>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              img: ({ src, alt }) => {
                const safeSrc = src ?? "";

                if (isVideoSource(safeSrc)) {
                  return (
                    <video controls preload="metadata">
                      <source src={safeSrc} />
                      Your browser does not support the video tag.
                    </video>
                  );
                }

                return (
                  <img
                    src={safeSrc}
                    alt={alt ?? "City spotlight media"}
                    loading="lazy"
                  />
                );
              },
              a: ({ href, children }) => (
                <a href={href} target="_blank" rel="noreferrer">
                  {children}
                </a>
              ),
            }}
          >
            {city.content}
          </ReactMarkdown>
        </MarkdownBody>
      </ContentContainer>
    </PageContainer>
  );
}

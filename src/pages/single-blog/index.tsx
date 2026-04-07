import { type ReactNode, isValidElement, useState } from "react";
import styled from "styled-components";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Link, useParams } from "react-router-dom";

import { useColor, useTheme } from "@/providers/theme-provider";
import {
  BLOG_CATEGORY_QUERY_PARAM,
  getBlogPostBySlug,
  SPOTLIGHT_CATEGORY_SLUG,
} from "@/pages/blog/blog-content";
import { citySpotlightBogota, citySpotlightBogotaVideo } from "@/assets";

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

const MetaRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing["12"]};
  margin-bottom: ${({ theme }) => theme.spacing["16"]};
`;

const StatusBadge = styled.span<{ $bg: string; $fg: string }>`
  display: inline-block;
  padding: 4px 10px;
  border-radius: 2px;
  font-size: 12px;
  font-weight: 600;
  line-height: 1;
  text-transform: capitalize;
  background: ${({ $bg }) => $bg};
  color: ${({ $fg }) => $fg};
`;

const RegionLabel = styled.span<{ $color: string }>`
  font-size: 13px;
  font-weight: 600;
  color: ${({ $color }) => $color};
`;

const PartnersRow = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing["08"]};
  margin-bottom: ${({ theme }) => theme.spacing["24"]};
`;

const PartnerChip = styled.span<{ $bg: string; $fg: string }>`
  display: inline-block;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
  line-height: 1;
  background: ${({ $bg }) => $bg};
  color: ${({ $fg }) => $fg};
`;

const ComingSoonContainer = styled.div<{ $borderColor: string }>`
  border: 1px dashed ${({ $borderColor }) => $borderColor};
  border-radius: 12px;
  padding: ${({ theme }) => theme.spacing["24"]};
`;

const markdownPlainText = (node: ReactNode): string => {
  if (node == null) {
    return "";
  }
  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }
  if (Array.isArray(node)) {
    return node.map(markdownPlainText).join("");
  }
  if (isValidElement(node)) {
    const props = node.props as { children?: ReactNode };
    return markdownPlainText(props.children);
  }
  return "";
};

const BlogCtaLink = styled(Link)<{
  $bg: string;
  $bgHover: string;
  $fg: string;
  $focusRing: string;
}>`
  && {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 48px;
    padding: ${({ theme }) => theme.spacing["16"]}
      ${({ theme }) => theme.spacing["24"]};
    border-radius: 0;
    font-weight: 600;
    font-size: 16px;
    text-decoration: none;
    background: ${({ $bg }) => $bg};
    color: ${({ $fg }) => $fg};
    box-sizing: border-box;
    transition: background-color 0.2s ease;
  }

  &:hover {
    background: ${({ $bgHover }) => $bgHover};
    opacity: 1;
  }

  &:focus-visible {
    outline: 2px solid ${({ $focusRing }) => $focusRing};
    outline-offset: 2px;
  }
`;

const scheduleDemoHref = "/schedule-demo";

const BlogExploreLink = styled.a<{ $brand: string; $inline?: boolean }>`
  && {
    display: inline-flex;
    align-items: center;
    gap: 0.35em;
    margin-top: ${({ theme, $inline }) => ($inline ? 0 : theme.spacing["04"])};
    color: ${({ $brand }) => $brand};
    font-weight: 500;
    font-size: ${({ theme }) => theme.typography.paragraph["16/400"].fontSize};
    text-decoration: none;
  }

  &::after {
    content: "→";
    color: inherit;
    font-weight: 500;
    line-height: 1;
  }

  &:hover {
    text-decoration: none;
    opacity: 0.88;
  }
`;

const scheduleDemoPathnameOnly = (href: string): string => {
  const noHash = href.split("#")[0] ?? "";
  const pathOnly = noHash.split("?")[0] ?? "";
  const trimmed = pathOnly.trim();
  if (trimmed === "") {
    return "";
  }
  const normalized = trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
  const base = normalized.replace(/\/$/, "");
  return base === scheduleDemoHref ? scheduleDemoHref : "";
};

const isScheduleDemoCtaButtonHref = (href: string | undefined): boolean => {
  if (href == null || href === "") {
    return false;
  }
  if (href.includes("?")) {
    return false;
  }
  return scheduleDemoPathnameOnly(href) === scheduleDemoHref;
};

const isScheduleDemoInlineHref = (href: string | undefined): boolean => {
  if (href == null || href === "") {
    return false;
  }
  if (!href.includes("?")) {
    return false;
  }
  return scheduleDemoPathnameOnly(href) === scheduleDemoHref;
};

const isPlaceholderExploreLink = (href: string | undefined): boolean =>
  href === "#";

const spotlightBlogListHref = `/blog?${BLOG_CATEGORY_QUERY_PARAM}=${SPOTLIGHT_CATEGORY_SLUG}`;

const isSpotlightBlogListCtaHref = (href: string | undefined): boolean => {
  if (href == null || href === "") {
    return false;
  }
  try {
    const url = new URL(href, "https://example.org");
    const category = url.searchParams.get(BLOG_CATEGORY_QUERY_PARAM);
    return (
      url.pathname.replace(/\/$/, "") === "/blog" &&
      category === SPOTLIGHT_CATEGORY_SLUG
    );
  } catch {
    return false;
  }
};

type MarkdownBodyColors = {
  readonly $contentPrimary: string;
  readonly $contentSecondary: string;
  readonly $contentTertiary: string;
  readonly $contentBrand: string;
  readonly $borderTertiary: string;
  readonly $surfaceL1: string;
  readonly $surfaceL2: string;
  readonly $blockquoteShadow: string;
};

const MarkdownBody = styled.div<MarkdownBodyColors>`
  line-height: 1.8;
  display: grid;
  gap: ${({ theme }) => theme.spacing["16"]};

  p,
  li {
    ${({ theme }) => theme.typography.paragraph["16/400"]}
  }

  ul {
    margin: ${({ theme }) => theme.spacing["08"]} 0;
    padding-left: ${({ theme }) => theme.spacing["24"]};
    list-style: disc;
    list-style-position: outside;
  }

  ul > li {
    margin-bottom: ${({ theme }) => theme.spacing["10"]};
    color: ${({ $contentPrimary }) => $contentPrimary};
  }

  ul > li:last-child {
    margin-bottom: 0;
  }

  ul > li::marker {
    color: ${({ $contentTertiary }) => $contentTertiary};
  }

  ol {
    list-style: none;
    counter-reset: blogOl;
    margin: ${({ theme }) => theme.spacing["08"]} 0;
    padding: 0;
  }

  ol > li {
    counter-increment: blogOl;
    position: relative;
    padding-left: ${({ theme }) => theme.spacing["40"]};
    margin-bottom: ${({ theme }) => theme.spacing["16"]};
    color: ${({ $contentSecondary }) => $contentSecondary};
  }

  ol > li:last-child {
    margin-bottom: 0;
  }

  ol > li::before {
    content: counter(blogOl);
    position: absolute;
    left: 0;
    top: 0.12em;
    width: 1.75rem;
    height: 1.75rem;
    border-radius: 50%;
    background: ${({ $surfaceL1 }) => $surfaceL1};
    color: ${({ $contentPrimary }) => $contentPrimary};
    border: 1px solid ${({ $borderTertiary }) => $borderTertiary};
    font-size: 12px;
    font-weight: 600;
    line-height: 1.75rem;
    text-align: center;
    box-sizing: border-box;
  }

  ol > li > p {
    margin: 0;
  }

  ol > li strong {
    color: ${({ $contentPrimary }) => $contentPrimary};
    font-weight: 700;
  }

  h2,
  h3 {
    margin-top: ${({ theme }) => theme.spacing["12"]};
    color: ${({ $contentPrimary }) => $contentPrimary};
  }

  h3[data-md-list="grid"] {
    font-weight: 700;
  }

  img,
  video {
    width: 100%;
    border-radius: 12px;
  }

  p:has(> img:only-child) + p:has(> em:only-child),
  p:has(> video:only-child) + p:has(> em:only-child) {
    margin-top: ${({ theme }) => theme.spacing["04"]};
    margin-bottom: 0;
    font-size: 14px;
    line-height: 1.45;
    font-style: italic;
    text-align: center;
    color: ${({ $contentTertiary }) => $contentTertiary};
  }

  p:has(> img:only-child) + p:has(> em:only-child) em,
  p:has(> video:only-child) + p:has(> em:only-child) em {
    font-style: italic;
    font-weight: 400;
  }

  blockquote {
    margin: ${({ theme }) => theme.spacing["20"]} 0;
    padding: ${({ theme }) => theme.spacing["20"]}
      ${({ theme }) => theme.spacing["20"]}
      ${({ theme }) => theme.spacing["20"]}
      ${({ theme }) => theme.spacing["24"]};
    border: 1px solid ${({ $borderTertiary }) => $borderTertiary};
    border-left: 4px solid ${({ $contentBrand }) => $contentBrand};
    background: ${({ $surfaceL2 }) => $surfaceL2};
    border-radius: 8px;
    box-shadow: ${({ $blockquoteShadow }) => $blockquoteShadow};
  }

  blockquote p {
    margin: 0;
  }

  blockquote p + p {
    margin-top: ${({ theme }) => theme.spacing["12"]};
  }

  blockquote p:first-of-type strong {
    display: block;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.1em;
    line-height: 1.35;
    text-transform: uppercase;
    color: ${({ $contentTertiary }) => $contentTertiary};
  }

  blockquote p:not(:first-of-type) {
    color: ${({ $contentSecondary }) => $contentSecondary};
    line-height: 1.65;
  }

  blockquote p:not(:first-of-type) a {
    color: ${({ $contentBrand }) => $contentBrand};
  }

  h3[data-md-list="grid"] + ul {
    margin: 0;
    margin-top: ${({ theme }) => theme.spacing["12"]};
    padding: ${({ theme }) => theme.spacing["04"]}
      ${({ theme }) => theme.spacing["08"]} 0;
    list-style: none;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: ${({ theme }) => theme.spacing["16"]}
      ${({ theme }) => theme.spacing["24"]};
  }

  h3[data-md-list="grid"] + ul > li {
    margin: 0;
    padding-left: 0;
    line-height: 1.45;
    color: inherit;
  }

  h3[data-md-list="grid"] + ul > li::marker {
    color: transparent;
  }

  h3[data-md-list="grid"] + ul > li > p {
    margin: 0;
    color: ${({ $contentTertiary }) => $contentTertiary};
    font-weight: 400;
  }

  h3[data-md-list="grid"] + ul > li strong {
    display: block;
    margin-bottom: ${({ theme }) => theme.spacing["06"]};
    line-height: 1.25;
    color: ${({ $contentPrimary }) => $contentPrimary};
    font-weight: 700;
  }

  h3[data-md-list="stack"] + ul {
    display: block;
    margin: 0;
    margin-top: ${({ theme }) => theme.spacing["08"]};
    padding: 0;
    padding-left: ${({ theme }) => theme.spacing["20"]};
    list-style: disc;
  }

  h3[data-md-list="stack"] + ul > li {
    margin: 0 0 ${({ theme }) => theme.spacing["10"]} 0;
    display: list-item;
    line-height: 1.5;
  }

  h3[data-md-list="stack"] + ul > li:last-child {
    margin-bottom: 0;
  }

  h3[data-blog-cta="true"] {
    text-align: center;
    ${({ theme }) => theme.typography.heading["24/bold"]}
    margin-bottom: ${({ theme }) => theme.spacing["12"]};
  }

  h3[data-blog-cta="true"] + p {
    text-align: center;
    max-width: 520px;
    margin-left: auto;
    margin-right: auto;
    color: ${({ $contentTertiary }) => $contentTertiary};
  }

  h3[data-blog-cta="true"] + p + p {
    text-align: center;
    margin-top: ${({ theme }) => theme.spacing["16"]};
  }

  p:has(> a[data-blog-cta-button]:only-child) {
    text-align: center;
  }

  a:not([data-blog-cta-button]) {
    color: ${({ $contentBrand }) => $contentBrand};
    text-decoration: none;
    font-weight: 500;
  }

  a:not([data-blog-cta-button]):hover {
    text-decoration: none;
    opacity: 0.88;
  }

  @media (max-width: 768px) {
    h3[data-md-list="grid"] + ul {
      grid-template-columns: 1fr;
    }
  }
`;

const isVideoSource = (src: string): boolean =>
  [".mp4", ".webm", ".ogg", ".mov"].some((ext) =>
    src.toLowerCase().includes(ext),
  );

const BlogSpotlightVideoWithFallback = ({
  videoSrc,
  fallbackSrc,
  alt,
}: {
  readonly videoSrc: string;
  readonly fallbackSrc: string;
  readonly alt?: string | null;
}): ReactNode => {
  const [useImage, setUseImage] = useState(false);

  if (useImage) {
    return <img src={fallbackSrc} alt={alt ?? "Blog media"} loading="lazy" />;
  }

  return (
    <video
      autoPlay
      loop
      muted
      playsInline
      controls
      preload="metadata"
      poster={fallbackSrc}
      onError={() => {
        setUseImage(true);
      }}
    >
      <source src={videoSrc} type="video/mp4" />
    </video>
  );
};

export const SingleBlogPage = () => {
  const { blogSlug = "" } = useParams<{ blogSlug: string }>();
  const post = getBlogPostBySlug(blogSlug);
  const { theme } = useTheme();
  const backgroundColor = useColor("surface.surface-l0");
  const titleColor = useColor("content.content-primary");
  const subtitleColor = useColor("content.content-secondary");
  const regionColor = useColor("content.content-secondary");
  const borderColor = useColor("border.border-tertiary");
  const statusBadgeBg = useColor("background.background-selected");
  const statusBadgeFg = useColor("content.content-brand");
  const partnerChipBg = useColor("surface.surface-l1");
  const partnerChipFg = useColor("content.content-secondary");
  const markdownContentPrimary = useColor("content.content-primary");
  const markdownContentSecondary = useColor("content.content-secondary");
  const markdownContentTertiary = useColor("content.content-tertiary");
  const markdownContentBrand = useColor("content.content-brand");
  const markdownBorderTertiary = useColor("border.border-tertiary");
  const markdownSurfaceL1 = useColor("surface.surface-l1");
  const markdownSurfaceL2 = useColor("surface.surface-l2");
  const markdownBlockquoteShadow =
    theme === "light"
      ? "0 1px 3px rgba(15, 23, 42, 0.08)"
      : "0 1px 3px rgba(0, 0, 0, 0.35)";
  const ctaBg = useColor("background.background-brand");
  const ctaBgHover = useColor("background.background-brand-hover");
  const ctaFg = useColor("content.content-primary-inverse");
  const ctaFocusRing = useColor("border.border-focus");

  if (!post) {
    return (
      <PageContainer $bgColor={backgroundColor}>
        <ContentContainer>
          <Title $titleColor={titleColor}>Coming Soon</Title>
          <ComingSoonContainer $borderColor={borderColor}>
            <Subtitle $subtitleColor={subtitleColor}>
              This article is not published yet. Check back soon.
            </Subtitle>
          </ComingSoonContainer>
        </ContentContainer>
      </PageContainer>
    );
  }

  return (
    <PageContainer $bgColor={backgroundColor}>
      <ContentContainer>
        {post.status && post.region && (
          <MetaRow>
            <StatusBadge $bg={statusBadgeBg} $fg={statusBadgeFg}>
              {post.status.replace(/-/g, " ")}
            </StatusBadge>
            <RegionLabel $color={regionColor}>{post.region}</RegionLabel>
          </MetaRow>
        )}
        <Title $titleColor={titleColor}>{post.title}</Title>
        <Subtitle $subtitleColor={subtitleColor}>
          {post.subtitle || `${post.tag} - ${post.date}`}
        </Subtitle>
        {post.partners.length > 0 && (
          <PartnersRow>
            {post.partners.map((partner) => (
              <PartnerChip
                key={partner}
                $bg={partnerChipBg}
                $fg={partnerChipFg}
              >
                {partner}
              </PartnerChip>
            ))}
          </PartnersRow>
        )}
        <MarkdownBody
          $contentPrimary={markdownContentPrimary}
          $contentSecondary={markdownContentSecondary}
          $contentTertiary={markdownContentTertiary}
          $contentBrand={markdownContentBrand}
          $borderTertiary={markdownBorderTertiary}
          $surfaceL1={markdownSurfaceL1}
          $surfaceL2={markdownSurfaceL2}
          $blockquoteShadow={markdownBlockquoteShadow}
        >
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h3: ({ children, ...props }) => {
                const text = markdownPlainText(children).trim();
                let dataMdList: "grid" | "stack" | undefined;
                if (
                  text === "What you can do today" ||
                  text === "Structured scenario domains"
                ) {
                  dataMdList = "grid";
                } else if (text === "Resources") {
                  dataMdList = "stack";
                }
                const dataBlogCta =
                  text === "Co-build with us" ? "true" : undefined;
                return (
                  <h3
                    {...props}
                    data-md-list={dataMdList}
                    data-blog-cta={dataBlogCta}
                  >
                    {children}
                  </h3>
                );
              },
              img: ({ src, alt }) => {
                const safeSrc = src ?? "";

                if (safeSrc === citySpotlightBogotaVideo) {
                  return (
                    <BlogSpotlightVideoWithFallback
                      videoSrc={citySpotlightBogotaVideo}
                      fallbackSrc={citySpotlightBogota}
                      alt={alt}
                    />
                  );
                }

                if (isVideoSource(safeSrc)) {
                  return (
                    <video controls preload="metadata" playsInline>
                      <source src={safeSrc} />
                      Your browser does not support the video tag.
                    </video>
                  );
                }

                return (
                  <img src={safeSrc} alt={alt ?? "Blog media"} loading="lazy" />
                );
              },
              a: ({ href, children }) => {
                if (isScheduleDemoCtaButtonHref(href)) {
                  return (
                    <BlogCtaLink
                      to={scheduleDemoHref}
                      data-blog-cta-button="true"
                      $bg={ctaBg}
                      $bgHover={ctaBgHover}
                      $fg={ctaFg}
                      $focusRing={ctaFocusRing}
                    >
                      {children}
                    </BlogCtaLink>
                  );
                }
                if (isSpotlightBlogListCtaHref(href)) {
                  return (
                    <BlogCtaLink
                      to={spotlightBlogListHref}
                      data-blog-cta-button="true"
                      $bg={ctaBg}
                      $bgHover={ctaBgHover}
                      $fg={ctaFg}
                      $focusRing={ctaFocusRing}
                    >
                      {children}
                    </BlogCtaLink>
                  );
                }
                if (isScheduleDemoInlineHref(href)) {
                  return (
                    <BlogExploreLink
                      as={Link}
                      to={href ?? ""}
                      $brand={markdownContentBrand}
                      $inline
                    >
                      {children}
                    </BlogExploreLink>
                  );
                }
                if (isPlaceholderExploreLink(href)) {
                  return (
                    <BlogExploreLink
                      href="#"
                      $brand={markdownContentBrand}
                      onClick={(event) => {
                        event.preventDefault();
                      }}
                    >
                      {children}
                    </BlogExploreLink>
                  );
                }
                const h = href ?? "";
                return (
                  <a href={h} target="_blank" rel="noreferrer">
                    {children}
                  </a>
                );
              },
            }}
          >
            {post.content}
          </ReactMarkdown>
        </MarkdownBody>
      </ContentContainer>
    </PageContainer>
  );
};

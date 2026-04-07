import { useState } from "react";
import { Link } from "react-router-dom";

import Button, { LinkButton } from "@/components/ui/button";
import { useColor } from "@/providers/theme-provider";
import {
  BLOG_CATEGORY_QUERY_PARAM,
  getBlogPostsByCategorySlug,
  SPOTLIGHT_CATEGORY_SLUG,
} from "@/pages/blog/blog-content";
import {
  ProductResourcesSectionMainContainer,
  ResourcesContainer,
} from "./product-resources-section.styled";

const pickThreeAtRandom = <T,>(items: readonly T[]): T[] => {
  if (items.length <= 3) {
    return [...items];
  }
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = copy[i]!;
    copy[i] = copy[j]!;
    copy[j] = tmp;
  }
  return copy.slice(0, 3);
};

const toIsoDateTime = (display: string): string | undefined => {
  const t = new Date(display).getTime();
  return Number.isNaN(t) ? undefined : new Date(t).toISOString();
};

export default function ProductResourcesSection() {
  const [spotlightPosts] = useState(() =>
    pickThreeAtRandom(getBlogPostsByCategorySlug(SPOTLIGHT_CATEGORY_SLUG)),
  );

  const spotlightBlogHref = `/blog?${BLOG_CATEGORY_QUERY_PARAM}=${SPOTLIGHT_CATEGORY_SLUG}`;

  return (
    <ProductResourcesSectionMainContainer
      $backgroundColor={useColor("background.background-brand-subtle")}
    >
      <ResourcesContainer
        $cardBorderColor={useColor("border.border-tertiary")}
        $cardContentBg={useColor("surface.surface-l0")}
        $badgeBg={useColor("background.background-selected")}
        $badgeColor={useColor("content.content-brand")}
        $subtitleColor={useColor("content.content-secondary")}
        $dateColor={useColor("content.content-tertiary")}
      >
        <h2>Explore Our Latest Research and Insights</h2>
        <div className="resources-content-wrapper">
          <div className="cards-container">
            {spotlightPosts.map((post) => (
              <div className="resource-card" key={post.slug}>
                <img src={post.thumbnail} alt={post.title} />
                <div className="resource-resource-card-content">
                  <div className="badge">{post.tag}</div>
                  <h3>{post.title}</h3>
                  {post.subtitle.trim() !== "" ? (
                    <p className="resource-subtitle">{post.subtitle}</p>
                  ) : null}
                  {post.date.trim() !== "" ? (
                    <time
                      className="resource-date"
                      dateTime={toIsoDateTime(post.date)}
                    >
                      {post.date}
                    </time>
                  ) : null}
                  <div className="resource-card-actions">
                    <LinkButton
                      to={`/blog/${post.slug}`}
                      variant="secondary"
                      fullWidth
                    >
                      Read article
                    </LinkButton>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="resources-cta-container">
            <div className="content-wrapper">
              <h2>
                Continue your journey into foresightful urban planning with our
                articles
              </h2>
              <Link to={spotlightBlogHref}>
                <Button variant="primary">View more articles</Button>
              </Link>
            </div>
          </div>
        </div>
      </ResourcesContainer>
    </ProductResourcesSectionMainContainer>
  );
}

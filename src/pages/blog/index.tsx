import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import Button from "@/components/ui/button";
import { useColor } from "@/providers/theme-provider";
import { BlogHeaderWithSearch } from "./blog-section";
import {
  BLOG_CATEGORY_QUERY_PARAM,
  getAllBlogPosts,
  getBlogCategoryFilterOptions,
  slugifyBlogCategory,
} from "./blog-content";
import {
  BlogCategorySelect,
  BlogItemContainer,
  BlogMasonryArticles,
  BlogsContainer,
  BlogSectionContainer,
  BlogSectionContent,
  LoadMoreButtonContainer,
} from "./blog-section.styled";

type BlogKeys = "left" | "center" | "right";
type BlogPostType = {
  slug: string;
  title: string;
  tag: string;
  subtitle: string;
  date: string;
  thumbnail: string;
  height: string;
};

type BlogsType = Record<BlogKeys, BlogPostType[]>;

const toIsoDateTime = (display: string): string | undefined => {
  const t = new Date(display).getTime();
  return Number.isNaN(t) ? undefined : new Date(t).toISOString();
};

export default function BlogPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [titleSearchQuery, setTitleSearchQuery] = useState("");

  const categoryOptions = useMemo(() => getBlogCategoryFilterOptions(), []);

  const validCategorySlugs = useMemo(
    () => new Set(categoryOptions.map((option) => option.slug)),
    [categoryOptions],
  );

  const rawCategoryFromUrl =
    searchParams.get(BLOG_CATEGORY_QUERY_PARAM)?.trim() ?? "";

  const selectedCategorySlug =
    rawCategoryFromUrl !== "" && validCategorySlugs.has(rawCategoryFromUrl)
      ? rawCategoryFromUrl
      : "";

  useEffect(() => {
    if (
      rawCategoryFromUrl !== "" &&
      !validCategorySlugs.has(rawCategoryFromUrl)
    ) {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          next.delete(BLOG_CATEGORY_QUERY_PARAM);
          return next;
        },
        { replace: true },
      );
    }
  }, [rawCategoryFromUrl, validCategorySlugs, setSearchParams]);

  const setCategoryInUrl = (slug: string): void => {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        if (slug === "") {
          next.delete(BLOG_CATEGORY_QUERY_PARAM);
        } else {
          next.set(BLOG_CATEGORY_QUERY_PARAM, slug);
        }
        return next;
      },
      { replace: false },
    );
  };

  const blogs = useMemo(() => {
    const posts = getAllBlogPosts();
    const byCategory =
      selectedCategorySlug === ""
        ? posts
        : posts.filter(
            (post) => slugifyBlogCategory(post.tag) === selectedCategorySlug,
          );

    const needle = titleSearchQuery.trim().toLowerCase();
    const filtered =
      needle === ""
        ? byCategory
        : byCategory.filter((post) =>
            post.title.toLowerCase().includes(needle),
          );

    return filtered.reduce<BlogsType>(
      (acc, post, index) => {
        const key: BlogKeys =
          index % 3 === 0 ? "left" : index % 3 === 1 ? "center" : "right";

        return {
          ...acc,
          [key]: [
            ...acc[key],
            {
              slug: post.slug,
              title: post.title,
              tag: post.tag,
              subtitle: post.subtitle,
              date: post.date,
              thumbnail: post.thumbnail,
              height: "320px",
            },
          ],
        };
      },
      {
        left: [],
        center: [],
        right: [],
      },
    );
  }, [selectedCategorySlug, titleSearchQuery]);

  const totalVisiblePosts =
    blogs.left.length + blogs.center.length + blogs.right.length;

  const colors = {
    cardBorder: useColor("border.border-tertiary"),
    pageBackground: useColor("surface.surface-l0"),
    tagBackground: useColor("background.background-selected"),
    tagTextColor: useColor("content.content-brand"),
    titleColor: useColor("content.content-primary"),
    subtitleColor: useColor("content.content-secondary"),
    dateColor: useColor("content.content-tertiary"),
    blogContainerBg: useColor("surface.surface-l0"),
    selectBorder: useColor("border.border-subtle"),
    selectBg: useColor("surface.surface-l1"),
    selectFg: useColor("content.content-primary"),
  };

  return (
    <BlogSectionContainer $bgColor={colors.pageBackground}>
      <BlogSectionContent>
        <BlogHeaderWithSearch
          searchQuery={titleSearchQuery}
          onSearchQueryChange={setTitleSearchQuery}
          filterSlot={
            <BlogCategorySelect
              aria-label="Filter posts by category"
              value={selectedCategorySlug}
              onChange={(event) => setCategoryInUrl(event.target.value)}
              $border={colors.selectBorder}
              $bg={colors.selectBg}
              $fg={colors.selectFg}
            >
              <option value="">All categories</option>
              {categoryOptions.map((option) => (
                <option key={option.slug} value={option.slug}>
                  {option.label}
                </option>
              ))}
            </BlogCategorySelect>
          }
        />
        {totalVisiblePosts === 0 ? (
          <p
            style={{
              textAlign: "center",
              marginTop: "24px",
              color: colors.dateColor,
            }}
          >
            No articles match your search or filters.
          </p>
        ) : (
          <BlogMasonryArticles>
            {Object.keys(blogs).map((key) => (
              <BlogsContainer key={key}>
                {blogs[key as BlogKeys].map((blog, index) => (
                  <BlogItemContainer
                    key={`${blog.slug}-${index}`}
                    to={`/blog/${blog.slug}`}
                    $borderColor={colors.cardBorder}
                    $tagBgColor={colors.tagBackground}
                    $tagTextColor={colors.tagTextColor}
                    $subtitleColor={colors.subtitleColor}
                    $dateColor={colors.dateColor}
                    $titleColor={colors.titleColor}
                    $blogContainerBg={colors.blogContainerBg}
                  >
                    <img
                      src={blog.thumbnail}
                      alt={blog.title}
                      style={{ width: "100%", height: blog.height }}
                    />
                    <div className="content">
                      <div className="tag-container">
                        <span>{blog.tag}</span>
                      </div>
                      <h2>{blog.title}</h2>
                      {blog.subtitle.trim() !== "" ? (
                        <p className="blog-subtitle">{blog.subtitle}</p>
                      ) : null}
                      {blog.date.trim() !== "" ? (
                        <time
                          className="blog-date"
                          dateTime={toIsoDateTime(blog.date)}
                        >
                          {blog.date}
                        </time>
                      ) : null}
                    </div>
                  </BlogItemContainer>
                ))}
              </BlogsContainer>
            ))}
          </BlogMasonryArticles>
        )}
        <LoadMoreButtonContainer>
          <Button variant="primary" size="large">
            Load More
          </Button>
        </LoadMoreButtonContainer>
      </BlogSectionContent>
    </BlogSectionContainer>
  );
}

import {
  blogImg1,
  blogImg10,
  blogImg11,
  blogImg12,
  blogImg13,
  blogImg2,
  blogImg3,
  blogImg4,
  blogImg5,
  blogImg6,
  blogImg7,
  blogImg8,
  blogImg9,
  citySpotlightBogota,
  citySpotlightBogotaVideo,
  citySpotlightDarEsSalaam,
  citySpotlightHannover,
  citySpotlightNairobi,
  citySpotlightSeville,
  blogAnnouncementIntro,
} from "@/assets";

export interface BlogPostSummary {
  readonly title: string;
  readonly slug: string;
  readonly tag: string;
  readonly subtitle: string;
  readonly date: string;
  readonly thumbnail: string;
  readonly excerpt: string;
}

export interface BlogPost extends BlogPostSummary {
  readonly status: string;
  readonly region: string;
  readonly country: string;
  readonly partners: ReadonlyArray<string>;
  readonly content: string;
}

type BlogFrontmatter = {
  readonly title?: string;
  readonly slug?: string;
  readonly tag?: string;
  readonly subtitle?: string;
  readonly date?: string;
  readonly category?: string;
  readonly country?: string;
  readonly region?: string;
  readonly status?: string;
  readonly partners?: ReadonlyArray<string>;
  readonly thumbnail?: string;
  readonly excerpt?: string;
};

type ViteImportMeta = ImportMeta & {
  glob: (
    pattern: string,
    options: {
      query: string;
      import: string;
      eager: boolean;
    },
  ) => Record<string, string>;
};

const markdownModules = (import.meta as ViteImportMeta).glob(
  "../../content/blog/**/*.{md,mdx}",
  {
    query: "?raw",
    import: "default",
    eager: true,
  },
);

const thumbnailAssetMap: Record<string, string> = {
  blogImg1,
  blogImg2,
  blogImg3,
  blogImg4,
  blogImg5,
  blogImg6,
  blogImg7,
  blogImg8,
  blogImg9,
  blogImg10,
  blogImg11,
  blogImg12,
  blogImg13,
  citySpotlightBogota,
  citySpotlightDarEsSalaam,
  citySpotlightHannover,
  citySpotlightNairobi,
  citySpotlightSeville,
  blogAnnouncementIntro,
};

const injectCitySpotlightFeaturedImageUrls = (content: string): string =>
  content
    .split("__CITY_SPOTLIGHT_BOGOTA_VIDEO__")
    .join(citySpotlightBogotaVideo)
    .split("__CITY_SPOTLIGHT_BOGOTA__")
    .join(citySpotlightBogota)
    .split("__CITY_SPOTLIGHT_DAR_ES_SALAAM__")
    .join(citySpotlightDarEsSalaam)
    .split("__CITY_SPOTLIGHT_HANNOVER__")
    .join(citySpotlightHannover)
    .split("__CITY_SPOTLIGHT_NAIROBI__")
    .join(citySpotlightNairobi)
    .split("__CITY_SPOTLIGHT_SEVILLE__")
    .join(citySpotlightSeville)
    .split("__BLOG_ANNOUNCEMENT_INTRO_FEATURED__")
    .join(blogAnnouncementIntro);

const stripQuotes = (value: string): string =>
  value.trim().replace(/^['"]/, "").replace(/['"]$/, "");

const parseFrontmatter = (
  raw: string,
): { frontmatter: BlogFrontmatter; content: string } => {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);

  if (!match) {
    return { frontmatter: {}, content: raw.trim() };
  }

  const lines = match[1].split("\n");
  const frontmatter = lines.reduce<BlogFrontmatter>((acc, line, index) => {
    const separatorIndex = line.indexOf(":");

    if (separatorIndex <= 0) {
      const previousLine = lines[index - 1] ?? "";
      const previousSeparatorIndex = previousLine.indexOf(":");
      const previousKey =
        previousSeparatorIndex > 0
          ? previousLine.slice(0, previousSeparatorIndex).trim()
          : "";
      const isListItem = line.trim().startsWith("- ");

      if (isListItem && previousKey === "partners") {
        const partner = stripQuotes(line.trim().replace(/^- /, ""));
        const partners = Array.isArray(acc.partners) ? acc.partners : [];
        return {
          ...acc,
          partners: [...partners, partner],
        };
      }
      return acc;
    }

    const key = line.slice(0, separatorIndex).trim();
    const value = stripQuotes(line.slice(separatorIndex + 1));

    return {
      ...acc,
      [key]: value,
    };
  }, {});

  return { frontmatter, content: match[2].trim() };
};

const slugFromPath = (path: string): string => {
  const parts = path.split("/");
  const fileName = parts[parts.length - 1] ?? "";
  return fileName.replace(/\.(md|mdx)$/, "");
};

const categoryFromPath = (path: string): string => {
  const match = path.match(/\/content\/blog\/([^/]+)\//);
  const raw = match?.[1] ?? "General";
  return raw.charAt(0).toUpperCase() + raw.slice(1);
};

const toBlogPost = (path: string, raw: string): BlogPost => {
  const fallbackSlug = slugFromPath(path);
  const { frontmatter, content } = parseFrontmatter(raw);

  const title = frontmatter.title ?? fallbackSlug.replace(/-/g, " ");
  const slug = frontmatter.slug ?? fallbackSlug;
  const tag = frontmatter.tag ?? frontmatter.category ?? categoryFromPath(path);
  const subtitle = frontmatter.subtitle ?? frontmatter.excerpt ?? "";
  const date = frontmatter.date?.trim() ?? "";
  const status = frontmatter.status ?? "";
  const region = frontmatter.region ?? "";
  const country = frontmatter.country ?? "";
  const partners = frontmatter.partners ?? [];
  const thumbnailValue = frontmatter.thumbnail ?? "";
  const thumbnail =
    thumbnailAssetMap[thumbnailValue] ??
    (thumbnailValue !== "" ? thumbnailValue : blogImg1);
  const excerpt = frontmatter.excerpt ?? "";

  return {
    title,
    slug,
    tag,
    subtitle,
    date,
    status,
    region,
    country,
    partners,
    thumbnail,
    excerpt,
    content: injectCitySpotlightFeaturedImageUrls(content),
  };
};

const hasParsableDate = (value: string): boolean => {
  if (value.trim() === "") {
    return false;
  }
  const t = new Date(value).getTime();
  return !Number.isNaN(t);
};

const compareByDateDesc = (a: BlogPost, b: BlogPost): number => {
  const hasA = hasParsableDate(a.date);
  const hasB = hasParsableDate(b.date);

  if (hasA && hasB) {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  }
  if (hasA && !hasB) {
    return -1;
  }
  if (!hasA && hasB) {
    return 1;
  }
  return a.slug.localeCompare(b.slug);
};

const blogPosts = Object.entries(markdownModules)
  .map(([path, raw]) => toBlogPost(path, raw))
  .sort(compareByDateDesc);

export const getAllBlogPosts = (): ReadonlyArray<BlogPostSummary> =>
  blogPosts.map((post): BlogPostSummary => {
    const { content, ...summary } = post;
    void content;
    return summary;
  });

export const slugifyBlogCategory = (tag: string): string =>
  tag
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

export interface BlogCategoryFilterOption {
  readonly slug: string;
  readonly label: string;
}

export const getBlogCategoryFilterOptions =
  (): ReadonlyArray<BlogCategoryFilterOption> => {
    const posts = getAllBlogPosts();
    const bySlug = new Map<string, string>();
    for (const post of posts) {
      const slug = slugifyBlogCategory(post.tag);
      if (!bySlug.has(slug)) {
        bySlug.set(slug, post.tag);
      }
    }
    return [...bySlug.entries()]
      .sort((a, b) => a[1].localeCompare(b[1]))
      .map(([slug, label]) => ({ slug, label }));
  };

export const BLOG_CATEGORY_QUERY_PARAM = "category";

export const SPOTLIGHT_CATEGORY_SLUG = "spotlight";

export const getBlogPostsByCategorySlug = (
  categorySlug: string,
): ReadonlyArray<BlogPostSummary> =>
  getAllBlogPosts().filter(
    (post) => slugifyBlogCategory(post.tag) === categorySlug,
  );

export const getBlogPostBySlug = (slug: string): BlogPost | undefined =>
  blogPosts.find((post) => post.slug === slug);

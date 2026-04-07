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
  citySpotlightDarEsSalaam,
  citySpotlightHannover,
  citySpotlightNairobi,
  citySpotlightSeville,
} from "@/assets";

export interface CitySummary {
  readonly title: string;
  readonly slug: string;
  readonly status: "live" | "coming-soon";
  readonly country: string;
  readonly thumbnail: string;
}

export interface CityPage extends CitySummary {
  readonly content: string;
}

type CityFrontmatter = {
  readonly title?: string;
  readonly slug?: string;
  readonly status?: string;
  readonly country?: string;
  readonly thumbnail?: string;
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
  "../../../content/cities/*.mdx",
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
};

const injectCitySpotlightFeaturedImageUrls = (content: string): string =>
  content
    .split("__CITY_SPOTLIGHT_BOGOTA__")
    .join(citySpotlightBogota)
    .split("__CITY_SPOTLIGHT_DAR_ES_SALAAM__")
    .join(citySpotlightDarEsSalaam)
    .split("__CITY_SPOTLIGHT_HANNOVER__")
    .join(citySpotlightHannover)
    .split("__CITY_SPOTLIGHT_NAIROBI__")
    .join(citySpotlightNairobi)
    .split("__CITY_SPOTLIGHT_SEVILLE__")
    .join(citySpotlightSeville);

const stripQuotes = (value: string): string =>
  value.trim().replace(/^['"]/, "").replace(/['"]$/, "");

const parseFrontmatter = (
  raw: string,
): { frontmatter: CityFrontmatter; content: string } => {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);

  if (!match) {
    return { frontmatter: {}, content: raw.trim() };
  }

  const frontmatter = match[1]
    .split("\n")
    .reduce<CityFrontmatter>((acc, line) => {
      const separatorIndex = line.indexOf(":");

      if (separatorIndex <= 0) {
        return acc;
      }

      const key = line.slice(0, separatorIndex).trim() as keyof CityFrontmatter;
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
  const lastPart = parts[parts.length - 1] ?? "";
  return lastPart.replace(".mdx", "");
};

const normalizeStatus = (value?: string): "live" | "coming-soon" => {
  if (value?.toLowerCase() === "live") {
    return "live";
  }

  return "coming-soon";
};

const cityOrderPriority: Record<string, number> = {
  bogota: 1,
  hannover: 2,
  seville: 3,
  nairobi: 4,
  "dar-es-salaam": 5,
};

const cityPages: ReadonlyArray<CityPage> = Object.entries(markdownModules)
  .filter(([path]) => !path.endsWith("intro.mdx"))
  .map(([path, raw]) => {
    const { frontmatter, content } = parseFrontmatter(raw);
    const thumbnailValue = stripQuotes(frontmatter.thumbnail ?? "");

    return {
      title: frontmatter.title ?? "City",
      slug: frontmatter.slug ?? slugFromPath(path),
      status: normalizeStatus(frontmatter.status),
      country: frontmatter.country ?? "Unknown",
      thumbnail:
        thumbnailAssetMap[thumbnailValue] ??
        (thumbnailValue !== "" ? thumbnailValue : blogImg1),
      content: injectCitySpotlightFeaturedImageUrls(content),
    };
  })
  .sort((a, b) => {
    const aPriority = cityOrderPriority[a.slug] ?? Number.MAX_SAFE_INTEGER;
    const bPriority = cityOrderPriority[b.slug] ?? Number.MAX_SAFE_INTEGER;

    if (aPriority !== bPriority) {
      return aPriority - bPriority;
    }

    return a.country.localeCompare(b.country) || a.title.localeCompare(b.title);
  });

export const getAllCities = (): ReadonlyArray<CitySummary> =>
  cityPages.map((city) => ({
    title: city.title,
    slug: city.slug,
    status: city.status,
    country: city.country,
    thumbnail: city.thumbnail,
  }));

export const getCityBySlug = (slug: string): CityPage | undefined =>
  cityPages.find((city) => city.slug === slug);

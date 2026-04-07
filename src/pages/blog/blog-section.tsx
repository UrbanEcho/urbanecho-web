import { type ReactNode, useState, useRef } from "react";

import { useColor } from "@/providers/theme-provider";
import { SearchIcon } from "@/components/icons";
import {
  BlogHeader,
  BlogHeaderToolbar,
  SearchWrapper,
  SearchButton,
  SearchInput,
} from "./blog-section.styled";

type BlogHeaderWithSearchProps = {
  readonly filterSlot?: ReactNode;
  readonly searchQuery: string;
  readonly onSearchQueryChange: (value: string) => void;
};

export function BlogHeaderWithSearch({
  filterSlot,
  searchQuery,
  onSearchQueryChange,
}: BlogHeaderWithSearchProps) {
  const [isSearchActive, setSearchActive] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const normalizedQuery = searchQuery.trim();

  const searchColors = {
    borderColor: useColor("border.border-subtle"),
    textColor: useColor("content.content-tertiary"),
    inputTextColor: useColor("content.content-primary"),
    placeholderColor: useColor("content.content-tertiary"),
  };

  const handleFocusSearch = () => {
    setSearchActive(true);
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  const handleBlurSearch = () => {
    if (!normalizedQuery) {
      setSearchActive(false);
    }
  };

  return (
    <BlogHeader>
      <h2>Our Blog</h2>
      <BlogHeaderToolbar>
        {filterSlot}
        <SearchWrapper
          $isActive={isSearchActive}
          $hasQuery={!!normalizedQuery}
          $borderColor={searchColors.borderColor}
        >
          <SearchButton
            type="button"
            aria-label="Search articles by title"
            onClick={handleFocusSearch}
            onFocus={handleFocusSearch}
            $textColor={searchColors.textColor}
          >
            <SearchIcon size={20} />
          </SearchButton>
          <SearchInput
            ref={searchInputRef}
            type="search"
            placeholder="Search by title"
            value={searchQuery}
            onChange={(event) => {
              onSearchQueryChange(event.target.value);
              setSearchActive(true);
            }}
            onFocus={() => setSearchActive(true)}
            onBlur={handleBlurSearch}
            $isActive={isSearchActive}
            $hasQuery={!!normalizedQuery}
            $textColor={searchColors.inputTextColor}
            $placeholderColor={searchColors.placeholderColor}
          />
        </SearchWrapper>
      </BlogHeaderToolbar>
    </BlogHeader>
  );
}

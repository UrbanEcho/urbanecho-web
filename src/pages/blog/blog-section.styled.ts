import { Link } from "react-router-dom";
import styled from "styled-components";

export const BlogSectionContainer = styled.section<{ $bgColor: string }>`
  background-color: ${({ $bgColor }) => $bgColor};
`;

export const BlogSectionContent = styled.div`
  max-width: 1184px;
  margin: 0 auto;
  padding: ${(props) => props.theme.spacing["48"]};
`;

export const BlogHeader = styled.header`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: ${(props) => props.theme.spacing["16"]};
  padding: ${(props) => props.theme.spacing["16"]} 0;
  width: 100%;

  @media (width <= 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const BlogHeaderToolbar = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
  align-items: center;
  gap: ${(props) => props.theme.spacing["16"]};
  flex-wrap: wrap;
  min-width: 0;
`;

export const BlogCategorySelect = styled.select<{
  $border: string;
  $bg: string;
  $fg: string;
}>`
  min-width: 200px;
  max-width: 100%;
  padding: ${(props) =>
    `${props.theme.spacing["08"]} ${props.theme.spacing["12"]}`};
  border-radius: 8px;
  border: 1px solid ${({ $border }) => $border};
  background-color: ${({ $bg }) => $bg};
  color: ${({ $fg }) => $fg};
  ${({ theme }) => theme.typography.paragraph["14/400"]};
  cursor: pointer;

  &:focus-visible {
    outline: 2px solid ${({ $border }) => $border};
    outline-offset: 2px;
  }
`;

export const BlogMasonryArticles = styled.article`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${(props) => props.theme.spacing["48"]};

  @media (width <= 768px) {
    grid-template-columns: 1fr;
    gap: ${(props) => props.theme.spacing["24"]};
  }
`;

export const BlogsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing["24"]};
`;

export const BlogItemContainer = styled(Link)<{
  $borderColor: string;
  $tagBgColor: string;
  $tagTextColor: string;
  $titleColor: string;
  $subtitleColor: string;
  $dateColor: string;
  $blogContainerBg: string;
}>`
  border: 0.5px solid ${(props) => props.$borderColor};
  text-decoration: none;

  img {
    width: 100%;
    object-fit: cover;
  }

  .content {
    padding: ${(props) => props.theme.spacing["24"]};
    display: flex;
    flex-direction: column;
    gap: ${(props) => props.theme.spacing["08"]};
    background-color: ${(props) => props.$blogContainerBg};

    .tag-container {
      background-color: ${(props) => props.$tagBgColor};
      color: ${(props) => props.$tagTextColor};
      display: inline-block;
      width: fit-content;
      ${(props) => props.theme.typography.paragraph["12/400"]}
      padding: ${(props) => props.theme.spacing["04"]};
    }

    h2 {
      color: ${(props) => props.$titleColor};
      ${(props) => props.theme.typography.heading["20/medium"]}
    }

    .blog-subtitle {
      margin: 0;
      color: ${(props) => props.$subtitleColor};
      ${(props) => props.theme.typography.paragraph["14/400"]}
    }

    .blog-date {
      margin: 0;
      margin-top: ${(props) => props.theme.spacing["04"]};
      color: ${(props) => props.$dateColor};
      ${(props) => props.theme.typography.paragraph["12/400"]}
    }
  }
`;

export const LoadMoreButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: ${(props) => props.theme.spacing["48"]} 0;
`;

export const SearchWrapper = styled.div<{
  $isActive: boolean;
  $hasQuery: boolean;
  $borderColor: string;
}>`
  display: flex;
  align-items: center;
  transition: all 0.2s ease-out;
  margin-left: ${(props) => props.theme.spacing["04"]};
  width: ${({ $isActive, $hasQuery }) =>
    $isActive || $hasQuery ? "256px" : "32px"};

  /* border: ${({ $isActive, $hasQuery, $borderColor }) =>
    $isActive || $hasQuery ? `1px solid ${$borderColor}` : "none"}; */
  border: 1px solid ${({ $borderColor }) => $borderColor};
  border-radius: ${({ $isActive, $hasQuery }) =>
    $isActive || $hasQuery ? "8px" : "0"};

  /* padding: ${({ $isActive, $hasQuery, theme }) =>
    $isActive || $hasQuery
      ? `${theme.spacing["04"]} ${theme.spacing["08"]}`
      : "0"}; */
  padding: ${(props) => props.theme.spacing["04"]};
  gap: ${(props) => props.theme.spacing["08"]};

  @media (width <= 768px) {
    width: 100%;
  }
`;

export const SearchButton = styled.button<{ $textColor: string }>`
  display: flex;
  height: 32px;
  width: 32px;
  align-items: center;
  justify-content: center;
  color: ${({ $textColor }) => $textColor};
  transition: colors 0.2s ease;
  background: none;
  border: none;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }

  &:focus-visible {
    outline: none;
  }
`;

export const SearchInput = styled.input<{
  $isActive: boolean;
  $hasQuery: boolean;
  $textColor: string;
  $placeholderColor: string;
}>`
  margin-left: ${(props) => props.theme.spacing["08"]};
  flex: 1;
  min-width: 0;
  background: transparent;
  font-size: 14px;
  color: ${({ $textColor }) => $textColor};
  outline: none;
  border: none;
  transition: all 0.2s ease-out;
  opacity: ${({ $isActive, $hasQuery }) => ($isActive || $hasQuery ? 1 : 0)};
  width: ${({ $isActive, $hasQuery }) => ($isActive || $hasQuery ? "100%" : 0)};

  &::placeholder {
    color: ${({ $placeholderColor }) => $placeholderColor};
    opacity: 0.8;
  }
`;

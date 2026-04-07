import styled from "styled-components";
import ProductProductSection from "./products/product-product-section";
import ProductUseCaseSection from "./use-case/product-use-case-section";
import ProductDevDocsSection from "./dev-docs/product-dev-docs-section";
import ProductResourcesSection from "./resources/product-resources-section";

const ProductMainContainer = styled.div`
  width: 100%;
  /* padding: ${({ theme }) =>
    `${theme.spacing[64]} ${theme.spacing["128"]}`}; */
`;

export default function ProductPage() {
  return (
    <ProductMainContainer>
      <ProductProductSection />

      <ProductUseCaseSection />

      <ProductDevDocsSection />

      <ProductResourcesSection />
    </ProductMainContainer>
  );
}

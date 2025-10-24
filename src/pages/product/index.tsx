import { ProductMainContainer } from "./product.styled";
import ProductProductSection from "./product-product-section";
import ProductUseCaseSection from "./product-use-case-section";
import ProductDevDocsSection from "./product-dev-docs-section";
import ProductResourcesSection from "./product-resources-section";

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

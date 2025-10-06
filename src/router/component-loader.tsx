
// Helper component to wrap lazy components with Suspense and ErrorBoundary

import ErrorBoundary from "@/components/ui/error-boundary";
import Loading from "@/components/ui/loading";
import { Suspense } from "react";

export const LazyWrapper = ({ children }: { children: React.ReactNode }) => (
  <ErrorBoundary>
    <Suspense fallback={<Loading message="Loading page..." size="large" />}>
      {children}
    </Suspense>
  </ErrorBoundary>
);

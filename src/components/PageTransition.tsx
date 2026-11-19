import type { PropsWithChildren } from "react";

// Native navigation already supplies its own platform transitions.
export default function PageTransition({ children }: PropsWithChildren) {
  return <>{children}</>;
}

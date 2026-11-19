import { useLayoutEffect, useRef, type PropsWithChildren } from "react";
import { useRootNavigationState } from "expo-router";

type NavigationState = {
  index?: number;
  routes: readonly { key?: string; state?: NavigationState }[];
};

export default function PageTransition({ children }: PropsWithChildren) {
  const container = useRef<HTMLDivElement>(null);
  const previous = useRef<{ key: string; depth: number } | null>(null);
  const state = useRootNavigationState();
  // Expo wraps the app stack in an outer root navigator. Follow the active
  // route through that wrapper to find the actual page and its history depth.
  let activeState: NavigationState | undefined = state;
  let key: string | undefined;
  let depth = 0;
  while (activeState) {
    const index: number = activeState.index ?? 0;
    const route: NavigationState["routes"][number] | undefined = activeState.routes[index];
    depth += index;
    key = route?.key;
    activeState = route?.state;
  }

  useLayoutEffect(() => {
    if (!key) return;
    const last = previous.current;
    previous.current = { key, depth };
    const element = container.current;
    if (!last || last.key === key || !element?.animate ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Use stack history rather than URL depth: lists, groups, and details all
    // animate correctly for both in-app Back and the browser's history buttons.
    const offset = depth < last.depth ? -32 : 32;
    const animation = element.animate(
      [{ transform: `translateX(${offset}px)` }, { transform: "translateX(0px)" }],
      { duration: 180, easing: "cubic-bezier(0.22, 1, 0.36, 1)" },
    );
    return () => animation.cancel();
  }, [key, depth]);

  return (
    <div
      ref={container}
      data-testid="page-transition"
      style={{ flex: 1, display: "flex", position: "relative", minWidth: 0, minHeight: 0, overflow: "hidden" }}
    >
      {children}
    </div>
  );
}

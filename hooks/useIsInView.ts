import throttle from "lodash.throttle";

import { RefObject, useEffect, useState } from "react";

function isInViewport(element: HTMLElement) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

export default function useIsInView(ref: RefObject<HTMLElement>) {
  const [inViewport, setInViewport] = useState(false);

  useEffect(() => {
    if (!ref?.current || inViewport) {
      return;
    }
    const throttledFn = throttle(() => {
      setInViewport(isInViewport(ref.current as HTMLElement));
    }, 400);

    window.addEventListener("scroll", throttledFn);

    return () => window.removeEventListener("scroll", throttledFn);
  }, [ref, inViewport]);

  return inViewport;
}

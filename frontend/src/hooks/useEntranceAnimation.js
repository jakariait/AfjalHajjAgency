"use client";

import { useState, useEffect } from "react";

/**
 * Custom React hook for animating component entrance with a fade-in and slide-up effect.
 * Manages an `isVisible` state which becomes true after the component mounts, triggering
 * CSS transitions defined by Tailwind CSS classes.
 *
 * @param {number} [initialDelay=0] - Optional delay in milliseconds before the animation starts after component mount.
 * @returns {boolean} `true` if the component should be visible and animated, `false` otherwise.
 */
export function useEntranceAnimation(initialDelay = 0) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, initialDelay);

    return () => clearTimeout(timer);
  }, [initialDelay]);

  return isVisible;
}

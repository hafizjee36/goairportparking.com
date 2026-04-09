// AnimateOnScrollFM.jsx
import React, { useMemo, useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

/**
 * Props
 * - type: 'fade' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right' | 'zoom-in' | 'zoom-out'
 * - once: boolean (default true)
 * - threshold: number 0..1 (how much must be visible) (default 0)
 * - root: Element | (() => Element) | null (custom IO root)
 * - rootMargin: string like CSS margin for IO (default "0px 0px -20% 0px")
 * - delay: ms (default 0)
 * - duration: ms (default 800)
 * - easingTransform: "cubic-bezier(x1,y1,x2,y2)" or [x1,y1,x2,y2]
 * - easingOpacity: same as above, optional
 * - distance: number | string (px if number, default 16px when applicable)
 * - as: string HTML tag (e.g., 'section', 'li', 'span'), default 'div'
 * - className, style, ...rest passthrough
 */

const DEFAULT_EASE = [0.22, 1, 0.36, 1];

function parseBezier(ease) {
  if (!ease) return null;
  if (Array.isArray(ease) && ease.length === 4) return ease;
  if (typeof ease === "string") {
    const match = ease.match(
      /cubic-bezier\(\s*([\d.\-]+)\s*,\s*([\d.\-]+)\s*,\s*([\d.\-]+)\s*,\s*([\d.\-]+)\s*\)/i
    );
    if (match) return match.slice(1).map(Number);
  }
  return null;
}

function variantsFor(type, dist) {
  const d = typeof dist === "number" ? dist : dist ?? 16;
  const dPx = typeof d === "number" ? d : parseFloat(String(d)) || 16;

  switch (String(type).toLowerCase()) {
    case "slide-up":
      return {
        hidden: { opacity: 0, y: dPx, filter: "blur(2px)" },
        visible: { opacity: 1, y: 0, filter: "blur(0px)" },
      };
    case "slide-down":
      return {
        hidden: { opacity: 0, y: -dPx, filter: "blur(2px)" },
        visible: { opacity: 1, y: 0, filter: "blur(0px)" },
      };
    case "slide-left":
      return {
        hidden: { opacity: 0, x: dPx, filter: "blur(2px)" },
        visible: { opacity: 1, x: 0, filter: "blur(0px)" },
      };
    case "slide-right":
      return {
        hidden: { opacity: 0, x: -dPx, filter: "blur(2px)" },
        visible: { opacity: 1, x: 0, filter: "blur(0px)" },
      };
    case "zoom-in":
      return {
        hidden: { opacity: 0, scale: 0.98, filter: "blur(2px)" },
        visible: { opacity: 1, scale: 1, filter: "blur(0px)" },
      };
    case "zoom-out":
      return {
        hidden: { opacity: 0, scale: 1.03, filter: "blur(2px)" },
        visible: { opacity: 1, scale: 1, filter: "blur(0px)" },
      };
    case "fade":
    default:
      return {
        hidden: { opacity: 0, filter: "blur(2px)" },
        visible: { opacity: 1, filter: "blur(0px)" },
      };
  }
}

const TAGS = {
  div: motion.div,
  section: motion.section,
  article: motion.article,
  header: motion.header,
  footer: motion.footer,
  main: motion.main,
  aside: motion.aside,
  nav: motion.nav,
  span: motion.span,
  li: motion.li,
};

export default function AnimateOnScroll({
  children,
  type = "fade",
  once = true,
  threshold = 0,
  root = null,
  rootMargin = "0px 0px -20% 0px",
  delay = 0,
  duration = 800,
  easingTransform,
  easingOpacity,
  distance,
  className = "",
  style = {},
  as = "div",
  ...rest
}) {
  const ref = useRef(null);

  // Resolve a custom root if provided (element or getter)
  const rootEl =
    typeof root === "function"
      ? root()
      : root instanceof Element
      ? root
      : undefined;

  // Respect reduced motion
  const prefersReduced = useReducedMotion();

  // Use Framer's intersection observer hook (supports root, margin, amount, once)
  const inView = useInView(ref, {
    root: rootEl,
    margin: rootMargin,
    amount: Math.max(0, Math.min(1, threshold ?? 0)),
    once,
  });

  const MotionTag = useMemo(() => TAGS[as] ?? motion.div, [as]);

  const variants = useMemo(() => variantsFor(type, distance), [type, distance]);

  const easeTx = parseBezier(easingTransform) || DEFAULT_EASE;
  const easeOp = parseBezier(easingOpacity) || easeTx;

  // Convert ms to s for Framer
  const durS = prefersReduced ? 0 : Math.max(0, duration) / 1000;
  const delayS = prefersReduced ? 0 : Math.max(0, delay) / 1000;

  // One transition that sets per-property easings when applicable
  const transition = useMemo(
    () => ({
      duration: durS,
      delay: delayS,
      ease: easeTx,
      // Property-specific tuning
      opacity: { duration: durS, delay: delayS, ease: easeOp },
      filter: { duration: durS * 0.85, delay: delayS, ease: easeTx },
      x: { duration: durS, delay: delayS, ease: easeTx },
      y: { duration: durS, delay: delayS, ease: easeTx },
      scale: { duration: durS, delay: delayS, ease: easeTx },
    }),
    [durS, delayS, easeTx, easeOp]
  );

  // If reduced motion is requested, render immediately visible
  const animateState = prefersReduced
    ? "visible"
    : inView
    ? "visible"
    : "hidden";

  return (
    <MotionTag
      ref={ref}
      className={className}
      style={style}
      variants={variants}
      initial="hidden"
      animate={animateState}
      transition={transition}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}

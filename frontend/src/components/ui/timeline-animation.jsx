"use client";

import React, { forwardRef } from "react";
import { motion } from "framer-motion";

/**
 * TimelineContent
 * ----------------
 * Animates content when it enters the viewport.
 *
 * Props:
 * - as: HTML tag (div, span, a, figure, etc.)
 * - animationNum: index for staggered animations
 * - timelineRef: ref of parent section (optional)
 * - customVariants: framer-motion variants
 */
export const TimelineContent = forwardRef(
  (
    {
      as: Component = "div",
      animationNum = 0,
      timelineRef,
      customVariants,
      className = "",
      children,
      ...props
    },
    ref
  ) => {
    return (
      <motion.div
        ref={ref}
        className={className}
        variants={customVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: true,
          margin: "-100px", // triggers a bit before visible
        }}
        custom={animationNum}
      >
        <Component {...props}>{children}</Component>
      </motion.div>
    );
  }
);

TimelineContent.displayName = "TimelineContent";

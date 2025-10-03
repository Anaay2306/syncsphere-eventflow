import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  gradient?: boolean;
  glow?: boolean;
  animate?: boolean;
}

const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, hover = false, gradient = false, glow = false, animate = true, children, ...props }, ref) => {
    const baseClassName = cn(
      // Base glassmorphism styles
      "glass-card",
      // Hover effects
      hover && "glass-card-hover cursor-pointer",
      // Gradient background
      gradient && "gradient-card",
      // Glow effect
      glow && "animate-glow",
      className
    );

    if (animate) {
      return (
        <motion.div
          ref={ref}
          className={baseClassName}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          whileHover={hover ? { scale: 1.02, y: -5 } : undefined}
          {...(props as any)}
        >
          {children}
        </motion.div>
      );
    }

    return (
      <div
        ref={ref}
        className={baseClassName}
        {...props}
      >
        {children}
      </div>
    );
  }
);
GlassCard.displayName = "GlassCard";

export { GlassCard };

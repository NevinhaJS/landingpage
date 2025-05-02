"use client";

import { motion } from "framer-motion";

interface SplitTextProps {
  children: string;
  className?: string;
  charClassName?: string;
  animation?: "fadeIn" | "fadeUp" | "wave" | "bounce" | "scale";
  duration?: number;
  staggerChildren?: number;
  delay?: number;
}

export default function SplitText({
  children,
  className = "",
  charClassName = "",
  animation = "fadeIn",
  duration = 0.5,
  staggerChildren = 0.03,
  delay = 0,
}: SplitTextProps) {
  // Split text into array of characters
  const chars = children.split("");

  // Define animation variants
  const animations = {
    fadeIn: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
    fadeUp: {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 },
    },
    wave: {
      hidden: { opacity: 0, y: 20 },
      visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
          delay: delay + i * staggerChildren,
          duration,
          ease: [0.22, 1, 0.36, 1],
          y: {
            type: "spring",
            damping: 12,
            stiffness: 200,
          },
        },
      }),
    },
    bounce: {
      hidden: { opacity: 0, scale: 0.8, y: 20 },
      visible: (i: number) => ({
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
          delay: delay + i * staggerChildren,
          duration,
          type: "spring",
          stiffness: 200,
          damping: 10,
        },
      }),
    },
    scale: {
      hidden: { opacity: 0, scale: 0 },
      visible: (i: number) => ({
        opacity: 1,
        scale: 1,
        transition: {
          delay: delay + i * staggerChildren,
          duration,
          type: "spring",
          stiffness: 200,
          damping: 10,
        },
      }),
    },
  };

  const selectedAnimation = animations[animation];

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren,
        delayChildren: delay,
      },
    },
  };

  return (
    <motion.span
      className={`inline-block ${className}`}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {chars.map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          className={`inline-block ${charClassName}`}
          variants={selectedAnimation}
          custom={index}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  );
}

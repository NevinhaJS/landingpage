"use client";

import { motion } from "framer-motion";
import RevealText from "@/components/text-effects/reveal-text";
import GradientText from "@/components/text-effects/gradient-text";
import StaggeredText from "@/components/text-effects/staggered-text";
import SplitText from "@/components/text-effects/split-text";

interface AboutSectionProps {
  addToRefs: (el: HTMLElement | null, index: number) => void;
}

export default function AboutSection({ addToRefs }: AboutSectionProps) {
  return (
    <section
      ref={(el) => addToRefs(el, 1)}
      id="about"
      className="py-20 md:py-32 relative"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center">
            <RevealText delay={0.2} duration={0.8} direction="up" dark>
              <GradientText>Quem Somos</GradientText>
            </RevealText>
          </h2>

          <div className="relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white/5 backdrop-blur-sm p-8 md:p-12 rounded-2xl border border-white/10 relative z-10"
            >
              <StaggeredText
                className="text-xl md:text-2xl leading-relaxed mb-6 text-white/90"
                animation="fadeUp"
                staggerDelay={0.05}
              >
                A NevTec é uma empresa Brasileira com atuação internacional
                (EUA, Austrália, Alemanha).
              </StaggeredText>
              <RevealText delay={0.5} direction="up" dark>
                <p className="text-xl md:text-2xl leading-relaxed text-white/80">
                  Focamos em{" "}
                  <SplitText
                    animation="bounce"
                    className="text-cyan-200 font-semibold"
                  >
                    resolver problemas reais
                  </SplitText>{" "}
                  — de geração de leads a sistemas complexos.
                </p>
              </RevealText>
            </motion.div>

            <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-600/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-emerald-600/20 rounded-full blur-3xl"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

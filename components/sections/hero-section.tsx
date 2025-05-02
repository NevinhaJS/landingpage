"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import SplitText from "@/components/text-effects/split-text";
import RevealText from "@/components/text-effects/reveal-text";
import TypingText from "@/components/text-effects/typing-text";
import GradientText from "@/components/text-effects/gradient-text";

interface HeroSectionProps {
  scrollToSection: (id: string) => void;
  addToRefs: (el: HTMLElement | null, index: number) => void;
}

export default function HeroSection({
  scrollToSection,
  addToRefs,
}: HeroSectionProps) {
  return (
    <section
      ref={(el) => addToRefs(el, 0)}
      id="home"
      className="min-h-[calc(100vh-4rem)] flex items-center justify-center relative overflow-hidden"
    >
      <div className="container mx-auto px-4 py-20 md:py-32 relative">
        {/* Background effect */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div
            className="absolute -top-[40%] -left-[20%] w-[70%] h-[70%] rounded-full bg-gradient-to-r from-blue-700/20 to-teal-700/20 blur-3xl animate-pulse"
            style={{ animationDuration: "8s" }}
          ></div>
          <div
            className="absolute -bottom-[40%] -right-[20%] w-[70%] h-[70%] rounded-full bg-gradient-to-r from-teal-700/20 to-blue-700/20 blur-3xl animate-pulse"
            style={{ animationDuration: "10s" }}
          ></div>
          <div
            className="absolute top-[20%] right-[10%] w-[40%] h-[40%] rounded-full bg-gradient-to-r from-cyan-700/20 to-emerald-700/20 blur-3xl animate-pulse"
            style={{ animationDuration: "12s" }}
          ></div>
          <div
            className="absolute bottom-[10%] left-[10%] w-[30%] h-[30%] rounded-full bg-gradient-to-r from-emerald-700/20 to-cyan-700/20 blur-3xl animate-pulse"
            style={{ animationDuration: "9s" }}
          ></div>
        </div>
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <RevealText delay={0.2} duration={0.8} direction="up" dark>
              <span className="inline-block mb-2">
                <GradientText animate duration={8}>
                  Transformando ideias
                </GradientText>
              </span>
            </RevealText>
            <br />
            <RevealText delay={0.6} duration={0.8} direction="up" dark>
              <span className="relative">
                <SplitText
                  animation="wave"
                  duration={0.3}
                  staggerChildren={0.03}
                  delay={1.4}
                >
                  em soluções digitais
                </SplitText>
                <motion.span
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1, delay: 2.2 }}
                  className="absolute -bottom-1 left-0 h-1 bg-gradient-to-r from-blue-500 to-emerald-500"
                />
              </span>
            </RevealText>
          </h1>
          <div className="h-12 mb-12">
            <TypingText
              text="Criamos experiências digitais inovadoras que impulsionam o seu negócio para o futuro."
              className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto"
              delay={2.5}
              typingSpeed={30}
            />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 3.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              onClick={() => scrollToSection("contact")}
              className="bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white px-8 py-6 rounded-md text-lg"
            >
              Fale Conosco
            </Button>
            <Button
              onClick={() => scrollToSection("services")}
              variant="outline"
              className="border-white/20 hover:bg-white/10 text-white px-8 py-6 rounded-md text-lg"
            >
              Nossos Serviços
            </Button>
          </motion.div>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 4 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce"
      >
        <ChevronDown className="size-10 text-white/50" />
      </motion.div>
    </section>
  );
}

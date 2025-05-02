"use client";

import MarqueeText from "@/components/text-effects/marquee-text";

export default function MarqueeSection() {
  return (
    <section className="py-6 overflow-hidden border-y border-white/10">
      <MarqueeText
        className="py-2 text-xl font-medium text-white/80"
        speed={30}
        direction="left"
        repeat={6}
      >
        <span className="mx-4">• Inovação</span>
        <span className="mx-4">• Tecnologia</span>
        <span className="mx-4">• Criatividade</span>
        <span className="mx-4">• Excelência</span>
        <span className="mx-4">• Resultados</span>
      </MarqueeText>
    </section>
  );
}

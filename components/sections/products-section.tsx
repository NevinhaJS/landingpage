"use client";

import { motion } from "framer-motion";
import RevealText from "@/components/text-effects/reveal-text";
import GradientText from "@/components/text-effects/gradient-text";
import ProductCard from "@/components/product-card";

interface ProductsSectionProps {
  addToRefs: (el: HTMLElement | null, index: number) => void;
}

export default function ProductsSection({ addToRefs }: ProductsSectionProps) {
  const products = [
    {
      title: "Atendente Inteligente",
      description:
        "IA integrada ao WhatsApp para atendimento automatizado e personalizado.",
      image: "/assistente-virtual.png",
      color: "from-emerald-500 to-teal-700",
    },
    {
      title: "Suporte Inteligente",
      description:
        "Workflows automatizados para otimizar o suporte ao cliente.",
      image: "/suporte-inteligente.png",
      color: "from-violet-200 to-purple-900",
    },
    {
      title: "Compartilhador de Conhecimento",
      description:
        "IA treinada com documentos do cliente para compartilhar conhecimento interno.",
      image: "/compartilhador-de-conhecimento.png",
      color: "from-emerald-500 to-yellow-700",
    },
  ];

  return (
    <section
      ref={(el) => addToRefs(el, 3)}
      id="products"
      className="py-20 md:py-32 relative"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center">
            <RevealText delay={0.2} duration={0.8} direction="up" dark>
              <GradientText>Nossos Produtos</GradientText>
            </RevealText>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {products.map((product, index) => (
              <ProductCard
                key={index}
                title={product.title}
                description={product.description}
                image={product.image}
                color={product.color}
                index={index}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

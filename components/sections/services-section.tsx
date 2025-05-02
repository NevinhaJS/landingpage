"use client";

import { motion } from "framer-motion";
import RevealText from "@/components/text-effects/reveal-text";
import GradientText from "@/components/text-effects/gradient-text";
import ServiceItem from "@/components/service-item";
import { Code, Database, Smartphone, Share2, BrainCircuit } from "lucide-react";

interface ServicesSectionProps {
  addToRefs: (el: HTMLElement | null, index: number) => void;
}

export default function ServicesSection({ addToRefs }: ServicesSectionProps) {
  const services = [
    {
      icon: <Code className="size-10" />,
      title: "Sites altamente personalizáveis",
      description:
        "Criamos sites únicos e personalizados para sua marca se destacar.",
    },
    {
      icon: <Database className="size-10" />,
      title: "Sistemas sob demanda",
      description:
        "Desenvolvemos sistemas completos adaptados às suas necessidades específicas.",
    },
    {
      icon: <Smartphone className="size-10" />,
      title: "Aplicativos empresariais",
      description:
        "Apps nativos e multiplataforma para otimizar seus processos internos.",
    },
    {
      icon: <Share2 className="size-10" />,
      title: "Gestão de redes sociais",
      description: "Estratégias completas para maximizar sua presença digital.",
    },
    {
      icon: <BrainCircuit className="size-10" />,
      title: "Automação com IA",
      description:
        "Soluções inteligentes para automatizar e otimizar seus processos.",
    },
  ];

  return (
    <section
      ref={(el) => addToRefs(el, 2)}
      id="services"
      className="py-20 md:py-32 relative"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center">
            <RevealText delay={0.2} duration={0.8} direction="up" dark>
              <GradientText>O que Fazemos</GradientText>
            </RevealText>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceItem
                key={index}
                icon={service.icon}
                title={service.title}
                description={service.description}
                index={index}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

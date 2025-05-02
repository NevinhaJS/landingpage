"use client";

import { motion } from "framer-motion";
import RevealText from "@/components/text-effects/reveal-text";
import GradientText from "@/components/text-effects/gradient-text";
import ClientCard from "@/components/client-card";

interface ClientsSectionProps {
  addToRefs: (el: HTMLElement | null, index: number) => void;
}

export default function ClientsSection({ addToRefs }: ClientsSectionProps) {
  const clients = [
    {
      name: "TRG Club",
      description:
        "O TRG Club é uma plataforma que conecta pessoa a terapeutas focado na metodologia TRG. Focada em resolver os problemas emocionais e psicossomáticos, libertando pessoas de traumas, fobias,",
      image: "/trg-club.svg",
      link: "https://trgclub.com.br",
    },
    {
      name: "Lean Contabilidade",
      description:
        "Empresa de serviços contábeis, fiscais, trabalhistas, societários e tributários que com um atendimento personalizado e uma equipe de especialistas sempre disponíveis para atender você de forma rápida, eficiente e humanizada.",
      image: "/lean.svg",
      link: "https://leancontabilidade.com.br/",
    },
    {
      name: "Datacert",
      description:
        "Website institucional para a Datacert, uma empresa de certificados digitais.",
      image: "/datacert.svg",
      link: "https://datacertbr.com/",
    },
    {
      name: "Novocred",
      description:
        "Website institucional para a Novocred, uma empresa de serviços de crédito.",
      image: "/novocred.svg",
      link: "https://novocred.com.br/",
    },
    {
      name: "BENBEY",
      description:
        "App para aluguel de carros. O projeto está em desenvolvimento.",
      image: "/benbey.svg",
    },
    {
      name: "ZeusPay",
      description:
        "Plataforma de pagamentos para qualquer tipo de checkout. O projeto está em desenvolvimento.",
      image: "/zeus-pay.svg",
    },
  ];

  return (
    <section
      ref={(el) => addToRefs(el, 4)}
      id="clients"
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
              <GradientText>Nossos Clientes</GradientText>
            </RevealText>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {clients.map((client, index) => (
              <ClientCard
                key={index}
                name={client.name}
                description={client.description}
                image={client.image}
                link={client.link}
                index={index}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

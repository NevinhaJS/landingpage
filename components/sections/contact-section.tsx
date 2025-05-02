"use client";

import { motion } from "framer-motion";
import RevealText from "@/components/text-effects/reveal-text";
import GradientText from "@/components/text-effects/gradient-text";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface ContactSectionProps {
  addToRefs: (el: HTMLElement | null, index: number) => void;
}

export default function ContactSection({ addToRefs }: ContactSectionProps) {
  return (
    <section
      ref={(el) => addToRefs(el, 5)}
      id="contact"
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
              <GradientText>Entre em Contato</GradientText>
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
              <form className="space-y-6">
                <div>
                  <Input
                    type="text"
                    placeholder="Nome"
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/50 h-12"
                  />
                </div>
                <div>
                  <Input
                    type="email"
                    placeholder="Email"
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/50 h-12"
                  />
                </div>
                <div>
                  <Textarea
                    placeholder="Mensagem"
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/50 min-h-32"
                  />
                </div>
                <div>
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white h-12">
                    Enviar Mensagem
                  </Button>
                </div>
              </form>

              <div className="mt-8 pt-8 border-t border-white/10 text-center">
                <p className="text-white/50 mb-4">
                  Ou se prefereir, entre em contato através do whatsapp clicando
                  no botão flutuante ao lado direito da tela.
                </p>
              </div>
            </motion.div>

            <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-600/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-emerald-600/20 rounded-full blur-3xl"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

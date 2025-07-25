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
              className="bg-white/5 backdrop-blur-sm p-8 md:p-12 rounded-2xl border border-white/10 relative z-10 flex justify-center"
            >
              <a
                href="https://wa.me/551148635954"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-4 bg-green-700 hover:bg-green-600 text-white font-bold py-6 px-8 rounded-xl w-full max-w-xl transition-all duration-300 transform hover:scale-105"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-8 h-8"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>

                <span className="text-xl md:text-2xl">Fale pelo WhatsApp</span>
              </a>
            </motion.div>
            {/* <motion.div
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
            </motion.div> */}

            <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-600/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-emerald-600/20 rounded-full blur-3xl"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

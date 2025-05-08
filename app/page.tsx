"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Code,
  Database,
  Smartphone,
  Share2,
  BrainCircuit,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";
import ClientCard from "@/components/client-card";
import ProductCard from "@/components/product-card";
import ServiceItem from "@/components/service-item";
import { cn } from "@/lib/utils";
import WaveBackground from "@/components/wave-background";

// Import text effect components
import SplitText from "@/components/text-effects/split-text";
import RevealText from "@/components/text-effects/reveal-text";
import TypingText from "@/components/text-effects/typing-text";
import GradientText from "@/components/text-effects/gradient-text";
import StaggeredText from "@/components/text-effects/staggered-text";
import MarqueeText from "@/components/text-effects/marquee-text";

// Import section components
import HeroSection from "@/components/sections/hero-section";
import MarqueeSection from "@/components/sections/marquee-section";
import AboutSection from "@/components/sections/about-section";
import ServicesSection from "@/components/sections/services-section";
import ProductsSection from "@/components/sections/products-section";
import ClientsSection from "@/components/sections/clients-section";
import ContactSection from "@/components/sections/contact-section";
import Footer from "@/components/sections/footer";
import FloatWhatsAppButton from "@/components/float-whatsapp-button";

const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "Quem Somos" },
  { id: "services", label: "O que Fazemos" },
  { id: "products", label: "Produtos" },
  { id: "clients", label: "Clientes" },
  { id: "contact", label: "Contato" },
];

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
    description: "Workflows automatizados para otimizar o suporte ao cliente.",
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

const clients = [
  {
    name: "TechCorp",
    description: "Redesenho completo do site e sistema de gestão interna.",
    image: "/placeholder.svg?height=300&width=400",
    link: "#",
  },
  {
    name: "InnovateBiz",
    description: "Aplicativo de gestão de projetos e automação de processos.",
    image: "/placeholder.svg?height=300&width=400",
    link: "#",
  },
  {
    name: "FutureFinance",
    description:
      "Sistema de análise de dados com IA para previsões financeiras.",
    image: "/placeholder.svg?height=300&width=400",
    link: "#",
  },
  {
    name: "GlobalTrade",
    description: "Plataforma de e-commerce com integração internacional.",
    image: "/placeholder.svg?height=300&width=400",
    link: "#",
  },
];

export default function Home() {
  const [activeSection, setActiveSection] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const sections = useRef<HTMLElement[]>([]);

  const addToRefs = (el: HTMLElement | null, index: number) => {
    if (el && !sections.current.includes(el)) {
      sections.current[index] = el;
    }
  };

  const scrollToSection = (id: string) => {
    const index = [
      "home",
      "about",
      "services",
      "products",
      "clients",
      "contact",
    ].indexOf(id);
    if (index !== -1 && sections.current[index]) {
      sections.current[index].scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      sections.current.forEach((section, index) => {
        if (!section) return;

        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          const sectionId = [
            "home",
            "about",
            "services",
            "products",
            "clients",
            "contact",
          ][index];
          if (sectionId && activeSection !== sectionId) {
            setActiveSection(sectionId);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeSection]);

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Wave Background */}
      <WaveBackground
        primaryColor="#0000cc"
        secondaryColor="#00ccaa"
        speed={0.5}
        amplitude={25}
        frequency={0.005}
        layers={3}
        opacity={0.15}
      />

      {/* Header - Fixed */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-bold"
          >
            <SplitText animation="wave" duration={0.3} staggerChildren={0.05}>
              NevTec
            </SplitText>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              {navItems.map((item) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.1 * navItems.indexOf(item),
                  }}
                >
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className={cn(
                      "relative text-sm font-medium transition-colors hover:text-white/80",
                      activeSection === item.id ? "text-white" : "text-white/60"
                    )}
                  >
                    {item.label}
                    {activeSection === item.id && (
                      <motion.div
                        layoutId="activeSection"
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-emerald-500"
                      />
                    )}
                  </button>
                </motion.li>
              ))}
            </ul>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="size-6" />
            ) : (
              <Menu className="size-6" />
            )}
          </button>
        </div>
      </header>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-0 right-0 z-40 bg-black/95 backdrop-blur-md border-b border-white/10 md:hidden"
          >
            <nav className="container mx-auto py-4">
              <ul className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => scrollToSection(item.id)}
                      className={cn(
                        "w-full text-left px-4 py-2 text-sm font-medium transition-colors hover:bg-white/5 rounded",
                        activeSection === item.id
                          ? "text-white bg-white/10"
                          : "text-white/60"
                      )}
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="pt-16">
        {/* Sections */}
        <HeroSection scrollToSection={scrollToSection} addToRefs={addToRefs} />
        <MarqueeSection />
        <AboutSection addToRefs={addToRefs} />
        <ServicesSection addToRefs={addToRefs} />
        <ProductsSection addToRefs={addToRefs} />
        <ClientsSection addToRefs={addToRefs} />
        <ContactSection addToRefs={addToRefs} />
      </main>

      <Footer />

      <FloatWhatsAppButton phoneNumber="551148635954" />
    </div>
  );
}

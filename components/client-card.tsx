"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface ClientCardProps {
  name: string;
  description: string;
  image: string;
  link?: string;
  index: number;
}

export default function ClientCard({
  name,
  description,
  image,
  link,
  index,
}: ClientCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
      className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden group"
    >
      <div className="relative h-48 overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-tl from-blue-950/80 to-transparent"></div>
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-xl font-bold">{name}</h3>
        </div>
      </div>
      <div className="p-6">
        <p className="text-white/70 mb-4">{description}</p>
        {link && (
          <Link
            href={link}
            className="inline-flex items-center text-blue-400 hover:text-emerald-400 transition-colors"
          >
            Ver projeto <ArrowUpRight className="ml-1 size-4" />
          </Link>
        )}
      </div>
    </motion.div>
  );
}

"use client";

import SplitText from "@/components/text-effects/split-text";

export default function Footer() {
  return (
    <footer className="py-8 border-t border-white/10 relative z-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="text-xl font-bold">
              <SplitText animation="wave" duration={0.3} staggerChildren={0.05}>
                NevTec
              </SplitText>
            </div>
          </div>
          <div className="text-white/60 text-sm">
            &copy; {new Date().getFullYear()} NevTec. Todos os direitos
            reservados.
          </div>
        </div>
      </div>
    </footer>
  );
}

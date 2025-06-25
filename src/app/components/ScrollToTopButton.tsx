"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useModalStore } from "@/stores/modalStore";

export default function ScrollToTopButton() {
  const { isImageModalOpen } = useModalStore();

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && !isImageModalOpen && (
        <motion.button
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 p-3 sm:p-4 rounded-full bg-white/90 backdrop-blur border border-neutral-300 shadow-md hover:bg-neutral-100 active:scale-95 transition-all"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5 sm:w-6 sm:h-6 text-neutral-700" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

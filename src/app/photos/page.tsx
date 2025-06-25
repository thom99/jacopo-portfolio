"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { useInView } from "react-intersection-observer";
import { AnimatePresence, motion } from "framer-motion";
import { useModalStore } from "@/stores/modalStore";
import { useLockBodyScroll } from "@/hooks/useLayoutEffect";
import toast from "react-hot-toast";

type CloudinaryImage = {
  public_id: string;
  secure_url: string;
};

export default function PhotosPage() {
  const { inView } = useInView({ triggerOnce: false, threshold: 0.5 });
  const { setImageModalOpen } = useModalStore();
  const ref = React.useRef<HTMLDivElement>(null);

  const [selectedImage, setSelectedImage] = useState<CloudinaryImage | null>(
    null
  );
  const [images, setImages] = useState<any[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [allLoaded, setAllLoaded] = useState<boolean>(false);

  useLockBodyScroll(!!selectedImage);

  const fetchPhotos = async (cursorParam: string | null = null) => {
    if (loading || allLoaded) return;
    setLoading(true);

    try {
      const query = cursorParam
        ? `?resource_type=image&cursor=${cursorParam}`
        : `?resource_type=image`;
      const res = await fetch(`/api/gallery${query}`);
      const data = await res.json();
      console.log({ data });

      if (data.success) {
        setImages((prev) => [...prev, ...data.resources]);
        if (data.nextCursor) setCursor(data.nextCursor);
        else {
          setCursor(null);
          setAllLoaded(true);
        }
      }
    } catch (error) {
      toast.error(`Errore: "Caricamento fallito"}`);
      console.error("Errore durante il fetch da Cloudinary:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  useEffect(() => {
    if (inView && cursor) fetchPhotos(cursor);
  }, [inView, cursor]);

  return (
    <>
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.1 } },
        }}
      >
        {images.map((img) => (
          <motion.img
            whileHover={{ scale: 1.05 }}
            key={img.public_id}
            src={img.secure_url}
            alt="cloudinary image"
            className="rounded-xl w-full shadow"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            onClick={() => {
              setSelectedImage(img);
              setImageModalOpen(true);
            }}
          />
        ))}

        <AnimatePresence>
          {selectedImage && (
            <motion.div
              className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setSelectedImage(null);
                setImageModalOpen(false);
              }}
            >
              <motion.img
                src={selectedImage.secure_url}
                alt={selectedImage.public_id}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                className="max-w-full max-h-full rounded-lg shadow-lg"
                onClick={(e) => e.stopPropagation()}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {loading &&
          Array.from({ length: 3 }).map((_, i) => (
            <div
              key={`skeleton-${i}`}
              className="rounded-xl h-64 w-full bg-neutral-200 animate-pulse"
            />
          ))}

        {!allLoaded && !loading && (
          <div ref={ref} className="col-span-full h-10 mt-4" />
        )}

        {allLoaded && (
          <p className="col-span-full text-center text-gray-400 italic mt-4">
            ✅ Tutte le foto sono state caricate
          </p>
        )}
      </motion.div>
    </>
  );
}

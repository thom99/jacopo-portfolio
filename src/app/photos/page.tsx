// "use client"

// import { useEffect, useState } from "react"
// import { motion, AnimatePresence } from "framer-motion"

// type CloudinaryImage = {
//   public_id: string;
//   secure_url: string;
// };

// type CloudinaryResponse = {
//   success: boolean;
//   resources: CloudinaryImage[];
//   nextCursor: string | null;
// };
// export default function PhotosPage() {
//   const [selectedImage, setSelectedImage] = useState<CloudinaryImage | null>(null)
//   const [images, setImages] = useState<CloudinaryImage[]>([]);
//   const [cursor, setCursor] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);

//   const fetchPhotos = async (cursorParam: string | null = null) => {
//     setLoading(true);
//     const query = cursorParam ? `?resource_type=image&cursor=${cursorParam}` : `?resource_type=image`;
//     const res = await fetch(`/api/gallery${query}`);
//     const data: CloudinaryResponse = await res.json();
//     if (data.success) {
//       setImages(prev => [...prev, ...data.resources]);
//       setCursor(data.nextCursor);
//     }
//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchPhotos();
//   }, []);


// //   if (loading) return <p className="text-center py-10">Caricamento immagini...</p>

//   return (
//     <div className="p-4">
//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
//         {images.map((img) => (
//           <motion.div
//             key={img.public_id}
//             whileHover={{ scale: 1.05 }}
//             onClick={() => setSelectedImage(img)}
//             className="cursor-pointer overflow-hidden rounded shadow"
//           >
//             <img
//              key={img.public_id}
//           src={img.secure_url}
//           alt="cloudinary"
//         //   className="rounded-xl shadow"
//               className="w-full h-auto object-cover transition-all duration-300"
//             />
//           </motion.div>
//         ))}
//       </div>

//       <AnimatePresence>
//         {selectedImage && (
//           <motion.div
//             className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center p-4"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={() => setSelectedImage(null)}
//           >
//             <motion.img
//               src={selectedImage.secure_url}
//               alt={selectedImage.public_id}
//               initial={{ scale: 0.8 }}
//               animate={{ scale: 1 }}
//               exit={{ scale: 0.8 }}
//               className="max-w-full max-h-full rounded-lg shadow-lg"
//               onClick={(e) => e.stopPropagation()}
//             />
//           </motion.div>
//         )}
//       </AnimatePresence>

//           {cursor && (
//         <div className="col-span-full text-center mt-6">
//           <button
//             onClick={() => fetchPhotos(cursor)}
//             disabled={loading}
//             className="bg-white text-black px-4 py-2 rounded-xl hover:bg-neutral-200 transition"
//           >
//             {loading ? 'Caricamento' : 'Carica altri'}
//           </button>
//         </div>
//       )}
//     </div>
//   )
// }

'use client';

import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';

export default function PhotosPage() {
  const [images, setImages] = useState<any[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [allLoaded, setAllLoaded] = useState(false);
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.5 });

  const fetchPhotos = async (cursorParam: string | null = null) => {
    if (loading || allLoaded) return;
    setLoading(true);
    const query = cursorParam ? `?resource_type=image&cursor=${cursorParam}` : '?resource_type=image';
    const res = await fetch(`/api/gallery${query}`);
    const data = await res.json();

    if (data.success) {
      setImages(prev => [...prev, ...data.resources]);
      if (data.nextCursor) setCursor(data.nextCursor);
      else {
        setCursor(null);
        setAllLoaded(true);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  useEffect(() => {
    if (inView && cursor) fetchPhotos(cursor);
  }, [inView, cursor]);

  return (
    <>
    <Navbar />
    <motion.div
      className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.1 } },
      }}
    >
      {images.map(img => (
        <motion.img
          key={img.public_id}
          src={img.secure_url}
          alt="cloudinary image"
          className="rounded-xl w-full shadow"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      ))}

      {loading && Array.from({ length: 3 }).map((_, i) => (
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
// // "use client";

// // import PhotosPage from "./photos/page";

// // export default function Home() {
// //   return (
// //     <>
// //       <main className="pt-24 pb-12 max-w-4xl mx-auto text-black">
// //         <h1 className="text-4xl font-serif">
// //           Catturo ciò che le parole non riescono a dire.
// //         </h1>
// //         <p className="mt-2 text-lg text-neutral-600 max-w-xl pb-6 ">
// //           Scoprite il mio mondo attraverso ritratti, luoghi e luce.
// //         </p>
// //         <PhotosPage />
// //       </main>
// //     </>
// //   );
// // }

// "use client";

// import Link from "next/link";
// import { motion } from "framer-motion";
// import Image from "next/image";
// import PhotosPage from "./photos/page"; // opzionale
// import { useEffect, useState } from "react";
// import toast from "react-hot-toast";

// export default function Home() {
//   const [images, setImages] = useState<any[]>([]);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [allLoaded, setAllLoaded] = useState<boolean>(false);

//   const fetchPhotos = async () => {
//     if (loading || allLoaded) return;
//     setLoading(true);

//     try {
//       const res = await fetch(
//         `/api/photos?folder=jacopo-portfolio-landing-photos`
//       );
//       const data = await res.json();
//       console.log({ data });

//       if (Array.isArray(data)) {
//         setImages((prev) => {
//           const all = [...prev, ...data];

//           const uniqueById = all.filter(
//             (item, index, self) =>
//               index === self.findIndex((t) => t.public_id === item.public_id)
//           );

//           return uniqueById;
//         });
//       }
//     } catch (error) {
//       toast.error(`Errore: "Caricamento fallito"}`);
//       console.error("Errore durante il fetch da Cloudinary:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPhotos();
//   }, []);

//   return (
//     <main className="pt-24 pb-12 max-w-4xl mx-auto flex flex-col items-center justify-center text-black">
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 1 }}
//         className="text-center max-w-3xl"
//       >
//         <h1 className="text-5xl font-serif leading-tight">
//           Catturo ciò che le parole non riescono a dire.
//         </h1>
//         <p className="mt-4 text-lg text-neutral-600">
//           Scopri il mio mondo attraverso ritratti, luoghi e luce.
//         </p>

//         <Link
//           href="/photos"
//           className="inline-block mt-8 px-6 py-3 text-white bg-black rounded-full text-sm tracking-wider hover:bg-neutral-800 transition"
//         >
//           Guarda le mie foto
//         </Link>
//       </motion.div>

//       <motion.div
//         className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true }}
//         transition={{ staggerChildren: 0.2 }}
//       >
//         {images?.map((src, i) => (
//           <motion.div
//             // key={i}
//             className="overflow-hidden rounded-2xl shadow-md"
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             // transition={{ duration: 0.6, delay: i * 0.2 }}
//           >
//             <Image
//               src={src}
//               alt={`Anteprima ${i + 1}`}
//               width={400}
//               height={300}
//               className="object-cover w-full h-64 hover:scale-105 transition-transform duration-500"
//             />
//             <PhotosPage />
//           </motion.div>
//         ))}
//       </motion.div>

//       {/* <div className="mt-20 text-center text-neutral-500 text-sm">
//         © {new Date().getFullYear()} — Jacopo Portfolio. Tutti i diritti riservati.
//       </div> */}
//     </main>
//   );
// }

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

type CloudinaryImage = {
  public_id: string;
  secure_url: string;
};

export default function Home() {
  const [images, setImages] = useState<CloudinaryImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [allLoaded, setAllLoaded] = useState(false);

  const fetchPhotos = async () => {
    if (loading || allLoaded) return;
    setLoading(true);

    try {
      const res = await fetch(
        `/api/photos?folder=jacopo-portfolio-landing-photos`
      );
      const data = await res.json();

      if (Array.isArray(data)) {
        setImages((prev) => {
          const all = [...prev, ...data];
          const uniqueById = all.filter(
            (item, index, self) =>
              index === self.findIndex((t) => t.public_id === item.public_id)
          );
          return uniqueById;
        });
      }
    } catch (error) {
      toast.error("Errore: Caricamento fallito");
      console.error("Errore durante il fetch da Cloudinary:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  return (
    <main className="pt-24 pb-12 max-w-4xl mx-auto flex flex-col items-center justify-center text-black">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center max-w-3xl"
      >
        <h1 className="text-5xl font-serif leading-tight">
          Catturo ciò che le parole non riescono a dire.
        </h1>
        <p className="mt-4 text-lg text-neutral-600">
          Scopri il mio mondo attraverso ritratti, luoghi e luce.
        </p>

        <Link
          href="/photos"
          className="inline-block mt-8 px-6 py-3 text-white bg-black rounded-full text-sm tracking-wider hover:bg-neutral-800 transition"
        >
          Guarda le mie foto
        </Link>
      </motion.div>

      <motion.div
        className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ staggerChildren: 0.2 }}
      >
        {images.map((img, i) => (
          <motion.div
            key={img.public_id}
            className="overflow-hidden rounded-2xl shadow-md"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <motion.img
              src={img.secure_url}
              alt={`Anteprima ${i + 1}`}
              width={400}
              height={300}
              className="object-cover w-full h-64 hover:scale-105 transition-transform duration-500"
            />
          </motion.div>
        ))}
      </motion.div>
    </main>
  );
}

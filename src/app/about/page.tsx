// "use client";

// import { useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import { motion } from "framer-motion";

// type CloudinaryImage = {
//   public_id: string;
//   secure_url: string;
// };

// export default function About() {
//   const [image, setImage] = useState<CloudinaryImage | null>(null);
//   const [loading, setLoading] = useState(false);

//   const fetchPhotos = async () => {
//     if (loading) return;
//     setLoading(true);

//     try {
//       const res = await fetch(`/api/photos?folder=jacopo-profile-photo`);
//       const data = await res.json();

//       if (data.length > 0) {
//         setImage(data[0]);
//       }
//     } catch (error) {
//       toast.error("Errore: Caricamento fallito");
//       console.error("Errore durante il fetch da Cloudinary:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPhotos();
//   }, []);

//   return (
//     <>
//       {loading && (
//         <div className="h-screen flex items-center justify-center bg-neutral-100">
//           <div className="rounded-xl h-80 w-64 bg-neutral-300 animate-pulse shadow-lg" />
//         </div>
//       )}

//       {image && (
//         <section className="relative h-screen w-full overflow-hidden">
//           <motion.img
//             initial={{ scale: 1.3, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             transition={{ duration: 1.2, ease: "easeOut" }}
//             src={image.secure_url}
//             alt={image.public_id}
//             className="absolute inset-0 w-full object-cover brightness-75"
//           />
//           <div className="relative z-10 flex flex-col justify-center items-center h-full text-center text-white px-6 sm:px-12 md:px-20">
//             <motion.h1
//               initial={{ y: 60, opacity: 0 }}
//               animate={{ y: 0, opacity: 1 }}
//               transition={{ delay: 0.5, duration: 0.8 }}
//               className="text-4xl sm:text-5xl md:text-7xl font-extrabold drop-shadow-lg"
//             >
//               Sono <span className="text-amber-400">Jacopo</span>
//               <span className="text-white">.</span>
//             </motion.h1>
//             <motion.p
//               initial={{ y: 60, opacity: 0 }}
//               animate={{ y: 0, opacity: 1 }}
//               transition={{ delay: 0.85, duration: 0.8 }}
//               className="mt-5 max-w-xl text-base sm:text-lg md:text-xl text-neutral-100 drop-shadow-md leading-relaxed"
//             >
//               Catturo la luce dove altri vedono solo ombre. Vivo nelle Marche, e
//               racconto storie con la mia lente.
//             </motion.p>
//           </div>
//         </section>
//       )}

//       <div className="flex items-center justify-center min-h-[70vh] px-6 mt-10 sm:px-12 md:px-24 bg-neutral-50">
//         <motion.p
//           initial={{ y: 50, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ delay: 0.4, duration: 0.7 }}
//           className="max-w-3xl text-center text-sm sm:text-base md:text-lg text-neutral-700 font-light leading-relaxed whitespace-pre-line"
//           style={{ whiteSpace: "pre-line" }}
//         >
//           {`Ogni fotografia è un incontro.
//             Un gesto rubato alla quotidianità,
//             un silenzio catturato in uno sguardo,
//             una corsa sospesa nel tempo.

//             Nel mio lavoro cerco l'anima dietro le forme:
//             un volto che racconta senza parlare,
//             un atleta che sfida i limiti
//             senza distrarsi dal sogno.

//             Non fotografo solo ciò che vedo,
//             ma ciò che sento accadere
//             tra un battito e l'altro.

//             Il mio obiettivo è uno solo:
//             trasmettere emozioni vere,
//             autentiche, vive.

//             Perché la fotografia, per me, è libertà.`}
//         </motion.p>
//       </div>

//       <main className="max-w-4xl mx-auto px-6 py-16 text-neutral-800">
//         <motion.div
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true }}
//           transition={{ staggerChildren: 0.2 }}
//           className="space-y-14"
//         >
//           <motion.section
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="leading-relaxed"
//           >
//             <h2 className="text-3xl font-semibold mb-5 border-b-2 border-amber-400 inline-block pb-1">
//               Chi sono
//             </h2>
//             <p className="mb-4 text-lg sm:text-xl">
//               Nato nel 1998, cresciuto tra il silenzio dei paesaggi marchigiani,
//               ho scoperto la fotografia come strumento per catturare l’essenza
//               dei momenti. Il mio stile è discreto, osservativo, autentico.
//             </p>
//             <p className="text-lg sm:text-xl">
//               Amo raccontare la bellezza delle piccole cose: una luce che
//               attraversa una finestra, uno sguardo spontaneo, un istante rubato.
//             </p>
//           </motion.section>

//           <motion.section
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="leading-relaxed"
//           >
//             <h2 className="text-3xl font-semibold mb-5 border-b-2 border-amber-400 inline-block pb-1">
//               Cosa mi ispira
//             </h2>
//             <ul className="list-disc pl-8 space-y-3 text-lg sm:text-xl">
//               <li>La luce del tramonto sulla costa Adriatica</li>
//               <li>Il cinema di Paolo Sorrentino e Wong Kar-Wai</li>
//               <li>I suoni ambientali e la musica minimal</li>
//               <li>Le passeggiate nei borghi abbandonati</li>
//               <li>Le persone vere, nelle loro imperfezioni</li>
//             </ul>
//           </motion.section>

//           <motion.section
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="leading-relaxed"
//           >
//             <h2 className="text-3xl font-semibold mb-5 border-b-2 border-amber-400 inline-block pb-1">
//               Oltre la fotografia
//             </h2>
//             <p className="text-lg sm:text-xl">
//               Quando non scatto, mi trovi a leggere romanzi italiani
//               contemporanei, a fare trekking in mezzo al nulla o a preparare
//               caffè filtro ascoltando ambient techno.
//             </p>
//           </motion.section>
//         </motion.div>
//       </main>
//     </>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

type CloudinaryImage = {
  public_id: string;
  secure_url: string;
};

export default function About() {
  const [image, setImage] = useState<CloudinaryImage | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchPhotos = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/photos?folder=jacopo-profile-photo`);
      const data = await res.json();
      if (data.length > 0) setImage(data[0]);
    } catch (error) {
      toast.error("Errore: Caricamento fallito");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  return (
    <>
      {loading && (
        <div className="h-screen flex items-center justify-center bg-neutral-100">
          <div className="rounded-xl h-72 w-56 bg-neutral-300 animate-pulse shadow-md" />
        </div>
      )}

      {image && (
        <section className="relative h-[70vh] sm:h-[120vh] w-full overflow-hidden">
          <motion.img
            initial={{ scale: 1.3, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            src={image.secure_url}
            alt={image.public_id}
            className="absolute inset-0 w-full h-full object-cover brightness-75"
          />
          <div className="relative z-10 flex flex-col justify-center items-center h-full px-6 text-center text-white">
            <motion.h1
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-3xl sm:text-4xl md:text-6xl font-extrabold drop-shadow-lg"
            >
              Sono <span className="text-amber-400">Jacopo</span>
              <span className="text-white">.</span>
            </motion.h1>
            <motion.p
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.85, duration: 0.8 }}
              className="mt-4 max-w-xl text-sm sm:text-base md:text-lg text-neutral-100 drop-shadow-md leading-relaxed"
            >
              Catturo la luce dove altri vedono solo ombre. Vivo nelle Marche, e
              racconto storie con la mia lente.
            </motion.p>
          </div>
        </section>
      )}

      <div className="flex items-center justify-center px-4 sm:px-10 mt-10 md:px-20 bg-neutral-50">
        <motion.p
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="max-w-lg text-center text-xs sm:text-sm md:text-base text-neutral-700 font-light leading-relaxed whitespace-pre-line"
          style={{ whiteSpace: "pre-line" }}
        >
          {`Ogni fotografia è un incontro.
Un gesto rubato alla quotidianità,
un silenzio catturato in uno sguardo,
una corsa sospesa nel tempo.

Nel mio lavoro cerco l'anima dietro le forme:
un volto che racconta senza parlare,
un atleta che sfida i limiti
senza distrarsi dal sogno.

Non fotografo solo ciò che vedo,
ma ciò che sento accadere
tra un battito e l'altro.

Il mio obiettivo è uno solo:
trasmettere emozioni vere,
autentiche, vive.

Perché la fotografia, per me, è libertà.`}
        </motion.p>
      </div>

      <main className="max-w-3xl mx-auto px-4 sm:px-8 py-16 text-neutral-800">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.2 }}
          className="space-y-12"
        >
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="leading-relaxed"
          >
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 border-b-2 border-amber-400 inline-block pb-1">
              Chi sono
            </h2>
            <p className="mb-3 text-sm sm:text-base">
              Nato nel 1998, cresciuto tra il silenzio dei paesaggi marchigiani,
              ho scoperto la fotografia come strumento per catturare l’essenza
              dei momenti. Il mio stile è discreto, osservativo, autentico.
            </p>
            <p className="text-sm sm:text-base">
              Amo raccontare la bellezza delle piccole cose: una luce che
              attraversa una finestra, uno sguardo spontaneo, un istante rubato.
            </p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="leading-relaxed"
          >
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 border-b-2 border-amber-400 inline-block pb-1">
              Oltre la fotografia
            </h2>
            <p className="text-sm sm:text-base">
              Nel mio tempo libero mi piace rilassarmi leggendo. Faccio sport a
              livello agonistico ed è l'altra mia passione, insieme alla
              fotografia. Sono anche un amante del cinema e di tutto ciò che si
              cela dietro la realizzazione di una pellicola. Camminare in
              montagna è un altro hobby che coltivo, e trovo che doni all'essere
              umano un senso di libertà ineguagliabile.
            </p>
          </motion.section>
        </motion.div>
      </main>
    </>
  );
}

"use client";

import { useEffect, useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLockBodyScroll } from "@/hooks/useLayoutEffect";
import toast from "react-hot-toast";

function MyComponent() {
  return;
}
type CloudinaryVideo = {
  public_id: string;
  secure_url: string;
};

type CloudinaryResponse = {
  success: boolean;
  resources: CloudinaryVideo[];
  nextCursor: string | null;
};

export default function VideoGallery() {
  const [selectedVideo, setSelectedVideo] = useState<CloudinaryVideo | null>(
    null
  );
  const [videos, setVideos] = useState<CloudinaryVideo[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [allLoaded, setAllLoaded] = useState<boolean>(false);

  useLockBodyScroll(!!selectedVideo);

  const fetchVideos = async (cursorParam: string | null = null) => {
    setLoading(true);

    try {
      const query = cursorParam
        ? `?resource_type=video&cursor=${cursorParam}`
        : `?resource_type=video`;
      const res = await fetch(`/api/videos${query}`);
      const data: CloudinaryResponse = await res.json();

      if (Array.isArray(data)) {
        setVideos((prev) => {
          const all = [...prev, ...data];

          const uniqueById = all.filter(
            (item, index, self) =>
              index === self.findIndex((t) => t.public_id === item.public_id)
          );

          return uniqueById;
        });
        if (!cursorParam || data.length === 0) setAllLoaded(true);
      }

      // if (data.success) {
      //   setVideos((prev) => [...prev, ...data.resources]);
      //   setAllLoaded(true);
      //   if (data.nextCursor) setCursor(data.nextCursor);
      // } else {
      //   setCursor(null);
      // }
    } catch (error) {
      toast.error(`Errore: "Caricamento fallito"}`);
      console.error("Errore durante il fetch da Cloudinary:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  return (
    <>
      <motion.div
        className="pt-24 pb-12 columns-1 sm:columns-2 lg:columns-3 gap-4"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.15,
            },
          },
        }}
      >
        {videos.map((video, index) => (
          <VideoCard
            key={video.public_id}
            video={video}
            onClick={() => setSelectedVideo(video)}
            setSelectedVideo={setSelectedVideo}
          />
        ))}

        <AnimatePresence>
          {selectedVideo && (
            <motion.div
              className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedVideo(null)}
            >
              <motion.video
                src={selectedVideo.secure_url}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                className="max-w-full max-h-full rounded-lg shadow-lg"
                onClick={(e) => e.stopPropagation()}
                autoPlay
                muted
                playsInline
                loop
                controls
              />
            </motion.div>
          )}
        </AnimatePresence>
        {cursor && (
          <div className="col-span-full text-center mt-6">
            <button
              onClick={() => fetchVideos(cursor)}
              disabled={loading}
              className="bg-white text-black px-4 py-2 rounded-xl hover:bg-neutral-200 transition"
            >
              {loading ? "Caricamento..." : "Carica altri"}
            </button>
          </div>
        )}
      </motion.div>
      {allLoaded && videos?.length === 0 && (
        <p className="col-span-full text-center text-gray-400 italic mt-4">
          Nessun video trovato
        </p>
      )}
    </>
  );
}

function VideoCard({
  video,
  onClick,
  setSelectedVideo,
}: {
  video: CloudinaryVideo;
  onClick: () => void;
  setSelectedVideo: any;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [isAudioOn, setIsAudioOn] = useState(false);

  const thumbnailUrl = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/video/upload/so_0/${video.public_id}.jpg`;

  const toggleAudio = () => {
    setSelectedVideo(null);
    if (!videoRef.current) return;

    const video = videoRef.current;
    if (video.paused && !isAudioOn) {
      video.play();
    } else {
      video.pause();
    }

    video.muted = isAudioOn;
    setIsAudioOn(!isAudioOn);
  };

  return (
    <motion.div
      className="mb-4 inline-block w-full break-inside-avoid overflow-hidden rounded-xl shadow-lg cursor-pointer relative"
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 },
      }}
      whileHover={{ scale: 1.02 }}
    >
      {!loaded && (
        <motion.video
          src={thumbnailUrl}
          // alt="Video thumbnail"
          className="absolute w-full h-full object-cover z-10"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        />
      )}

      <video
        ref={videoRef}
        src={video.secure_url}
        className="w-full h-auto object-cover rounded-xl"
        autoPlay
        loop
        playsInline
        onCanPlay={() => setLoaded(true)}
        preload="metadata"
        onClick={onClick}
      />

      <div
        className="absolute bottom-2 right-2 text-white text-sm bg-black/60 px-2 py-1 rounded"
        onClick={toggleAudio}
      >
        {isAudioOn ? "🔊" : "🔇"}
      </div>
    </motion.div>
  );
}

// 'use client';

// import { useEffect, useRef, useState } from 'react';
// import { useInView } from 'react-intersection-observer';
// import { motion } from 'framer-motion';
// import Navbar from '../components/Navbar';

// export default function VideosPage() {
//   const videoRef = useRef<HTMLVideoElement | null>(null);

//   const [videos, setVideos] = useState<any[]>([]);
//   const [cursor, setCursor] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [allLoaded, setAllLoaded] = useState(false);
//   const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.5 });
//   const [loaded, setLoaded] = useState(false);
//   const [isAudioOn, setIsAudioOn] = useState(false);

//   const fetchVideos = async (cursorParam: string | null = null) => {
//     if (loading || allLoaded) return;
//     setLoading(true);
//     const query = cursorParam ? `?resource_type=video&cursor=${cursorParam}` : '?resource_type=video';
//     const res = await fetch(`/api/gallery${query}`);
//     const data = await res.json();

//     if (data.success) {
//       setVideos(prev => [...prev, ...data.resources]);
//       if (data.nextCursor) setCursor(data.nextCursor);
//       else {
//         setCursor(null);
//         setAllLoaded(true);
//       }
//     }
//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchVideos();
//   }, []);

//   useEffect(() => {
//     if (inView && cursor) fetchVideos(cursor);
//   }, [inView, cursor]);

//   const toggleAudio = () => {
//     if (videoRef.current) {
//       const isPaused = videoRef.current.paused;
//       videoRef.current.muted = isAudioOn;
//       setIsAudioOn(!isAudioOn);
//       if (isPaused) videoRef.current.play();
//       else videoRef.current.pause();
//     }
//   };

//   return (
//      <>
//     <motion.div
//       className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
//       initial="hidden"
//       animate="visible"
//       variants={{
//         hidden: {},
//         visible: { transition: { staggerChildren: 0.1 } },
//       }}
//       onClick={toggleAudio}
//     >
//       {videos.map(video => (
//       <> <motion.video
//           key={video.public_id}
//           src={video.secure_url}
//           className="rounded-xl w-full shadow"
//           autoPlay
//           muted
//           loop
//           playsInline
//           preload="metadata"
//           initial={{ opacity: 0, scale: 0.95 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.4, ease: 'easeOut' }}
//           onClick={toggleAudio}
//         />

//       </>
//       ))}

//       {loading && Array.from({ length: 3 }).map((_, i) => (
//         <div
//           key={`skeleton-${i}`}
//           className="rounded-xl h-64 w-full bg-neutral-200 animate-pulse"
//         />
//       ))}

//       {!allLoaded && !loading && (
//         <div ref={ref} className="col-span-full h-10 mt-4" />
//       )}

//       {allLoaded && (
//         <p className="col-span-full text-center text-gray-400 italic mt-4">
//           ✅ Tutti i video sono stati caricati
//         </p>
//       )}
//     </motion.div>

//     </>
//   );
// }

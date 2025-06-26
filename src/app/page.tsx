"use client";

import PhotosPage from "./photos/page";

export default function Home() {
  return (
    <>
      <main className="pt-24 pb-12 max-w-4xl mx-auto text-black">
        <h1 className="text-4xl font-serif">
          Catturo ciò che le parole non riescono a dire.
        </h1>
        <p className="mt-2 text-lg text-neutral-600 max-w-xl pb-6 ">
          Scoprite il mio mondo attraverso ritratti, luoghi e luce.
        </p>
        <PhotosPage />
      </main>
    </>
  );
}

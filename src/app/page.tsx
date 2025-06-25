"use client";

import PhotosPage from "./photos/page";

export default function Home() {
  return (
    <>
      {/* <Navbar /> */}
      <main className="max-w-4xl mx-auto text-black">
        {/* <h1 className="pl-4 text-4xl font-bold mb-4">Welcome to my portfolio</h1>
        <p className="pl-4 text-lg leading-relaxed">
          This is the home page. Explore the About Me and Contact pages via the navbar.
        </p> */}
        <h1 className="text-4xl font-serif">
          Catturo ciò che le parole non riescono a dire.
        </h1>
        <p className="mt-2 text-lg text-neutral-600 max-w-xl pb-6 ">
          Scoprite il mio mondo attraverso ritratti, luoghi e luce.
        </p>
        <PhotosPage maxResults={"6"} />
      </main>
    </>
  );
}

import PhotosPage from "./photos/page";

export default function Home() {
  return (
    <>
      {/* <Navbar /> */}
      <main className="pt-18 max-w-4xl mx-auto p-6 text-black">
        <h1 className="pl-4 text-4xl font-bold mb-4">Welcome to my portfolio</h1>
        <p className="pl-4 text-lg leading-relaxed">
          This is the home page. Explore the About Me and Contact pages via the navbar.
        </p>
        <PhotosPage />
      </main>
    </>
  );
}

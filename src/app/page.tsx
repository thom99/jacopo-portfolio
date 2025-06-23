import Navbar from './components/Navbar';

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="pt-20 max-w-4xl mx-auto p-6 text-white">
        <h1 className="text-4xl font-bold mb-4">Welcome to my portfolio</h1>
        <p className="text-lg leading-relaxed">
          This is the home page. Explore the About Me and Contact pages via the navbar.
        </p>
      </main>
    </>
  );
}

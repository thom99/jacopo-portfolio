import Navbar from '../components/Navbar';

export default function About() {
  return (
    <>
      <Navbar />
      <main className="pt-20 max-w-4xl mx-auto p-6 text-white">
        <h1 className="text-4xl font-bold mb-4">About Me</h1>
        <p className="text-lg leading-relaxed">
          Here you can write something about yourself. Make it brief, clear, and inviting.
        </p>
      </main>
    </>
  );
}

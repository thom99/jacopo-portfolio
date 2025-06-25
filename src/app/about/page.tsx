import Navbar from "../components/Navbar";

export default function About() {
  return (
    <>
      {/* <Navbar /> */}
      <main className="pt-18 max-w-4xl mx-auto p-6 text-black">
        <h1 className="text-4xl font-bold mb-4">About Me</h1>
        <p className="text-lg leading-relaxed">
          I'm Jacopo, an Italian photographer born in 1998, based in Marche,
          Italy. I shoot to remember what would otherwise fade. I'm drawn to the
          silence of places, the spontaneity of faces, the beauty that lives
          between moments.
        </p>
      </main>
    </>
  );
}

import Image from "next/image";
import JacopoImg from "../images/Jacopo.jpeg";

export default function About() {
  return (
    <>
      <main className="max-w-4xl mx-auto p-6 text-black">
        <Image
          src={JacopoImg}
          alt="Jacopo"
          width={400}
          height={500}
          className="rounded-xl shadow-lg object-cover mx-auto"
        />
        <h1 className="text-4xl font-bold mb-4">Su di me</h1>
        <p className="text-lg leading-relaxed text-neutral-600">
          Sono Jacopo, un fotografo italiano nato nel 1998, con sede nelle
          Marche, Italia. Scatto per ricordare ciò che altrimenti svanirebbe.
          Sono attratto dal silenzio dei luoghi, dalla spontaneità dei volti,
          dalla bellezza che vive tra i momenti.
        </p>
      </main>
    </>
  );
}

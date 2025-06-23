'use client';

import { motion } from 'framer-motion';
import { useState, FormEvent } from 'react';

import Navbar from '../components/Navbar';

// export default function Contact() {
//   return (
//     <>
//       <main className="pt-20 max-w-4xl mx-auto p-6 text-white">
//         <h1 className="text-4xl font-bold mb-4">Contact</h1>
//         <p className="text-lg leading-relaxed">
//           Feel free to reach out via email or social media.
//         </p>
//       </main>
//     </>
//   );
// }


export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <>
      <Navbar />
 <main className="pt-20 max-w-4xl mx-auto p-6 text-white">
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      style={{ maxWidth: 500, margin: 'auto' }}
    >
      <h1>Contact Me</h1>
      {submitted ? (
        <p>Grazie per avermi contattato! Ti risponderò al più presto.</p>
      ) : (
        <form
          onSubmit={handleSubmit}
          style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
        >
          <input
            type="text"
            placeholder="Nome"
            required
            style={{ padding: '0.5rem', fontSize: '1rem' }}
          />
          <input
            type="email"
            placeholder="Email"
            required
            style={{ padding: '0.5rem', fontSize: '1rem' }}
          />
          <textarea
            placeholder="Messaggio"
            required
            rows={5}
            style={{ padding: '0.5rem', fontSize: '1rem', resize: 'vertical' }}
          />
          <button
            type="submit"
            style={{
              padding: '0.75rem',
              fontSize: '1.1rem',
              backgroundColor: '#ff0055',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              borderRadius: '6px',
            }}
          >
            Invia
          </button>
        </form>
      )}
      
    </motion.section>
    </main>
    </>
  );
}

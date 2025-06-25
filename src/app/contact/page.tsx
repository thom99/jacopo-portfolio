"use client";

import { motion } from "framer-motion";
import { useState, FormEvent } from "react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <>
      <main className="min-h-screen px-6 text-black ">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          <h1 className="text-4xl font-bold mb-4 tracking-tight">Contattami</h1>
          <p className="text-gray-600 mb-8 text-lg">
            Hai un progetto, una collaborazione o una semplice curiosità?
            Compila il modulo, ti risponderò appena possibile.
          </p>

          {submitted ? (
            <p className="text-green-600 text-xl font-medium">
              Grazie per il tuo messaggio! A presto ✉️
            </p>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 text-left"
            >
              <div>
                <label
                  htmlFor="name"
                  className="block mb-1 text-sm font-semibold text-gray-700"
                >
                  Nome
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="Il tuo nome"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block mb-1 text-sm font-semibold text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="la tua@email.com"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block mb-1 text-sm font-semibold text-gray-700"
                >
                  Messaggio
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-black resize-none"
                  placeholder="Scrivi il tuo messaggio..."
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="mt-2 bg-black text-white py-3 rounded-lg text-sm font-semibold transition-colors hover:bg-gray-800"
              >
                Invia messaggio
              </motion.button>
            </form>
          )}
        </motion.section>
      </main>
    </>
  );
}

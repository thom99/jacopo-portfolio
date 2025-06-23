'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

const links = [
  { href: '/', label: 'Home' },
  { href: '/photos', label: 'Photos' },
  { href: '/videos', label: 'Videos' },
  { href: '/about', label: 'About Me' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 bg-black bg-opacity-80 backdrop-blur-md z-50 px-6 py-4 flex justify-center shadow-md">
      <ul className="flex space-x-10 max-w-5xl w-full">
        {links.map(({ href, label }) => {
          const isActive = pathname === href;
          return (
            <motion.li
              key={href}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <Link
                href={href}
                className={`text-white text-lg font-medium transition-colors duration-300 ${
                  isActive ? 'text-cyan-400' : 'hover:text-cyan-300'
                }`}
              >
                {label}
              </Link>

              {isActive && (
                <motion.span
                  layoutId="underline"
                  className="absolute -bottom-1 left-0 right-0 h-1 bg-cyan-400 rounded"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
            </motion.li>
          );
        })}
      </ul>
    </nav>
  );
}

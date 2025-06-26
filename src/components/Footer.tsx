import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="mt-16 border-t border-gray-200 dark:border-gray-700 py-6 text-center text-sm text-gray-500">
      <p>
        &copy; {new Date().getFullYear()} Photographer Portfolio. All rights
        reserved.
      </p>
      <p className="mt-2">
        Made with ❤️ by{" "}
        <a
          href="https://thomasdami.netlify.app/"
          className="underline hover:text-black dark:hover:text-white"
          target="_blank"
          rel="noopener noreferrer"
        >
          Thomas Dami
        </a>
      </p>
    </footer>
  );
};

export default Footer;

// src/app/layout.js
"use client";

import Link from "next/link";
import "./globals.css";

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen bg-[#1C1C1C] text-[#CCCCCC]">
        <nav className="w-full bg-[#333333] bg-opacity-90 text-white py-4 px-8 fixed top-0 z-10">
          <div className="flex justify-between items-center max-w-6xl mx-auto">
            <img src="letterboxd_logo.png" className="h-10 w-auto" alt="Letterboxd Logo" />
            <h1 className="text-3xl font-bold">Letterboxd</h1>
            <ul className="flex space-x-6">
              <li className="hover:text-gray-400"><Link href="/">Home</Link></li>
              <li className="hover:text-gray-400"><Link href="/films">Films</Link></li>
              <li className="hover:text-gray-400">Lists</li>
              <li className="hover:text-gray-400">Journal</li>
              <li className="hover:text-gray-400">Sign In</li>
            </ul>
          </div>
        </nav>
        <main className="flex-grow pt-20">{children}</main>
      </body>
    </html>
  );
}

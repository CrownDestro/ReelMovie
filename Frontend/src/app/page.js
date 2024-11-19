// src/app/page.js
"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="relative h-screen bg-cover bg-center" style={{ backgroundImage: "url('background.jpg')" }}>
      <div className="flex flex-col items-center justify-center h-full text-white text-center">
        <h2 className="text-4xl font-bold drop-shadow-lg">Track films you’ve watched.</h2>
        <h2 className="text-4xl font-bold drop-shadow-lg">Save those you want to see.</h2>
        <h2 className="text-4xl font-bold mb-6 drop-shadow-lg">Tell your friends what’s good.</h2>
        <button
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-transform transform hover:scale-105"
          onClick={() => router.push("/films")}
        >
          Get Started - it’s Free
        </button>
      </div>
    </div>
  );
}

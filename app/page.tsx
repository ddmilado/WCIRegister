"use client";
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-8 flex flex-col items-center justify-center">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-2 tracking-tight">
          WCI Dubai Transport Unit
        </h1>
        <p className="text-gray-600 text-lg">
          Secure access for authorized personnel
        </p>
      </div>
      <div className="flex flex-wrap gap-6 justify-center max-w-2xl">
        <button
          onClick={() => router.push('/signin')}
          className="group relative overflow-hidden rounded-full h-12 px-8 bg-red-600 text-white font-medium transition-all duration-300 hover:bg-red-500 hover:scale-105"
        >
          Sign In
          <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </button>
        <button
          onClick={() => router.push('/signin-coordinator')}
          className="group relative overflow-hidden rounded-full h-12 px-8 bg-red-600 text-white font-medium transition-all duration-300 hover:bg-red-500 hover:scale-105"
        >
          Sign In as Lead Coordinator
          <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </button>
        <button
          onClick={() => router.push('/signout')}
          className="group relative overflow-hidden rounded-full h-12 px-8 bg-red-600 text-white font-medium transition-all duration-300 hover:bg-red-500 hover:scale-105"
        >
          Sign Out
          <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </button>
        <button
          onClick={() => router.push('/signout-coordinator')}
          className="group relative overflow-hidden rounded-full h-12 px-8 bg-red-600 text-white font-medium transition-all duration-300 hover:bg-red-500 hover:scale-105"
        >
          Sign Out as Lead Coordinator
          <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </button>
      </div>
    </div>
  );
}

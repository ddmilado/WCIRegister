"use client";
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen p-8 flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-8">WCI Dubai Transport Unit</h1>
      <div className="flex flex-wrap gap-4 justify-center max-w-2xl">
        <button
          onClick={() => router.push('/signin')}
          className="bg-red-600 text-white rounded-full h-10 px-6 hover:bg-red-500 transition duration-200"
        >
          Sign In
        </button>
        <button
          onClick={() => router.push('/signin-coordinator')}
          className="bg-red-600 text-white rounded-full h-10 px-6 hover:bg-red-500 transition duration-200"
        >
          Sign In as Lead Coordinator
        </button>
        <button
          onClick={() => router.push('/signout')}
          className="bg-red-600 text-white rounded-full h-10 px-6 hover:bg-red-500 transition duration-200"
        >
          Sign Out
        </button>
        <button
          onClick={() => router.push('/signout-coordinator')}
          className="bg-red-600 text-white rounded-full h-10 px-6 hover:bg-red-500 transition duration-200"
        >
          Sign Out as Lead Coordinator
        </button>
      </div>
    </div>
  );
}

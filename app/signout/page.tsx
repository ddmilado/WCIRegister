"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Client, Databases, Query } from 'appwrite';

const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('67581f8c003e096231c3');
const databases = new Databases(client);

export default function SignOut() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // First, find the user's record
      const records = await databases.listDocuments(
        '675821f00019a9ddd1c0',
        '678bea500016265fa4f9',
        [
          Query.equal('fullName', formData.fullName),
          Query.isNull('signOutTime')
        ]
      );

      if (records.documents.length === 0) {
        alert('No active sign-in record found for this name.');
        return;
      }

      // Update the record with sign-out time
      await databases.updateDocument(
        '675821f00019a9ddd1c0',
        '678bea500016265fa4f9',
        records.documents[0].$id,
        {
          signOutTime: new Date().toISOString()
        }
      );
      
      alert('Sign out successful!');
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
      alert('Error signing out. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-5 row-start-2 items-center sm:items-start">
        <h1 className="text-2xl font-bold">WCI Dubai Transport Unit</h1>
        <h2>Sign Out</h2>
        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
          <div className="flex flex-col w-full">
            <label className="mb-1 text-sm font-medium">Full Name</label>
            <input
              type="text"
              name="fullName"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              disabled={isSubmitting}
              required
            />
          </div>
          <button
            type="submit"
            className={`bg-red-600 text-white rounded-full h-10 w-40 hover:bg-red-500 transition duration-200 ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Signing Out...' : 'Sign Out'}
          </button>
          <button
            type="button"
            onClick={() => router.push('/')}
            className="mt-4 text-gray-600 hover:text-gray-800"
          >
            Back to Home
          </button>
        </form>
      </main>
    </div>
  );
}

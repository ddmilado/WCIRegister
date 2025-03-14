"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Client, Databases, ID } from 'appwrite';

const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('67581f8c003e096231c3');
const databases = new Databases(client);

export default function SignInCoordinator() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: "",
    location: "",
    phoneNumber: "",
    worshippersToChurch: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentDate = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = currentDate.toLocaleDateString(undefined, options as Intl.DateTimeFormatOptions);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.fullName || !formData.location || !formData.phoneNumber|| !formData.worshippersToChurch ) {
      alert('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    try {
      const submitData = {
        ...formData,
        signInTime: new Date(),
        worshippersToChurch: parseInt(formData.worshippersToChurch),
        
      };

      const response = await databases.createDocument(
        '675821f00019a9ddd1c0',
        '678bea500016265fa4f9',
        ID.unique(),
        submitData
      );

      if (response) {
        alert('Coordinator sign in successful!');
        router.push('/');
      } else {
        throw new Error('Failed to create document');
      }
    } catch (error) {
      console.error('Error signing in:', error);
      alert('Error signing in. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-5 row-start-2 items-center sm:items-start">
        <h1 className="text-2xl font-bold">WCI Dubai Transport Unit</h1>
        <h2>Coordinator Sign In for: {formattedDate}</h2>
        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
          <div className="flex flex-col w-full">
            <label className="mb-1 text-sm font-medium">Full Name</label>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              disabled={isSubmitting}
              required
            />
          </div>
          <div className="flex flex-col w-full">
            <label className="mb-1 text-sm font-medium">Location</label>
            <select
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              disabled={isSubmitting}
              required
            >
              <option value="" disabled>Select your location</option>
              <option value="Abu Hail">Abu Hail</option>
              <option value="AL Nahda">AL Nahda</option>
              <option value="Satwa">Satwa</option>
              <option value="International City">International City</option>
              <option value="Sonapur">Sonapur</option>
              <option value="World Trade Center">World Trade Center</option>
              <option value="Emirates Tower">Emirates Tower</option>
              <option value="Financial Center">Financial Center</option>
              <option value="Business Bay">Business Bay</option>
              <option value="Baniyas">Baniyas</option>
              <option value="Al Rigga">Al Rigga</option>
              <option value="Deira">Deira</option>
              <option value="Union">Union</option>
            </select>
          </div>
          <div className="flex flex-col w-full">
            <label className="mb-1 text-sm font-medium">Phone Number</label>
            <input
              type="tel"
              name="phoneNumber"
              placeholder="Phone Number"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              disabled={isSubmitting}
              required
            />
          </div>
          <div className="flex flex-col w-full">
            <label className="mb-1 text-sm font-medium">Number of Worshippers to Church</label>
            <input
              type="number"
              name="worshippersToChurch"
              placeholder="Enter number of worshippers"
              value={formData.worshippersToChurch}
              onChange={handleInputChange}
              min="0"
              max="50"
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
            {isSubmitting ? 'Signing In...' : 'Sign In'}
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

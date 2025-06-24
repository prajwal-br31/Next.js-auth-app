import { FormEvent, useState } from 'react';
import { useRouter } from 'next/router';

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState('');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    const form = new FormData(e.currentTarget);
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        username: form.get('username'),
        password: form.get('password'),
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (!res.ok) {
      setError('Invalid username or password');
      return;
    }

    const { role } = await res.json();
    router.push(role === 'admin' ? '/admin' : '/user');
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 space-y-6"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-gray-100">
          Login
        </h2>

        <div>
          <label htmlFor="username" className="block mb-1 text-gray-700 dark:text-gray-300">
            Username
          </label>
          <input
            id="username"
            name="username"
            type="text"
            placeholder="Enter name"
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-100"
          />
        </div>

        <div>
          <label htmlFor="password" className="block mb-1 text-gray-700 dark:text-gray-300">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Enter password"
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-100"
          />
        </div>

        {error && (
          <p className="text-red-500 text-sm text-center">{error}</p>
        )}

        <button
          type="submit"
          className="w-full py-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-md transition"
        >
          Login
        </button>
      </form>
    </div>
  );
}

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import { Menu } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

type ProfileUser = {
  username: string;
  role: string;
  password?: string;
  details?: { location: string; phone: string };
};

export default function UserPage() {
  const router = useRouter();
  const [user, setUser] = useState<ProfileUser | null>(null);
  const [showPassword, setShowPassword] = useState(false);


  useEffect(() => {
    fetch('/api/profile/profileDetails')
      .then((r) => {
        if (!r.ok) throw new Error();
        return r.json();
      })
      .then((json) => {
        if (!json.user) throw new Error();
        setUser(json.user);
      })
      .catch(() => router.replace('/login'));
  }, []);

  if (!user) return <p className="text-center mt-20">Loading...</p>;

  return (
    <div className="min-h-screen flex flex-col">
   
      <header className="h-16 bg-white dark:bg-gray-900 shadow px-6 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Profile</h1>

        <Menu as="div" className="relative inline-block text-left">
          <Menu.Button className="inline-flex items-center gap-1 text-gray-600 dark:text-gray-300 focus:outline-none">
            <UserCircleIcon className="h-8 w-8 text-gray-500 dark:text-gray-400" />
            <span className="font-medium">{user.username} ({user.role})</span>
            <ChevronDownIcon className="h-4 w-4 mt-1" />
          </Menu.Button>
          <Menu.Items className="absolute right-0 z-10 mt-2 w-36 origin-top-right rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={async () => {
                      await fetch('/api/auth/logout');
                      router.push('/login');
                    }}
                    className={`${
                      active ? 'bg-gray-100 dark:bg-gray-700' : ''
                    } w-full px-4 py-2 text-sm text-left text-red-600 dark:text-red-400`}
                  >
                    Log out
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Menu>
      </header>

  
      <main className="flex-1 bg-gray-50 dark:bg-gray-900 p-6">
        <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
            Welcome, {user.username}!
          </h2>
          <div className="space-y-2 text-gray-700 dark:text-gray-300">
            <p>
              <strong>Username:</strong> {user.username}
            </p>
            <p>
              <strong>Role:</strong> User
            </p>
            {user.details && (
              <>
                <p>
                  <strong>Location:</strong> {user.details.location}
                </p>
                <p>
                  <strong>Phone:</strong> {user.details.phone}
                </p>
                {user.password && (
                  <div className="flex items-center gap-2">
                    <p>
                      <strong>Password:</strong>{' '}
                      <span className="font-mono">
                        {showPassword ? user.password : '••••••••'}
                      </span>
                    </p>
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="focus:outline-none"
                    >
                      {showPassword ? (
                        <EyeSlashIcon className="w-5 h-5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200" />
                      ) : (
                        <EyeIcon className="w-5 h-5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200" />
                      )}
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

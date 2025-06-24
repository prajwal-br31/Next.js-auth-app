import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { UserCircleIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { Menu } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

type User = {
  username: string;
  role: string;
  password: string;
  details?: { location: string; phone: string };
};

type Profile = { users?: User[] };

export default function AdminPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    fetch('/api/profile/profileDetails')
      .then((r) => {
        if (!r.ok) throw new Error();
        return r.json();
      })
      .then((data) => {
        if (!data.users) throw new Error('Not admin');
        setProfile(data);
      })
      .catch(() => router.replace('/login'));
  }, []);

  if (!profile) return <p className="text-center mt-20">Loading...</p>;

  const adminUser = profile.users?.find((u) => u.role === 'admin');

  return (
    <div className="h-screen flex flex-col bg-gray-50 dark:bg-gray-900">

    <header className="h-16 bg-white dark:bg-gray-900 shadow px-6 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100">All Users</h1>

        <Menu as="div" className="relative inline-block text-left">
          <Menu.Button className="inline-flex items-center gap-1 text-gray-600 dark:text-gray-300 focus:outline-none">
            <UserCircleIcon className="h-8 w-8 text-gray-500 dark:text-gray-400" />
            <span className="font-medium">
              {adminUser?.username} ({adminUser?.role})
            </span>
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

      <main className="flex flex-1 overflow-hidden">

        <div className="w-full md:w-1/2 overflow-y-auto p-6 border-r border-gray-200 dark:border-gray-700">
          <div className="space-y-4">
            {[...profile.users!]
              .sort((a, b) => a.username.localeCompare(b.username))
              .map((u) => (
                <div
                  key={u.username}
                  className={`cursor-pointer p-4 rounded-lg shadow hover:bg-gray-100 dark:hover:bg-gray-700 transition ${
                    selectedUser?.username === u.username
                      ? 'bg-gray-200 dark:bg-gray-800'
                      : 'bg-white dark:bg-gray-800'
                  }`}
                  onClick={() => {
                    setSelectedUser(u);
                    setShowPassword(false);
                  }}
                >
                  <div className="font-semibold text-gray-800 dark:text-gray-100">{u.username}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{u.role}</div>
                </div>
              ))}
          </div>
        </div>

       
        <div className="hidden md:flex w-1/2 p-6 overflow-hidden bg-white dark:bg-gray-900">
          {selectedUser ? (
            <div className="max-w-md w-full mx-auto bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                {selectedUser.username}
              </h2>
              <div className="space-y-2 text-gray-700 dark:text-gray-300">
                <p><strong>Role:</strong> {selectedUser.role}</p>
                <p><strong>Location:</strong> {selectedUser.details?.location ?? '—'}</p>
                <p><strong>Phone:</strong> {selectedUser.details?.phone ?? '—'}</p>
                <div className="flex items-center gap-2">
                  <p>
                    <strong>Password:</strong>{' '}
                    <span className="font-mono">
                      {showPassword ? selectedUser.password : '••••••••'}
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
              </div>
            </div>
          ) : (
            <div className="m-auto text-gray-500 dark:text-gray-400">
              Click a user to view details
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

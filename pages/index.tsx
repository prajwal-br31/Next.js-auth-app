import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
     
      <header className="px-6 py-6 bg-white dark:bg-gray-800 shadow text-center">
        <h1 className="text-3xl font-bold">Financialist - Next.js Auth Dashboard Assessment</h1>
      </header>

   
      <main className="flex-grow max-w-4xl mx-auto px-6 py-10 space-y-12">
        {/* Project Description */}
        <section>
          <h2 className="text-xl font-semibold mb-2"> Project Overview</h2>
          <p className="text-gray-700 dark:text-gray-300">
            A role-based authentication dashboard built with <strong>Next.js</strong>, allowing login as <strong>user</strong> or <strong>admin</strong>. Admin sees all users with A–Z sorting and their detials; users can view their profiles. Auth uses <strong>JWT in cookies</strong>.
          </p>
        </section>

        {/* Mock Credentials */}
        <section>
          <h2 className="text-xl font-semibold mb-2">Mock Users</h2>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
            <li><strong>For Admin Role :</strong> Username: <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">Admin</code>, Password: <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">adminpwd</code></li>
            <li><strong>For User Role :</strong> Username: <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">Prajwal</code>, Password: <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">userpwd</code></li>
            <li>More users are available with similar format in Admin view.</li>
          </ul>
        </section>

        {/* Technical Details */}
        <section>
          <h2 className="text-xl font-semibold mb-2">Technical Details</h2>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
            <li><strong>Framework:</strong> Next.js (Pages Router) with TypeScript</li>
            <li><strong>API:</strong> <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">pages/api/</code></li>
            <li><strong>Auth:</strong> JWT-based, cookie storage</li>
            <li><strong>Pages:</strong> `/admin`, `/user`, `/login`, `/`</li>
            <li><strong>UI:</strong> Tailwind CSS, Heroicons</li>
            <li><strong>Mock Data:</strong> Stored in <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">lib/mockusers.ts</code></li>
            <li><strong>Error Handling: </strong>401 Unauthorized responses redirect to /</li>
            <li><strong>Middleware: </strong>Validates the auth cookie and JWT on the server side before rendering protected routes</li>
          </ul>
        </section>

         {/* API Details */}
        <section>
          <h2 className="text-xl font-semibold mb-2">API Endpoints</h2>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
            <li><strong>api/auth/login :</strong> Validates username and password,sends valid response with cookie auth token</li>
            <li><strong>api/auth/logout :</strong> Logs out by clearing out the cookie auth token</li>
            <li><strong>api/auth/role :</strong> Returns the role of the user based on auth token in req.header.cookie</li>
            <li><strong>api/profile/profileDetails :</strong> Returns user details based on the role</li>
          </ul>
        </section>

        {/* Login Button */}
        <section className="text-center">
          <Link href="/login">
            <button className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-full text-lg font-medium transition-shadow shadow-md hover:shadow-lg">
              Go to Login
            </button>
          </Link>
        </section>
      </main>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-500 dark:text-gray-400 py-6 bg-white dark:bg-gray-800 mt-auto">
        &copy; {new Date().getFullYear()} Next Auth Dashboard · Built for assessment
      </footer>
    </div>
  );
}

export default function Home() {
  return (
    <div className="space-y-10">
      {/* Hero */}
      <section className="rounded-3xl border p-6 md:p-10 bg-gradient-to-b from-neutral-50 to-white dark:from-neutral-800 dark:to-neutral-900">
        <div className="max-w-3xl">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
            Welcome to <span className="text-blue-600 dark:text-blue-400">MyApp</span>
          </h1>
          <p className="mt-4 text-neutral-600 dark:text-neutral-300">
            Manage users, sign up new accounts, and control your app theme with a single click.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="/users"
              className="rounded-2xl bg-blue-600 px-5 py-2.5 text-white hover:bg-blue-700"
            >
              Go to Users
            </a>
            <a
              href="/sign_up"
              className="rounded-2xl border px-5 py-2.5 hover:bg-neutral-100 dark:hover:bg-neutral-800"
            >
              Create Account
            </a>
          </div>
        </div>
      </section>

      {/* Cards */}
      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-2xl border p-5 hover:shadow-md">
          <h3 className="text-lg font-semibold">Users Management</h3>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">
            View, edit, and delete users with real-time updates.
          </p>
          <a href="/users" className="mt-4 inline-block text-blue-600 dark:text-blue-400">
            Open →
          </a>
        </div>

        <div className="rounded-2xl border p-5 hover:shadow-md">
          <h3 className="text-lg font-semibold">Sign Up</h3>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">
            Register new users using your API and axios service layer.
          </p>
          <a href="/signup" className="mt-4 inline-block text-blue-600 dark:text-blue-400">
            Open →
          </a>
        </div>

        <div className="rounded-2xl border p-5 hover:shadow-md">
          <h3 className="text-lg font-semibold">Theme</h3>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">
            Toggle light, dark, or sync with your system preference.
          </p>
          <span className="mt-4 inline-block text-neutral-500 dark:text-neutral-400">
            Use the toggle in the header ↑
          </span>
        </div>
      </section>
    </div>
  );
}

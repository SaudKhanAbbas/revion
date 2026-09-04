export default function DashboardHeader({ user }) {
  return (
    <div className="mb-10">
      <p className="text-zinc-500">
        Welcome back
      </p>

      <h1 className="mt-2 text-5xl font-black tracking-tight">
        {user?.fullName}
      </h1>

      <p className="mt-4 max-w-2xl text-lg text-zinc-400">
        Here's everything happening with your motorcycles today.
      </p>
    </div>
  );
}

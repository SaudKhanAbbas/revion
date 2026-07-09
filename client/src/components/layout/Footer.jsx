export default function Footer() {
  return (
    <footer
      id="about"
      className="mt-32 border-t border-zinc-800 py-10 scroll-mt-24"
    >
      <div className="mx-auto max-w-5xl px-6">
        <h3 className="text-xl font-semibold text-white">
          About Revion
        </h3>

        <p className="mt-4 max-w-3xl text-zinc-400">
          Revion is an AI-powered motorcycle management
          platform that helps riders manage maintenance,
          expenses, diagnostics and overall motorcycle
          health from one modern dashboard.
        </p>

        <p className="mt-8 text-sm text-zinc-500">
          © 2026 Revion. Built with React, Express,
          Node.js and MongoDB.
        </p>
      </div>
    </footer>
  );
}
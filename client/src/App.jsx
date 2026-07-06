import Button from "./components/ui/Button";

function App() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center gap-8 px-6">
        <h1 className="text-6xl font-bold tracking-tight">
          Revion
        </h1>

        <div className="flex gap-4">
          <Button>Get Started</Button>

          <Button variant="secondary">
            Learn More
          </Button>

          <Button variant="danger">
            Delete
          </Button>
        </div>
      </div>
    </main>
  );
}

export default App;
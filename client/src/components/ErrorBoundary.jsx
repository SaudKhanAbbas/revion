import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError() {
    return {
      hasError: true,
    };
  }

  componentDidCatch(error, errorInfo) {
    console.error(error);
    console.error(errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 px-6 text-center">
          <h1 className="text-6xl font-bold text-white">
            Something went wrong
          </h1>

          <p className="mt-4 max-w-lg text-zinc-400">
            An unexpected error occurred.
            Please refresh the page.
          </p>

          <button
            onClick={() => window.location.reload()}
            className="mt-8 rounded-xl bg-white px-6 py-3 font-semibold text-black transition hover:bg-zinc-200"
          >
            Refresh
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
import React from "react";

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return <ServerError error={this.state.error} onRetry={() => this.setState({ hasError: false, error: null })} />;
    }
    return this.props.children;
  }
}

function ServerError({ error, onRetry }: { error: Error | null; onRetry: () => void }) {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="relative mb-8">
          <span className="text-[10rem] font-extrabold font-headline text-error/10 leading-none select-none">
            500
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="material-symbols-outlined text-7xl text-error/40">
              cloud_off
            </span>
          </div>
        </div>

        <h1 className="font-headline text-3xl font-extrabold text-on-surface mb-3">
          Something Went Wrong
        </h1>
        <p className="text-on-surface-variant text-lg mb-4 leading-relaxed">
          An unexpected error occurred. This could be a temporary server issue — try again in a moment.
        </p>

        {error && (
          <details className="mb-6 text-left bg-surface-container-highest p-4 rounded-lg">
            <summary className="text-sm font-bold text-on-surface-variant cursor-pointer">
              Technical Details
            </summary>
            <pre className="mt-2 text-xs text-error whitespace-pre-wrap break-words font-mono">
              {error.message}
            </pre>
          </details>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onRetry}
            className="px-8 py-3 bg-linear-to-r from-primary to-primary-dim text-on-primary font-bold rounded-full shadow-lg shadow-primary/20 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-sm">refresh</span>
            Try Again
          </button>
          <button
            onClick={() => (window.location.href = "/")}
            className="px-8 py-3 bg-surface-container text-on-primary-container font-bold rounded-full hover:brightness-95 transition-all"
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default ServerError;

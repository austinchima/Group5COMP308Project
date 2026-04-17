import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="relative mb-8">
          <span className="text-[10rem] font-extrabold font-headline text-primary/10 leading-none select-none">
            404
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="material-symbols-outlined text-7xl text-primary/40">
              explore_off
            </span>
          </div>
        </div>

        <h1 className="font-headline text-3xl font-extrabold text-on-surface mb-3">
          Page Not Found
        </h1>
        <p className="text-on-surface-variant text-lg mb-8 leading-relaxed">
          The page you're looking for doesn't exist or has been moved to a new
          location.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="px-8 py-3 bg-linear-to-r from-primary to-primary-dim text-on-primary font-bold rounded-full shadow-lg shadow-primary/20 active:scale-95 transition-all"
          >
            Go Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="px-8 py-3 bg-surface-container text-on-primary-container font-bold rounded-full hover:brightness-95 transition-all"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}

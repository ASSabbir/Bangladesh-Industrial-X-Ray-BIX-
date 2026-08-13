import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-primary text-white text-center px-4">
      <p className="text-accent font-bold text-sm tracking-widest uppercase mb-4">Error 500</p>
      <h1 className="text-5xl md:text-7xl font-bold mb-4">Something Went Wrong</h1>
      <p className="text-white/60 max-w-md mb-8">
        An unexpected error occurred on our end. Please try again shortly, or reach out if the problem persists.
      </p>
      <Link to="/" className="btn-primary">Back to Home</Link>
    </div>
  );
}

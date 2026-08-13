import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-primary text-white text-center px-4">
      <p className="text-accent font-bold text-sm tracking-widest uppercase mb-4">Error 404</p>
      <h1 className="text-5xl md:text-7xl font-bold mb-4">Page Not Found</h1>
      <p className="text-white/60 max-w-md mb-8">
        The page you're looking for doesn't exist or may have been moved. Let's get you back on track.
      </p>
      <Link to="/" className="btn-primary">Back to Home</Link>
    </div>
  );
}

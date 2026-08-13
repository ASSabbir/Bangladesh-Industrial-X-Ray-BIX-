import { Link } from "react-router-dom";

export default function Forbidden() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-primary text-white text-center px-4">
      <p className="text-accent font-bold text-sm tracking-widest uppercase mb-4">Error 403</p>
      <h1 className="text-5xl md:text-7xl font-bold mb-4">Access Forbidden</h1>
      <p className="text-white/60 max-w-md mb-8">
        You don't have permission to access this page. If you believe this is a mistake, please contact us.
      </p>
      <Link to="/" className="btn-primary">Back to Home</Link>
    </div>
  );
}

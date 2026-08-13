export default function Maintenance() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-primary text-white text-center px-4">
      <div className="w-14 h-14 rounded-full bg-white/10 text-white flex items-center justify-center font-bold text-sm border-2 border-accent mb-6">
        BIX
      </div>
      <p className="text-accent font-bold text-sm tracking-widest uppercase mb-4">Scheduled Maintenance</p>
      <h1 className="text-3xl md:text-5xl font-bold mb-4">We'll Be Right Back</h1>
      <p className="text-white/60 max-w-md">
        Our website is currently undergoing scheduled maintenance to serve you better. Please check back soon.
      </p>
    </div>
  );
}

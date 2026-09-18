export default function CategoryTabs({ tabs, active, onChange }) {
  return (
    <div className="flex flex-wrap gap-1 mb-10 border-b border-black/10">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={`relative px-5 py-3 text-sm font-medium overflow-hidden isolate transition-colors duration-200 ${
            active === tab ? "text-accent" : "text-textmuted hover:text-primary"
          }`}
        >
          <span
            className={`absolute inset-0 -z-10 bg-black/5 origin-left transition-transform duration-300 ease-out ${
              active === tab ? "scale-x-0" : "scale-x-0 hover:scale-x-100"
            }`}
          />
          {tab}
          <span
            className={`absolute left-3 right-3 -bottom-px h-[2px] bg-accent origin-left transition-transform duration-300 ${
              active === tab ? "scale-x-100" : "scale-x-0"
            }`}
          />
        </button>
      ))}
    </div>
  );
}
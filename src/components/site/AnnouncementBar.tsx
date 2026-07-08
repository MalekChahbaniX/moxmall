export function AnnouncementBar() {
  const items = [
    "Complimentary white-glove delivery across Tunisia",
    "New arrival — Meridian Blue Automatic",
    "Two-year international manufacturer warranty",
    "Private viewing appointments — Tunis boutique",
  ];
  const loop = [...items, ...items];
  return (
    <div className="bg-black text-white/80 overflow-hidden py-2.5 border-b border-white/5">
      <div className="flex gap-16 animate-marquee whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.32em]">
        {loop.map((t, i) => (
          <span key={i} className="flex items-center gap-16">
            {t}
            <span className="text-brand">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
export function AnnouncementBar() {
  const items = [
    "Free shipping across Tunisia over 200 TND",
    "New drop — Aeriform Chrono 01",
    "Members earn 3× points this week",
    "Editorial 04 · Now live",
  ];
  const loop = [...items, ...items];
  return (
    <div className="bg-ink text-canvas overflow-hidden py-2.5 border-b border-ink">
      <div className="flex gap-16 animate-marquee whitespace-nowrap font-mono text-[11px] uppercase tracking-widest">
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
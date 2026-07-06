import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/admin/AdminShell";

export const Route = createFileRoute("/admin/analytics")({
  head: () => ({ meta: [{ title: "Analytics — MOXMALL Admin" }, { name: "robots", content: "noindex" }] }),
  component: Page,
});

function Page() {
  return (
    <AdminShell eyebrow="Coming soon" title="Analytics" description="This module is part of the next MOXMALL admin release.">
      <div className="rounded-2xl border border-dashed border-line/80 bg-canvas p-16 text-center">
        <p className="eyebrow">In progress</p>
        <p className="mt-3 font-display text-2xl font-bold">Analytics module coming next</p>
        <p className="mt-2 text-sm text-ink-muted max-w-md mx-auto">
          Deeper reporting, campaigns, and configuration land in the next iteration of the MOXMALL admin.
        </p>
      </div>
    </AdminShell>
  );
}

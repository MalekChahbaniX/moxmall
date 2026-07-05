import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — MOXMALL" },
      { name: "description", content: "Reach the MOXMALL team — support, press, partnerships." },
      { property: "og:title", content: "Contact — MOXMALL" },
      { property: "og:description", content: "Get in touch with our team." },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <SiteLayout>
      <section className="mox-container py-20 grid md:grid-cols-2 gap-14">
        <div>
          <p className="eyebrow">Contact</p>
          <h1 className="mt-3 font-display text-5xl md:text-6xl font-extrabold tracking-tighter leading-[0.95]">
            Say hello. <br />
            We reply fast.
          </h1>
          <p className="mt-6 text-ink-muted max-w-md">
            Questions about an order, a product, a partnership? Send a note — a human on our
            team will get back within a business day.
          </p>
          <div className="mt-10 space-y-4 text-sm">
            <div className="flex items-center gap-3">
              <span className="grid size-9 place-items-center rounded-full bg-surface border border-line">
                <Mail className="size-4" />
              </span>
              hello@moxmall.tn
            </div>
            <div className="flex items-center gap-3">
              <span className="grid size-9 place-items-center rounded-full bg-surface border border-line">
                <Phone className="size-4" />
              </span>
              +216 71 000 000
            </div>
            <div className="flex items-center gap-3">
              <span className="grid size-9 place-items-center rounded-full bg-surface border border-line">
                <MapPin className="size-4" />
              </span>
              Rue de Marseille · Tunis, TN
            </div>
          </div>
        </div>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="rounded-3xl border border-line bg-surface/40 p-8 space-y-5"
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="First name" placeholder="Yasmine" />
            <Field label="Last name" placeholder="Ben Ali" />
          </div>
          <Field label="Email" type="email" placeholder="you@domain.com" />
          <Field label="Subject" placeholder="Order #MX-00423" />
          <div>
            <label className="eyebrow mb-2 block">Message</label>
            <textarea
              rows={5}
              placeholder="How can we help?"
              className="w-full rounded-2xl bg-canvas border border-line px-4 py-3 text-sm outline-none focus:border-ink transition-colors resize-none"
            />
          </div>
          <button className="w-full h-12 rounded-full bg-ink text-canvas text-[13px] font-medium hover:bg-brand transition-colors">
            Send message
          </button>
        </form>
      </section>
    </SiteLayout>
  );
}

function Field({
  label,
  ...rest
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="block">
      <span className="eyebrow mb-2 block">{label}</span>
      <input
        {...rest}
        className="w-full h-11 rounded-full bg-canvas border border-line px-4 text-sm outline-none focus:border-ink transition-colors"
      />
    </label>
  );
}
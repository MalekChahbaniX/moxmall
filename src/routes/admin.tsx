import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin — MOXMALL" },
      { name: "description", content: "MOXMALL admin dashboard." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: () => <Outlet />,
});

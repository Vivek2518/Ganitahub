export const metadata = {
  title: "Contact — GanitaHub",
  description: "Get in touch with the GanitaHub team.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-16 lg:px-8">
      <h1 className="text-3xl font-semibold">Contact</h1>
      <p className="mt-4 text-base text-muted-foreground">
        Questions or feedback? We'd love to hear from you.
      </p>
      <div className="mt-10 grid gap-8 sm:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="text-lg font-semibold">Support</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Send an email to <span className="text-foreground">support@ganitahub.com</span>
          </p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="text-lg font-semibold">Feedback</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Let us know what calculators you'd like to see next.
          </p>
        </div>
      </div>
    </div>
  );
}

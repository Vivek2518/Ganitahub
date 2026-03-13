export const metadata = {
  title: "About — GanitaHub",
  description: "Learn about GanitaHub and our mission to make calculators accessible.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-16 lg:px-8">
      <h1 className="text-3xl font-semibold">About GanitaHub</h1>
      <p className="mt-4 text-base text-muted-foreground">
        GanitaHub is a collection of free, easy-to-use calculators to help you make
        better financial and business decisions. Whether you're tracking loans,
        planning investments, or optimizing creator revenue, our goal is to make
        complex formulas easy to understand.
      </p>
      <section className="mt-10 space-y-4">
        <h2 className="text-2xl font-semibold">Our mission</h2>
        <p className="text-base text-muted-foreground">
          We believe that everyone should have access to tools that help them
          understand their finances and growth opportunities. GanitaHub is built
          to be fast, mobile-friendly, and privacy focused.
        </p>
      </section>
    </div>
  );
}

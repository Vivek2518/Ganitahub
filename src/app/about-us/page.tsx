export const metadata = {
  title: "About Us — InsightCalculator",
  description: "Learn about InsightCalculator and our mission to provide high-performance utility tools for complex calculations.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-16 lg:px-8">
      <h1 className="text-3xl font-semibold">About Us</h1>
      <p className="mt-4 text-base text-muted-foreground leading-relaxed">
        Welcome to InsightCalculator, a high-performance utility hub designed to bridge the gap between complex data and clear decisions. We believe that professional-grade tools should be fast, accurate, and accessible to everyone.
      </p>

      <section className="mt-10 space-y-4">
        <h2 className="text-2xl font-semibold">Our Story</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          InsightCalculator was built with a "performance-first" mindset. In an era of digital bloat, we saw a need for a streamlined infrastructure platform that delivers results without the friction. From financial forecasting to technical unit conversions, our suite of tools is engineered for those who value their time as much as their data.
        </p>
      </section>

      <section className="mt-10 space-y-4">
        <h2 className="text-2xl font-semibold">The Problem</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Most online calculators fall into two traps: they are either overly simplistic "toys" or they are buried under heavy, outdated interfaces that lag on mobile and desktop alike. Users often struggle with:
        </p>
        <ul className="list-disc list-inside space-y-2 text-base text-muted-foreground ml-4">
          <li>Inaccurate Logic: Tools that don't account for real-world variables.</li>
          <li>Performance Lag: Heavy sites that compromise speed for unnecessary visual flair.</li>
          <li>Hidden Costs: Platforms that gate-keep essential features behind paywalls.</li>
        </ul>
      </section>

      <section className="mt-10 space-y-4">
        <h2 className="text-2xl font-semibold">Our Mission & Vision</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          <strong>Our Mission</strong> is to provide a "short and sharp" digital toolkit that empowers users to perform complex calculations with total confidence and zero delay.
        </p>
        <p className="text-base text-muted-foreground leading-relaxed">
          <strong>Our Vision</strong> is to become the web's most reliable utility destination—a place where raw data is refined into actionable insight through world-class SEO and high-speed web architecture.
        </p>
      </section>

      <section className="mt-10 space-y-4">
        <h2 className="text-2xl font-semibold">Why Trust InsightCalculator?</h2>
        <ul className="list-disc list-inside space-y-2 text-base text-muted-foreground ml-4">
          <li><strong>Engineering Precision:</strong> Our algorithms undergo rigorous testing to ensure every decimal point is exactly where it needs to be.</li>
          <li><strong>Optimized for Speed:</strong> We've stripped away the "fluff" to ensure our platform loads instantly, giving you the reality-check you need, when you need it.</li>
          <li><strong>A "Living" Platform:</strong> We don't just launch and leave. We are constantly monitoring performance metrics and user feedback to refine our tools.</li>
          <li><strong>Transparent & Free:</strong> We believe utility should be universal. By utilizing non-intrusive ad partnerships, we are able to keep our most powerful features 100% free for our community.</li>
        </ul>
      </section>

      <section className="mt-10 space-y-4">
        <h2 className="text-2xl font-semibold">Our Commitment to Sustainability</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          To keep InsightCalculator free and continuously updated, we partner with premium advertisers. We are committed to ensuring that our ad integrations never compromise the site speed or user experience that defines our brand. Your support by using this platform allows us to keep innovating and building the next generation of digital tools.
        </p>
      </section>

      <blockquote className="mt-10 border-l-4 border-primary pl-6 italic text-lg text-muted-foreground">
        "Data doesn't lie, but it can be hard to find. We make it obvious."
      </blockquote>
    </div>
  );
}

export const metadata = {
  title: "Privacy Policy — InsightCalculator",
  description: "Our comprehensive privacy policy and data commitment for InsightCalculator.",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-16 lg:px-8">
      <h1 className="text-3xl font-semibold">Privacy Policy & Data Commitment</h1>
      <p className="mt-2 text-sm text-muted-foreground">Last Updated: March 2026</p>

      <p className="mt-4 text-base text-muted-foreground leading-relaxed">
        At InsightCalculator, we believe that your data belongs to you. Our platform is engineered with a privacy-first architecture, ensuring that utility never comes at the cost of your personal security. Unlike traditional web tools that capture and store user inputs for analytical mining, InsightCalculator is built to be a "silent operator" in your digital workflow.
      </p>

      <section className="mt-10 space-y-4">
        <h2 className="text-2xl font-semibold">1. Local-First Processing</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          The core of our platform's integrity lies in how we handle your calculations. We utilize client-side processing, meaning that every variable, formula, and result is computed locally within your own browser. No raw inputs—whether they are financial figures, technical dimensions, or personal projections—are ever transmitted to our servers. Once you close your tab, your data session effectively ceases to exist.
        </p>
      </section>

      <section className="mt-10 space-y-4">
        <h2 className="text-2xl font-semibold">2. Transparency in Monetization</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          To keep our high-performance tools free for everyone, InsightCalculator partners with third-party advertising networks. These partners may use cookies or web beacons to serve relevant content based on your browsing patterns. However, these advertisements function independently of our calculation engines. InsightCalculator does not share your specific calculation data with any advertising partners.
        </p>
      </section>

      <section className="mt-10 space-y-4">
        <h2 className="text-2xl font-semibold">3. Analytics & Site Optimization</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          We monitor high-level performance metrics and SEO health to ensure our infrastructure remains "short and sharp." This data is strictly functional—tracking site speed, bounce rates, and page stability—to provide you with a faster, more reliable experience. We do not track individual user identities.
        </p>
      </section>

      <div className="mt-10 p-6 bg-muted/50 rounded-lg">
        <p className="text-base text-muted-foreground leading-relaxed">
          By using InsightCalculator, you are choosing a platform that prioritizes speed, accuracy, and absolute data sovereignty.
        </p>
      </div>
    </div>
  );
}

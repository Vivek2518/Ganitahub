export const metadata = {
  title: "Privacy Policy — InsightCalculator",
  description: "Our privacy policy for InsightCalculator calculators.",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-16 lg:px-8">
      <h1 className="text-3xl font-semibold">Privacy Policy</h1>
      <p className="mt-4 text-base text-muted-foreground">
        InsightCalculator is built with privacy in mind. We do not collect or store any
        personal information from users of our calculators. All calculations run
        locally in your browser.
      </p>
      <section className="mt-10">
        <h2 className="text-2xl font-semibold">Data usage</h2>
        <p className="mt-2 text-base text-muted-foreground">
          No user data is transmitted to servers. Any inputs entered into the
          calculators stay on your device.
        </p>
      </section>
    </div>
  );
}

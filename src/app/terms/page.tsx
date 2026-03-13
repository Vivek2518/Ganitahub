export const metadata = {
  title: "Terms & Conditions — GanitaHub",
  description: "Terms and conditions for using GanitaHub.",
};

export default function TermsPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-16 lg:px-8">
      <h1 className="text-3xl font-semibold">Terms & Conditions</h1>
      <p className="mt-4 text-base text-muted-foreground">
        By using GanitaHub, you agree to use the calculators for informational
        purposes only. While we strive for accuracy, the results are estimates
        and should not replace professional advice.
      </p>
      <section className="mt-10">
        <h2 className="text-2xl font-semibold">Disclaimer</h2>
        <p className="mt-2 text-base text-muted-foreground">
          All calculators are provided as-is. We are not responsible for any
          decisions made based on the output.
        </p>
      </section>
    </div>
  );
}

import { CalculatorSearch } from "@/components/CalculatorSearch";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden px-4 py-16 md:py-20">
      <div className="mx-auto flex max-w-6xl flex-col gap-10">
        <div className="space-y-5 text-left">
          <p className="inline-flex rounded-full bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
            Powerful Online Calculators
          </p>

          <h1 className="text-3xl font-semibold leading-tight sm:text-5xl">
            Calculate Anything, Instantly
          </h1>

          <p className="max-w-2xl text-base text-muted-foreground sm:text-lg">
            Accurate calculations for any need. Fast, free, and no sign-up required. Your trusted calculator for work, school, and everyday use.
          </p>
        </div>

        <CalculatorSearch className="mt-8" />
      </div>
    </section>
  );
}
import { getPopularCalculators } from "@/data/calculators";
import { CalculatorCard } from "@/components/CalculatorCard";

export function PopularCalculators() {
  const popular = getPopularCalculators(6);

  return (
    <section className="space-y-4">
      <header className="flex flex-col gap-2">
        <h2 className="text-2xl font-semibold">Popular Calculators</h2>
        <p className="text-sm text-muted-foreground">
          These tools are frequently used by our community.
        </p>
      </header>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {popular.map((calculator) => (
          <CalculatorCard key={calculator.slug} calculator={calculator} />
        ))}
      </div>
    </section>
  );
}

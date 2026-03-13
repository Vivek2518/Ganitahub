import { getRecentCalculators } from "@/data/calculators";
import { CalculatorCard } from "@/components/CalculatorCard";

export function RecentCalculators() {
  const recent = getRecentCalculators(6);

  return (
    <section className="space-y-4">
      <header className="flex flex-col gap-2">
        <h2 className="text-2xl font-semibold">Recently Added</h2>
        <p className="text-sm text-muted-foreground">
          New calculators added to help you make smarter decisions.
        </p>
      </header>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {recent.map((calculator) => (
          <CalculatorCard key={calculator.slug} calculator={calculator} />
        ))}
      </div>
    </section>
  );
}

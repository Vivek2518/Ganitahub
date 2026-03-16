import { CalculatorCard } from "@/components/CalculatorCard";
import { CalculatorConfig } from "@/lib/loadCalculator";

interface CalculatorCategorySectionProps {
  title: string;
  calculators: CalculatorConfig[];
  showHeader?: boolean;
}

export function CalculatorCategorySection({ title, calculators, showHeader = true }: CalculatorCategorySectionProps) {
  if (calculators.length === 0) {
    return null;
  }

  return (
    <section className="space-y-4">
      {showHeader && (
        <header className="space-y-2">
          <h2 className="text-2xl font-semibold">{title}</h2>
          <p className="text-sm text-muted-foreground">
            Explore {calculators.length} calculator{calculators.length !== 1 ? "s" : ""} in this category.
          </p>
        </header>
      )}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {calculators.map((calculator) => (
          <CalculatorCard key={calculator.slug} calculator={calculator} />
        ))}
      </div>
    </section>
  );
}
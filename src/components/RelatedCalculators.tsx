import { getRelatedCalculators } from "@/data/calculators";
import { CalculatorCard } from "@/components/CalculatorCard";

type RelatedCalculatorsProps = {
  slug: string;
  category: string;
};

export function RelatedCalculators({ slug, category }: RelatedCalculatorsProps) {
  const related = getRelatedCalculators(slug, category as any, 4);

  if (related.length === 0) return null;

  return (
    <section className="space-y-4">
      <h3 className="text-xl font-semibold">Related calculators</h3>
      <div className="grid gap-4 sm:grid-cols-2">
        {related.map((calculator) => (
          <CalculatorCard key={calculator.slug} calculator={calculator} />
        ))}
      </div>
    </section>
  );
}

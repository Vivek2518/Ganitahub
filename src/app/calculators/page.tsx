import Link from "next/link";
import { CalculatorSearch } from "@/components/CalculatorSearch";
import { getCalculatorsGroupedByCategory } from "@/lib/getCalculatorsGroupedByCategory";
import { formatCategoryName, getCategoryOrder } from "@/lib/formatCategoryName";
import { getCategoryPath } from "@/lib/calculatorCategories";

const CANONICAL_DOMAIN = "https://www.insightcalculator.com";

export const metadata = {
  title: "All Financial Calculators — InsightCalculator",
  description: "Browse all available calculators for finance, taxation, investment, and more. Organized by categories for easy navigation.",
  keywords: "calculators, financial calculators, online tools, business calculators, investment calculators, tax calculators, loan calculators, free calculators",
  alternates: {
    canonical: `${CANONICAL_DOMAIN}/calculators`,
  },
};

export default async function CalculatorsPage() {
  const calculatorsByCategory = await getCalculatorsGroupedByCategory();
  const categoryOrder = getCategoryOrder();

  // Sort categories by the predefined order, then alphabetically for any new categories
  const sortedCategories = Object.keys(calculatorsByCategory).sort((a, b) => {
    const indexA = categoryOrder.indexOf(a);
    const indexB = categoryOrder.indexOf(b);

    // If both categories are in the order array, sort by their position
    if (indexA !== -1 && indexB !== -1) {
      return indexA - indexB;
    }

    // If only one is in the order array, prioritize it
    if (indexA !== -1) return -1;
    if (indexB !== -1) return 1;

    // Otherwise, sort alphabetically
    return a.localeCompare(b);
  });

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10 lg:px-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold">All Financial Calculators</h1>
        <p className="text-sm text-muted-foreground">
          Search, filter, and explore all tools available at InsightCalculator.
        </p>
      </header>

      <div className="mt-8">
        <CalculatorSearch />
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {sortedCategories.map((category) => {
          const calcCount = calculatorsByCategory[category]?.length ?? 0;
          return (
            <Link
              key={category}
              href={getCategoryPath(category)}
              className="rounded-2xl border border-border bg-card p-6 shadow-sm transition hover:border-primary hover:bg-primary/5"
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h3 className="text-lg font-semibold">
                    {formatCategoryName(category)}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Browse {calcCount} calculator{calcCount !== 1 ? "s" : ""} in this category.
                  </p>
                </div>
                <span className="rounded-full bg-muted px-3 py-1 text-xs font-semibold">
                  {calcCount}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}


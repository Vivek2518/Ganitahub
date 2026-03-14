import { CalculatorSearch } from "@/components/CalculatorSearch";
import { CalculatorCategorySection } from "@/components/CalculatorCategorySection";
import { getCalculatorsGroupedByCategory } from "@/lib/getCalculatorsGroupedByCategory";
import { formatCategoryName, getCategoryOrder } from "@/lib/formatCategoryName";

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

      <div className="mt-10 space-y-12">
        {sortedCategories.map((category) => (
          <CalculatorCategorySection
            key={category}
            title={formatCategoryName(category)}
            calculators={calculatorsByCategory[category]}
          />
        ))}
      </div>
    </div>
  );
}

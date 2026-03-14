import { getAllCalculators, CalculatorConfig } from "@/lib/loadCalculator";

function normalizeCategory(category: string): string {
  const key = category?.trim().toLowerCase();
  const map: Record<string, string> = {
    finance: "loan",
    savings: "personal-finance",
    government: "personal-finance",
    "creator economy": "business",
  };
  return map[key] || key || "general";
}

/**
 * Group calculators by their category
 * @returns Object with categories as keys and arrays of calculators as values
 */
export async function getCalculatorsGroupedByCategory(): Promise<Record<string, CalculatorConfig[]>> {
  const calculators = await getAllCalculators();

  return calculators.reduce((groups, calculator) => {
    const category = normalizeCategory(calculator.category);
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(calculator);
    return groups;
  }, {} as Record<string, CalculatorConfig[]>);
}

/**
 * Get calculators for a specific category
 * @param category - The category to filter by
 * @returns Array of calculators in the specified category
 */
export async function getCalculatorsByCategory(category: string): Promise<CalculatorConfig[]> {
  const grouped = await getCalculatorsGroupedByCategory();
  const normalized = normalizeCategory(category);
  return grouped[normalized] || [];
}
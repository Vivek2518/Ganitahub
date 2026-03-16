import { getAllCalculators, CalculatorConfig } from "@/lib/loadCalculator";
import { getCategoryForSlug } from "@/lib/calculatorCategories";

/**
 * Group calculators by their category
 * @returns Object with categories as keys and arrays of calculators as values
 */
export async function getCalculatorsGroupedByCategory(): Promise<Record<string, CalculatorConfig[]>> {
  const calculators = await getAllCalculators();

  return calculators.reduce((groups, calculator) => {
    const category = getCategoryForSlug(calculator.slug);
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
  const normalized = category?.trim().toLowerCase();
  return grouped[normalized] || [];
}
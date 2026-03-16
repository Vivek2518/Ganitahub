import { CALCULATOR_CATEGORY_DISPLAY_NAME, CATEGORY_ORDER } from '@/lib/calculatorCategories';

/**
 * Convert category keys into human-readable titles
 * @param category - The category key (e.g., 'investment')
 * @returns Human-readable category name (e.g., 'Investment Calculators')
 */
export function formatCategoryName(category: string): string {
  return (
    CALCULATOR_CATEGORY_DISPLAY_NAME[category as keyof typeof CALCULATOR_CATEGORY_DISPLAY_NAME] ||
    `${category.charAt(0).toUpperCase() + category.slice(1)} Calculators`
  );
}

/**
 * Get the order of categories for display
 * @returns Array of category keys in preferred display order
 */
export function getCategoryOrder(): string[] {
  return [...CATEGORY_ORDER];
}

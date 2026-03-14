/**
 * Convert category keys into human-readable titles
 * @param category - The category key (e.g., "investment")
 * @returns Human-readable category name (e.g., "Investment Calculators")
 */
export function formatCategoryName(category: string): string {
  const categoryMap: Record<string, string> = {
    investment: "Investment Calculators",
    loan: "Loan Calculators",
    tax: "Tax Calculators",
    business: "Business Calculators",
    "personal-finance": "Personal Finance Calculators",
    general: "General Calculators",
    // Map existing categories to new format
    Investment: "Investment Calculators",
    Finance: "Loan Calculators",
    Tax: "Tax Calculators",
    Savings: "Personal Finance Calculators",
    Government: "Personal Finance Calculators",
    "Creator Economy": "Creator Economy Calculators",
    Business: "Business Calculators",
  };

  return categoryMap[category] || `${category.charAt(0).toUpperCase() + category.slice(1)} Calculators`;
}

/**
 * Get the order of categories for display
 * @returns Array of category keys in preferred display order
 */
export function getCategoryOrder(): string[] {
  return [
    "Investment",
    "Finance",
    "Tax",
    "Savings",
    "Government",
    "Creator Economy",
    "Business",
  ];
}
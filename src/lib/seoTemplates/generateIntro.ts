import type { CalculatorConfig } from "@/lib/loadCalculator";

/**
 * Generates an introductory description for a calculator
 * Provides context on what the calculator does and why it's useful
 */
export function generateIntro(config: CalculatorConfig): string {
  const categoryLower = config.category.toLowerCase();
  const nameLower = config.name.toLowerCase();
  
  // Use the provided description as the main intro
  let intro = config.description;

  // Add context based on category
  const categoryContext = {
    "Finance": "financial planning",
    "Investment": "investment strategy",
    "Tax": "tax planning and compliance",
    "Savings": "savings management",
    "Government": "government benefits",
    "Creator Economy": "creator income calculation",
    "Business": "business planning",
  };

  const contextPhrase = categoryContext[config.category as keyof typeof categoryContext] || "financial calculation";

  // Expand intro with value proposition
  const fullIntro = `${intro}

This free online ${nameLower} helps you with ${contextPhrase}. Simply enter your values below, and the calculator will compute accurate results instantly. Whether you're planning finances, analyzing investments, or optimizing tax strategies, this tool provides quick, reliable calculations for everyday financial decisions.`;

  return fullIntro;
}

import type { CalculatorConfig, CalculatorField } from "@/lib/loadCalculator";

/**
 * Generates a detailed explanation of the calculator's formula
 * Breaks down the mathematical components and their meanings
 */
export function generateFormulaExplanation(config: CalculatorConfig): string {
  const { formula, fields, computationType } = config;
  
  // Create variable definitions based on fields
  const variables = fields.map(field => {
    const key = field.key;
    const label = field.label;
    const shortLabel = extractShortLabel(key, label);
    return `${shortLabel} = ${label}`;
  }).join("\n");

  // Create type-specific explanations
  const typeExplanations = getTypeExplanation(computationType, fields);

  // Construct the full explanation
  let explanation = `## Formula Breakdown\n\n`;
  
  if (formula) {
    explanation += `**Formula:** \`${formula}\`\n\n`;
  }
  
  explanation += `**Where:**\n${variables}\n\n`;
  
  if (typeExplanations) {
    explanation += typeExplanations;
  }

  return explanation;
}

/**
 * Extract a short variable name from field key/label
 * e.g., "monthly_investment" -> "P", "annual_rate" -> "r"
 */
function extractShortLabel(key: string, label: string): string {
  const shortLabels: Record<string, string> = {
    // Investment/Loan related
    "principal": "P",
    "amount": "A",
    "loan_amount": "P",
    "monthly_investment": "P",
    "monthly_amount": "P",
    "monthly_sip": "P",
    
    // Rate related
    "rate": "r",
    "annual_rate": "r",
    "interest_rate": "r",
    "expected_return": "r",
    "return_rate": "r",
    
    // Time related
    "tenure": "n",
    "years": "n",
    "months": "n",
    "time": "n",
    "duration": "n",
    
    // Tax/GST related
    "gst_rate": "g",
    "tax_rate": "t",
    "rate_percent": "r",
    
    // Results related (these shouldn't appear as variables)
    "result": "Result",
    "output": "Output",
  };

  return shortLabels[key] || key.charAt(0).toUpperCase();
}

/**
 * Generate computation type-specific explanations
 */
function getTypeExplanation(computationType: string, fields: CalculatorField[]): string {
  const explanations: Record<string, string> = {
    "emi": `**How It Works:**
The EMI (Equated Monthly Installment) is calculated by dividing the total loan amount into equal monthly payments over the specified tenure, accounting for the interest rate.

This ensures you pay a consistent amount each month, with the interest component decreasing over time as the principal reduces. Banks use this calculation to determine your monthly repayment obligations.`,

    "sip": `**How It Works:**
The SIP (Systematic Investment Plan) calculation assumes you invest a fixed amount regularly (usually monthly) for a specified period. The formula compounds your returns, accounting for both your contributions and the growth on those contributions.

Each monthly investment earns returns for different periods - earlier investments benefit from longer compounding, while later investments have shorter compounding periods.`,

    "compound": `**How It Works:**
Compound Interest is the interest earned on both your principal and previously accumulated interest. The more frequently interest compounds (yearly, quarterly, monthly, daily), the higher your final amount.

This follows the exponential growth formula, demonstrating why long-term investments with compound interest can significantly grow your wealth.`,

    "simple": `**How It Works:**
Simple Interest is calculated only on your principal amount. Unlike compound interest, you don't earn interest on accumulated interest. This is common in short-term loans and some savings products.

The calculation is straightforward: multiply your principal by the interest rate and the time period.`,

    "gst": `**How It Works:**
GST (Goods and Services Tax) is added to the base price of goods or services. The calculator determines the tax amount and the final price including the applicable GST rate.

Different products and services have different GST rates - essentials may have lower rates while luxury items have higher rates.`,

    "cagr": `**How It Works:**
CAGR (Compound Annual Growth Rate) measures the rate at which an investment grows annually, regardless of volatility. It shows the average annual return you would need to receive to reach your final amount from your initial investment.

This metric is useful for comparing investments with different growth patterns or comparing your portfolio's performance against benchmarks.`,

    "annuity": `**How It Works:**
An annuity calculation determines how much your regular contributions will grow to a specific future value. This is commonly used for fixed deposits, PPF, and pension planning.

The calculation accounts for the time value of money - contributions made earlier in the investment period grow more than those made near the end.`,

    "tax": `**How It Works:**
Income tax is calculated based on your total income and the applicable tax slabs. Different portions of your income are taxed at different rates, with deductions reducing your taxable income.

The progressive tax system ensures higher earners pay a larger proportion of their income in taxes while providing relief for lower income groups.`,

    "default": `**How It Works:**
The calculator processes your input values through the specified formula to compute accurate results. Each input contributes to the final calculation based on the mathematical relationships defined in the formula.`,
  };

  return explanations[computationType] || explanations["default"];
}

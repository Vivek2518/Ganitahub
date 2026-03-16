// Helper utilities for calculator categories and routing

export const CALCULATOR_CATEGORIES = [
  "loans",
  "investment",
  "savings",
  "tax",
  "government",
  "business",
  "creator",
  "utility",
  "income",
  "health",
] as const;

export type CalculatorCategoryKey = (typeof CALCULATOR_CATEGORIES)[number];

export const CALCULATOR_CATEGORY_DISPLAY_NAME: Record<CalculatorCategoryKey, string> = {
  loans: "Loan Calculators",
  investment: "Investment Calculators",
  savings: "Savings Calculators",
  tax: "Tax Calculators",
  government: "Government Scheme Calculators",
  business: "Business Calculators",
  creator: "Creator Economy Calculators",
  utility: "Utility Calculators",
  income: "Income & Salary Calculators",
  health: "Health Calculators",
};

// Mapping from calculator slug -> category key (based on SEO grouping rules)
const SLUG_TO_CATEGORY: Record<string, CalculatorCategoryKey> = {
  // loans
  "car-loan-emi": "loans",
  "home-loan-emi": "loans",
  "personal-loan-emi": "loans",
  "education-loan-emi": "loans",
  "loan-eligibility": "loans",
  "loan-interest-rate": "loans",
  "emi-calculator": "loans",
  "loan-amortization-calculator": "loans",
  "credit-card-emi-calculator": "loans",
  "interest-rate-calculator": "loans",
  "prepayment-calculator": "loans",

  // investment
  sip: "investment",
  "step-up-sip": "investment",
  swp: "investment",
  "mutual-fund-return": "investment",
  "lumpsum-investment": "investment",
  cagr: "investment",
  "stock-return-calculator": "investment",
  "dividend-yield-calculator": "investment",
  "retirement-corpus-calculator": "investment",
  "inflation-adjusted-return-calculator": "investment",
  "portfolio-return-calculator": "investment",

  // savings
  fd: "savings",
  rd: "savings",
  "compound-interest": "savings",
  inflation: "savings",

  // tax
  "income-tax": "tax",
  gst: "tax",
  hra: "tax",
  "capital-gains": "tax",
  tds: "tax",

  // government
  epf: "government",
  ppf: "government",
  nps: "government",
  gratuity: "government",

  // business
  "break-even": "business",
  "margin-calculator": "business",
  "saas-revenue": "business",
  "startup-runway": "business",
  "freelance-hourly-rate": "business",
  "income-split": "business",

  // creator
  "youtube-money": "creator",
  "youtube-thumbnail-ctr": "creator",
  "influencer-earnings": "creator",
  "affiliate-commission": "creator",
  "instagram-engagement": "creator",

  // utility
  "age-calculator": "utility",
  "average-calculator": "utility",
  "test-grade-calculator": "utility",
  "overtime-pay-calculator": "income",
  "salary-hike-calculator": "income",
  "take-home-salary-calculator": "income",
  "in-hand-salary-calculator": "income",
  "overtime-calculator": "income",
  "hourly-to-salary-calculator": "income",
  "percentage-calculator": "utility",
  "discount-calculator": "utility",
  "date-difference-calculator": "utility",
  "time-duration-calculator": "utility",
  "average-percentage-calculator": "utility",
  "ratio-calculator": "utility",

  // health
  "calorie-calculator": "health",
};

export function getCategoryForSlug(slug: string): CalculatorCategoryKey {
  const normalized = slug?.trim().toLowerCase();
  return SLUG_TO_CATEGORY[normalized] ?? "utility";
}

export function isValidCategory(category: string): category is CalculatorCategoryKey {
  const normalized = category?.trim().toLowerCase();
  return CALCULATOR_CATEGORIES.includes(normalized as CalculatorCategoryKey);
}

export function getCalculatorPathFromSlug(slug: string): string {
  const category = getCategoryForSlug(slug);
  return `/calculators/${category}/${slug}-calculator`;
}

export function getCategoryPath(category: string): string {
  const normalized = category?.trim().toLowerCase();
  return `/calculators/${normalized}`;
}

export function formatCategoryName(category: string): string {
  const key = category as CalculatorCategoryKey;
  if (CALCULATOR_CATEGORY_DISPLAY_NAME[key]) {
    return CALCULATOR_CATEGORY_DISPLAY_NAME[key];
  }
  // Fallback: capitalise and add "Calculators"
  const formatted = category
    .toString()
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
  return `${formatted} Calculators`;
}

export const CATEGORY_ORDER: CalculatorCategoryKey[] = [
  "loans",
  "investment",
  "savings",
  "tax",
  "government",
  "business",
  "creator",
  "utility",
  "income",
  "health",
];

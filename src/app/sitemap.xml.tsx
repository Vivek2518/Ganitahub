import { getAllCalculators } from "@/lib/loadCalculator";

const CANONICAL_DOMAIN = "https://www.insightcalculator.com";

export default async function sitemap() {
  const calculators = await getAllCalculators();
  const now = new Date().toISOString();

  const calculatorUrls = calculators.map((calculator) => ({
    url: `${CANONICAL_DOMAIN}${calculator.path}`,
    lastModified: now,
  }));

  return [
    {
      url: CANONICAL_DOMAIN,
      lastModified: now,
    },
    ...calculatorUrls,
  ];
}

const fs = require("fs");
const path = require("path");

const CANONICAL_DOMAIN = "https://www.insightcalculator.com";
const OUTPUT_PATH = path.join(process.cwd(), "public", "sitemap.xml");
const CALCULATORS_DIR = path.join(process.cwd(), "src", "calculators");

function buildSitemap(urls) {
  const header = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
  const footer = "</urlset>\n";

  const body = urls
    .map((url) => {
      return [
        "  <url>",
        `    <loc>${url}</loc>`,
        `    <lastmod>${new Date().toISOString()}</lastmod>`,
        "  </url>",
      ].join("\n");
    })
    .join("\n");

  return `${header}${body}\n${footer}`;
}

function getCalculatorCategory(slug) {
  const map = {
    "car-loan-emi": "loans",
    "home-loan-emi": "loans",
    "personal-loan-emi": "loans",
    "education-loan-emi": "loans",
    "loan-eligibility": "loans",
    "loan-interest-rate": "loans",
    sip: "investment",
    "step-up-sip": "investment",
    swp: "investment",
    "mutual-fund-return": "investment",
    "lumpsum-investment": "investment",
    cagr: "investment",
    fd: "savings",
    rd: "savings",
    "compound-interest": "savings",
    inflation: "savings",
    "income-tax": "tax",
    gst: "tax",
    hra: "tax",
    "capital-gains": "tax",
    tds: "tax",
    epf: "government",
    ppf: "government",
    nps: "government",
    gratuity: "government",
    "break-even": "business",
    "margin-calculator": "business",
    "saas-revenue": "business",
    "startup-runway": "business",
    "freelance-hourly-rate": "business",
    "income-split": "business",
    "youtube-money": "creator",
    "youtube-thumbnail-ctr": "creator",
    "influencer-earnings": "creator",
    "affiliate-commission": "creator",
    "instagram-engagement": "creator",
    "age-calculator": "utility",
    "average-calculator": "utility",
    "test-grade-calculator": "utility",
    "overtime-pay-calculator": "utility",
    "calorie-calculator": "health",
  };
  return map[slug] || "utility";
}

function getCalculatorUrls() {
  const files = fs.readdirSync(CALCULATORS_DIR);
  const slugs = files
    .filter((file) => file.endsWith(".json"))
    .map((file) => file.replace(/\.json$/, ""));

  const calculatorUrls = slugs.map((slug) => {
    const category = getCalculatorCategory(slug);
    return `${CANONICAL_DOMAIN}/calculators/${category}/${slug}-calculator`;
  });

  return [CANONICAL_DOMAIN, ...calculatorUrls];
}

function ensurePublicDir() {
  const publicPath = path.join(process.cwd(), "public");
  if (!fs.existsSync(publicPath)) {
    fs.mkdirSync(publicPath, { recursive: true });
  }
}

function main() {
  ensurePublicDir();
  const urls = getCalculatorUrls();
  const sitemapContent = buildSitemap(urls);

  fs.writeFileSync(OUTPUT_PATH, sitemapContent, "utf-8");
  console.log(`✅ Generated sitemap.xml with ${urls.length} URLs at ${OUTPUT_PATH}`);
}

main();

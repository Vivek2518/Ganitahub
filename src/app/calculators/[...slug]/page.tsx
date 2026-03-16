import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { CalculatorEngine } from "@/components/CalculatorEngine";
import { FavoriteToggle } from "@/components/FavoriteToggle";
import { RelatedCalculators } from "@/components/RelatedCalculators";
import { CalculatorIntro } from "@/components/CalculatorIntro";
import { CalculatorCategorySection } from "@/components/CalculatorCategorySection";
import { loadCalculator, getAllCalculators, getCalculatorsByCategory } from "@/lib/loadCalculator";
import type { CalculatorConfig } from "@/lib/loadCalculator";
import {
  generateIntro,
  generateFormulaExplanation,
  generateExample,
  generateFaqSections,
  formatFaqForSchema,
} from "@/lib/seoTemplates";
import { CALCULATOR_CATEGORIES, getCalculatorPathFromSlug, isValidCategory, formatCategoryName, getCategoryPath } from "@/lib/calculatorCategories";

const CANONICAL_DOMAIN = "https://www.insightcalculator.com";

function buildMetaDescription(config: CalculatorConfig): string {
  const base = config.description.trim();
  const cta = "Try it now for instant results!";
  const maxLen = 155;

  const full = `${base} ${cta}`.trim();
  if (full.length <= maxLen) return full;

  const truncated = full.slice(0, maxLen).replace(/\s+$/, "");
  return `${truncated}…`;
}

export async function generateStaticParams() {
  const calculators = await getAllCalculators();

  const calculatorParams = calculators.map((calculator) => {
    const parts = calculator.path.replace(/^\/calculators\//, "").split("/");
    return { slug: parts };
  });

  const categoryParams = [
    // Render category landing pages under /calculators/{category}
    ...CALCULATOR_CATEGORIES.map((category) => ({ slug: [category] })),
  ];

  return [...calculatorParams, ...categoryParams];
}

export const revalidate = 60; // ISR: regenerate pages every 60 seconds

export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
  const paramsObj = await params;
  const slugSegments = (paramsObj?.slug ?? []) as string[];

  // Category landing page (e.g. /calculators/utility)
  if (slugSegments.length === 1 && isValidCategory(slugSegments[0])) {
    const category = slugSegments[0];
    const canonicalUrl = `${CANONICAL_DOMAIN}${getCategoryPath(category)}`;
    const title = `${formatCategoryName(category)} | Insight Calculator`;
    const description = `Browse ${formatCategoryName(category)} with calculators to help you solve common problems and make better decisions.`;

    return {
      title,
      description,
      alternates: {
        canonical: canonicalUrl,
      },
      openGraph: {
        title,
        description,
        type: "website",
        url: canonicalUrl,
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
      },
    };
  }

  const calculatorSegment = slugSegments.length === 1 ? slugSegments[0] : slugSegments[1];
  const slug = (calculatorSegment ?? "").replace(/-calculator$/, "");
  const config = await loadCalculator(slug);

  if (!config) {
    return {
      title: "Calculator not found",
    };
  }

  const canonicalUrl = `${CANONICAL_DOMAIN}${config.path}`;
  const keywords = [
    "free online calculator",
    "financial calculator",
    config.name.toLowerCase(),
    config.category.toLowerCase(),
    "calculator tool",
    "business calculator",
    "investment calculator",
    "tax calculator",
    "loan calculator",
    "savings calculator",
  ].join(", ");

  const description = buildMetaDescription(config);

  return {
    title: `${config.name} – Free Online Calculator | Insight Calculator`,
    description,
    keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${config.name} – Free Online Calculator | Insight Calculator`,
      description,
      type: "website",
      url: canonicalUrl,
    },
    twitter: {
      card: "summary_large_image",
      title: `${config.name} – Free Online Calculator | Insight Calculator`,
      description,
    },
  };
}

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

export default async function CalculatorPage({ params }: PageProps) {
  const paramsObj = await params;
  const slugSegments = paramsObj.slug;

  if (!Array.isArray(slugSegments) || slugSegments.length === 0) {
    notFound();
  }

  // Category landing pages (e.g. /calculators/utility)
  if (slugSegments.length === 1 && isValidCategory(slugSegments[0])) {
    const category = slugSegments[0];
    const calculators = await getCalculatorsByCategory(category);

    const title = formatCategoryName(category);
    const description = `Browse ${title} to find the right tool for your needs.`;

    return (
      <CalculatorLayout title={title} description={description} aside={<> </>}>
        <CalculatorCategorySection title={title} calculators={calculators} />
      </CalculatorLayout>
    );
  }

  // legacy /calculators/{slug} -> redirect to new path
  if (slugSegments.length === 1) {
    const legacySlug = slugSegments[0];
    const calculatorPath = getCalculatorPathFromSlug(legacySlug);
    redirect(calculatorPath);
  }

  const [categorySegment, calculatorSegment] = slugSegments;
  const slug = calculatorSegment.replace(/-calculator$/, "");
  const config = await loadCalculator(slug);

  if (!config) {
    notFound();
  }

  // If URL category doesn't match canonical category, redirect.
  if (categorySegment !== config.category) {
    redirect(config.path);
  }

  const canonicalUrl = `${CANONICAL_DOMAIN}${config.path}`;

  const intro = generateIntro(config);
  const formulaExplanation = generateFormulaExplanation(config);
  const example = generateExample(config);
  const faqs = generateFaqSections(config);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": config.name,
    "description": config.description,
    "url": canonicalUrl,
    "applicationCategory": "FinanceApplication",
    "applicationSubCategory": config.category,
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
    },
    "creator": {
      "@type": "Organization",
      "name": "InsightCalculator",
      "url": CANONICAL_DOMAIN,
    },
    "featureList": config.fields.map((field) => field.label),
    "interactionStatistic": {
      "@type": "InteractionCounter",
      "interactionType": "https://schema.org/UseAction",
      "userInteractionCount": 1,
    },
  };

  const faqStructuredData = formatFaqForSchema(faqs);

  const softwareAppData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": config.name,
    "description": config.description,
    "applicationCategory": "Calculator",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareAppData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqStructuredData),
        }}
      />
      <CalculatorLayout
        title={config.name}
        description={config.description}
        actions={<FavoriteToggle slug={slug} />}
        aside={<RelatedCalculators slug={slug} category={config.category} />}
      >
        <CalculatorIntro config={config} />
        <CalculatorEngine config={config} />
      </CalculatorLayout>
    </>
  );
}

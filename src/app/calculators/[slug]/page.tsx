import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { CalculatorTool } from "@/components/CalculatorTool";
import { RelatedCalculators } from "@/components/RelatedCalculators";
import { getCalculatorBySlug, calculators } from "@/data/calculators";

export async function generateStaticParams() {
  return calculators.map((calculator) => ({
    slug: calculator.slug,
  }));
}

export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
  const { slug } = await params;
  const calculator = getCalculatorBySlug(slug);
  if (!calculator) {
    return {
      title: "Calculator not found",
    };
  }

  return {
    title: `${calculator.name} — GanitaHub`,
    description: calculator.description,
    openGraph: {
      title: `${calculator.name} — GanitaHub`,
      description: calculator.description,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${calculator.name} — GanitaHub`,
      description: calculator.description,
    },
  };
}

export default async function CalculatorPage({ params }: { params: any }) {
  const { slug } = await params;
  const calculator = getCalculatorBySlug(slug);

  if (!calculator) {
    notFound();
  }

  return (
    <CalculatorLayout
      title={calculator.name}
      description={calculator.description}
      aside={<RelatedCalculators slug={calculator.slug} category={calculator.category} />}
    >
      <CalculatorTool calculator={calculator} />
    </CalculatorLayout>
  );
}

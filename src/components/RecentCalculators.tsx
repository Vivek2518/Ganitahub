"use client";

import { calculators } from "@/data/calculators";
import Link from "next/link";
import { getCalculatorPathFromSlug } from "@/lib/calculatorCategories";

export function RecentCalculators() {
  const recent = [...calculators]
    .sort((a, b) => new Date(b.added).getTime() - new Date(a.added).getTime())
    .slice(0, 6);

  if (recent.length === 0) return null;

  return (
    <section className="space-y-4">
      <header className="flex flex-col gap-2">
        <h2 className="text-2xl font-semibold">Recently Added</h2>
        <p className="text-sm text-muted-foreground">
          New calculators added to help you make smarter decisions.
        </p>
      </header>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {recent.map((calculator) => (
          <Link
            key={calculator.slug}
            href={getCalculatorPathFromSlug(calculator.slug)}
            className="rounded-lg border bg-white p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <h3 className="font-semibold text-blue-600 mb-2 line-clamp-1">
              {calculator.name}
            </h3>
            <p className="text-sm text-gray-600 line-clamp-2">
              {calculator.description}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}

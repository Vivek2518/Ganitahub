import Link from "next/link";
import { categories, calculators } from "@/data/calculators";
import { Badge } from "@/components/ui/badge";

export function CategorySection() {
  return (
    <section className="space-y-6">
      <header className="flex flex-col gap-2">
        <h2 className="text-2xl font-semibold">Calculator Categories</h2>
        <p className="text-sm text-muted-foreground">
          Browse calculators by category to quickly find what you need.
        </p>
      </header>

      <div className="grid gap-6">
        {categories.map((category) => {
          const categoryItems = calculators
            .filter((calc) => calc.category === category.name)
            .slice(0, 4);

          return (
            <div
              key={category.name}
              className="rounded-2xl border border-border bg-card p-6 shadow-sm"
            >
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold">{category.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {category.description}
                    </p>
                  </div>
                  <Badge className="hidden sm:flex">{categoryItems.length} tools</Badge>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {categoryItems.map((calculator) => (
                    <Link
                      key={calculator.slug}
                      href={`/calculators/${calculator.slug}`}
                      className="rounded-xl border border-border bg-background/50 p-4 text-sm transition hover:border-primary hover:bg-primary/10"
                    >
                      <div className="font-medium">{calculator.name}</div>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {calculator.description}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-center">
        <Link
          href="/calculators"
          className="rounded-full border border-border bg-background/50 px-5 py-2 text-sm font-medium transition hover:bg-primary/10"
        >
          Browse all calculators
        </Link>
      </div>
    </section>
  );
}

import { CategorySection } from "@/components/CategorySection";
import { HeroSection } from "@/components/HeroSection";
import { PopularCalculators } from "@/components/PopularCalculators";
import { RecentCalculators } from "@/components/RecentCalculators";

export default function Home() {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-16 px-4 py-10 lg:px-8">
      <HeroSection />
      <PopularCalculators />
      <CategorySection />
      <RecentCalculators />
    </div>
  );
}

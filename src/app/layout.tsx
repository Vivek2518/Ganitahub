import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { FavoritesProvider } from "@/lib/favorites-context";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const CANONICAL_DOMAIN = "https://www.insightcalculator.com";

export const metadata: Metadata = {
  title: "InsightCalculator | All-In-One Tools & Calculators",
  description:
    "InsightCalculator is the ultimate all-in-one suite for precision tools. From professional Aerospace, Drone, and Physics engineering to daily Finance, Tax, and Creator Economy calculators—get instant, accurate results. Stop searching and start calculating with our fast, free, and mobile-friendly utility hub for pros.",
  keywords: "free online calculators, financial calculators, business calculators, investment tools, tax calculators, loan calculators, EMI calculator, SIP calculator, GST calculator, savings calculator, creator tools,online loan emi calculator, home loan emi calculator with prepayment, personal loan interest calculator, car loan emi calculator online, education loan emi calculator, loan eligibility calculator for students, loan interest rate calculator, emi calculator for home loan, loan amortization schedule calculator, credit card emi calculator, reducing balance interest calculator, home loan prepayment calculator, loan processing fee calculator, gold loan emi calculator, bank loan emi calculator, mortgage calculator online, debt to income ratio calculator, loan top up calculator, fixed deposit fd calculator, recurring deposit rd calculator, compound interest calculator online, inflation calculator 2026, recurring deposit interest calculator, monthly interest calculator, post office fd calculator, senior citizen fd calculator, simple interest vs compound interest calculator, monthly savings goal calculator, wealth gain calculator, bank interest calculator, real rate of return calculator, flat interest vs reducing rate calculator, loan balance transfer calculator, personal finance utility tools, total interest payable calculator, car loan affordability calculator, monthly budget calculator, credit card interest calculator, home loan tax benefit calculator, business loan emi tool, sip calculator for mutual funds, lumpsum investment calculator, mutual fund return estimator, cagr calculator online, swp calculator for monthly income, step up sip calculator, stock market return calculator, dividend yield calculator, retirement corpus planner, inflation adjusted return calculator, portfolio return calculator, ppf calculator 2026, nps calculator with tax benefit, gratuity calculator online, epf calculator, vpf calculator, elss return calculator, index fund return estimator, stock profit and loss calculator, investment doubling time calculator, rule of 72 calculator, sukanya samriddhi yojana calculator, atal pension yojana calculator, lic maturity calculator, annuity calculator, lumpsum vs sip calculator, multi asset return calculator, financial freedom calculator, monthly compounding calculator, stock average price calculator, drone flight time calculator, uav battery capacity converter, mah to wh converter, drone power consumption estimator, motor efficiency calculator for drones, energy density calculator, drone hover power requirement, battery c rating calculator, mach number calculator online, speed of sound at altitude calculator, air density calculator, pressure vs altitude calculator, temperature lapse rate calculator, lift force calculator, drag force calculator, lift to drag ratio calculator, stall speed calculator for aircraft, wing loading calculator, glide ratio calculator, thrust calculator online, thrust to weight ratio calculator, fuel consumption calculator for aircraft, specific impulse calculator, escape velocity calculator, orbital velocity calculator, orbital period calculator, circular orbit speed calculator, uav flight time prediction tool, quadcopter motor thrust calculator, brushless motor efficiency tool, drone endurance calculator, rc plane flight time calculator, aerospace engineering math tools, drone battery discharge rate tool, flight dynamics calculator, payload weight impact calculator, aircraft performance tools, rocket delta v calculator, atmospheric pressure at height calculator, aerospace physics calculators, income tax calculator 2026, gst calculator online, hra calculator with city, capital gains tax calculator, tds calculator online, youtube money calculator, instagram engagement rate calculator, youtube thumbnail ctr calculator, influencer earnings calculator, affiliate commission calculator, freelance hourly rate calculator, startup runway calculator, saas revenue calculator, break even point calculator, income split calculator, youtube income estimator, creator economy earnings tool, business profit margin calculator, startup burn rate calculator, content creator tax tool, gross profit vs net profit calculator, hourly to salary converter, contractor rate calculator, social media ads ROI calculator, brand deal price estimator, podcast revenue calculator, small business tax planner, invoice gst calculator, net salary calculator, startup valuation estimator, business growth rate calculator, cost per click calculator, e-commerce profit calculator, dropshipping margin calculator, subscription revenue predictor, calorie calculator for weight loss, bmi calculator online, bmi calculator for kids, bmi calculator for men, bmi calculator for women, bmi calculator for teens, weight loss goal calculator, geriatric bmi calculator, age calculator online, test grade calculator, average calculator, overtime pay calculator, margin calculator online, percentage calculator, discount calculator, date difference calculator, time duration calculator, average percentage calculator, ratio calculator online, body fat percentage calculator, ideal body weight tool, maintenance calories calculator, water intake calculator, bmr calculator, heart rate calculator, pregnancy due date calculator, ovulation tracker tool, macro nutrient calculator, protein intake calculator, carb to calorie converter, unit converter for health, age difference calculator, days between dates tool, working hours calculator, paycheck calculator, InsightCalculator official, all in one online calculator, best math tools for students, professional engineering calculators, comprehensive finance hub, fast mobile calculator online, accurate scientific calculators, digital utility tools, universal math solver, free calculation tools for creators, best startup calculators 2026, advanced aerospace utility, uav simulation math tools, everyday use online calculators, multi-category calculation platform, reliable math answers online, precision engineering tools, technical utility suite, browser based calculators, InsightCalculator free tools, online calculators for professionals, user-friendly math utilities, comprehensive calculation resources, fast and accurate online calculators, mobile-friendly calculation tools, all-in-one calculator platform, free online math solutions, InsightCalculator features, best online calculators 2026",
  alternates: {
    canonical: CANONICAL_DOMAIN,
  },
  robots: {
    index: true,
    follow: true,
  },
  authors: [{ name: "InsightCalculator", url: CANONICAL_DOMAIN }],
  publisher: "InsightCalculator",
  icons: {
    icon: "/logo.jpeg",
  },
  openGraph: {
    title: "InsightCalculator | All-In-One Tools & Calculators",
    description:
      "InsightCalculator is the ultimate all-in-one suite for precision tools. From professional Aerospace, Drone, and Physics engineering to daily Finance, Tax, and Creator Economy calculators—get instant, accurate results. Stop searching and start calculating with our fast, free, and mobile-friendly utility hub for pros.",
    type: "website",
    url: CANONICAL_DOMAIN,
    images: ["/logo.svg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "InsightCalculator | All-In-One Tools & Calculators",
    description:
      "InsightCalculator is the ultimate all-in-one suite for precision tools. From professional Aerospace, Drone, and Physics engineering to daily Finance, Tax, and Creator Economy calculators—get instant, accurate results. Stop searching and start calculating with our fast, free, and mobile-friendly utility hub for pros",
    images: ["/logo.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body className="min-h-screen bg-background text-foreground antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <FavoritesProvider>
            <div className="flex min-h-screen flex-col">
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </FavoritesProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

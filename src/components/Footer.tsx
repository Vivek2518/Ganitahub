import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background/80 py-10">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 sm:flex-row sm:items-start sm:justify-between lg:px-8">
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">GanitaHub</h3>
          <p className="max-w-sm text-sm text-muted-foreground">
            Smart online calculators for finance, business and creators—built with
            simplicity and accuracy in mind.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          <div className="space-y-2">
            <h4 className="text-sm font-semibold">Product</h4>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-foreground">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/calculators" className="hover:text-foreground">
                  Calculators
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="text-sm font-semibold">Company</h4>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>
                <Link href="/about" className="hover:text-foreground">
                  About
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-foreground">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="text-sm font-semibold">Legal</h4>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>
                <Link href="/privacy" className="hover:text-foreground">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-foreground">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="mt-10 border-t border-border py-6 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} GanitaHub. All rights reserved.
      </div>
    </footer>
  );
}

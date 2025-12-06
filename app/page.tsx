import { AuthButton } from "@/components/auth-button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Suspense } from "react";
import { Package } from "lucide-react";

async function CTAButton() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user ? (
    <Link
      href="/products"
      className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
    >
      Go to Dashboard
    </Link>
  ) : (
    <Link
      href="/auth/sign-up"
      className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
    >
      Get Started
    </Link>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <nav className="w-full flex justify-center border-b border-b-foreground/10 min-h-16">
        <div className="w-full max-w-5xl flex justify-between items-center p-3 px-4 sm:px-5 text-sm">
          <Link href={"/"} className="flex items-center gap-2 font-semibold text-sm sm:text-base">
            <Package className="h-5 w-5" />
            <span className="hidden sm:inline">Product Inventory</span>
            <span className="sm:hidden">Inventory</span>
          </Link>
          <Suspense>
            <AuthButton />
          </Suspense>
        </div>
      </nav>

      <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-5 py-8 sm:py-0">
        <div className="max-w-2xl text-center space-y-6">
          <div className="flex justify-center mb-6 sm:mb-8">
            <Package className="h-12 w-12 sm:h-16 sm:w-16 text-foreground/60" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Product Inventory System
          </h1>
          <p className="text-base sm:text-lg text-foreground/60">
            Manage your product catalog with ease. Track inventory, organize categories, and keep your business running smoothly.
          </p>
          <div className="flex justify-center pt-4">
            <Suspense
              fallback={
                <div className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground opacity-50">
                  Loading...
                </div>
              }
            >
              <CTAButton />
            </Suspense>
          </div>
        </div>
      </div>

      <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-8">
        <ThemeSwitcher />
      </footer>
    </main>
  );
}

import Link from "next/link";
import Image from "next/image";
import { MapIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <header className="px-4 lg:px-6 h-14 flex items-center max-w-7xl mx-auto w-full">
        <Link href="#" className="flex items-center justify-center" prefetch={false}>
          <MapIcon className="h-6 w-6" />
          <span className="sr-only">MemoryMap</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-lg font-medium hover:underline underline-offset-4" prefetch={false}>
            Features
          </Link>
          <Link href="#" className="text-lg font-medium hover:underline underline-offset-4" prefetch={false}>
            Pricing
          </Link>
          <Link href="#" className="text-lg font-medium hover:underline underline-offset-4" prefetch={false}>
            About
          </Link>
          <Link href="#" className="text-lg font-medium hover:underline underline-offset-4" prefetch={false}>
            Contact
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 max-w-7xl mx-auto">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-center">
                    Pin Your Memories on the Map with Memory Mapper.
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl text-center">
                    Create digital notes of your memories and pin them on an interactive map. Relive your experiences, share your stories, and never forget that special moment.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center">
                  <Link
                    href="#"
                    className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                    Sign Up
                  </Link>
                  <Link
                    href="#"
                    className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                    Explore MemoryMap
                  </Link>
                </div>
              </div>
              <div className="w-full max-w-[550px] mx-auto lg:order-last">
                <Image
                  src="/images/hero-image.png"
                  width={550}
                  height={550}
                  alt="MemoryMap Hero Image"
                  className="w-full h-auto aspect-square object-cover rounded-xl"
                  priority
                />
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6 max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Features</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* Feature items */}
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 border-t">
          <div className="container px-4 md:px-6 max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">How It Works</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {/* How it works steps */}
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6 max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Testimonials</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* Testimonial items */}
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 border-t">
          <div className="container px-4 md:px-6 max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Pricing</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {/* Pricing plans */}
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6 max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">FAQ</h2>
            <div className="grid gap-6">
              {/* FAQ items */}
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 border-t">
          <div className="container px-4 md:px-6 max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Contact Us</h2>
            <form className="grid gap-6">
              {/* Contact form fields */}
            </form>
          </div>
        </section>
      </main>
      <footer className="w-full py-6 border-t">
        <div className="container px-4 md:px-6 max-w-7xl mx-auto flex flex-col gap-2 sm:flex-row items-center">
          <p className="text-xs text-muted-foreground">&copy; 2024 MemoryMap. All rights reserved.</p>
          <nav className="sm:ml-auto flex gap-4 sm:gap-6">
            <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
              Terms of Service
            </Link>
            <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
              Privacy
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}

import Link from "next/link";
import { MapIcon } from 'lucide-react';
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center justify-between max-w-7xl mx-auto w-full">
      <Link href="#" className="flex items-center justify-center" prefetch={false}>
        <MapIcon className="h-6 w-6" />
        <span className="sr-only">MemoryMap</span>
      </Link>
      <Link href="/login" passHref>
        <Button variant="outline">Log In</Button>
      </Link>
    </header>
  );
}

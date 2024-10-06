import Link from "next/link";
import { MapIcon } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export function Header() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement login logic here
    console.log('Login attempted with:', email, password);
  };

  return (
    <header className="px-4 lg:px-6 h-14 flex items-center justify-between max-w-7xl mx-auto w-full">
      <Link href="#" className="flex items-center justify-center" prefetch={false}>
        <MapIcon className="h-6 w-6" />
        <span className="sr-only">MemoryMap</span>
      </Link>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Log In</Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <form onSubmit={handleLogin} className="space-y-4">
            <h4 className="font-medium leading-none">Log In</h4>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button type="submit" className="w-full">Log In</Button>
          </form>
        </PopoverContent>
      </Popover>
    </header>
  );
}
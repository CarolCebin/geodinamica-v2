"use client"

import Link from "next/link"
import { Globe, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Header() {
  return (
    <header className="bg-primary text-primary-foreground shadow-md">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
            <Globe className="h-6 w-6" />
            <span className="text-xl font-bold">Geodinâmica</span>
          <div className="hidden md:flex space-x-4">
            <Link href="/learn" className="hover:underline">
              Learn
            </Link>
            <Link href="/about" className="hover:underline">
              About
            </Link>
            <Link href="/contact" className="hover:underline">
              Contact
            </Link>
          </div>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Open menu</span>
          </Button>
        </nav>
      </div>
    </header>
  )
}

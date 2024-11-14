"use client"

import Link from "next/link"
import { Book } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-muted">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Book className="h-6 w-6" />
            <span className="text-sm font-semibold">© 2024 Geodynamics. All rights reserved.</span>
          </div>
          <nav className="flex space-x-4">
            <Link href="/privacy" className="text-sm hover:underline">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-sm hover:underline">
              Terms of Service
            </Link>
            <Link href="/faq" className="text-sm hover:underline">
              FAQ
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}

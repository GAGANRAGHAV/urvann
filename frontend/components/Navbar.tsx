"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X, Leaf } from "lucide-react"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/catalog", label: "Catalog" },
    { href: "/categories", label: "Categories" },
    { href: "/admin", label: "Admin" },
  ]

  return (
    <nav className="bg-[#072524] border-b border-[#e2f89c]/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="bg-[#e2f89c] p-2 rounded-lg group-hover:bg-[#e2f89c]/90 transition-colors">
              <Leaf className="h-6 w-6 text-[#072524]" />
            </div>
            <span className="text-xl font-bold text-[#fcfaf5] group-hover:text-[#e2f89c] transition-colors">
              Urvann
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[#fcfaf5] hover:text-[#e2f89c] transition-colors font-medium"
              >
                {link.label}
              </Link>
            ))}
            <button className="bg-[#e2f89c] text-[#072524] px-4 py-2 rounded-lg font-mono font-medium hover:bg-[#e2f89c]/90 transition-colors">
              Get Started
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-[#fcfaf5] hover:text-[#e2f89c] transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 border-t border-[#e2f89c]/20">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block px-3 py-2 text-[#fcfaf5] hover:text-[#e2f89c] hover:bg-[#e2f89c]/10 rounded-md transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <button className="w-full mt-4 bg-[#e2f89c] text-[#072524] px-4 py-2 rounded-lg font-mono font-medium hover:bg-[#e2f89c]/90 transition-colors">
                Get Started
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

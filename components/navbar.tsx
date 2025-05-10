"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Simulate authentication state (would come from a real auth system)
  const isAuthenticated = false

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 py-4 ${
        isScrolled ? "bg-white/80 backdrop-blur-md shadow-sm" : "bg-white"
      }`}
    >
      <div className="container px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-extrabold text-primary">HU</span>
            <span className="text-xl font-medium ml-1 hidden md:inline">Informatics</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <NavLink href="/" active>
              Home
            </NavLink>
            <NavLink href="/resources">Resources</NavLink>
            <NavLink href="/forums">Forums</NavLink>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary rounded-md transition-colors relative group">
                  <span className="flex items-center">
                    About
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </span>
                  <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-primary transform -translate-x-1/2 transition-all duration-300 group-hover:w-3/5"></span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/about">About Us</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/contact">Contact</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/faq">FAQ</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Authentication Buttons */}
          <div className="hidden md:flex items-center space-x-2">
            {isAuthenticated ? (
              <>
                <Button asChild variant="outline" size="sm">
                  <Link href="/dashboard">Dashboard</Link>
                </Button>
                <Button asChild variant="ghost" size="sm">
                  <Link href="/logout">Sign Out</Link>
                </Button>
              </>
            ) : (
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="flex items-center">
                      Sign In <ChevronDown className="ml-1 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href="/student/login">Student</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/instructor/login">Instructor</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/admin/login">Admin</Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="sm" className="flex items-center">
                      Register <ChevronDown className="ml-1 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href="/student/register">Student</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/instructor/register">Instructor</Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-2">
              <MobileNavLink href="/">Home</MobileNavLink>
              <MobileNavLink href="/resources">Resources</MobileNavLink>
              <MobileNavLink href="/forums">Forums</MobileNavLink>
              <MobileNavLink href="/about">About Us</MobileNavLink>
              <MobileNavLink href="/contact">Contact</MobileNavLink>
              <MobileNavLink href="/faq">FAQ</MobileNavLink>

              <div className="pt-4 border-t border-gray-200">
                {isAuthenticated ? (
                  <>
                    <Button asChild className="w-full mb-2">
                      <Link href="/dashboard">Dashboard</Link>
                    </Button>
                    <Button asChild variant="outline" className="w-full">
                      <Link href="/logout">Sign Out</Link>
                    </Button>
                  </>
                ) : (
                  <>
                    <div className="text-sm font-medium text-gray-500 mb-2">Sign In As:</div>
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      <Button asChild variant="outline" size="sm">
                        <Link href="/student/login">Student</Link>
                      </Button>
                      <Button asChild variant="outline" size="sm">
                        <Link href="/instructor/login">Instructor</Link>
                      </Button>
                      <Button asChild variant="outline" size="sm">
                        <Link href="/admin/login">Admin</Link>
                      </Button>
                    </div>

                    <div className="text-sm font-medium text-gray-500 mb-2">Register As:</div>
                    <div className="grid grid-cols-2 gap-2">
                      <Button asChild size="sm">
                        <Link href="/student/register">Student</Link>
                      </Button>
                      <Button asChild size="sm">
                        <Link href="/instructor/register">Instructor</Link>
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

// Desktop Navigation Link
function NavLink({ href, active, children }) {
  return (
    <Link
      href={href}
      className={`px-4 py-2 text-sm font-medium rounded-md transition-colors relative group ${
        active ? "text-primary" : "text-gray-700 hover:text-primary"
      }`}
    >
      <span>{children}</span>
      <span
        className={`absolute bottom-0 left-1/2 h-0.5 bg-primary transform -translate-x-1/2 transition-all duration-300 ${
          active ? "w-3/5" : "w-0 group-hover:w-3/5"
        }`}
      ></span>
    </Link>
  )
}

// Mobile Navigation Link
function MobileNavLink({ href, children }) {
  return (
    <Link
      href={href}
      className="px-4 py-2 text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md"
    >
      {children}
    </Link>
  )
}

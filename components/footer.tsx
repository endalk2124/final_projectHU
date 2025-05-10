import Link from "next/link"
import { Facebook, Twitter, Github } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white pt-16 pb-8">
      <div className="container px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Logo and Description */}
          <div>
            <div className="flex items-center mb-4">
              <span className="text-2xl font-extrabold text-white">HU</span>
              <span className="text-xl font-medium ml-1">Informatics</span>
            </div>
            <p className="text-slate-300 mb-4">
              Hawassa University's Faculty of Informatics modern learning and collaboration platform.
            </p>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-slate-700 pb-2">Resources</h3>
            <ul className="space-y-2">
              <FooterLink href="/resources">Learning Materials</FooterLink>
              <FooterLink href="/resources/department/cs">Computer Science</FooterLink>
              <FooterLink href="/resources/department/is">Information Systems</FooterLink>
              <FooterLink href="/resources/department/it">Information Technology</FooterLink>
            </ul>
          </div>

          {/* Community Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-slate-700 pb-2">Community</h3>
            <ul className="space-y-2">
              <FooterLink href="/forums">Discussion Forums</FooterLink>
              <FooterLink href="/chat">Live Chat Rooms</FooterLink>
              <FooterLink href="/events">Events</FooterLink>
              <FooterLink href="/feedback">Feedback</FooterLink>
            </ul>
          </div>

          {/* Information Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-slate-700 pb-2">Information</h3>
            <ul className="space-y-2">
              <FooterLink href="/about">About Us</FooterLink>
              <FooterLink href="/contact">Contact</FooterLink>
              <FooterLink href="/privacy">Privacy Policy</FooterLink>
              <FooterLink href="/terms">Terms of Use</FooterLink>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-slate-700 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-400 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Hawassa University Faculty of Informatics. All rights reserved.
          </p>

          <div className="flex space-x-4">
            <SocialLink href="#" icon={<Facebook className="h-5 w-5" />} label="Facebook" />
            <SocialLink href="#" icon={<Twitter className="h-5 w-5" />} label="Twitter" />
            <SocialLink href="#" icon={<Github className="h-5 w-5" />} label="GitHub" />
          </div>
        </div>
      </div>
    </footer>
  )
}

// Footer Link Component
function FooterLink({ href, children }) {
  return (
    <li>
      <Link href={href} className="text-slate-300 hover:text-white transition-colors">
        {children}
      </Link>
    </li>
  )
}

// Social Link Component
function SocialLink({ href, icon, label }) {
  return (
    <Link href={href} className="text-slate-400 hover:text-white transition-colors" aria-label={label}>
      {icon}
    </Link>
  )
}

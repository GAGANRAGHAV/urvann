import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-[#fcfaf5]/5 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold text-[#e2f89c] mb-4 font-mono">🌱 Urvann</h3>
            <p className="text-[#fcfaf5]/80 mb-6 max-w-md">
              Your trusted partner in creating beautiful, healthy green spaces. We provide premium plants with expert
              care guidance.
            </p>
            <div className="flex space-x-4">
              <div className="w-10 h-10 bg-[#e2f89c]/20 rounded-full flex items-center justify-center cursor-pointer hover:bg-[#e2f89c]/30 transition-colors">
                <span className="text-[#e2f89c]">📧</span>
              </div>
              <div className="w-10 h-10 bg-[#e2f89c]/20 rounded-full flex items-center justify-center cursor-pointer hover:bg-[#e2f89c]/30 transition-colors">
                <span className="text-[#e2f89c]">📱</span>
              </div>
              <div className="w-10 h-10 bg-[#e2f89c]/20 rounded-full flex items-center justify-center cursor-pointer hover:bg-[#e2f89c]/30 transition-colors">
                <span className="text-[#e2f89c]">🌐</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-[#fcfaf5] mb-4 font-mono">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/catalog" className="text-[#fcfaf5]/80 hover:text-[#e2f89c] transition-colors">
                  Browse Plants
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-[#fcfaf5]/80 hover:text-[#e2f89c] transition-colors">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/care-guide" className="text-[#fcfaf5]/80 hover:text-[#e2f89c] transition-colors">
                  Care Guide
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-[#fcfaf5]/80 hover:text-[#e2f89c] transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-[#fcfaf5] mb-4 font-mono">Support</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/contact" className="text-[#fcfaf5]/80 hover:text-[#e2f89c] transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-[#fcfaf5]/80 hover:text-[#e2f89c] transition-colors">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-[#fcfaf5]/80 hover:text-[#e2f89c] transition-colors">
                  Returns
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-[#fcfaf5]/80 hover:text-[#e2f89c] transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#fcfaf5]/10 pt-8 text-center">
          <p className="text-[#fcfaf5]/60">© 2025 Urvann Plant Store. Built with 💚 for plant lovers everywhere.</p>
        </div>
      </div>
    </footer>
  )
}

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-[#e2f89c] blur-3xl"></div>
        <div className="absolute bottom-40 right-20 w-48 h-48 rounded-full bg-[#e2f89c] blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 rounded-full bg-[#e2f89c] blur-2xl"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto text-center">
        <div className="mb-6">
          <span className="inline-block px-4 py-2 bg-[#e2f89c] text-[#072524] text-sm font-mono font-semibold rounded-full">
            🌱 Premium Plant Collection
          </span>
        </div>

        <h1 className="text-5xl md:text-7xl font-medium mb-8 tracking-tighter">
          Plant store software for
          <br />
          <span className="text-[#e2f89c]">peoples who hate wasting time</span>
        </h1>   

        <p className="text-xl md:text-xl text-[#fcfaf5]/80 mb-12 max-w-3xl mx-auto leading-relaxed">
          Urvann is your one-stop online nursery for plants, planters, gardening accessories, and tools. Order fresh plants and get free home delivery on the next day!
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/catalog">
            <Button className="bg-[#e2f89c] text-[#072524] hover:bg-[#d4e85c] font-mono font-semibold px-8 py-6 text-lg rounded-xl">
              Browse Plants
            </Button>
          </Link>
          <Link href="/admin">
            <Button
              variant="outline"
              className="border-[#fcfaf5]/30 text-[#fcfaf5] hover:bg-[#fcfaf5]/10 font-mono px-8 py-6 text-lg rounded-xl bg-transparent"
            >
              Admin Panel
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

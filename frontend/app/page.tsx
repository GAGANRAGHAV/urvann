import Hero from "@/components/Hero"
import FeaturedPlants from "@/components/FeaturedPlants"
import Categories from "@/components/Categories"
import Stats from "@/components/Stats"
import Footer from "@/components/Footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <FeaturedPlants />
      <Categories />
      <Stats />
      <Footer />
    </main>
  )
}

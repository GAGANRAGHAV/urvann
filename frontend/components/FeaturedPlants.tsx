"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { api, mockPlants } from "@/lib/api"

interface Plant {
  _id: string
  name: string
  price: number
  categories: string[]
  inStock: boolean
  image: string
}

export default function FeaturedPlants() {
  const [plants, setPlants] = useState<Plant[]>([])
  const [loading, setLoading] = useState(true)
  const [usingMockData, setUsingMockData] = useState(false)

  useEffect(() => {
    fetchFeaturedPlants()
  }, [])

  const fetchFeaturedPlants = async () => {
    try {
      const healthResponse = await api.health()
      if (!healthResponse.ok) throw new Error("API not available")

      const response = await api.getPlants(new URLSearchParams({ limit: "6", sort: "-createdAt" }))
      if (!response.ok) throw new Error("Failed to fetch plants")

      const data = await response.json()
      setPlants(data.items)
      setUsingMockData(false)
    } catch (error) {
      console.log("API not available, using mock data")
      setPlants(mockPlants.slice(0, 6))
      setUsingMockData(true)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Featured Plants</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-[#fcfaf5]/5 rounded-2xl p-6 animate-pulse">
                <div className="h-48 bg-[#fcfaf5]/10 rounded-xl mb-4"></div>
                <div className="h-6 bg-[#fcfaf5]/10 rounded mb-2"></div>
                <div className="h-4 bg-[#fcfaf5]/10 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Featured Plants</h2>
          <p className="text-xl text-[#fcfaf5]/80 max-w-2xl mx-auto">
            Discover our handpicked selection of premium plants perfect for any space
          </p>
          
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plants.map((plant) => (
            <Link key={plant._id} href={`/plant/${plant._id}`}>
              <Card className="bg-[#fcfaf5]/5 border-[#fcfaf5]/10 hover:bg-[#fcfaf5]/10 transition-all duration-300 group cursor-pointer">
                <CardContent className="p-6">
                  <div className="relative h-48 mb-4 rounded-xl overflow-hidden bg-[#fcfaf5]/10">
                    {plant.image ? (
                      <Image
                        src={plant.image || "/placeholder.svg"}
                        alt={plant.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-6xl">🌱</div>
                    )}
                    {!plant.inStock && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <span className="text-white font-semibold">Out of Stock</span>
                      </div>
                    )}
                  </div>

                  <h3 className="text-xl font-semibold mb-2 text-[#fcfaf5]">{plant.name}</h3>
                  <p className="text-2xl font-bold text-[#e2f89c] mb-3">₹{plant.price}</p>

                  <div className="flex flex-wrap gap-2">
                    {plant.categories.slice(0, 2).map((category) => (
                      <Badge
                        key={category}
                        variant="secondary"
                        className="bg-[#e2f89c]/20 text-[#e2f89c] font-mono text-xs"
                      >
                        {category}
                      </Badge>
                    ))}
                    {plant.categories.length > 2 && (
                      <Badge variant="secondary" className="bg-[#fcfaf5]/20 text-[#fcfaf5] font-mono text-xs">
                        +{plant.categories.length - 2}
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/catalog">
            <button className="bg-[#e2f89c] text-[#072524] hover:bg-[#d4e85c] font-mono font-semibold px-8 py-4 rounded-xl transition-colors">
              View All Plants
            </button>
          </Link>
        </div>
      </div>
    </section>
  )
}

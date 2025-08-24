"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { api, mockCategories } from "@/lib/api"

const categoryIcons: { [key: string]: string } = {
  indoor: "🏠",
  outdoor: "🌳",
  succulent: "🌵",
  "air purifying": "💨",
  flowering: "🌸",
  medicinal: "🌿",
  "home decor": "🎨",
  bonsai: "🌲",
  "low maintenance": "✨",
}

export default function Categories() {
  const [categories, setCategories] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [usingMockData, setUsingMockData] = useState(false)

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const healthResponse = await api.health()
      if (!healthResponse.ok) throw new Error("API not available")

      const response = await api.getCategories()
      if (!response.ok) throw new Error("Failed to fetch categories")

      const data = await response.json()
      setCategories(data)
      setUsingMockData(false)
    } catch (error) {
      console.log("API not available, using mock data")
      setCategories(mockCategories)
      setUsingMockData(true)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section className="py-20 px-4 bg-[#fcfaf5]/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Shop by Category</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-[#fcfaf5]/5 rounded-2xl p-6 animate-pulse">
                <div className="h-16 bg-[#fcfaf5]/10 rounded mb-4"></div>
                <div className="h-4 bg-[#fcfaf5]/10 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 px-4 bg-[#fcfaf5]/5">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Shop by Category</h2>
          <p className="text-xl text-[#fcfaf5]/80 max-w-2xl mx-auto">
            Find the perfect plants for your specific needs and preferences
          </p>
          
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link key={category} href={`/catalog?category=${encodeURIComponent(category)}`}>
              <Card className="bg-[#072524] border-[#fcfaf5]/10 hover:bg-[#fcfaf5]/10 transition-all duration-300 group cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {categoryIcons[category.toLowerCase()] || "🌱"}
                  </div>
                  <h3 className="font-semibold text-[#fcfaf5] capitalize font-mono">{category}</h3>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

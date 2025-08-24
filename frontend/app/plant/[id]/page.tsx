"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

interface Plant {
  _id: string
  name: string
  price: number
  categories: string[]
  inStock: boolean
  image: string
  createdAt: string
  updatedAt: string
}

export default function PlantDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [plant, setPlant] = useState<Plant | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    if (params.id) {
      fetchPlant(params.id as string)
    }
  }, [params.id])

  const fetchPlant = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:4000/api/plants/${id}`)
      if (!response.ok) {
        throw new Error("Plant not found")
      }
      const data = await response.json()
      setPlant(data)
    } catch (error) {
      console.error("Error fetching plant:", error)
      setError("Plant not found")
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#072524] text-[#fcfaf5] flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-pulse">🌱</div>
          <div className="text-xl font-mono text-[#e2f89c]">Loading plant details...</div>
        </div>
      </div>
    )
  }

  if (error || !plant) {
    return (
      <div className="min-h-screen bg-[#072524] text-[#fcfaf5] flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🚫</div>
          <h1 className="text-2xl font-semibold mb-4">Plant Not Found</h1>
          <p className="text-[#fcfaf5]/80 mb-6">The plant you're looking for doesn't exist.</p>
          <Link href="/catalog">
            <Button className="bg-[#e2f89c] text-[#072524] hover:bg-[#d4e85c] font-mono">Back to Catalog</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#072524] text-[#fcfaf5]">
      {/* Header */}
      <header className="py-6 px-4 border-b border-[#fcfaf5]/10">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-[#e2f89c] font-mono">
            🌱 Urvann
          </Link>
          <div className="flex space-x-4">
            <Link href="/catalog">
              <Button
                variant="outline"
                className="border-[#fcfaf5]/30 text-[#fcfaf5] hover:bg-[#fcfaf5]/10 font-mono bg-transparent"
              >
                Back to Catalog
              </Button>
            </Link>
            <Link href="/admin">
              <Button
                variant="outline"
                className="border-[#fcfaf5]/30 text-[#fcfaf5] hover:bg-[#fcfaf5]/10 font-mono bg-transparent"
              >
                Admin Panel
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Plant Details */}
      <main className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Plant Image */}
            <div className="relative">
              <Card className="bg-[#fcfaf5]/5 border-[#fcfaf5]/10 overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative h-96 lg:h-[500px] bg-[#fcfaf5]/10">
                    {plant.image ? (
                      <Image src={plant.image || "/placeholder.svg"} alt={plant.name} fill className="object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-8xl">🌱</div>
                    )}
                    {!plant.inStock && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <div className="bg-red-500 text-white px-6 py-3 rounded-lg font-semibold">Out of Stock</div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Plant Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{plant.name}</h1>
                <div className="text-3xl md:text-4xl font-bold text-[#e2f89c] mb-6 font-mono">₹{plant.price}</div>
              </div>

              {/* Categories */}
              <div>
                <h3 className="text-lg font-semibold mb-3 font-mono">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {plant.categories.map((category) => (
                    <Badge key={category} className="bg-[#e2f89c]/20 text-[#e2f89c] font-mono px-3 py-1">
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Stock Status */}
              <div>
                <h3 className="text-lg font-semibold mb-3 font-mono">Availability</h3>
                <div
                  className={`inline-flex items-center px-4 py-2 rounded-lg font-mono ${
                    plant.inStock ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                  }`}
                >
                  {plant.inStock ? "✅ In Stock" : "❌ Out of Stock"}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4 pt-6">
                <Button
                  className="w-full bg-[#e2f89c] text-[#072524] hover:bg-[#d4e85c] font-mono font-semibold py-6 text-lg"
                  disabled={!plant.inStock}
                >
                  {plant.inStock ? "Add to Cart" : "Out of Stock"}
                </Button>

                <div className="grid grid-cols-2 gap-4">
                  <Button
                    variant="outline"
                    className="border-[#fcfaf5]/30 text-[#fcfaf5] hover:bg-[#fcfaf5]/10 font-mono bg-transparent"
                  >
                    💚 Add to Wishlist
                  </Button>
                  <Button
                    variant="outline"
                    className="border-[#fcfaf5]/30 text-[#fcfaf5] hover:bg-[#fcfaf5]/10 font-mono bg-transparent"
                  >
                    📋 Care Guide
                  </Button>
                </div>
              </div>

              {/* Plant Details */}
              <Card className="bg-[#fcfaf5]/5 border-[#fcfaf5]/10">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4 font-mono">Plant Details</h3>
                  <div className="space-y-3 text-[#fcfaf5]/80">
                    <div className="flex justify-between">
                      <span>Plant ID:</span>
                      <span className="font-mono text-[#e2f89c]">{plant._id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Added:</span>
                      <span>{new Date(plant.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Last Updated:</span>
                      <span>{new Date(plant.updatedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

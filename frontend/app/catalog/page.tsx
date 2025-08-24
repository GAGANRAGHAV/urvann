"use client"

import type React from "react"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { API_CONFIG } from "@/config"

interface Plant {
  _id: string
  name: string
  price: number
  categories: string[]
  inStock: boolean
  image: string
}

function CatalogContent() {
  const searchParams = useSearchParams()
  const [plants, setPlants] = useState<Plant[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "")
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "all")
  const [sortBy, setSortBy] = useState("name")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    fetchCategories()
  }, [])

  useEffect(() => {
    fetchPlants()
  }, [searchQuery, selectedCategory, sortBy, currentPage])

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/categories`)
      const data = await response.json()
      setCategories(data)
    } catch (error) {
      console.error("Error fetching categories:", error)
    }
  }

  const fetchPlants = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: "12",
        sort: sortBy,
      })

      if (searchQuery) params.append("q", searchQuery)
      if (selectedCategory !== "all") params.append("category", selectedCategory)

      const response = await fetch(`${API_CONFIG.BASE_URL}/plants?${params}`)
      const data = await response.json()

      setPlants(data.items)
      setTotalPages(data.totalPages)
      setTotal(data.total)
    } catch (error) {
      console.error("Error fetching plants:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setCurrentPage(1)
    fetchPlants()
  }

  return (
    <div className="min-h-screen bg-[#072524] text-[#fcfaf5]">
      {/* Header */}
      <header className="py-8 px-4 border-b border-[#fcfaf5]/10">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <Link href="/" className="text-2xl font-bold text-[#e2f89c] font-mono">
              🌱 Urvann
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

          <h1 className="text-4xl md:text-5xl font-bold mb-6">Plant Catalog</h1>
          <p className="text-xl text-[#fcfaf5]/80 mb-8">Discover our complete collection of {total} beautiful plants</p>

          {/* Search and Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <form onSubmit={handleSearch} className="md:col-span-2">
              <Input
                type="text"
                placeholder="Search plants by name or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-[#fcfaf5]/10 border-[#fcfaf5]/20 text-[#fcfaf5] placeholder:text-[#fcfaf5]/60"
              />
            </form>

            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="bg-[#fcfaf5]/10 border-[#fcfaf5]/20 text-[#fcfaf5]">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent className="bg-[#072524] border-[#fcfaf5]/20">
                <SelectItem value="all" className="text-[#fcfaf5] focus:bg-[#fcfaf5]/10">
                  All Categories
                </SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category} className="text-[#fcfaf5] focus:bg-[#fcfaf5]/10">
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="bg-[#fcfaf5]/10 border-[#fcfaf5]/20 text-[#fcfaf5]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#072524] border-[#fcfaf5]/20">
                <SelectItem value="name" className="text-[#fcfaf5] focus:bg-[#fcfaf5]/10">
                  Name A-Z
                </SelectItem>
                <SelectItem value="-name" className="text-[#fcfaf5] focus:bg-[#fcfaf5]/10">
                  Name Z-A
                </SelectItem>
                <SelectItem value="price" className="text-[#fcfaf5] focus:bg-[#fcfaf5]/10">
                  Price Low-High
                </SelectItem>
                <SelectItem value="-price" className="text-[#fcfaf5] focus:bg-[#fcfaf5]/10">
                  Price High-Low
                </SelectItem>
                <SelectItem value="-createdAt" className="text-[#fcfaf5] focus:bg-[#fcfaf5]/10">
                  Newest First
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </header>

      {/* Plants Grid */}
      <main className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="bg-[#fcfaf5]/5 rounded-2xl p-6 animate-pulse">
                  <div className="h-48 bg-[#fcfaf5]/10 rounded-xl mb-4"></div>
                  <div className="h-6 bg-[#fcfaf5]/10 rounded mb-2"></div>
                  <div className="h-4 bg-[#fcfaf5]/10 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          ) : plants.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🌱</div>
              <h3 className="text-2xl font-semibold mb-2">No plants found</h3>
              <p className="text-[#fcfaf5]/80">Try adjusting your search or filters</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
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

                        <h3 className="text-lg font-semibold mb-2 text-[#fcfaf5]">{plant.name}</h3>
                        <p className="text-xl font-bold text-[#e2f89c] mb-3">₹{plant.price}</p>

                        <div className="flex flex-wrap gap-1">
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

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center space-x-4 mt-12">
                  <Button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    variant="outline"
                    className="border-[#fcfaf5]/30 text-[#fcfaf5] hover:bg-[#fcfaf5]/10 font-mono bg-[#072524]"
                  >
                    Previous
                  </Button>

                  <span className="text-[#fcfaf5]/80 font-mono">
                    Page {currentPage} of {totalPages}
                  </span>

                    <Button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    variant="outline"
                    className="border-[#fcfaf5]/30 text-[#fcfaf5] hover:bg-[#fcfaf5]/10 font-mono bg-[#072524]"
                    >
                    Next
                    </Button>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  )
}

export default function CatalogPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#072524] flex items-center justify-center">
          <div className="text-[#e2f89c] text-xl font-mono">Loading catalog...</div>
        </div>
      }
    >
      <CatalogContent />
    </Suspense>
  )
}

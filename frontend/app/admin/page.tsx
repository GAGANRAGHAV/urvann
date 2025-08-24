"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"

interface Plant {
  _id: string
  name: string
  price: number
  categories: string[]
  inStock: boolean
  image: string
}

export default function AdminPage() {
  const [plants, setPlants] = useState<Plant[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [adminKey, setAdminKey] = useState("")
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    categories: [] as string[],
    inStock: true,
    image: "",
  })
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [newCategory, setNewCategory] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState("")

  useEffect(() => {
    fetchCategories()
    fetchPlants()
  }, [])

  const fetchCategories = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/categories")
      const data = await response.json()
      setCategories(data)
    } catch (error) {
      console.error("Error fetching categories:", error)
    }
  }

  const fetchPlants = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/plants?limit=10&sort=-createdAt")
      const data = await response.json()
      setPlants(data.items)
    } catch (error) {
      console.error("Error fetching plants:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleAuth = () => {
    if (adminKey.trim()) {
      setIsAuthenticated(true)
      setMessage("")
    } else {
      setMessage("Please enter admin key")
    }
  }

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  const addNewCategory = () => {
    if (newCategory.trim() && !categories.includes(newCategory.trim())) {
      const category = newCategory.trim().toLowerCase()
      setCategories((prev) => [...prev, category])
      setSelectedCategories((prev) => [...prev, category])
      setNewCategory("")
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!adminKey.trim()) {
      setMessage("Admin key is required")
      return
    }

    setSubmitting(true)
    setMessage("")

    try {
      const plantData = {
        name: formData.name,
        price: Number.parseInt(formData.price),
        categories: selectedCategories,
        inStock: formData.inStock,
        image: formData.image,
      }

      const response = await fetch("http://localhost:4000/api/plants", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-key": adminKey,
        },
        body: JSON.stringify(plantData),
      })

      if (response.ok) {
        setMessage("Plant added successfully!")
        setFormData({ name: "", price: "", categories: [], inStock: true, image: "" })
        setSelectedCategories([])
        fetchPlants()
      } else {
        const error = await response.json()
        setMessage(error.error || "Failed to add plant")
      }
    } catch (error) {
      setMessage("Error adding plant")
      console.error("Error:", error)
    } finally {
      setSubmitting(false)
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#072524] text-[#fcfaf5] flex items-center justify-center">
        <Card className="bg-[#fcfaf5]/5 border-[#fcfaf5]/10 w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center text-[#e2f89c] font-mono">🔐 Admin Access</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
                <Label htmlFor="adminKey" className="font-mono text-white pb-2">
                  Admin Key
                </Label>
              <Input
                id="adminKey"
                type="password"
                value={adminKey}
                onChange={(e) => setAdminKey(e.target.value)}
                className="bg-[#fcfaf5]/10 border-[#fcfaf5]/20 text-[#fcfaf5]"
                placeholder="Enter admin key"
              />
            </div>
            {message && <div className="text-red-400 text-sm font-mono">{message}</div>}
            <Button onClick={handleAuth} className="w-full bg-[#e2f89c] text-[#072524] hover:bg-[#d4e85c] font-mono">
              Access Admin Panel
            </Button>
            <div className="text-center">
              <Link href="/" className="text-[#fcfaf5]/60 hover:text-[#e2f89c] font-mono text-sm">
                ← Back to Home
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#072524] text-[#fcfaf5]">
      {/* Header */}
      <header className="py-6 px-4 border-b border-[#fcfaf5]/10">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-[#e2f89c] font-mono">
            🌱 Urvann Admin
          </Link>
          <div className="flex space-x-4">
            <Link href="/catalog">
              <Button
                variant="outline"
                className="border-[#fcfaf5]/30 text-[#fcfaf5] hover:bg-[#fcfaf5]/10 font-mono bg-transparent"
              >
                View Catalog
              </Button>
            </Link>
            <Button
              onClick={() => setIsAuthenticated(false)}
              variant="outline"
              className="border-red-500/30 text-red-400 hover:bg-red-500/10 font-mono"
            >
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="py-12 px-4 ">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Add Plant Form */}
          <Card className="bg-[#fcfaf5]/5 border-[#fcfaf5]/10">
            <CardHeader>
              <CardTitle className="text-[#e2f89c] font-mono">Add New Plant</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name" className="font-mono text-white pb-2">
                    Plant Name
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    className="bg-[#fcfaf5]/10 border-[#fcfaf5]/20 text-[#fcfaf5]"
                    placeholder="e.g., Snake Plant"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="price" className="font-mono text-white pb-2">
                    Price (₹)
                  </Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData((prev) => ({ ...prev, price: e.target.value }))}
                    className="bg-[#fcfaf5]/10 border-[#fcfaf5]/20 text-[#fcfaf5]"
                    placeholder="299"
                    required
                  />
                </div>

                <div className="text-white pb-2">
                  <Label className="font-mono pb-2">Categories</Label>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-2">
                      {categories.map((category) => (
                        <div key={category} className="flex items-center space-x-2">
                          <input
                            placeholder="Add new category"
                            type="checkbox"
                            id={category}
                            checked={selectedCategories.includes(category)}
                            onChange={() => handleCategoryToggle(category)}
                            className="rounded border-[#fcfaf5]/20"
                          />
                          <Label htmlFor={category} className="text-sm capitalize">
                            {category}
                          </Label>
                        </div>
                      ))}
                    </div>

                    <div className="flex space-x-2">
                      <Input
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        className="bg-[#fcfaf5]/10 border-[#fcfaf5]/20 text-[#fcfaf5]"
                        placeholder="Add new category"
                      />
                      <Button
                        type="button"
                        onClick={addNewCategory}
                        variant="outline"
                        className="border-[#fcfaf5]/30 text-[#fcfaf5] hover:bg-[#fcfaf5]/10 bg-transparent"
                      >
                        Add
                      </Button>
                    </div>

                    {selectedCategories.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {selectedCategories.map((category) => (
                          <Badge key={category} className="bg-[#e2f89c]/20 text-[#e2f89c]">
                            {category}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="image" className="font-mono text-white pb-2">
                    Image URL (optional)
                  </Label>
                  <Input
                    id="image"
                    value={formData.image}
                    onChange={(e) => setFormData((prev) => ({ ...prev, image: e.target.value }))}
                    className="bg-[#fcfaf5]/10 border-[#fcfaf5]/20 text-[#fcfaf5]"
                    placeholder="https://example.com/plant.jpg"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="inStock"
                    checked={formData.inStock}
                    onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, inStock: checked }))}
                  />
                  <Label htmlFor="inStock" className="font-mono text-white ">
                    In Stock
                  </Label>
                </div>

                {message && (
                  <div
                    className={`text-sm font-mono ${message.includes("success") ? "text-green-400" : "text-red-400"}`}
                  >
                    {message}
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-[#e2f89c] text-[#072524] hover:bg-[#d4e85c] font-mono"
                >
                  {submitting ? "Adding Plant..." : "Add Plant"}
                </Button>
              </form>
            </CardContent>
          </Card>

       
        </div>
      </main>
    </div>
  )
}

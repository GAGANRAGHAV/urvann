// API configuration and helper functions
import { API_CONFIG } from "../config"

const API_BASE_URL = API_CONFIG.BASE_URL

export const api = {
  // Health check
  health: () => fetch(`${API_BASE_URL}/health`),

  // Categories
  getCategories: () => fetch(`${API_BASE_URL}/categories`),

  // Plants
  getPlants: (params?: URLSearchParams) => {
    const url = params ? `${API_BASE_URL}/plants?${params}` : `${API_BASE_URL}/plants`
    return fetch(url)
  },

  getPlant: (id: string) => fetch(`${API_BASE_URL}/plants/${id}`),

  // Admin routes
  createPlant: (data: any, adminKey: string) =>
    fetch(`${API_BASE_URL}/plants`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        [API_CONFIG.ADMIN.KEY_NAME]: adminKey,
      },
      body: JSON.stringify(data),
    }),

  seedDatabase: (data: any, adminKey: string) =>
    fetch(`${API_BASE_URL}/seed`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        [API_CONFIG.ADMIN.KEY_NAME]: adminKey,
      },
      body: JSON.stringify(data),
    }),
}

// Mock data for when API is not available
export const mockPlants = [
  {
    _id: "1",
    name: "Snake Plant",
    price: 399,
    categories: ["indoor", "air purifying", "low maintenance"],
    inStock: true,
    image: "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "2",
    name: "Money Plant",
    price: 299,
    categories: ["indoor", "home decor", "air purifying"],
    inStock: true,
    image: "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "3",
    name: "Peace Lily",
    price: 499,
    categories: ["indoor", "flowering", "air purifying"],
    inStock: false,
    image: "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "4",
    name: "Rubber Plant",
    price: 599,
    categories: ["indoor", "home decor"],
    inStock: true,
    image: "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "5",
    name: "Aloe Vera",
    price: 199,
    categories: ["succulent", "medicinal", "indoor"],
    inStock: true,
    image: "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "6",
    name: "Fiddle Leaf Fig",
    price: 899,
    categories: ["indoor", "home decor"],
    inStock: true,
    image: "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

export const mockCategories = [
  "indoor",
  "outdoor",
  "succulent",
  "air purifying",
  "flowering",
  "medicinal",
  "home decor",
  "low maintenance",
]

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");

// --- App setup ---
const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// --- MongoDB connection ---
mongoose.connect("mongodb+srv://gaganraghav143:YzRMQAR1nxOotpDU@cluster0.az40vsx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "❌ MongoDB connection error:"));
db.once("open", () => console.log("✅ Connected to MongoDB"));

// --- Plant model ---
const plantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  categories: { type: [String], default: [] },
  price: { type: Number, default: 0 },
  description: { type: String, default: "" },
  image: { type: String, default: "" },
  inStock: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

const Plant = mongoose.model("Plant", plantSchema);

// --- Routes ---
app.get("/api/plants", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = (page - 1) * limit;
    const sortField = req.query.sort || "name";
    const query = {};
    
    // Handle search by name or category (q parameter)
    if (req.query.q) {
      const searchRegex = new RegExp(req.query.q, "i");
      query.$or = [
        { name: searchRegex },
        { categories: searchRegex }
      ];
    }
    
    // Handle category filtering
    if (req.query.category) {
      query.categories = new RegExp(req.query.category, "i");
    }
    
    // Determine sort direction and field
    const sortDirection = sortField.startsWith("-") ? -1 : 1;
    const actualSortField = sortField.startsWith("-") ? sortField.substring(1) : sortField;
    const sortOptions = {};
    sortOptions[actualSortField] = sortDirection;
    
    // Execute query with filters
    const total = await Plant.countDocuments(query);
    const plants = await Plant.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit);
    
    console.log("Query:", JSON.stringify(query));
    console.log("Sort:", JSON.stringify(sortOptions));
    console.log("Total plants matching query:", total);
    console.log("Plants fetched this page:", plants.length);
    
    res.json({
      items: plants,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// --- Categories endpoint ---
app.get("/api/categories", async (req, res) => {
  try {
    // Get all unique categories from plants
    const categories = await Plant.distinct("categories");
    console.log("Categories fetched:", categories.length);
    res.json(categories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// --- Add plant endpoint (Admin only) ---
app.post("/api/plants", async (req, res) => {
  try {
    // Check for admin key
    const adminKey = req.headers["x-admin-key"];
    if (!adminKey || adminKey !== "admin123") { // You should use an environment variable for this in production
      return res.status(401).json({ error: "Unauthorized: Admin access required" });
    }
    
    // Validate required fields
    const { name, price, categories, inStock, image = "" } = req.body;
    
    if (!name || !name.trim()) {
      return res.status(400).json({ error: "Plant name is required" });
    }
    
    if (!price && price !== 0) {
      return res.status(400).json({ error: "Price is required" });
    }
    
    // Create and save the new plant
    const newPlant = new Plant({
      name: name.trim(),
      price,
      categories: Array.isArray(categories) ? categories : [],
      inStock: Boolean(inStock),
      image,
      createdAt: new Date()
    });
    
    await newPlant.save();
    console.log("New plant added:", newPlant.name);
    
    res.status(201).json({
      message: "Plant added successfully",
      plant: newPlant
    });
  } catch (err) {
    console.error("Error adding plant:", err);
    res.status(500).json({ error: "Server Error" });
  }
});

// --- Seed data endpoint (for development only) ---
// app.post("/api/seed", async (req, res) => {
//   try {
//     // Clear existing data
//     await Plant.deleteMany({});
    
//     // Sample data
//     const samplePlants = [
//       {
//         name: "Money Plant",
//         categories: ["Indoor", "Air Purifying", "Home Decor"],
//         price: 399,
//         description: "Easy to grow indoor plant that brings prosperity.",
//         image: "/placeholder.svg",
//         inStock: true
//       },
//       {
//         name: "Snake Plant",
//         categories: ["Indoor", "Low Maintenance", "Air Purifying"],
//         price: 499,
//         description: "Hardy indoor plant that requires minimal care.",
//         image: "/placeholder.svg",
//         inStock: true
//       },
//       {
//         name: "Aloe Vera",
//         categories: ["Succulent", "Medicinal", "Indoor"],
//         price: 299,
//         description: "Healing plant with numerous benefits.",
//         image: "/placeholder.svg",
//         inStock: true
//       },
//       {
//         name: "Rose Bush",
//         categories: ["Flowering", "Outdoor", "Garden"],
//         price: 599,
//         description: "Beautiful flowering plant for your garden.",
//         image: "/placeholder.svg",
//         inStock: false
//       },
//       {
//         name: "Bonsai Tree",
//         categories: ["Indoor", "Decorative", "Premium"],
//         price: 2999,
//         description: "Miniature tree for aesthetic appeal.",
//         image: "/placeholder.svg",
//         inStock: true
//       },
//       {
//         name: "Cactus",
//         categories: ["Succulent", "Low Maintenance", "Indoor"],
//         price: 249,
//         description: "Perfect plant for busy people.",
//         image: "/placeholder.svg",
//         inStock: true
//       },
//       {
//         name: "Tulip Bulbs",
//         categories: ["Flowering", "Outdoor", "Seasonal"],
//         price: 199,
//         description: "Beautiful spring flowers.",
//         image: "/placeholder.svg",
//         inStock: false
//       },
//       {
//         name: "Fern",
//         categories: ["Indoor", "Shade Loving", "Humidity Loving"],
//         price: 349,
//         description: "Lush green fern for indoor spaces.",
//         image: "/placeholder.svg",
//         inStock: true
//       },
//       {
//         name: "Bamboo Plant",
//         categories: ["Indoor", "Lucky", "Low Light"],
//         price: 599,
//         description: "Brings luck and prosperity to your home.",
//         image: "/placeholder.svg",
//         inStock: true
//       },
//       {
//         name: "Lily",
//         categories: ["Flowering", "Fragrant", "Garden"],
//         price: 499,
//         description: "Beautiful fragrant flowers for your garden.",
//         image: "/placeholder.svg",
//         inStock: true
//       },
//       {
//         name: "Rubber Plant",
//         categories: ["Indoor", "Air Purifying", "Large"],
//         price: 899,
//         description: "Large indoor plant with striking foliage.",
//         image: "/placeholder.svg",
//         inStock: true
//       },
//       {
//         name: "Peace Lily",
//         categories: ["Indoor", "Flowering", "Air Purifying"],
//         price: 499,
//         description: "Beautiful white flowers and air-purifying properties.",
//         image: "/placeholder.svg",
//         inStock: true
//       },
//       {
//         name: "Jade Plant",
//         categories: ["Succulent", "Lucky", "Indoor"],
//         price: 349,
//         description: "Symbol of good luck and prosperity.",
//         image: "/placeholder.svg",
//         inStock: true
//       },
//       {
//         name: "Boston Fern",
//         categories: ["Indoor", "Hanging", "Humidity Loving"],
//         price: 449,
//         description: "Perfect hanging plant for bathrooms and humid areas.",
//         image: "/placeholder.svg",
//         inStock: true
//       }
//     ];
    
//     // Insert sample data
//     await Plant.insertMany(samplePlants);
    
//     res.json({
//       message: "Database seeded successfully",
//       count: samplePlants.length
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server Error" });
//   }
// });

// --- Start server ---
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));

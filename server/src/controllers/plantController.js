const Plant = require('../models/Plant');
const config = require('../config/constants');

// Get all plants with filtering, sorting, and pagination
const getPlants = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || config.pagination.defaultPage;
    const limit = parseInt(req.query.limit) || config.pagination.defaultLimit;
    const skip = (page - 1) * limit;
    const sortField = req.query.sort || config.sorting.defaultField;
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
};

// Get all unique categories
const getCategories = async (req, res) => {
  try {
    // Get all unique categories from plants
    const categories = await Plant.distinct("categories");
    console.log("Categories fetched:", categories.length);
    res.json(categories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// Add a new plant (admin only)
const addPlant = async (req, res) => {
  try {
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
};

// Get single plant by ID
const getPlantById = async (req, res) => {
  try {
    const plant = await Plant.findById(req.params.id);
    
    if (!plant) {
      return res.status(404).json({ error: "Plant not found" });
    }
    
    res.json(plant);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  getPlants,
  getCategories,
  addPlant,
  getPlantById
};

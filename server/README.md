# Urvann Plant API Documentation

## API Endpoints

### GET /api/plants

Retrieves a list of plants with support for searching, filtering, and pagination.

**Query Parameters:**

- `page` (number, default: 1): Page number for pagination
- `limit` (number, default: 12): Number of items per page
- `q` (string, optional): Search term for plant name or category (case-insensitive)
- `category` (string, optional): Filter by category name (case-insensitive)
- `sort` (string, default: "name"): Sort field and direction
  - Examples: "name" (A-Z), "-name" (Z-A), "price" (low to high), "-price" (high to low), "-createdAt" (newest first)

**Response:**

```json
{
  "items": [
    {
      "_id": "...",
      "name": "Money Plant",
      "categories": ["Indoor", "Air Purifying", "Home Decor"],
      "price": 399,
      "description": "Easy to grow indoor plant that brings prosperity.",
      "image": "/placeholder.svg",
      "inStock": true
    },
    // more plants...
  ],
  "total": 50,
  "page": 1,
  "limit": 12,
  "totalPages": 5
}
```

### GET /api/categories

Retrieves a list of all unique plant categories.

**Response:**

```json
[
  "Indoor",
  "Outdoor",
  "Succulent",
  "Flowering",
  "Air Purifying",
  // more categories...
]
```

### POST /api/seed (Development Only)

Seeds the database with sample plant data for testing purposes.

**Response:**

```json
{
  "message": "Database seeded successfully",
  "count": 14
}
```

## Example Usage

### Searching for plants

```
GET /api/plants?q=air purifying
```

Searches for plants with "air purifying" in their name or categories.

### Filtering by category

```
GET /api/plants?category=Indoor
```

Returns only plants in the "Indoor" category.

### Sorting plants

```
GET /api/plants?sort=-price
```

Returns plants sorted by price from highest to lowest.

### Pagination

```
GET /api/plants?page=2&limit=10
```

Returns the second page of results with 10 plants per page.

### Combined query

```
GET /api/plants?q=indoor&category=Air%20Purifying&sort=-price&page=1&limit=5
```

Searches for "indoor" in plants with "Air Purifying" category, sorts by price from highest to lowest, and returns the first page with 5 results per page.

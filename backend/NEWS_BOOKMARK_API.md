# News & Bookmark APIs - Complete Documentation

## 📁 New Files Created

```
backend/
├── controllers/
│   ├── newsController.js         ✅ News fetching logic
│   └── bookmarkController.js     ✅ Bookmark management
├── models/
│   └── Bookmark.js               ✅ Bookmark schema with compound unique index
├── routes/
│   ├── newsRoutes.js             ✅ Public news endpoints
│   └── bookmarkRoutes.js         ✅ Protected bookmark endpoints
└── server.js                     ✅ Updated with new routes
```

---

## 🚀 Server.js Changes

### Added Imports (Line 28-30):

```javascript
const newsRoutes = require("./routes/newsRoutes");
const bookmarkRoutes = require("./routes/bookmarkRoutes");
```

### Added Route Mounting (Lines 72-77):

```javascript
// News routes (public)
app.use("/api/news", newsRoutes);

// Bookmark routes (protected)
app.use("/api/bookmarks", bookmarkRoutes);
```

---

## 📰 NEWS APIs (Public Endpoints)

### 1. Get Latest Headlines

**Endpoint:** `GET /api/news/latest`

**No authentication required**

**Response (200 OK):**

```json
{
  "success": true,
  "count": 38,
  "articles": [
    {
      "source": { "id": null, "name": "BBC News" },
      "author": "BBC News",
      "title": "Latest News Article...",
      "description": "Description of the article...",
      "url": "https://news.bbc.co.uk/...",
      "urlToImage": "https://image-url.com/image.jpg",
      "publishedAt": "2024-01-15T14:32:00Z",
      "content": "Full content of article..."
    }
    // ... more articles
  ]
}
```

**Example Request:**

```bash
curl http://localhost:5000/api/news/latest
```

---

### 2. Search News

**Endpoint:** `GET /api/news/search?q=technology`

**No authentication required**

**Query Parameters:**

- `q` (required) - Search query term (e.g., `technology`, `artificial intelligence`, `bitcoin`)

**Response (200 OK):**

```json
{
  "success": true,
  "count": 34,
  "articles": [
    {
      "source": { "id": "techcrunch", "name": "TechCrunch" },
      "author": "Author Name",
      "title": "Technology Article Title",
      "description": "Article description...",
      "url": "https://techcrunch.com/...",
      "urlToImage": "https://image-url.com/image.jpg",
      "publishedAt": "2024-01-15T10:00:00Z",
      "content": "Full content..."
    }
    // ... more articles
  ]
}
```

**Error Response - Missing Query (400):**

```json
{
  "success": false,
  "message": "Please provide a search query parameter: ?q=your_query"
}
```

**Example Request:**

```bash
curl "http://localhost:5000/api/news/search?q=technology"
curl "http://localhost:5000/api/news/search?q=artificial%20intelligence"
```

---

### 3. Get News by Category

**Endpoint:** `GET /api/news/category/:category`

**No authentication required**

**URL Parameters:**

- `category` - One of: `business`, `entertainment`, `general`, `health`, `science`, `sports`, `technology`

**Response (200 OK):**

```json
{
  "success": true,
  "category": "technology",
  "count": 38,
  "articles": [
    {
      "source": { "id": "techcrunch", "name": "TechCrunch" },
      "author": "Author Name",
      "title": "Tech News Article",
      "description": "Article description...",
      "url": "https://techcrunch.com/...",
      "urlToImage": "https://image-url.com/image.jpg",
      "publishedAt": "2024-01-15T12:00:00Z",
      "content": "Full content..."
    }
    // ... more articles
  ]
}
```

**Error Response - Invalid Category (400):**

```json
{
  "success": false,
  "message": "Invalid category. Valid categories are: business, entertainment, general, health, science, sports, technology"
}
```

**Example Requests:**

```bash
curl http://localhost:5000/api/news/category/technology
curl http://localhost:5000/api/news/category/business
curl http://localhost:5000/api/news/category/science
```

---

## 🔖 BOOKMARK APIs (Protected Endpoints)

**All bookmark endpoints require authentication!**

**Header Required:**

```
Authorization: Bearer YOUR_JWT_TOKEN
```

---

### 1. Add Bookmark

**Endpoint:** `POST /api/bookmarks`

**Protected Route** - requires JWT token

**Request Body:**

```json
{
  "title": "Article Title",
  "description": "Brief description of the article",
  "url": "https://example.com/article",
  "urlToImage": "https://example.com/image.jpg",
  "sourceName": "BBC News",
  "publishedAt": "2024-01-15T12:00:00Z"
}
```

**Response (201 Created):**

```json
{
  "success": true,
  "message": "Article bookmarked successfully",
  "bookmark": {
    "_id": "507f1f77bcf86cd799439011",
    "user": "507f1f77bcf86cd799439012",
    "title": "Article Title",
    "description": "Brief description",
    "url": "https://example.com/article",
    "urlToImage": "https://example.com/image.jpg",
    "sourceName": "BBC News",
    "publishedAt": "2024-01-15T12:00:00Z",
    "createdAt": "2024-01-15T14:30:00.000Z",
    "updatedAt": "2024-01-15T14:30:00.000Z",
    "__v": 0
  }
}
```

**Error Response - Missing Fields (400):**

```json
{
  "success": false,
  "message": "Please provide article title and URL"
}
```

**Error Response - Already Bookmarked (400):**

```json
{
  "success": false,
  "message": "This article is already bookmarked"
}
```

**Error Response - Unauthorized (401):**

```json
{
  "success": false,
  "message": "Not authorized to access this route"
}
```

**Example Request:**

```bash
curl -X POST http://localhost:5000/api/bookmarks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title": "Breaking: New Technology",
    "description": "Latest developments in AI",
    "url": "https://techcrunch.com/2024/01/breaking-news",
    "urlToImage": "https://techcrunch.com/image.jpg",
    "sourceName": "TechCrunch",
    "publishedAt": "2024-01-15T12:00:00Z"
  }'
```

---

### 2. Get All Bookmarks

**Endpoint:** `GET /api/bookmarks`

**Protected Route** - requires JWT token

**Response (200 OK):**

```json
{
  "success": true,
  "count": 2,
  "bookmarks": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "user": "507f1f77bcf86cd799439012",
      "title": "Article 1",
      "description": "Description 1",
      "url": "https://example.com/article1",
      "urlToImage": "https://example.com/image1.jpg",
      "sourceName": "BBC News",
      "publishedAt": "2024-01-15T12:00:00Z",
      "createdAt": "2024-01-15T14:30:00.000Z",
      "updatedAt": "2024-01-15T14:30:00.000Z"
    },
    {
      "_id": "607f1f77bcf86cd799439013",
      "user": "507f1f77bcf86cd799439012",
      "title": "Article 2",
      "description": "Description 2",
      "url": "https://example.com/article2",
      "urlToImage": "https://example.com/image2.jpg",
      "sourceName": "The Guardian",
      "publishedAt": "2024-01-14T10:00:00Z",
      "createdAt": "2024-01-14T16:00:00.000Z",
      "updatedAt": "2024-01-14T16:00:00.000Z"
    }
  ]
}
```

**Empty Response (200 OK):**

```json
{
  "success": true,
  "count": 0,
  "bookmarks": []
}
```

**Example Request:**

```bash
curl -X GET http://localhost:5000/api/bookmarks \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

### 3. Check if Article is Bookmarked

**Endpoint:** `GET /api/bookmarks/check?url=article_url`

**Protected Route** - requires JWT token

**Query Parameters:**

- `url` (required) - The article URL to check

**Response (200 OK) - Already Bookmarked:**

```json
{
  "success": true,
  "isBookmarked": true,
  "bookmarkId": "507f1f77bcf86cd799439011"
}
```

**Response (200 OK) - Not Bookmarked:**

```json
{
  "success": true,
  "isBookmarked": false,
  "bookmarkId": null
}
```

**Error Response - Missing URL (400):**

```json
{
  "success": false,
  "message": "Please provide article URL as query parameter"
}
```

**Example Request:**

```bash
curl -X GET "http://localhost:5000/api/bookmarks/check?url=https://techcrunch.com/article" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

### 4. Remove Bookmark

**Endpoint:** `DELETE /api/bookmarks/:id`

**Protected Route** - requires JWT token

**URL Parameters:**

- `id` (required) - MongoDB bookmark \_id (24 characters)

**Response (200 OK):**

```json
{
  "success": true,
  "message": "Bookmark removed successfully"
}
```

**Error Response - Bookmark Not Found (404):**

```json
{
  "success": false,
  "message": "Bookmark not found"
}
```

**Error Response - Not Authorized (403):**

```json
{
  "success": false,
  "message": "Not authorized to delete this bookmark"
}
```

**Error Response - Invalid ID (400):**

```json
{
  "success": false,
  "message": "Invalid bookmark ID"
}
```

**Example Request:**

```bash
curl -X DELETE http://localhost:5000/api/bookmarks/507f1f77bcf86cd799439011 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

## 🧪 Full Testing Workflow

### Step 1: Register & Login

```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@test.com","password":"123456"}'

# Login (save the token)
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@test.com","password":"123456"}'

# Response includes token - store it in TOKEN variable
TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

### Step 2: Fetch News

```bash
# Get latest headlines
curl http://localhost:5000/api/news/latest

# Search news
curl "http://localhost:5000/api/news/search?q=technology"

# Get category news
curl http://localhost:5000/api/news/category/science
```

### Step 3: Bookmark Articles

```bash
# Add bookmark
curl -X POST http://localhost:5000/api/bookmarks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "title": "Breaking News",
    "description": "Important article",
    "url": "https://example.com/article",
    "urlToImage": "https://example.com/image.jpg",
    "sourceName": "BBC News",
    "publishedAt": "2024-01-15T12:00:00Z"
  }'

# Get all bookmarks
curl http://localhost:5000/api/bookmarks \
  -H "Authorization: Bearer $TOKEN"

# Check if bookmarked
curl "http://localhost:5000/api/bookmarks/check?url=https://example.com/article" \
  -H "Authorization: Bearer $TOKEN"

# Remove bookmark
curl -X DELETE http://localhost:5000/api/bookmarks/507f1f77bcf86cd799439011 \
  -H "Authorization: Bearer $TOKEN"
```

---

## ⚙️ API Error Handling

### Common Error Scenarios

**Rate Limiting (429):**

```json
{
  "success": false,
  "message": "API rate limit exceeded. Please try again later."
}
```

**Invalid API Key (500):**

```json
{
  "success": false,
  "message": "Server configuration error"
}
```

**Network Error (500):**

```json
{
  "success": false,
  "message": "Failed to fetch news from NewsAPI"
}
```

---

## 🔐 Security Features

✅ **Authentication**

- JWT tokens required for bookmark operations
- Token validation on every protected request

✅ **Authorization**

- Users can only access/modify their own bookmarks
- Ownership verification before deletion

✅ **Data Validation**

- All input fields validated before processing
- Compound unique index prevents duplicate bookmarks per user

✅ **Error Handling**

- Graceful error responses with meaningful messages
- No sensitive info leaked in error messages
- Proper HTTP status codes

✅ **Rate Limiting Support**

- NewsAPI rate limit errors handled gracefully
- Clear message when API limit exceeded

---

## 📊 Bookmark Model Schema

```javascript
{
  _id: ObjectId,                    // MongoDB ID
  user: ObjectId (ref: User),       // User who bookmarked
  title: String (required),         // Article title
  description: String,              // Article description
  url: String (required),           // Article URL (unique per user)
  urlToImage: String,               // Article image
  sourceName: String,               // News source
  publishedAt: Date,                // Publication date
  createdAt: Date,                  // Bookmark created time
  updatedAt: Date                   // Last update time
}

// Compound unique index: { user: 1, url: 1 }
// Prevents same user from bookmarking same URL twice
```

---

## ✅ Implementation Checklist

- ✅ newsController.js - 3 endpoints (latest, search, category)
- ✅ bookmarkController.js - 4 endpoints (add, get, check, remove)
- ✅ Bookmark.js - Model with compound unique index
- ✅ newsRoutes.js - Public news routes
- ✅ bookmarkRoutes.js - Protected bookmark routes
- ✅ server.js - Routes imported and mounted
- ✅ Error handling for NewsAPI rate limits
- ✅ Duplicate bookmark prevention
- ✅ User data ownership validation
- ✅ Input validation on all endpoints

**Backend is now production-ready with complete news and bookmark functionality! 🚀**

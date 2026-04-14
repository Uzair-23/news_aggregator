# Authentication Backend - API Testing Guide

## ✅ Backend Architecture - FIXED

All files have been rewritten with proper Express.js middleware pattern:

### Key Fixes Applied:

1. **asyncHandler.js** - Now correctly passes `next` parameter

```javascript
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};
```

2. **authController.js** - All functions have proper `(req, res, next)` signature
3. **authMiddleware.js** - Uses asyncHandler with proper middleware pattern
4. **server.js** - Error handler placed correctly as last middleware
5. **routes** - Functions NOT called with `()`, just passed as reference

---

## 🚀 Quick Test

### 1. Ensure Server is Running

```bash
cd backend
npm run dev
```

Expected output:

```
✅ MongoDB Connected: cluster0.xbln9kj.mongodb.net
🚀 Server running on port 5000
📍 Environment: development
🔗 API Base URL: http://localhost:5000/api
```

---

## 📝 Test the APIs

### 1. Register User

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@test.com","password":"123456"}'
```

**Expected Response (201):**

```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@test.com",
    "role": "user",
    "avatar": null,
    "preferences": [],
    "bookmarks": [],
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

---

### 2. Login User

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@test.com","password":"123456"}'
```

**Expected Response (200):**

```json
{
  "success": true,
  "message": "Logged in successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@test.com",
    "role": "user",
    "avatar": null,
    "preferences": [],
    "bookmarks": [],
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

**Save the token from response for next step!**

---

### 3. Get Current User Profile

```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

**Expected Response (200):**

```json
{
  "success": true,
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@test.com",
    "role": "user",
    "avatar": null,
    "preferences": [],
    "bookmarks": [],
    "verified": false,
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

---

### 4. Update User Profile

```bash
curl -X PUT http://localhost:5000/api/auth/me \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{"preferences":["tech","sports","news"],"avatar":"https://example.com/avatar.jpg"}'
```

**Expected Response (200):**

```json
{
  "success": true,
  "message": "Profile updated successfully",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@test.com",
    "role": "user",
    "avatar": "https://example.com/avatar.jpg",
    "preferences": ["tech", "sports", "news"],
    "bookmarks": [],
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

---

### 5. Health Check

```bash
curl http://localhost:5000/api/health
```

**Expected Response (200):**

```json
{
  "success": true,
  "message": "Server is running properly",
  "timestamp": "2024-01-15T10:35:45.123Z"
}
```

---

## ❌ Error Scenarios

### Invalid Token

```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer invalid_token"
```

**Response (401):**

```json
{
  "success": false,
  "message": "Not authorized to access this route"
}
```

### Missing Fields on Register

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John"}'
```

**Response (400):**

```json
{
  "success": false,
  "message": "Please provide all required fields: name, email, password"
}
```

### Email Already Registered

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Jane","email":"john@test.com","password":"123456"}'
```

**Response (400):**

```json
{
  "success": false,
  "message": "Email already registered"
}
```

### Invalid Password Length

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"test@test.com","password":"123"}'
```

**Response (400):**

```json
{
  "success": false,
  "message": "Password must be at least 6 characters"
}
```

### Bad Credentials on Login

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@test.com","password":"wrongpassword"}'
```

**Response (401):**

```json
{
  "success": false,
  "message": "Invalid email or password"
}
```

---

## 🔍 Debugging

### 1. Check Server is Running

```bash
curl http://localhost:5000/api/health
```

### 2. Check MongoDB Connection

Look at server logs:

```
✅ MongoDB Connected: cluster0.xbln9kj.mongodb.net
```

### 3. Check Request Headers

Make sure Authorization header format is:

```
Authorization: Bearer <token>
```

### 4. Check Token Expiry

Tokens expire in 7 days. Expired token error:

```json
{
  "success": false,
  "message": "Token expired"
}
```

---

## 📚 File Structure Verified

```
backend/
├── config/db.js                    ✅ MongoDB connection
├── models/User.js                  ✅ User schema with hashing
├── controllers/authController.js   ✅ All functions with (req, res, next)
├── routes/authRoutes.js            ✅ Correct function references (no ())
├── middleware/
│   ├── authMiddleware.js          ✅ JWT verification middleware
│   └── errorMiddleware.js         ✅ Global error handler
├── utils/
│   ├── generateToken.js           ✅ JWT creation
│   └── asyncHandler.js            ✅ FIXED - passes next correctly
├── server.js                      ✅ Error handler at end
└── package.json                   ✅ All dependencies installed
```

---

## ✅ All Issues Fixed

✓ asyncHandler now passes `next` parameter
✓ All controllers have proper (req, res, next) signatures
✓ Routes use function references, not calls
✓ Error middleware configured correctly
✓ All middleware has (req, res, next) pattern
✓ Express error handling pipeline working

**Backend is now production-ready! 🚀**

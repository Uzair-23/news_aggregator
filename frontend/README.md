# NewsAI - Personalized News Aggregator Frontend

A premium, modern, dark-theme React frontend for an AI-powered Personalized News Aggregator platform. Built with cutting-edge technologies and production-ready code.

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![Version 1.0.0](https://img.shields.io/badge/Version-1.0.0-blue.svg)
![React 19](https://img.shields.io/badge/React-19.2-blue.svg)
![Vite 8](https://img.shields.io/badge/Vite-8-purple.svg)
![Tailwind CSS 4](https://img.shields.io/badge/Tailwind-4-38B2AC.svg)

## 🎨 Design Philosophy

- **Apple-level polish** with smooth interactions
- **Vercel modern aesthetics** with premium feel
- **Linear clean UI** minimalist design
- **Stripe-like interactions** smooth and delightful
- **Dark futuristic dashboard** with glassmorphism effects

## 🚀 Features

### Core Features

- ✨ **AI-Powered Personalization** - Machine learning algorithms personalize your feed
- 🔐 **Verified Sources** - Only top-tier trusted news sources included
- 🌍 **Global Coverage** - News from around the world in real-time
- 📊 **Advanced Analytics** - Beautiful dashboard with reading insights
- 🎯 **Smart Filtering** - Filter by category, sentiment, source, and more
- 📱 **Fully Responsive** - Perfect on mobile, tablet, and desktop
- 🎬 **Rich Animations** - GSAP + Framer Motion animations throughout
- 🔔 **Notifications** - Toast notifications with react-hot-toast
- 📖 **Reading Summaries** - AI-generated article summaries
- 🔖 **Bookmarks** - Save articles for later reading

### Pages Included

1. **Home** - Premium landing page with hero section and features
2. **Feed** - Main app dashboard with personalized news feed
3. **Search** - Advanced search with multiple filters
4. **Bookmarks** - Saved articles collection
5. **Dashboard** - Analytics and reading insights with charts
6. **Profile** - User settings and preferences
7. **Admin** - Platform management (admin-only)
8. **Article Details** - Full article view with comments
9. **Login/Register** - Beautiful authentication pages
10. **404** - Animated not found page

## 🛠 Tech Stack

**Core Framework**

- React 19.2.4
- Vite 8.0.4
- React Router DOM 7.14

**Styling**

- Tailwind CSS 4.2.2
- PostCSS with Tailwind plugins

**Animations & Effects**

- GSAP 3.15 (with ScrollTrigger)
- Framer Motion 12.38
- Lenis 1.3.21 (smooth scrolling)

**UI & Components**

- Lucide React Icons 1.8
- Recharts 3.8.1 (analytics)
- React Hot Toast 2.6
- Clsx 2.1.1

**API & State**

- Axios 1.15
- Context API (built-in)
- localStorage persistence

## 📁 Project Structure

```
frontend/
├── src/
│   ├── main.jsx                # React entry point
│   ├── App.jsx                 # Router setup & layouts
│   ├── index.css               # Global styles & Tailwind
│   ├── assets/                 # Images, SVGs, static files
│   ├── components/             # Reusable React components
│   │   ├── Navbar.jsx          # Top navigation
│   │   ├── Sidebar.jsx         # Left sidebar navigation
│   │   ├── Footer.jsx          # Footer with links
│   │   ├── NewsCard.jsx        # News article card
│   │   ├── SearchBar.jsx       # Search input component
│   │   ├── Loader.jsx          # Loading spinner
│   │   ├── ProtectedRoute.jsx  # Route authentication guard
│   │   ├── SentimentBadge.jsx  # Sentiment indicator
│   │   ├── SummaryModal.jsx    # AI summary modal
│   │   ├── StatsCard.jsx       # Dashboard stat card
│   │   ├── FloatingParticles.jsx # Background effect
│   │   └── HeroSection.jsx     # Landing hero
│   ├── pages/                  # Full page components
│   │   ├── Home.jsx            # Landing page
│   │   ├── Login.jsx           # Login page
│   │   ├── Register.jsx        # Registration page
│   │   ├── Feed.jsx            # Main feed
│   │   ├── Search.jsx          # Search results
│   │   ├── Bookmarks.jsx       # Saved articles
│   │   ├── Dashboard.jsx       # Analytics dashboard
│   │   ├── Profile.jsx         # User profile
│   │   ├── Admin.jsx           # Admin panel
│   │   ├── ArticleDetails.jsx  # Single article
│   │   └── NotFound.jsx        # 404 page
│   ├── context/                # React Context (state)
│   │   ├── AuthContext.jsx     # Authentication state
│   │   └── ThemeContext.jsx    # Theme management
│   ├── hooks/                  # Custom React hooks
│   │   ├── useGSAPAnimations.js # Animation hooks
│   │   ├── useLenis.js         # Smooth scroll hook
│   │   └── useFetchNews.js     # News fetching hook
│   ├── services/               # API & backend services
│   │   └── api.js              # Axios instance + endpoints
│   └── utils/                  # Utilities & helpers
│       ├── constants.js        # App constants
│       ├── helpers.js          # Utility functions
│       └── mockData.js         # Mock data for frontend
├── index.html                  # HTML entry template
├── vite.config.js              # Vite configuration
├── tailwind.config.js          # Tailwind theme config
├── package.json                # Dependencies & scripts
└── README.md                   # This file
```

## 🎨 Color System

### Dark Luxurious Palette

```
Background:     #0a0a0a   (dark-950)
Surface:        #111111   (surface-dark)
Card:           #171717   (surface-card)
Border:         #2a2a2a   (surface-border)
Text Primary:   #ffffff
Text Secondary: #a1a1aa   (dark-400)
```

### Accent Colors

```
Blue:    #3b82f6   (accent-blue)     - Primary actions
Purple:  #8b5cf6   (accent-purple)   - Secondary actions
Cyan:    #06b6d4   (accent-cyan)     - Highlights
Green:   #10b981   (accent-green)    - Success states
Red:     #ef4444   (accent-red)      - Danger/errors
Orange:  #f97316   (accent-orange)   - Warnings
Pink:    #ec4899   (accent-pink)     - Special
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.0 or higher
- **npm** 9.0 or higher
- Modern browser (Chrome, Firefox, Safari, Edge)

### Installation

1. **Navigate to frontend directory**

```bash
cd frontend
```

2. **Install dependencies**

```bash
npm install
```

### Development Server

Start development server with hot reload:

```bash
npm run dev
```

Server starts at `http://localhost:3001` (or next available port)

Features:

- Hot Module Replacement (HMR)
- Fast refresh on code changes
- Console error logging

### Production Build

Create optimized production build:

```bash
npm run build
```

Creates `dist/` folder with:

- Minified JavaScript
- Optimized CSS
- Tree-shaken dependencies
- Code splitting

### Preview Production Build

Test production build locally:

```bash
npm run preview
```

## 🔐 Authentication System

### Context-Based State Management

The app uses React Context API for authentication with localStorage persistence:

```javascript
import { useAuth } from "./context/AuthContext";

function MyComponent() {
  const { user, isAuthenticated, login, logout } = useAuth();

  return (
    <>
      {isAuthenticated ? (
        <div>Welcome {user.name}!</div>
      ) : (
        <button onClick={() => navigate("/login")}>Sign In</button>
      )}
    </>
  );
}
```

### Auth Features

- Auto-login on page refresh
- Token persistence in localStorage
- Protected route middleware
- User profile management
- Logout with cleanup

## 🎨 Custom Hooks

### useGSAPAnimations

GSAP animation hooks:

```javascript
import { useGSAPAnimations, useScrollReveal } from "./hooks/useGSAPAnimations";

const MyComponent = () => {
  const ref = useRef();
  useScrollReveal(ref); // Auto-animate on scroll

  return <div ref={ref}>Animated content</div>;
};
```

### useFetchNews

News fetching with infinite scroll:

```javascript
import { useFetchNews } from "./hooks/useFetchNews";

const Feed = () => {
  const { articles, loading, hasMore, loadMore } = useFetchNews({
    categories: ["Technology"],
    mood: "positive",
    limit: 12,
  });
};
```

### useLenis

Smooth scrolling:

```javascript
import { useLenis } from "./hooks/useLenis";

const App = () => {
  useLenis(); // Enables smooth scroll globally
};
```

## 🎬 Animation Features

The app features extensive animations powered by GSAP and Framer Motion:

- **Entry Animations** - Elements fade/slide in on page load
- **Scroll Reveals** - Cards animate when scrolled into view
- **Hover Effects** - Cards lift, buttons glow on interaction
- **Modal Transitions** - Smooth open/close with spring physics
- **Counter Animations** - Stats count up smoothly
- **Particle Effects** - Floating background particles
- **Stagger Effects** - List items animate in sequence
- **Magnetic Cursor** - Buttons follow cursor on hover

## 🌐 API Integration

### Backend API Service

Located in `services/api.js` with Axios instance:

```javascript
import { authAPI, newsAPI, bookmarkAPI } from "./services/api";

// Authentication
await authAPI.login(email, password);
await authAPI.register(name, email, password);
await authAPI.getProfile();
await authAPI.updateProfile(data);

// News
await newsAPI.getLatest({ page: 1, limit: 12 });
await newsAPI.search("query", { filters });
await newsAPI.getById(id);
await newsAPI.getTrending();

// Bookmarks
await bookmarkAPI.getAll();
await bookmarkAPI.add(articleId);
await bookmarkAPI.remove(articleId);

// Admin
await adminAPI.getStats();
await adminAPI.getSources();
await adminAPI.removeArticle(id);
```

### Mock Data Fallback

When backend unavailable, app uses mock data:

```javascript
import {
  MOCK_ARTICLES,
  MOCK_USER,
  MOCK_DASHBOARD_DATA,
} from "./utils/mockData";
```

Features:

- Sample news articles with all fields
- Mock user profile
- Dashboard analytics data
- Comment threads

## 📱 Responsive Design

### Breakpoints

```
Mobile:   < 640px   (sm)
Tablet:   640px - 1024px (md)
Desktop:  > 1024px  (lg)
```

### Layout Changes

- **Mobile**: Single column, collapsible sidebar, full-width cards
- **Tablet**: Two columns, sidebar visible
- **Desktop**: Three columns, full sidebar, widgets

## 🎯 Component Showcase

### NewsCard

```jsx
<NewsCard
  article={article}
  onBookmark={handleBookmark}
  isBookmarked={isBookmarked}
/>
```

- Image with zoom on hover
- Category & sentiment badges
- Credibility score bar
- Bookmark & share buttons
- Reading time estimation

### Dashboard

- Weekly reading line chart
- Sentiment pie chart
- Category bar chart
- Animated stat counters
- Trending insights

### SearchBar

```jsx
<SearchBar
  onSearch={handleSearch}
  onClear={handleClear}
  placeholder="Search articles..."
/>
```

### SummaryModal

- AI-generated summary
- Key points list
- Credibility information
- Sentiment analysis

## 🔧 Configuration Files

### Tailwind Config (`tailwind.config.js`)

Custom theme configuration:

```javascript
// Custom colors
colors: {
  dark: { 50-950 },
  surface: { dark, card, hover, border },
  accent: { blue, purple, cyan, green, red }
}

// Custom components
.glass - Glassmorphism effect
.card-base - Card with hover effects
.btn-primary - Primary button style
.input-base - Form input style
```

### Vite Config (`vite.config.js`)

Build optimization:

```javascript
rollupOptions: {
  output: {
    manualChunks: {
      vendor: ['react', 'react-dom'],
      router: ['react-router-dom'],
      utils: ['gsap', 'framer-motion']
    }
  }
}
```

## 📊 Performance Optimizations

- **Code Splitting** - Automatic with Vite
- **Tree Shaking** - Unused code removed
- **Lazy Loading** - Route-based code splitting
- **Image Optimization** - Responsive images
- **CSS Minification** - Tailwind purging
- **Bundle Analysis** - Check with `npm run build`

## 🌈 Styling System

### Utility-First Approach

Using Tailwind CSS utility classes:

```jsx
<div className="bg-surface-dark border border-surface-border rounded-2xl p-6">
  <h1 className="text-4xl font-bold text-gradient-animated">Hello World</h1>
</div>
```

### Component Classes

Custom component utilities:

```css
.glass-card - Card with glass effect
.glow-border-blue - Blue glowing border
.text-gradient - Animated gradient text
.btn-glow - Glowing button effect
```

## 🐛 Debugging

### Browser DevTools

Check stored authentication:

```javascript
// Token
localStorage.getItem("authToken");

// User profile
JSON.parse(localStorage.getItem("user"));

// Theme preference
localStorage.getItem("theme");
```

### Console Logging

API calls and errors are logged to browser console.

## 🎓 Code Quality

- **ESM Modules** - Modern JavaScript
- **Functional Components** - React hooks
- **Component Composition** - Reusable patterns
- **Error Boundaries** - Graceful error handling
- **Prop Validation** - Type safety
- **Clean Code** - Self-documenting code

## 🚢 Deployment

### Vercel (Recommended)

```bash
# One-click deployment
npm install -g vercel
vercel
```

### Netlify

1. Build: `npm run build`
2. Deploy `dist/` folder
3. Set build command: `npm run build`
4. Set public directory: `dist`

### GitHub Pages

```bash
npm run build
# Deploy dist/ to gh-pages branch
```

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install && npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

## 📚 API Endpoints Reference

```
POST   /api/auth/login
POST   /api/auth/register
POST   /api/auth/logout
GET    /api/auth/profile
PUT    /api/auth/profile

GET    /api/news/latest
GET    /api/news/trending
GET    /api/news/search?q=query
GET    /api/news/:id
GET    /api/news/category/:category

GET    /api/bookmarks
POST   /api/bookmarks
DELETE /api/bookmarks/:articleId

GET    /api/admin/stats
GET    /api/admin/sources
POST   /api/admin/sources
DELETE /api/admin/sources/:id
GET    /api/admin/reports
POST   /api/admin/articles/:id/remove
```

## 🎁 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📄 License

MIT License - See LICENSE file for details

## 🤝 Contributing

Contributions welcome! Please follow the code style and submit PRs.

## 📞 Support & Contact

For issues, feature requests, or questions, please contact the development team.

---

**Built with ❤️ using React, Vite, Tailwind CSS, and GSAP**

🚀 Designed for premium, modern web experiences in 2026

**Version**: 1.0.0  
**Last Updated**: April 2024  
**Maintainer**: NewsAI Team

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

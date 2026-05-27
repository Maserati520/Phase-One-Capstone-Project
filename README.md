 Phase One Capstone Project — Book Explorer

A responsive, interactive, and API-powered book browsing web app built as part of the Frontend Phase One Capstone Project.

## Live Features
- Browse books fetched from the Open Library API
- Search for books by title
- Add and remove favorite books
- Favorites persist with localStorage
- Skeleton loader while books are loading
- Fully responsive on mobile, tablet, and desktop
- Hamburger menu on mobile devices

---

## Lab Breakdown

### Lab 1 — Responsive Multi-Page Layout
Built the foundation of the Book Explorer app using HTML and Tailwind CSS.
- Homepage with navbar, hero section, and footer
- Responsive book grid (1 → 2 → 3 → 4 columns)
- Mobile-first design with hamburger menu
- Pages: Home, Favorites, About

### Lab 2 — DOM Interactivity & JavaScript Modules
Made the app interactive using JavaScript modules and DOM events.
- Favorites page, where users can add and remove books
- favorites.js module with addToFavorites and removeFromFavorites functions
- DOM click events to update favorites dynamically
- localStorage to persist favorites on page refresh

### Lab 3 — Async JavaScript & API Integration
Fetched real book data from the Open Library API.
- fetchBooks.js module using fetch and async/await
- Homepage populated with real book data from the API
- Search bar to search books by title
- Skeleton loader shown while books are loading
- Error handling with try/catch

### Lab 4 — GitHub Collaboration Simulation
Simulated real-world GitHub collaboration workflows.
- GitHub Projects board to track tasks (UI, API, Favorites)
- Feature branches: feature/search, feature/favorites, feature/skeleton-loader
- GitHub Issues to track bugs and improvements
- All features merged back to main branch

---

## Built With
- HTML5
- Tailwind CSS
- Vanilla JavaScript
- ES6 Modules
- Open Library API
- localStorage
- Git & GitHub

## 📁 Project Structure
```
Phase-One-Capstone-Project/
│
├── index.html          → Homepage
├── favorites.html      → Favorites page
├── about.html          → About page
├── .gitignore
├── README.md
│
└── js/
    ├── app.js          → Main entry point
    ├── fetchBooks.js   → API module
    └── favorites.js    → Favorites module
```

## How to Run
1. Clone the repo
2. Open index.html with Live Server in VS Code
3. Start exploring books!

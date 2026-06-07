# 🍽️ FlavorVault — Restaurant Rating & Review System

FlavorVault is a premium, production-quality restaurant discovery, rating, and review system built entirely using modern **HTML5**, **Vanilla CSS3**, and **Vanilla JavaScript (ES6)**. It utilizes **LocalStorage** for secure-feeling user sessions, credential validation, review management, and profile settings sync.

Designed with a sleek dark-first interface, glassmorphism, responsive grids, and clean animations, it serves as an excellent portfolio-grade showcase of modern web engineering without dependencies.

---

## 🌟 Key Features

### 1. Robust Authentication & Session Guarding
*   **Sign Up & Login:** Creates accounts, validates email formats, handles password mismatch errors, and obfuscates credentials in LocalStorage.
*   **Route Protection:** Automatically redirects unauthenticated users back to the login page if they try to access the dashboard.
*   **Dynamic Navbar User Menu:** Displays user initials, a dashboard link, and a logout option dynamically upon authentication.

### 2. Interactive Discovery Landing Page
*   **Search Engine:** Debounced search matches query words against restaurant names, descriptions, cuisines, and tags.
*   **Cuisine Filters:** Quick-category buttons filter restaurants instantly with a smooth grid layout.
*   **Interactive Stats:** Real-time counter of total restaurants, reviews, and cuisines available on the platform.

### 3. Detailed Restaurant & Review Profile
*   **Menu Card:** Showcases 8-15 menu items per restaurant with prices, descriptions, and Veg/Non-Veg badges.
*   **Sidebar Info:** Displays contact info, timings, average cost for two, and delivery estimates.
*   **Facilities Board:** Visually groups restaurant capabilities (AC ❄️, Valet Parking 🔑, Live Music 🎵, etc.) using custom icons.
*   **Rating Breakdown:** Shows a star count distribution bar graph. Clicking on any rating row filters the review list by that specific star value.
*   **Live Review Engine:** Logged-in users can write a review, select star ratings (1-5), and edit or delete their reviews in real-time. Guests are presented with login prompts.

### 4. Interactive Analytics Dashboard
*   **User Statistics:** Computes total reviews submitted, average rating given, favorite cuisine, and the user's most reviewed restaurant.
*   **Activity Timeline:** Renders a clean chronological timeline of all recent ratings and review actions.
*   **Profile Settings Form:** Enables updating username and email, and changing passwords.
*   **Auto-Synchronization:** Modifying the username immediately propagates the change to all historical reviews submitted by the user.

---

## 🛠️ Technology Stack

*   **Markup:** HTML5 (Semantic elements, responsive viewport metadata).
*   **Styles:** Vanilla CSS3 (Custom properties, dark-first color variables, HSL hues, glassmorphic blur backdrops, responsive Flexbox/Grid systems, keyframe transitions).
*   **Logic:** Vanilla ES6 JavaScript (LocalStorage state management, custom debouncers, IntersectionObservers for lazy animations, global window namespaces for state sharing).
*   **Fonts:** Inter & Outfit (loaded from Google Fonts).

---

## 📂 Project Directory Structure

```text
zomato rating system/
├── css/
│   └── styles.css          # Unified global stylesheet and design system tokens
├── js/
│   ├── auth.js             # Authentication, registration, and user data models
│   ├── data.js             # Expanded Chennai-based restaurant seed dataset
│   ├── dashboard.js        # Tab controls, profile updates, and analytics logic
│   ├── home.js             # Search debouncing, card grids, and landing animations
│   ├── restaurant.js       # Reviews CRUD, rating breakdowns, and menu card rendering
│   └── utils.js            # Shared modal overlays, toast alerts, and theme managers
├── index.html              # Landing discovery page
├── login.html              # Secure portal login
├── signup.html             # User registration form
├── restaurant.html         # Rich restaurant details page
├── dashboard.html          # Analytics panel and profile setting tabs
└── README.md               # Documentation file
```

---

## 💻 How to Run the Project

1.  **Clone or download** the project folder.
2.  **Open** the `index.html` file in any modern web browser directly (no compiler, server, or package installation required!).
3.  *(Optional)* For the best experience, host the files on a local HTTP server. For example:
    *   **Python:** `python -m http.server 8000`
    *   **Node.js:** `npx serve`
    *   **VS Code:** Use the **Live Server** extension.

---

## 📞 Helpline Support

For any assistance or questions regarding the platform, please reach out to our dedicated support helpline:
*   **Helpline:** `9345755706`
*   *Configured consistently in footers, contact cards, and restaurant profile sidebars across the application.*

# 🌉 GyaanSetu (ज्ञानसेतु) — The Digital Courtyard

**GyaanSetu** is a premium, high-performance EdTech platform designed for the modern Indian learner. It bridges the gap between theory and industry by providing technical education in regional languages (Hindi, Gujarati, and English) integrated with cloud-based hands-on labs.

---

## 🚀 Key Features

- **🌍 Multi-Language Support**: Complete content localization in **Hindi**, **Gujarati**, and **English**.
- **🧪 Hands-on Labs**: Integrated, browser-based coding environments for "Learning by Doing."
- **🏗️ Project-Based Learning**: Real-world project catalogs with milestone tracking and workspaces.
- **🛡️ Protected Dashboards**: Role-based access control for Students and Admins.
- **✨ Premium UI/UX**: Built with the "Radiant Scholar" design system using Shadcn UI, Tailwind CSS, and Framer Motion.
- **📊 Real-time Stats**: Gamified learning with XP, streaks, and achievement badges.
- **⚙️ Admin Console**: Professional management suite for users, courses, and analytics.

---

## 🛠️ Technology Stack

### Core Architecture
- **React 18 + Vite**: Lightning-fast development and optimized production builds.
- **TypeScript**: Strict type safety across the entire codebase.
- **React Router v6**: Complex, lazy-loaded routing with guards.

### State & Data Management
- **Redux Toolkit**: Centralized global state (Auth, UI, User).
- **Context API**: Lightweight state for Theme and Language preferences.
- **TanStack Query (v5)**: Robust server state management and caching.

### UI & Aesthetics
- **Tailwind CSS**: Utility-first styling with a custom design system.
- **Shadcn UI (Radix)**: Accessible, high-quality component primitives.
- **Material UI (MUI)**: Integrated for complex enterprise-grade interactions.
- **Framer Motion**: Smooth page transitions and micro-animations.

### Engineering Excellence
- **Formik & Yup / React Hook Form & Zod**: Multi-standard form handling and validation.
- **react-window**: List virtualization for handling large datasets efficiently.
- **Socket.io Ready**: Centralized service for real-time features.
- **Vitest**: Modern testing suite for unit and integration tests.

---

## 📁 Project Structure

```bash
GyaanSetu/
├── Frontend/           # Primary React Application
│   ├── src/
│   │   ├── components/ # Atomic & Reusable UI (Shadcn, MUI)
│   │   ├── contexts/   # React Context Providers
│   │   ├── features/   # Feature-specific logic & components
│   │   ├── hooks/      # Custom reusable hooks
│   │   ├── lib/        # Shared utilities (storage, cn, etc.)
│   │   ├── pages/      # View components (Lazy loaded)
│   │   ├── services/   # API & Socket service layers
│   │   ├── store/      # Redux Toolkit slices
│   │   └── types/      # TypeScript definitions
│   └── public/         # Static assets & SEO files
```

---

## ⚙️ Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/DhruvOzha85/GyaanSetu.git
   cd GyaanSetu/Frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file:
   ```bash
   VITE_API_BASE_URL=https://api.gyaansetu.in
   VITE_GA_ID=your_ga4_id
   ```

4. **Launch Development Server**:
   ```bash
   npm run dev
   ```

---

## 🧪 Testing & Linting

Maintain code quality with built-in tools:
```bash
# Run unit tests
npm test

# Check for linting errors
npm run lint

# TypeScript type check
npx tsc --noEmit
```

---

## 👤 Author

**Dhruv Ojha**
*Full-Stack Developer & Product Designer*

- [GitHub](https://github.com/DhruvOzha85)
- [Portfolio](https://dhruvozha.in)

---
*Built with ❤️ to bridge the education gap in India.*
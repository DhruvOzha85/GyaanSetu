# GyaanSetu (ज्ञानसेतु) — The Digital Courtyard

**GyaanSetu** is a premium, high-performance EdTech platform designed for the modern Indian learner. It bridges the gap between theory and industry by providing technical education in regional languages (Hindi, Gujarati, and English) integrated with cloud-based hands-on labs.

## 🚀 Key Features

- **Multi-Language Support**: Learn in Hindi, Gujarati, or English.
- **Hands-on Labs**: Integrated cloud environments for "Learning by Doing."
- **Project-Based Learning**: Real-world project catalogs with workspaces.
- **Admin Dashboard**: Comprehensive management of users, courses, and analytics.
- **Digital Courtyard UI**: A high-fidelity, custom design system using Tailwind CSS and Radix UI.
- **Pure JavaScript Migration**: Fully optimized for Vite production builds with a lean, type-free codebase.
- **State Management**: Robust state handling using Redux Toolkit and Context API.
- **SEO Optimized**: Dynamic meta tags, Open Graph support, and JSON-LD schema.

## 🛠️ Technology Stack

- **Core**: React 18, Vite 8 (Pure JavaScript / JSX)
- **Styling**: Tailwind CSS, Radix UI primitives
- **State Management**: Redux Toolkit (Slices), React Context (Auth/Theme), TanStack Query (v5)
- **Routing**: React Router v6 with Route Guards (Protected/Role-based)
- **Forms**: React Hook Form & Zod / Formik & Yup
- **API**: Axios with centralized interceptors (Auth & Error handling)
- **Testing**: Vitest, React Testing Library
- **Analytics**: Google Analytics 4 integration
- **Design**: [Figma Design System](https://www.figma.com/design/VJS8z63ENFBdYR7R6728i3/GyaanSetu?node-id=0-1&t=z29S6KUnC5jqRb88-1)


## 📁 Project Structure

```
src/
├── assets/          # Static assets (images, icons)
├── components/      # Reusable UI components
│   ├── layouts/     # Layout wrappers (Public, Admin, Auth)
│   └── ui/          # Atomic components (Radix + Tailwind)
├── contexts/        # React Contexts (Auth, Theme, MUI)
├── data/            # Mock data and constants
├── features/        # Feature-based business logic (Course, Lab, User)
├── hooks/           # Custom reusable hooks (toast, localstorage)
├── lib/             # Utilities and shared logic (storage, cn)
├── pages/           # Page components (CourseDetail, Dashboard, etc.)
│   └── admin/       # Admin-specific modules
├── services/        # API client and service layers (socket, auth)
├── store/           # Redux Toolkit store and slices (auth, ui)
└── test/            # Test setup and utilities
```

## ⚙️ Getting Started

### Prerequisites
- Node.js (v20+)
- npm

### Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file based on `.env.example`:
   ```bash
   VITE_API_BASE_URL=your_api_url
   VITE_GA_ID=your_google_analytics_id
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## 🧪 Testing & Linting
Run tests and linting:
```bash
npm test
npm run lint
```

## 🏗️ Production Build
Create a production-ready bundle:
```bash
npm run build
```
The project is optimized for direct Vercel/Netlify deployment.

## 📜 Documentation
GyaanSetu follows a "Digital Courtyard" architecture, prioritizing modularity and separation of concerns across its features and services.

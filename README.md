# Foodie - Premium Food Delivery Application 🍔🍕

![Foodie Banner](public/screenshots/1.png)

> A modern, full-stack food ordering platform built with Next.js 16, TypeScript, and MongoDB. Designed with a premium, mobile-responsive UI similar to top-tier delivery apps like Swiggy and Zomato.

## 🚀 Introduction

**Foodie** is a feature-rich web application that allows users to browse food items, filter by categories, and manage orders. It features a robust admin dashboard for managing restaurants and menu items, all wrapped in a beautiful, highly animated user interface.

## ✨ Features

### 👤 User Interface

- **Dynamic Home Page**: Featuring horizontal scrollable categories, "Best Sellers", "Chef's Specials", and a high-impact "Mega Combo" promo section.
- **Advanced Menu Filtering**: Filter by Category (Burgers, Pizza, etc.), Sub-category (Veg/Non-Veg), and toggle specific dietary preferences.
- **Search & Sort**: Real-time search for food items and sorting by Price, Rating, etc.
- **Premium Aesthetics**: Glassmorphism effects, smooth transitions (`tw-animate-css`), and responsive design for all devices.
- **About Us**: Dedicated page telling the brand story with visual storytelling.

### 🛡️ Admin Dashboard

- **Restaurant Management**: Add, edit, and delete restaurant/menu details.
- **Analytics**: Data visualization using `recharts` for sales and order trends.

### 🔐 Authentication & Security

- **Secure Auth**: Powered by **NextAuth.js** for secure user sessions.
- **Database**: Robust data modeling with **MongoDB** and **Mongoose**.

## 🛠️ Tech Stack

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/), `tw-animate-css`
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/) (Radix UI primitives)
- **Database**: [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **State/Data**: React Hooks, TanStack Query (optional/ready)
- **Charts**: [Recharts](https://recharts.org/)

## 📂 Project Structure

```bash
foodie/
├── src/
│   ├── app/              # Next.js App Router pages
│   │   ├── admin/        # Admin dashboard routes
│   │   ├── api/          # Backend API routes
│   │   ├── menu/         # Menu page
│   │   ├── about/        # About Us page
│   │   └── page.tsx      # Home page
│   ├── components/       # Reusable React components
│   │   ├── ui/           # Shadcn UI components
│   │   └── ...
│   ├── models/           # Mongoose schemas (Order, MenuItem, etc.)
│   ├── lib/              # Utility functions and DB connection
│   └── data/             # Mock data for development
├── public/               # Static assets
└── package.json          # Project dependencies
```

## 🏁 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- Node.js (v18+)
- pnpm (recommended) or npm/yarn
- MongoDB URI (local or Atlas)

### Installation

1.  **Clone the repository**

    ```bash
    git clone https://github.com/A-S-Vignesh/foodrestaurent.git
    cd foodrestaurent
    ```

2.  **Install dependencies**

    ```bash
    pnpm install
    # or
    npm install
    ```

3.  **Set up Environment Variables**
    Create a `.env` file in the root directory:

    ```env
    MONGODB_URI=your_mongodb_connection_string
    NEXTAUTH_SECRET=your_nextauth_secret
    NEXTAUTH_URL=http://localhost:3000
    ```

4.  **Run the development server**

    ```bash
    pnpm run dev
    ```

5.  Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🤝 Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.

## 📄 License

This project is licensed under the MIT License.

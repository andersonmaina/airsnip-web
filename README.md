# ✂ Airsnip Landing Page

> AirDrop for developer teams. Push code. Pull anywhere. No browser needed.

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)

Airsnip is a CLI-first code sharing tool for developer teams. This repository contains the modern, high-performance landing page built with React, TypeScript, and Vite.

---

## ✨ Features

- **CLI-First Experience**: Dark terminal showcase with realistic team workflows.
- **Dynamic Animations**: Smooth, staggered entrance animations using Intersection Observer.
- **Waitlist Integration**: Secure email collection powered by Supabase.
- **Premium Design**: Clean, minimal sky-blue aesthetic inspired by Vercel and Linear.
- **Fully Responsive**: Optimized for everything from mobile terminals to desktop workstations.

---

## 🛠 Tech Stack

- **Framework**: [React 18](https://reactjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Bundler**: [Vite](https://vitejs.dev/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Backend**: [Supabase](https://supabase.com/)
- **Typography**: DM Sans (Body) & DM Mono (Code)

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/Airsnip/Landing.git
cd Landing
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure Environment
Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```
Add your Supabase credentials:
- `VITE_SUPABASE_URL`: Your project's API URL.
- `VITE_SUPABASE_ANON_KEY`: Your project's public anonymous key.

### 4. Database Setup
Create a table named `waitlist` in your Supabase project and enable insertions via RLS:

```sql
create table waitlist (
  id uuid default gen_random_uuid() primary key,
  email text not null unique,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- IMPORTANT: Enable RLS and allow anonymous signups
alter table waitlist enable row level security;

create policy "Enable insert for anonymous users"
on waitlist for insert
to anon
with check (true);
```

### 5. Start Development
```bash
npm run dev
```

---

## 📄 License

© 2025 Airsnip. All rights reserved. Made for developers.
# Expense Tracker - Build Plan

## Phase 1: Project Setup
- Verify Next.js, TypeScript, and Tailwind are configured correctly
- Install and configure shadcn/ui with the Mira preset
- Install Recharts for data visualization
- Set up global layout with dark theme

## Phase 2: Data Layer
- Define the `Expense` TypeScript type/interface (id, title, amount, category, date, notes)
- Define the `Category` type and constants
- Create a `useExpenses` custom hook to manage CRUD operations with localStorage
- Write helper utilities: format currency, format date, calculate summaries

## Phase 3: Layout & Navigation
- Build the root layout (`src/app/layout.tsx`) with sidebar and mobile nav
- Build the `Sidebar` component with links to Dashboard and Expenses pages
- Build a `MobileNav` component (bottom nav or hamburger menu)
- Ensure layout is responsive across mobile, tablet, and desktop

## Phase 4: Dashboard Page
- Build `SummaryCard` component (reusable card for metrics)
- Render four summary cards: Total Spent, This Month, Top Category, Total Expenses
- Build `SpendingByCategory` bar chart using Recharts
- Build `SpendingOverTime` line chart using Recharts
- Build `RecentExpenses` list showing the 5 most recent expenses
- Wire everything to the `useExpenses` hook

## Phase 5: Expenses Page
- Build the full expenses list with a table or card layout
- Add category filter (dropdown/select)
- Add date range filter
- Add delete action per expense (with confirmation)
- Add edit action per expense (links to Add/Edit page)
- Show empty state when no expenses match filters

## Phase 6: Add/Edit Expense Page
- Build the expense form with fields: title, amount, category, date, notes
- Use shadcn `Input`, `Select`, `Textarea`, `DatePicker`, and `Button` components
- Validate all required fields
- On submit: add new expense or update existing one via `useExpenses` hook
- Redirect back to Expenses page after save
- Pre-populate form fields when editing an existing expense

## Phase 7: Polish & Animations
- Add smooth page transitions
- Add loading/empty states across all pages
- Add hover and focus animations to interactive elements
- Final responsiveness pass across all pages and components
- QA: test all CRUD flows, chart rendering, and filter behavior

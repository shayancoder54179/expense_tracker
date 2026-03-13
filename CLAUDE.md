# Expense Tracker

## Project
Expense Tracker web app

## Tech Stack
- Next.js 16.1.6 with App Router
- TypeScript
- Tailwind CSS
- Shadcn/ui (Mira preset, Radix)

## Project Structure
- All pages go in `src/app/`
- All components go in `src/components/`
- Use shadcn components as much as possible
- Keep components small and reusable

## Commands
- `npm run dev` - start dev server
- `npm run build` - build for production

## Coding Rules
- Always use TypeScript, no `any` types
- Always use Tailwind for styling, no custom CSS
- Use shadcn components for all UI elements
- Always make it mobile responsive
- Never put everything in one file, split into components

## Design System

### Theme
- Dark premium theme using Shadcn Mira preset
- Use CSS variables from shadcn, never hardcode colors

### Typography
- Headings: font-bold, tracking-tight
- Body: text-muted-foreground for secondary text
- Numbers/amounts: font-mono for all money values

### Layout
- Sidebar navigation on desktop, bottom nav on mobile
- Max content width: max-w-7xl mx-auto
- Page padding: p-6 on desktop, p-4 on mobile
- Consistent gap-6 between sections

### Cards
- Always use shadcn Card component
- Rounded-xl for all cards
- Subtle border with border-border

### Colors for Categories
- Food: orange
- Transport: blue
- Shopping: purple
- Bills: red
- Entertainment: green
- Other: gray

### Animations
- Use transition-all duration-200 for hover effects
- Fade in new items when added to list

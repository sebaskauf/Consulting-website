# Vibe AI Consulting Website

A modern, professional website for Vibe AI Consulting built with Next.js, TypeScript, and Tailwind CSS.

## Getting Started

### Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view your site.

### Building for Production

```bash
npm run build
npm start
```

## Working with 21st.dev Components

This project is optimized for integrating beautiful components from [21st.dev](https://21st.dev).

### Quick Integration with Claude Code

**Method 1: Tell Claude what you want**
```
"Add a hero section from 21st.dev to the homepage"
"I want to use the pricing table component from 21st.dev"
```

**Method 2: Provide the component directly**
1. Find a component on [21st.dev](https://21st.dev)
2. Copy the component code
3. Tell Claude: "Create a component file for this" and paste the code

### Component Organization

```
src/
├── components/
│   ├── ui/          # 21st.dev UI components go here
│   └── sections/    # Custom section components
├── app/
│   └── page.tsx     # Homepage (ready for your components)
```

## Project Structure

- **TypeScript** - Type-safe code
- **Tailwind CSS** - Utility-first styling (perfect for 21st.dev components)
- **App Router** - Modern Next.js routing
- **ESLint** - Code quality

## Tips for Using 21st.dev Components

1. Most components from 21st.dev work out-of-the-box
2. They use Tailwind CSS classes (already configured)
3. TypeScript types may need small adjustments (Claude Code handles this)
4. Components are fully customizable

## Customization

Edit `src/app/page.tsx` to modify the homepage. The starter template includes:
- Hero section with Vibe AI Consulting branding
- Placeholder sections ready for 21st.dev components
- Responsive design

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [21st.dev Component Library](https://21st.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

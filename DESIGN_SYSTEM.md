# SOL STIMULUS Design System
## Futuristic Solana-Inspired Terminal Aesthetic

---

## Color Palette

### Primary Colors
```css
--sol-purple: #9945FF;        /* Solana primary purple */
--sol-green: #14F195;          /* Solana accent green */
--sol-blue: #00D4FF;           /* Cyber blue accent */
--sol-pink: #DC1FFF;           /* Neon pink highlight */
```

### Background Colors
```css
--bg-dark: #0A0A0F;            /* Deep dark background */
--bg-darker: #050508;          /* Darker sections */
--bg-card: #13131A;            /* Card backgrounds */
--bg-elevated: #1A1A24;        /* Elevated surfaces */
--bg-terminal: #0D0D12;        /* Terminal-style sections */
```

### Text Colors
```css
--text-primary: #FFFFFF;       /* Primary white text */
--text-secondary: #B4B4C8;     /* Dimmed text */
--text-muted: #6B6B80;         /* Muted labels */
--text-glow: #14F195;          /* Glowing accent text */
--text-highlight: #9945FF;     /* Highlighted text */
```

### Border & Accent Colors
```css
--border-primary: #9945FF;     /* Primary borders */
--border-glow: rgba(153, 69, 255, 0.4);  /* Glowing borders */
--border-secondary: #14F195;   /* Secondary borders */
--border-dim: rgba(255, 255, 255, 0.1);  /* Subtle borders */
```

### Status Colors
```css
--success: #14F195;            /* Success states */
--warning: #FFB800;            /* Warning states */
--error: #FF3B69;              /* Error states */
--info: #00D4FF;               /* Info states */
```

### Overlay & Shadow
```css
--overlay-dark: rgba(5, 5, 8, 0.9);
--overlay-card: rgba(19, 19, 26, 0.85);
--shadow-glow: 0 0 20px rgba(153, 69, 255, 0.5);
--shadow-glow-green: 0 0 20px rgba(20, 241, 149, 0.5);
--shadow-card: 0 8px 32px rgba(0, 0, 0, 0.6);
```

---

## Typography

### Font Families
```css
--font-primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-mono: 'JetBrains Mono', 'Fira Code', 'Courier New', monospace;
--font-display: 'Orbitron', sans-serif;  /* For headers/logo */
```

### Font Sizes (Fluid Typography)
```css
--text-xs: clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem);      /* 12-14px */
--text-sm: clamp(0.875rem, 0.8rem + 0.35vw, 1rem);         /* 14-16px */
--text-base: clamp(1rem, 0.95rem + 0.25vw, 1.125rem);      /* 16-18px */
--text-lg: clamp(1.125rem, 1rem + 0.5vw, 1.5rem);          /* 18-24px */
--text-xl: clamp(1.5rem, 1.2rem + 1vw, 2rem);              /* 24-32px */
--text-2xl: clamp(2rem, 1.5rem + 2vw, 3rem);               /* 32-48px */
--text-3xl: clamp(2.5rem, 2rem + 2.5vw, 4rem);             /* 40-64px */
```

### Font Weights
```css
--font-regular: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

### Line Heights
```css
--leading-tight: 1.2;
--leading-normal: 1.5;
--leading-relaxed: 1.75;
```

---

## Spacing Scale

```css
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-5: 1.5rem;    /* 24px */
--space-6: 2rem;      /* 32px */
--space-8: 3rem;      /* 48px */
--space-10: 4rem;     /* 64px */
--space-12: 6rem;     /* 96px */
```

---

## Border Radius

```css
--radius-sm: 0.25rem;    /* 4px - small elements */
--radius-md: 0.5rem;     /* 8px - buttons */
--radius-lg: 0.75rem;    /* 12px - cards */
--radius-xl: 1rem;       /* 16px - large cards */
--radius-2xl: 1.5rem;    /* 24px - hero sections */
--radius-full: 9999px;   /* Fully rounded */
```

---

## Animation & Transitions

### Timing Functions
```css
--ease-out: cubic-bezier(0.16, 1, 0.3, 1);
--ease-in-out: cubic-bezier(0.45, 0, 0.55, 1);
--ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

### Durations
```css
--duration-fast: 150ms;
--duration-normal: 250ms;
--duration-slow: 400ms;
```

### Common Transitions
```css
--transition-all: all var(--duration-normal) var(--ease-out);
--transition-color: color var(--duration-fast) var(--ease-out);
--transition-transform: transform var(--duration-normal) var(--ease-out);
```

---

## Component Patterns

### Cards
```css
background: var(--bg-card);
border: 1px solid var(--border-dim);
border-radius: var(--radius-lg);
padding: var(--space-6);
box-shadow: var(--shadow-card);
transition: var(--transition-all);

/* Hover State */
border-color: var(--border-glow);
box-shadow: var(--shadow-glow);
transform: translateY(-2px);
```

### Buttons (Primary)
```css
background: linear-gradient(135deg, var(--sol-purple) 0%, var(--sol-pink) 100%);
color: var(--text-primary);
border: none;
border-radius: var(--radius-md);
padding: var(--space-3) var(--space-6);
font-weight: var(--font-semibold);
transition: var(--transition-all);

/* Hover State */
box-shadow: var(--shadow-glow);
transform: scale(1.05);
```

### Buttons (Secondary)
```css
background: transparent;
color: var(--sol-green);
border: 1px solid var(--sol-green);
border-radius: var(--radius-md);
padding: var(--space-3) var(--space-6);
transition: var(--transition-all);

/* Hover State */
background: rgba(20, 241, 149, 0.1);
box-shadow: var(--shadow-glow-green);
```

### Terminal-Style Sections
```css
background: var(--bg-terminal);
border: 1px solid var(--border-glow);
border-radius: var(--radius-lg);
padding: var(--space-6);
font-family: var(--font-mono);
position: relative;

/* Terminal Header */
&::before {
  content: '$ ./sol-stimulus.sh';
  color: var(--sol-green);
  font-size: var(--text-sm);
  display: block;
  margin-bottom: var(--space-4);
}
```

### Glowing Text
```css
color: var(--sol-green);
text-shadow:
  0 0 10px rgba(20, 241, 149, 0.6),
  0 0 20px rgba(20, 241, 149, 0.4),
  0 0 30px rgba(20, 241, 149, 0.2);
```

---

## Grid System

### Container
```css
max-width: 1400px;
margin: 0 auto;
padding: 0 var(--space-4);

@media (min-width: 768px) {
  padding: 0 var(--space-6);
}
```

### Responsive Grid
```css
display: grid;
gap: var(--space-6);
grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
```

---

## Breakpoints

```css
--mobile: 480px;
--tablet: 768px;
--desktop: 1024px;
--wide: 1400px;
```

---

## Visual Effects

### Backdrop Blur
```css
backdrop-filter: blur(20px) saturate(180%);
-webkit-backdrop-filter: blur(20px) saturate(180%);
```

### Neon Glow Animation
```css
@keyframes neon-pulse {
  0%, 100% {
    text-shadow:
      0 0 10px rgba(153, 69, 255, 0.8),
      0 0 20px rgba(153, 69, 255, 0.6),
      0 0 30px rgba(153, 69, 255, 0.4);
  }
  50% {
    text-shadow:
      0 0 15px rgba(153, 69, 255, 1),
      0 0 30px rgba(153, 69, 255, 0.8),
      0 0 45px rgba(153, 69, 255, 0.6);
  }
}
```

### Scan Line Effect
```css
@keyframes scanline {
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100vh); }
}

.scanline {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(
    to bottom,
    transparent,
    rgba(20, 241, 149, 0.3),
    transparent
  );
  animation: scanline 8s linear infinite;
  pointer-events: none;
  z-index: 9999;
}
```

### Grid Background Pattern
```css
background-image:
  linear-gradient(rgba(153, 69, 255, 0.05) 1px, transparent 1px),
  linear-gradient(90deg, rgba(153, 69, 255, 0.05) 1px, transparent 1px);
background-size: 50px 50px;
```

---

## Icon System

### Use Lucide Icons or similar minimal icon set
- Terminal icons for tech elements
- Solana logo for branding
- Wallet icons for addresses
- Arrow icons for navigation

---

## Accessibility

### Focus States
```css
outline: 2px solid var(--sol-green);
outline-offset: 2px;
```

### Minimum Contrast Ratios
- Text on dark background: 4.5:1 minimum
- Large text: 3:1 minimum
- Interactive elements: Clear visual feedback

---

## Usage Guidelines

1. **Always use CSS variables** - Never hardcode colors
2. **Maintain consistent spacing** - Use spacing scale
3. **Animations should be subtle** - Don't overdo glowing effects
4. **Terminal aesthetic** - Use monospace fonts for data displays
5. **Solana brand alignment** - Purple and green are primary accents
6. **Dark mode first** - Design is dark by default
7. **Performance** - Minimize heavy animations on mobile

---

## Implementation Priority

1. Set up CSS variables in `:root`
2. Apply base styles to body and global elements
3. Create reusable component classes
4. Add hover/focus states
5. Test responsiveness
6. Add animations last

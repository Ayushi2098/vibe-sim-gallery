---
description: Holographic simulation interface design system and color scheme
---

# Holographic Simulation Interface Design System

**Project Theme:** Holographic Simulation Interface  
**Primary Interaction Color:** Purple

All simulations must follow this strict color hierarchy to create a futuristic holographic interface where purple represents power, control, and interaction.

---

## 1. Color Palette (Tutero Co Teacher)

### Primary Color – Purple (Interaction & Energy)

Purple is the **EXCLUSIVE** interaction signal. Every interactive element must use purple.

| Variant | Hex Code | Usage |
| :--- | :--- | :--- |
| **Main Purple (Primary 500)** | `#832EC5` | **ALL** primary interactions: clickable, hoverable, draggable, active, selected, focused, progressing, loading, powered-on |
| **Light Purple** | `#F3D5FC` | Subtle backgrounds, disabled states with transparency |
| **Medium Purple** | `#AB5DDC` | Soft outer glow, secondary highlights |
| **Dark Purple** | `#38085E` | Deep shadows, depth layers in purple elements |

### Gradient (Use Sparingly)

```
#FFC700 → #B900FF → #832EC5
```

**Use only for:** Hero elements, energy flows, holographic effects, dramatic emphasis. Never for standard interactions.

### Secondary Color – Yellow (Accent Only)

> [!CAUTION]
> **Yellow must NEVER be used for interactions.** It is a secondary accent only.

| Variant | Hex Code | Usage |
| :--- | :--- | :--- |
| **Main Yellow** | `#FFC700` | Non-interactive accents, decorative elements |
| **Dark Yellow** | `#CC9300` | Muted accents |
| **Very Dark Yellow** | `#332800` | Deep accent shadows |

### Neutral System

| Role | Color | Hex Code | Opacity Variants | Usage |
| :--- | :--- | :--- | :--- | :--- |
| **Black Base** | Dark Blue-Black | `#17394D` | 3%, 10%, 40%, 70%, 100% | Backgrounds, panels, depth layers |
| **White** | Pure White | `#FFFFFF` | 5%, 20%, 40%, 70%, 100% | Primary text, secondary text (with opacity), non-interactive UI |

**Suggested Neutral Implementations:**
- **Text Primary:** `#FFFFFF` (100% opacity)
- **Text Secondary:** `rgba(255, 255, 255, 0.70)` (70% opacity)
- **Borders/Dividers:** `rgba(255, 255, 255, 0.10)` (10% opacity)
- **Background Dark:** `#17394D` or `rgba(23, 57, 77, 0.40)`
- **Panel Backgrounds:** `rgba(23, 57, 77, 0.70)` (semi-transparent)

---

## 2. Mandatory Interaction Rules

> [!IMPORTANT]
> **Purple is ALWAYS the interaction signal.** No exceptions.

### Interactive Elements (Must Use Purple)

All of the following **must** use purple (#832EC5):
- Clickable buttons, controls, toggles
- Hoverable areas
- Draggable points, handles, sliders
- Active/selected states
- Focused elements
- Progress indicators, loading states
- "Powered-on" or "energized" states

### Purple Glow Requirement

Every interactive point **must** emit a purple glow:
- **Core glow:** Use `#832EC5`
- **Soft outer glow:** Use `#AB5DDC` with transparency
- **Glow intensity:** Increase on hover or activation

### Text Color Rules

- **Dark backgrounds (black/near-black):**
  - Text → White (`#FFFFFF`)
  - Highlights → Purple only (`#832EC5`)
  - **Never use yellow for primary emphasis**

### Interaction Entry Points

Any place where a user can begin interaction must:
- Be visually obvious
- Emit a purple glow or pulse
- Stand out clearly from static UI elements

---

## 3. Holographic Simulation Styling

### Backgrounds
- Use dark black (`#17394D` or darker opacity layers)
- Subtle gradients or noise allowed for depth

### UI Panels
- Semi-transparent black (`rgba(23, 57, 77, 0.70)`)
- Soft edges, avoid harsh borders

### Motion & Animation
- Purple pulses, waves, or energy lines indicate system activity
- Smooth transitions enhance the holographic feel

### Feedback States
- **Success:** Purple glow (`#832EC5`)
- **Active state:** Strong purple highlight
- **Disabled:** Muted white/gray, **never purple**

---

## 4. Color Hierarchy (Strict Order)

Follow this priority order:

1. **Purple** → Interaction, focus, energy, control
2. **White** → Readability, structure, static UI
3. **Black** → Depth, background, panels
4. **Yellow** → Secondary accent only (**never** interaction)

---

## 5. Implementation Guidelines

### For Mafs Components

- **Interactive Points:** Use `color="#832EC5"` with glow effect
- **Lines (interactive):** Use `color="#832EC5"`
- **Static Lines:** Use `rgba(255, 255, 255, 0.40)` or neutral white
- **Shaded Regions:** Use `fillOpacity={0.15}` with purple or neutral
- **Labels:** Use `color="#FFFFFF"` for general labels

### For Control Buttons/Toggles

```tsx
// Active state
style={{
  backgroundColor: '#832EC5',
  boxShadow: '0 0 20px rgba(131, 46, 197, 0.6), 0 0 40px rgba(171, 93, 220, 0.3)'
}}

// Hover state (increase glow intensity)
style={{
  boxShadow: '0 0 30px rgba(131, 46, 197, 0.8), 0 0 60px rgba(171, 93, 220, 0.5)'
}}

// Disabled state
style={{
  backgroundColor: 'rgba(255, 255, 255, 0.20)',
  color: 'rgba(255, 255, 255, 0.40)',
  cursor: 'not-allowed'
}}
```

### For Panels/Containers

```tsx
style={{
  backgroundColor: 'rgba(23, 57, 77, 0.70)',
  border: '1px solid rgba(255, 255, 255, 0.10)',
  borderRadius: '8px'
}}
```

---

## 6. Final Design Intent

The interface should feel like a **futuristic holographic simulation** where:
- **Purple represents power, control, and interaction**
- Users instinctively understand that **anything glowing purple is interactive**
- **No interaction should ever feel ambiguous** — purple makes it obvious
- The aesthetic is **premium, dynamic, and state-of-the-art**

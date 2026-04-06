# Element Breaker

A brick-breaker game where every brick is an element from the periodic table, each with unique gameplay effects.

Built with **Next.js**, **Matter.js** (physics), **Tailwind CSS** (styling), and **Canvas API** (rendering).

## How to Play

- **Move** the paddle with your mouse or touch/drag on mobile.
- **Click / Tap** to launch the ball.
- Destroy element blocks by bouncing the ball into them.
- Clear all breakable elements to beat **Stage 1** (H through Ca).
- You have **3 lives** — the ball respawning on the paddle each time it falls.

## Element Groups & Effects

Each of the 20 elements (H–Ca) belongs to a role group with distinct mechanics:

### Attack (red)
| Element | Effect | Description |
|---------|--------|-------------|
| H (1) | Explosion | Small-radius blast damages nearby blocks |
| Li (3) | Chain Lightning | Arcs electricity to the 2 nearest blocks |
| Na (11) | Chain Explosion | Larger blast that chain-detonates neighbours |
| K (19) | Fast Chain Explosion | Even bigger and faster chain detonation |

### Defense (blue)
| Element | Effect | Description |
|---------|--------|-------------|
| Be (4) | Shard Splash | Metal shards fly out and hit nearby blocks |
| C (6) | Diamond | High durability (3 HP), no special effect |
| Al (13) | Sharp Reflect | Reflects the ball at a sharper angle |
| Ar (18) | Floor Shield | Creates a temporary safety net at the bottom |

### Utility (purple)
| Element | Effect | Description |
|---------|--------|-------------|
| He (2) | Lift | Boosts the ball upward |
| B (5) | Slow Control | Slows the ball for easier aiming |
| O (8) | Ball Power-up | Increases ball size temporarily |
| Ne (10) | Bounce | Strong bouncy bumper effect |
| Si (14) | Trajectory Guide | Shows predicted ball path for a few seconds |
| P (15) | Trail Damage | Ball leaves a damaging trail |

### Debuff (green)
| Element | Effect | Description |
|---------|--------|-------------|
| F (9) | Corrosion | Reduces durability of nearby blocks |
| S (16) | Gas Zone | Slows paddle movement temporarily |
| Cl (17) | Paddle Shrink | Reduces paddle size temporarily |

### Score (gold)
| Element | Effect | Description |
|---------|--------|-------------|
| N (7) | Freeze Score | Freezes nearby blocks, 1.5x score multiplier |
| Mg (12) | Flash Bonus | Instant +500 score bonus |

### Boss (orange)
| Element | Effect | Description |
|---------|--------|-------------|
| Ca (20) | Boss Core | 5 HP, triggers Stage Clear on destruction |

## Scoring

- Base points = atomic number x 10
- **Chain bonus**: +50 per chain depth when explosions cascade
- **Score multiplier**: Nitrogen's freeze effect gives 1.5x
- **Flash bonus**: Magnesium gives an instant +500

## Architecture

```
src/
├── game/
│   ├── elements.ts    # Element data definitions (20 elements, groups, params)
│   ├── effects.ts     # Effect handler registry (pure game logic)
│   └── vfx.ts         # Visual effects manager (particles, flashes, bolts)
├── components/
│   └── Game.tsx        # Main game component (Matter.js + Canvas rendering)
└── app/
    ├── page.tsx        # Next.js page
    ├── layout.tsx      # Root layout with dark theme
    └── globals.css     # Tailwind + base styles
```

**Design principles:**
- Data-driven: all element behaviour defined declaratively in `elements.ts`
- Logic/VFX separation: `effects.ts` mutates game state, `vfx.ts` only draws
- Each effect is a standalone registered function — easy to add new elements
- Extensible: add elements 21–118 by adding entries to the `ELEMENTS` array

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to play.

## Tech Stack

- **Next.js 16** — React framework
- **Matter.js** — 2D physics engine
- **Tailwind CSS v4** — Styling
- **Canvas API** — Game rendering & particle effects
- **TypeScript** — Type safety throughout

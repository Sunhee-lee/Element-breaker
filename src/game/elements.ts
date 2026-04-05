// ============================================================
// Periodic Breaker – Element Data Definitions
// Each element is a brick with unique gameplay mechanics.
// ============================================================

/** Gameplay role of the element block */
export type ElementGroup =
  | "attack"
  | "defense"
  | "utility"
  | "debuff"
  | "score"
  | "boss";

/** Visual‐effect key (rendered by the VFX layer) */
export type VfxKey =
  | "explosion_red"
  | "explosion_orange"
  | "chain_lightning"
  | "fast_explosion"
  | "shard_splash"
  | "none"
  | "sharp_reflect"
  | "shield_blue"
  | "lift_white"
  | "slow_blue"
  | "powerup_gold"
  | "neon_bounce"
  | "trajectory_line"
  | "trail_fire"
  | "corrosion_green"
  | "gas_yellow"
  | "paddle_shrink"
  | "freeze_ice"
  | "flash_white"
  | "boss_shatter";

/** Effect parameter map – union of every effect's params */
export interface EffectParams {
  // explosion / chain
  radius?: number;
  chain?: boolean;
  fastTrigger?: boolean;
  // chain_lightning
  targets?: number;
  range?: number;
  // shard_splash
  shardCount?: number;
  // durability override
  durability?: number;
  // reflect
  reflectMultiplier?: number;
  // timed effects
  duration?: number;
  // lift
  upwardBoost?: number;
  // slow
  slowMultiplier?: number;
  // ball powerup
  sizeMultiplier?: number;
  // bounce
  bouncePower?: number;
  // trajectory
  guideBounces?: number;
  // trail damage
  interval?: number;
  // corrosion
  durabilityDown?: number;
  // gas zone
  zoneHeight?: number;
  paddleSpeedMultiplier?: number;
  // paddle debuff
  scale?: number;
  // score
  multiplier?: number;
  bonus?: number;
  // boss
  clearOnBreak?: boolean;
}

/** Full element definition – one per brick type */
export interface ElementDef {
  atomicNumber: number;
  symbol: string;
  name: string;
  group: ElementGroup;
  breakable: boolean;
  durability: number; // -1 = indestructible
  effect: string;
  params: EffectParams;
  vfx: VfxKey;
  /** Position in the standard 18-column periodic table */
  row: number;
  col: number;
}

// ────────────────────────────────────────────────────────────
//  Color palette per group (used by both block renderer & VFX)
// ────────────────────────────────────────────────────────────

export const GROUP_COLORS: Record<
  ElementGroup,
  { fill: string; glow: string; text: string; border: string }
> = {
  attack: {
    fill: "#dc2626",
    glow: "rgba(220,38,38,0.5)",
    text: "#fecaca",
    border: "#f87171",
  },
  defense: {
    fill: "#3b82f6",
    glow: "rgba(59,130,246,0.5)",
    text: "#dbeafe",
    border: "#60a5fa",
  },
  utility: {
    fill: "#8b5cf6",
    glow: "rgba(139,92,246,0.5)",
    text: "#ede9fe",
    border: "#a78bfa",
  },
  debuff: {
    fill: "#65a30d",
    glow: "rgba(101,163,13,0.5)",
    text: "#ecfccb",
    border: "#84cc16",
  },
  score: {
    fill: "#eab308",
    glow: "rgba(234,179,8,0.5)",
    text: "#fef9c3",
    border: "#facc15",
  },
  boss: {
    fill: "#ea580c",
    glow: "rgba(234,88,12,0.6)",
    text: "#fed7aa",
    border: "#fb923c",
  },
};

// ────────────────────────────────────────────────────────────
//  Element catalogue  (H → Ca, atomic numbers 1‑20)
// ────────────────────────────────────────────────────────────

export const ELEMENTS: ElementDef[] = [
  // ── ATTACK ──────────────────────────────────────────────
  {
    atomicNumber: 1,
    symbol: "H",
    name: "Hydrogen",
    group: "attack",
    breakable: true,
    durability: 1,
    effect: "explosion",
    params: { radius: 100, chain: false },
    vfx: "explosion_red",
    row: 1,
    col: 1,
  },
  {
    atomicNumber: 3,
    symbol: "Li",
    name: "Lithium",
    group: "attack",
    breakable: true,
    durability: 1,
    effect: "chain_lightning",
    params: { targets: 2, range: 160 },
    vfx: "chain_lightning",
    row: 2,
    col: 1,
  },
  {
    atomicNumber: 11,
    symbol: "Na",
    name: "Sodium",
    group: "attack",
    breakable: true,
    durability: 1,
    effect: "explosion_chain",
    params: { radius: 140, chain: true },
    vfx: "explosion_orange",
    row: 3,
    col: 1,
  },
  {
    atomicNumber: 19,
    symbol: "K",
    name: "Potassium",
    group: "attack",
    breakable: true,
    durability: 1,
    effect: "fast_chain_explosion",
    params: { radius: 170, chain: true, fastTrigger: true },
    vfx: "fast_explosion",
    row: 4,
    col: 1,
  },

  // ── DEFENSE ─────────────────────────────────────────────
  {
    atomicNumber: 4,
    symbol: "Be",
    name: "Beryllium",
    group: "defense",
    breakable: true,
    durability: 2,
    effect: "shard_splash",
    params: { shardCount: 4, range: 80 },
    vfx: "shard_splash",
    row: 2,
    col: 2,
  },
  {
    atomicNumber: 6,
    symbol: "C",
    name: "Carbon",
    group: "defense",
    breakable: true,
    durability: 3,
    effect: "none",
    params: {},
    vfx: "none",
    row: 2,
    col: 14,
  },
  {
    atomicNumber: 13,
    symbol: "Al",
    name: "Aluminum",
    group: "defense",
    breakable: true,
    durability: 2,
    effect: "sharp_reflect",
    params: { reflectMultiplier: 1.25 },
    vfx: "sharp_reflect",
    row: 3,
    col: 13,
  },
  {
    atomicNumber: 18,
    symbol: "Ar",
    name: "Argon",
    group: "defense",
    breakable: true,
    durability: 1,
    effect: "floor_shield",
    params: { duration: 4000 },
    vfx: "shield_blue",
    row: 3,
    col: 18,
  },

  // ── UTILITY ─────────────────────────────────────────────
  {
    atomicNumber: 2,
    symbol: "He",
    name: "Helium",
    group: "utility",
    breakable: true,
    durability: 1,
    effect: "lift",
    params: { upwardBoost: 1.5, duration: 1200 },
    vfx: "lift_white",
    row: 1,
    col: 18,
  },
  {
    atomicNumber: 5,
    symbol: "B",
    name: "Boron",
    group: "utility",
    breakable: true,
    durability: 1,
    effect: "slow_control",
    params: { slowMultiplier: 0.75, duration: 1500 },
    vfx: "slow_blue",
    row: 2,
    col: 13,
  },
  {
    atomicNumber: 8,
    symbol: "O",
    name: "Oxygen",
    group: "utility",
    breakable: true,
    durability: 1,
    effect: "ball_powerup",
    params: { sizeMultiplier: 1.3, duration: 2500 },
    vfx: "powerup_gold",
    row: 2,
    col: 16,
  },
  {
    atomicNumber: 10,
    symbol: "Ne",
    name: "Neon",
    group: "utility",
    breakable: true,
    durability: 1,
    effect: "bounce",
    params: { bouncePower: 1.15 },
    vfx: "neon_bounce",
    row: 2,
    col: 18,
  },
  {
    atomicNumber: 14,
    symbol: "Si",
    name: "Silicon",
    group: "utility",
    breakable: true,
    durability: 1,
    effect: "trajectory_guide",
    params: { duration: 4000, guideBounces: 3 },
    vfx: "trajectory_line",
    row: 3,
    col: 14,
  },
  {
    atomicNumber: 15,
    symbol: "P",
    name: "Phosphorus",
    group: "utility",
    breakable: true,
    durability: 1,
    effect: "trail_damage",
    params: { duration: 2000, interval: 120 },
    vfx: "trail_fire",
    row: 3,
    col: 15,
  },

  // ── DEBUFF ──────────────────────────────────────────────
  {
    atomicNumber: 9,
    symbol: "F",
    name: "Fluorine",
    group: "debuff",
    breakable: true,
    durability: 1,
    effect: "corrosion",
    params: { radius: 120, durabilityDown: 1 },
    vfx: "corrosion_green",
    row: 2,
    col: 17,
  },
  {
    atomicNumber: 16,
    symbol: "S",
    name: "Sulfur",
    group: "debuff",
    breakable: true,
    durability: 1,
    effect: "gas_zone",
    params: {
      zoneHeight: 100,
      duration: 3000,
      paddleSpeedMultiplier: 0.8,
    },
    vfx: "gas_yellow",
    row: 3,
    col: 16,
  },
  {
    atomicNumber: 17,
    symbol: "Cl",
    name: "Chlorine",
    group: "debuff",
    breakable: true,
    durability: 1,
    effect: "paddle_debuff",
    params: { scale: 0.8, duration: 3000 },
    vfx: "paddle_shrink",
    row: 3,
    col: 17,
  },

  // ── SCORE ───────────────────────────────────────────────
  {
    atomicNumber: 7,
    symbol: "N",
    name: "Nitrogen",
    group: "score",
    breakable: true,
    durability: 1,
    effect: "freeze_score",
    params: { radius: 120, multiplier: 1.5, duration: 3000 },
    vfx: "freeze_ice",
    row: 2,
    col: 15,
  },
  {
    atomicNumber: 12,
    symbol: "Mg",
    name: "Magnesium",
    group: "score",
    breakable: true,
    durability: 1,
    effect: "flash_bonus",
    params: { bonus: 500 },
    vfx: "flash_white",
    row: 3,
    col: 2,
  },

  // ── BOSS ────────────────────────────────────────────────
  {
    atomicNumber: 20,
    symbol: "Ca",
    name: "Calcium",
    group: "boss",
    breakable: true,
    durability: 5,
    effect: "boss_core",
    params: { durability: 5, clearOnBreak: true },
    vfx: "boss_shatter",
    row: 4,
    col: 2,
  },
];

/** Only blocks that count toward stage-clear progress */
export const DESTROYABLE_COUNT = ELEMENTS.filter((e) => e.breakable).length;

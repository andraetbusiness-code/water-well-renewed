// Decorative water effects were removed in the 2026 redesign. Exports are kept as empty
// components so older imports keep compiling. Nothing renders.
type EffectProps = { count?: number; className?: string; delay?: number };
const Nothing = (_props: EffectProps) => null;

export const FloatingBubbles = Nothing;
export const WaterRipple = Nothing;
export const WaterDroplet = Nothing;
export const WaveBackground = Nothing;
export const FlowingWater = Nothing;
export const WaterParticleField = Nothing;

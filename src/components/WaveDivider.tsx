// Wave dividers were removed in the 2026 redesign. Exports are kept as empty components
// so older imports keep compiling. Nothing renders.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Nothing = (_props: Record<string, any>) => null;

export const WaveDivider = Nothing;
export const WaveDividerLayered = Nothing;

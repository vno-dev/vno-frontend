// sound.config.ts
export const SOUND_EFFECTS = {
    touch: "/sounds/effects/touch.mp3",
    pop_down: "/sounds/effects/pop-down.mp3",
    plunger: "/sounds/effects/plunger.mp3",
    plunger_immediate: "/sounds/effects/plunger-immediate.mp3",
    switch_on: "/sounds/effects/switch-on.mp3",
    switch_off: "/sounds/effects/switch-off.mp3",
} as const;

export type SoundEffectKey = keyof typeof SOUND_EFFECTS;

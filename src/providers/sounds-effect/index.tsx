"use client";

import {
    createContext,
    PropsWithChildren,
    useCallback,
    useContext,
    useMemo,
} from "react";
import useSound from "use-sound";
import { SOUND_EFFECTS, SoundEffectKey } from "./config";

type SoundEffectContextValue = {
    play: (key: SoundEffectKey) => void;
};

const SoundEffectContext =
    createContext<SoundEffectContextValue | null>(null);

export function SoundEffectProvider({ children }: PropsWithChildren) {
    const [playTouch] = useSound(SOUND_EFFECTS.touch, {
        volume: 0.6,
        interrupt: true,
    });

    const [playPopDown] = useSound(SOUND_EFFECTS.pop_down, {
        volume: 0.6,
        interrupt: true,
    });

    const [playPlunger] = useSound(SOUND_EFFECTS.plunger, {
        volume: 0.6,
        interrupt: true,
    });

    const [playPlungerImmediate] = useSound(
        SOUND_EFFECTS.plunger_immediate,
        {
            volume: 0.6,
            interrupt: true,
        }
    );

    const [playSwitchOn] = useSound(SOUND_EFFECTS.switch_on, {
        volume: 0.6,
        interrupt: true,
    });

    const [playSwitchOff] = useSound(SOUND_EFFECTS.switch_off, {
        volume: 0.6,
        interrupt: true,
    });

    const play = useCallback(
        (key: SoundEffectKey) => {
            switch (key) {
                case "touch":
                    playTouch();
                    break;
                case "pop_down":
                    playPopDown();
                    break;
                case "plunger":
                    playPlunger();
                    break;
                case "plunger_immediate":
                    playPlungerImmediate();
                    break;
                case "switch_on":
                    playSwitchOn();
                    break;
                case "switch_off":
                    playSwitchOff();
                    break;
            }
        },
        [
            playTouch,
            playPopDown,
            playPlunger,
            playPlungerImmediate,
            playSwitchOn,
            playSwitchOff,
        ]
    );

    const value = useMemo(() => ({ play }), [play]);

    return (
        <SoundEffectContext.Provider value={value}>
            {children}
        </SoundEffectContext.Provider>
    );
}

export function useSoundEffect() {
    const ctx = useContext(SoundEffectContext);
    if (!ctx) {
        throw new Error(
            "useSoundEffect must be used within SoundEffectProvider"
        );
    }
    return ctx;
}

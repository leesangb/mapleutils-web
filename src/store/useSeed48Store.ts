import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useIsMounted } from '@/hooks/useIsMounted';

const DEFAULT_X = 2;
const DEFAULT_Y = 25;
const DEFAULT_RATIO = 100;

interface Seed48State {
    x: number;
    y: number;
    ratio: number;
    showJump: boolean;
}

interface Seed48Actions {
    setX: (x: number) => void;
    setY: (y: number) => void;
    setRatio: (ratio: number) => void;
    setShowJump: (showJump: boolean) => void;
    toggleJump: () => void;
    reset: () => void;
}

const initialState: Seed48State = {
    x: DEFAULT_X,
    y: DEFAULT_Y,
    ratio: DEFAULT_RATIO,
    showJump: true,
};

const emptyState: Seed48State & Seed48Actions = {
    ...initialState,
    setX: () => {
    },
    setY: () => {
    },
    setRatio: () => {
    },
    setShowJump: () => {
    },
    toggleJump: () => {
    },
    reset: () => {
    },
};

const usePersistedSeed48Store = create<Seed48State & Seed48Actions>()(
    persist(
        (set, get) => ({
            ...initialState,
            setX: (x) => set({ x }),
            setY: (y) => set({ y }),
            setRatio: (ratio) => set({ ratio }),
            setShowJump: (showJump) => set({ showJump }),
            toggleJump: () => set({ showJump: !get().showJump }),
            reset: () => set(initialState),
        }),
        {
            name: 'SEED_48',
        },
    ),
);

// @ts-ignore
export const useSeed48Store: typeof usePersistedSeed48Store = (selector, equals) => {
    const store = usePersistedSeed48Store(selector, equals);
    const isMounted = useIsMounted();
    return isMounted ? store : selector ? selector(emptyState) : emptyState;
};

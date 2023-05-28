import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useIsMounted } from '@/hooks/useIsMounted';

type AudioState = StoreProps<{
    volume: number;
}>

const usePersistedAudioStore = create<AudioState>()(
    persist(
        (set, get) => ({
            volume: 50,
            setVolume: (volume) => set({ volume }),
        }),
        {
            name: 'AUDIO',
        },
    ),
);

const emptyState: AudioState = {
    volume: 50,
    setVolume: () => {
    },
};

// @ts-ignore
export const useAudioStore: typeof usePersistedAudioStore = (selector, equals) => {
    const store = usePersistedAudioStore(selector, equals);
    const isMounted = useIsMounted();
    return isMounted ? store : selector?.(emptyState) ?? emptyState;
};

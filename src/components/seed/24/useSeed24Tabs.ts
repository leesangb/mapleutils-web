import { useEffect, useState } from 'react';
import { LocalStorageHelper, LocalStorageKey } from '@tools/localStorageHelper';

const useSeed24Tabs = () => {
    const [tab, setTab] = useState<string>('bgm');

    useEffect(() => {
        const tab = LocalStorageHelper.load<string>(LocalStorageKey.SEED_24_TAB);
        setTab(tab);
    }, []);

    const onChangeTab = (tab: string) => {
        localStorage.setItem(LocalStorageKey.SEED_24_TAB, tab);
        setTab(tab);
    };

    return {
        tab,
        onChangeTab,
    };
};

export default useSeed24Tabs;
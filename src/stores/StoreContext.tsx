import * as React from 'react';
import { RootStore } from './RootStore';
import { enableStaticRendering } from 'mobx-react-lite';
import { isServerSide } from '@tools/helper';

const store = new RootStore();

enableStaticRendering(isServerSide);

export const StoreContext = React.createContext(store);

export const StoreProvider = ({ children }: { children: React.ReactNode }) => (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
);

export const useStore = () => React.useContext(StoreContext);

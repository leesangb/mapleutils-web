import { WindowPopupContext } from '@/components/popup/WindowPopupProvider';
import { useContext } from 'react';

export const useWindowPopupContext = () => useContext(WindowPopupContext);

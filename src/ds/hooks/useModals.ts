import { useContext } from 'react';
import { ModalsDispatchContext } from '@/ds/surfaces';

const useModals = () => useContext(ModalsDispatchContext);

export default useModals;

import { useContext } from 'react';
import { PopoverContext } from '@/ds/surfaces/popover/PopoverProvider';

const usePopover = () => useContext(PopoverContext);

export default usePopover;

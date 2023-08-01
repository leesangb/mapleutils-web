export const isKeyboardTargetInput = (e: KeyboardEvent) => {
    const target: HTMLElement = e.target as HTMLElement;
    // This is a 'hack' to prevent ignoring space when typing in inputs
    const isTextArea = target?.nodeName === 'TEXTAREA';
    const isInput = target?.nodeName === 'INPUT';

    return isTextArea || isInput;
};

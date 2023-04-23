export const isKeyboardTargetInput = (e: KeyboardEvent) => {
    // This is a 'hack' to prevent ignoring space when typing in inputs
    // @ts-ignore
    const isTextArea = e.target.nodeName === 'TEXTAREA';
    // @ts-ignore
    const isInput = e.target.nodeName === 'INPUT';

    return isTextArea || isInput;
};
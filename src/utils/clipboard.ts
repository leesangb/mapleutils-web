export const copy = async (text: string) => {
    if (!navigator.clipboard) {
        return;
    }
    await navigator.clipboard.writeText(text);
};

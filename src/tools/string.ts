import * as Hangul from 'hangul-js';

export const removeSpecialChars = (s: string): string => s.replace(/(\s|\?|-|\.|…|!|~)/g, '');

const getChosung = (str: string): string => {
    return Hangul.d(str, true) // 1글자 내에 초성 추출 ('ㄳㅎ' => [['ㄱ', 'ㅅ'], ['ㅎ']])
        .map(w => w.join('')) // 추출된 초성 합체 ([['ㄱ', 'ㅅ'], ['ㅎ']] => ['ㄱㅅ','ㅎ'])
        .join(''); // 합체된 초성들 다시 합체 (['ㄱㅅ','ㅎ'] => 'ㄱㅅㅎ')
};

export const isHangulMatching = (pattern: string, ...words: string[]): boolean => {
    const searched = removeSpecialChars(pattern);
    const escapedWords = words.map(word => removeSpecialChars(word)).join('');

    if (!Hangul.isJongAll(searched) && Hangul.search(escapedWords, searched) !== -1) {
        return true;
    }
    return Hangul.d(escapedWords, true)
        .map((w) => w[0])
        .join('')
        .includes(getChosung(searched));
};
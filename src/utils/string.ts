import * as Hangul from 'hangul-js';
import { MESO_KR_URL } from '@/utils/constants';

export const removeSpecialChars = (s: string): string => s.replace(/(\s|\?|-|\.|…|!|~|,)/g, '');
export const removeSpecialCharsWithoutSpaces = (s: string): string => s.replace(/([-.…!~,])/g, '');

/**
 * 한글 초성 추출
 * @example getCho('안녕하세요') => 'ㅇㄴㅎㅅㅇ'
 * @example getCho('꼬마', true) => 'ㄲㅁ'
 * @param str 한글 문자열
 */
export const getCho = (str: string): string => {
    return Hangul.d(str, true).map((w) => w[0]).join('');
};

/**
 * 1글자 내에 초성 추출
 * @example getChosung('ㄳㅎ') => 'ㄱㅅㅎ'
 * @param str
 */
export const getChosung = (str: string): string => {
    return Hangul.d(str, true) // 1글자 내에 초성 추출 ('ㄳㅎ' => [['ㄱ', 'ㅅ'], ['ㅎ']])
        .map(w => w.join('')) // 추출된 초성 합체 ([['ㄱ', 'ㅅ'], ['ㅎ']] => ['ㄱㅅ','ㅎ'])
        .join(''); // 합체된 초성들 다시 합체 (['ㄱㅅ','ㅎ'] => 'ㄱㅅㅎ')
};

const hangulMap: Record<string, string> = {
    q: 'ㅂ', w: 'ㅈ', e: 'ㄷ', r: 'ㄱ', t: 'ㅅ', y: 'ㅛ', u: 'ㅕ', i: 'ㅑ', o: 'ㅐ', p: 'ㅔ',
    a: 'ㅁ', s: 'ㄴ', d: 'ㅇ', f: 'ㄹ', g: 'ㅎ', h: 'ㅗ', j: 'ㅓ', k: 'ㅏ', l: 'ㅣ',
    z: 'ㅋ', x: 'ㅌ', c: 'ㅊ', v: 'ㅍ', b: 'ㅠ', n: 'ㅜ', m: 'ㅡ',

    Q: 'ㅃ', W: 'ㅉ', E: 'ㄸ', R: 'ㄲ', T: 'ㅆ', O: 'ㅒ', P: 'ㅖ',
};

export const englishToHangul = (s: string): string => {
    return Hangul.a(s.split('').map((c) => hangulMap[c] || c));
};

export const isHangulMatching = (pattern: string, ...words: string[]): boolean => {
    const searched = removeSpecialChars(pattern).replace(/[A-Za-z]/g, (s) => hangulMap[s] || s);

    const escapedWords = words.map(word => removeSpecialChars(word));

    if (!Hangul.isJongAll(searched) && escapedWords.some(word => Hangul.search(word, searched) !== -1)) {
        return true;
    }

    const searchedChosung = getChosung(searched);
    return escapedWords.some(word => getCho(word).includes(searchedChosung));
};

export const isMatching = (pattern: string, ...words: string[]): boolean => {
    const searched = removeSpecialCharsWithoutSpaces(pattern).toLowerCase();
    const escapedWords = words.map(word => removeSpecialCharsWithoutSpaces(word).toLowerCase());
    return escapedWords.some(word => word.includes(searched));
};

export const includesOneOf = (str: string, words: string[]): boolean => words.some((w) => str.includes(w));

export const formatNumberComma = (n: number): string => new Intl.NumberFormat().format(n);

export const formatNumberK = (n: number): string => `${(n / 1000).toFixed(1)}k`;

export const getMesoKrUrl = (mob: string) => `${MESO_KR_URL}?n=${mob.replace(/ /g, '+')}`;

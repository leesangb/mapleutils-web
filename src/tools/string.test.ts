import { isHangulMatching } from '@tools/string';

describe('isHangulMatching', () => {
    describe('given "안녕하세요 테스트 입니다. 감사합니다!"', () => {
        const given = '안녕하세요 테스트 입니다. 감사합니다!';
        const shouldMatch = [
            'ㄳ',
            '',
            '안녕하세요테스트입니다~~~!',
            'ㅇㄴㅎㅅㅇ',
            '안ㄴ',
        ];
        shouldMatch.forEach(pattern => {
            it(`should match with "${pattern}"`, () => {
                const result = isHangulMatching(pattern, given);
                expect(result).toBeTruthy();
            });
        });
        const shouldNotMatch = [
            'dkssud',
            '녕세요',
        ];
        shouldNotMatch.forEach(pattern => {
            it(`should not match with "${pattern}"`, () => {
                const result = isHangulMatching(pattern, given);
                expect(result).toBeFalsy();
            });
        });
    });
    describe('given ["안녕", "하세요", "테스트", "입니다"]', () => {
        const given = ['안녕', '하세요', '테스트', '입니다'];
        const shouldMatch = [
            '',
            '안녕',
            '안ㄴ',
            'ㅌㅅ',
            '안녕하세요',
        ];
        shouldMatch.forEach(pattern => {
            it(`should match with "${pattern}"`, () => {
                const result = isHangulMatching(pattern, ...given);
                expect(result).toBeTruthy();
            });
        });
    });
    describe('given "안녕하세요"', () => {
        const given = '안녕하세요';
        it('should ignore special chars ("\\s", "?", "-", ".", "…", "!", "~")', () => {
            const result = isHangulMatching('안 ?녕-하.세!요…~', given);
            expect(result).toBeTruthy();
        });
    });
});
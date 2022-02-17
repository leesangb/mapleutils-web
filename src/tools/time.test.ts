import { toMinuteSecond } from '@tools/time';

describe('toMinuteSecond', () => {
    const givenExpectedMapping = [
        {
            given: 0,
            expected: '00:00',
        },
        {
            given: 100,
            expected: '01:40',
        },
        {
            given: 120,
            expected: '02:00',
        },
    ];
    givenExpectedMapping.forEach(({ given, expected }) => {
        describe(`given ${given}`, () => {
            it(`should be ${expected}`, () => {
                const result = toMinuteSecond(given);
                expect(result).toBe(expected);
            });
        });
    });
});
const FLOOR_POINT = [
    0, // floor 0
    4,
    12,
    14,
    16,
    0, // floor 5
    24,
    29,
    35,
    46,
    75, // floor 10
    58,
    73,
    77,
    96,
    0, // floor 15
    112,
    137,
    139,
    169,
    255, // floor 20
    186,
    223,
    243,
    264,
    0, // floor 25
    280,
    331,
    323,
    380,
    555, // floor 30
    394,
    419,
    439,
    472,
    0, // floor 35
    580,
    557,
    587,
    679,
    975, // floor 40
    750,
    715,
    749,
    862,
    0, // floor 45
    856,
    982,
    1024,
    1067,
    2020, // floor 50
];

export const TOWER_ENHANCE_FACTOR = [1, 1.25, 1.5, 1.75, 2];

export const ENHANCED_FLOORS = [7, 9, 13, 18, 19, 20, 28, 29, 30, 32, 33, 38, 40, 47, 48, 49, 50];

export const FLOOR_POINTS: number[][] = FLOOR_POINT.map(
    (point, floor) => TOWER_ENHANCE_FACTOR.map(
        (factor) => ENHANCED_FLOORS.includes(floor) ? Math.floor(factor * point) : point,
    ),
);

export const ACCUMULATED = (() => {
    const accumulated = FLOOR_POINTS.map(points => [...points]);
    for (let i = 1; i < accumulated.length; i++) {
        for (let j = 0; j < accumulated[i].length; j++) {
            accumulated[i][j] += accumulated[i - 1][j];
        }
    }
    return accumulated;
})();

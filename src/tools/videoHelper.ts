export const getMaxFrameRate = (): Promise<number> => {
    return new Promise(resolve =>
        requestAnimationFrame(t1 =>
            requestAnimationFrame(t2 => resolve(Math.floor(1000 / (t2 - t1)))),
        ),
    );
};

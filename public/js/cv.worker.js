let loaded = false;
const CVHandlers = {
    matchTemplate: async (payload) => {
        return payload;
    },

    load: (waitTimeMs = 30_000, stepTimeMs = 100) => {
        if (!loaded) {
            self.importScripts('/js/opencv.js');
        }
        return new Promise((resolve) => {
            let timeSpentMs = 0;
            const interval = setInterval(() => {
                if (timeSpentMs > waitTimeMs) {
                    resolve(false);
                    clearInterval(interval);
                }
                if (cv.Mat) {
                    resolve(true);
                    loaded = true;
                    clearInterval(interval);
                }
                timeSpentMs += stepTimeMs;
            }, stepTimeMs);
        });
    },
};

const workerResponse = async (fn, ...args) => {
    postMessage({
        message: fn.name,
        data: await fn(...args),
    });
};

addEventListener('message', function(e) {
    const handler = CVHandlers[e.data.message];
    if (handler) {
        console.log(`executing ${e.data.message}(${JSON.stringify(e.data.payload)})`);
        workerResponse(handler, e.data.payload);
    } else {
        console.log(`${e.data.message} not found`);
    }
});

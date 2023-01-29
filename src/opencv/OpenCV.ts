interface MatchTemplate {
    message: 'matchTemplate',
    payload: string;
}

interface Load {
    message: 'load';
}

interface DefaultOpenCVEvent {
    message: string;
    payload: any;
}

type OpenCVEvent = MatchTemplate | Load | DefaultOpenCVEvent;

class OpenCV {
    public status: Record<OpenCVEvent['message'], { state: 'loading' | 'done' | 'error', data?: any, promise?: Promise<any> }> = {};
    private worker?: Worker;

    public async dispatch(event: OpenCVEvent): Promise<any> {
        if (!this.worker) {
            const isLoaded = await this.load();
            if (event.message === 'load') {
                return isLoaded;
            }
        }
        const { message } = event;
        if (this.status[message]?.state === 'loading') {
            return this.status[message].promise;
        }
        this.worker!.postMessage(event);
        this.status[message] = {
            state: 'loading',
        };
        this.status[message].promise = new Promise((resolve, reject) => {
            const handler = () => {
                const { state, data } = this.status[message];
                if (state === 'done') {
                    resolve(data);
                }
                if (state === 'error') {
                    reject(data);
                }
                if (state === 'loading') {
                    setTimeout(handler, 25);
                }
            };
            handler();
        });
        return this.status[message].promise;
    }

    private load() {
        if (this.worker) {
            console.log('OpenCV already loaded');
            return;
        }
        this.worker = new Worker('/js/cv.worker.js');

        this.worker.onmessage = (e: MessageEvent<{ message: OpenCVEvent['message'], data?: any }>) => {
            this.status[e.data.message] = {
                state: 'done',
                data: e.data.data,
            };
        };

        return this.dispatch({ message: 'load' });
    }
}

export default new OpenCV();

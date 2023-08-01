/* eslint-disable @typescript-eslint/no-explicit-any */

import cv from '@techstark/opencv-js';
import { loadImage } from '@/utils/imageHelper';

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

type MatchTemplateResult = Record<'x1' | 'x2' | 'y1' | 'y2' | 'matchPercent', number>;

class OpenCV {
    public status: Record<OpenCVEvent['message'], {
        state: 'loading' | 'done' | 'error',
        data?: any,
        promise?: Promise<any>
    }> = {};
    private worker?: Worker;

    /**
     * @deprecated WIP TODO: not implemented correctly
     * @param event
     */
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

    public async matchTemplate(canvas: HTMLCanvasElement, image: string): Promise<MatchTemplateResult> {
        const src = cv.imread(canvas);
        const template = cv.imread(await loadImage(image));
        const dst = new cv.Mat();
        const mask = new cv.Mat();
        cv.matchTemplate(src, template, dst, cv.TM_CCOEFF_NORMED, mask);
        const result = cv.minMaxLoc(dst, mask);
        // @ts-ignore
        const point: { x: number, y: number } = result.maxLoc;
        // @ts-ignore
        const matchPercent: number = result.maxVal;

        const coordinates: MatchTemplateResult = {
            x1: point.x,
            x2: point.x + template.cols,
            y1: point.y,
            y2: point.y + template.rows,
            matchPercent,
        };

        src.delete();
        template.delete();
        dst.delete();
        mask.delete();
        return coordinates;
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

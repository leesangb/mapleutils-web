import data from './data.json';
import dataGMS from './data.gms.json';
import dataTMS from './data.tms.json';

export interface TrackInfo {
    name: string;
    src: string;
    hint: string;
    coverImg: string;
}

export const seed24AudioData: TrackInfo[] = data;
export const seed24AudioDataGMS: TrackInfo[] = dataGMS;
export const seed24AudioDataTMS: TrackInfo[] = dataTMS;

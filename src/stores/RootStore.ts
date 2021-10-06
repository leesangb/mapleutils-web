import { AppStore } from './app/AppStore';

export class RootStore {
    app: AppStore;

    constructor() {
        this.app = new AppStore();
    }
}

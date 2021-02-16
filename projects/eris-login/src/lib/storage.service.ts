import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class StorageService {

    constructor() {
    }

    public setItem(key: string, value: string): void {
        localStorage.setItem(key, value);
    }

    public getItem(key: string): string | null {
        return localStorage.getItem(key);
    }

    public exists(key: string): boolean {
        return localStorage.getItem(key) !== null;
    }
}

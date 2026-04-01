import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export interface ClariusDataConfig {
    url: string;
    columnsKey?: string;
    rowsKey?: string;
    actionsKey?: string;
    statusColorsKey?: string;
}
export declare class ClariusDataService {
    private http;
    constructor(http: HttpClient);
    /**
     * Fetch table/card data from an API endpoint.
     * The response JSON should have keys for columns, rows, actions, statusColors.
     * You can customize which keys to read via the config.
     */
    fetch(config: ClariusDataConfig): Observable<{
        columns: any[];
        rows: any[];
        actions: any[];
        statusColors: {
            [key: string]: string;
        };
    }>;
    /**
     * Fetch just rows from an API (columns/actions defined in code, rows from API).
     */
    fetchRows(url: string): Observable<any[]>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ClariusDataService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ClariusDataService>;
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export interface ClariusDataConfig {
  url: string;
  columnsKey?: string;
  rowsKey?: string;
  actionsKey?: string;
  statusColorsKey?: string;
}

@Injectable({ providedIn: 'root' })
export class ClariusDataService {

  constructor(private http: HttpClient) {}

  /**
   * Fetch table/card data from an API endpoint.
   * The response JSON should have keys for columns, rows, actions, statusColors.
   * You can customize which keys to read via the config.
   */
  fetch(config: ClariusDataConfig): Observable<{
    columns: any[];
    rows: any[];
    actions: any[];
    statusColors: { [key: string]: string };
  }> {
    return this.http.get<any>(config.url).pipe(
      map(data => ({
        columns: data[config.columnsKey || 'columns'] || [],
        rows: data[config.rowsKey || 'rows'] || [],
        actions: data[config.actionsKey || 'actions'] || [],
        statusColors: data[config.statusColorsKey || 'statusColors'] || {},
      })),
      catchError(err => {
        console.error('ClariusDataService fetch error:', err);
        return of({ columns: [], rows: [], actions: [], statusColors: {} });
      })
    );
  }

  /**
   * Fetch just rows from an API (columns/actions defined in code, rows from API).
   */
  fetchRows(url: string): Observable<any[]> {
    return this.http.get<any[]>(url).pipe(
      catchError(err => {
        console.error('ClariusDataService fetchRows error:', err);
        return of([]);
      })
    );
  }
}

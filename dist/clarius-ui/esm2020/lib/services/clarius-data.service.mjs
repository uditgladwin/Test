import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
export class ClariusDataService {
    constructor(http) {
        this.http = http;
    }
    /**
     * Fetch table/card data from an API endpoint.
     * The response JSON should have keys for columns, rows, actions, statusColors.
     * You can customize which keys to read via the config.
     */
    fetch(config) {
        return this.http.get(config.url).pipe(map(data => ({
            columns: data[config.columnsKey || 'columns'] || [],
            rows: data[config.rowsKey || 'rows'] || [],
            actions: data[config.actionsKey || 'actions'] || [],
            statusColors: data[config.statusColorsKey || 'statusColors'] || {},
        })), catchError(err => {
            console.error('ClariusDataService fetch error:', err);
            return of({ columns: [], rows: [], actions: [], statusColors: {} });
        }));
    }
    /**
     * Fetch just rows from an API (columns/actions defined in code, rows from API).
     */
    fetchRows(url) {
        return this.http.get(url).pipe(catchError(err => {
            console.error('ClariusDataService fetchRows error:', err);
            return of([]);
        }));
    }
}
ClariusDataService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: ClariusDataService, deps: [{ token: i1.HttpClient }], target: i0.ɵɵFactoryTarget.Injectable });
ClariusDataService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: ClariusDataService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: ClariusDataService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.HttpClient }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhcml1cy1kYXRhLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jbGFyaXVzLXVpL3NyYy9saWIvc2VydmljZXMvY2xhcml1cy1kYXRhLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQWMsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3RDLE9BQU8sRUFBRSxHQUFHLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7OztBQVdqRCxNQUFNLE9BQU8sa0JBQWtCO0lBRTdCLFlBQW9CLElBQWdCO1FBQWhCLFNBQUksR0FBSixJQUFJLENBQVk7SUFBRyxDQUFDO0lBRXhDOzs7O09BSUc7SUFDSCxLQUFLLENBQUMsTUFBeUI7UUFNN0IsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBTSxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUN4QyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ1gsT0FBTyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxJQUFJLFNBQVMsQ0FBQyxJQUFJLEVBQUU7WUFDbkQsSUFBSSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxJQUFJLE1BQU0sQ0FBQyxJQUFJLEVBQUU7WUFDMUMsT0FBTyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxJQUFJLFNBQVMsQ0FBQyxJQUFJLEVBQUU7WUFDbkQsWUFBWSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsZUFBZSxJQUFJLGNBQWMsQ0FBQyxJQUFJLEVBQUU7U0FDbkUsQ0FBQyxDQUFDLEVBQ0gsVUFBVSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ2YsT0FBTyxDQUFDLEtBQUssQ0FBQyxpQ0FBaUMsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUN0RCxPQUFPLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLFlBQVksRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ3RFLENBQUMsQ0FBQyxDQUNILENBQUM7SUFDSixDQUFDO0lBRUQ7O09BRUc7SUFDSCxTQUFTLENBQUMsR0FBVztRQUNuQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFRLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FDbkMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ2YsT0FBTyxDQUFDLEtBQUssQ0FBQyxxQ0FBcUMsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUMxRCxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNoQixDQUFDLENBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQzs7K0dBdkNVLGtCQUFrQjttSEFBbEIsa0JBQWtCLGNBREwsTUFBTTsyRkFDbkIsa0JBQWtCO2tCQUQ5QixVQUFVO21CQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBvZiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwLCBjYXRjaEVycm9yIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIENsYXJpdXNEYXRhQ29uZmlnIHtcbiAgdXJsOiBzdHJpbmc7XG4gIGNvbHVtbnNLZXk/OiBzdHJpbmc7XG4gIHJvd3NLZXk/OiBzdHJpbmc7XG4gIGFjdGlvbnNLZXk/OiBzdHJpbmc7XG4gIHN0YXR1c0NvbG9yc0tleT86IHN0cmluZztcbn1cblxuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcbmV4cG9ydCBjbGFzcyBDbGFyaXVzRGF0YVNlcnZpY2Uge1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cENsaWVudCkge31cblxuICAvKipcbiAgICogRmV0Y2ggdGFibGUvY2FyZCBkYXRhIGZyb20gYW4gQVBJIGVuZHBvaW50LlxuICAgKiBUaGUgcmVzcG9uc2UgSlNPTiBzaG91bGQgaGF2ZSBrZXlzIGZvciBjb2x1bW5zLCByb3dzLCBhY3Rpb25zLCBzdGF0dXNDb2xvcnMuXG4gICAqIFlvdSBjYW4gY3VzdG9taXplIHdoaWNoIGtleXMgdG8gcmVhZCB2aWEgdGhlIGNvbmZpZy5cbiAgICovXG4gIGZldGNoKGNvbmZpZzogQ2xhcml1c0RhdGFDb25maWcpOiBPYnNlcnZhYmxlPHtcbiAgICBjb2x1bW5zOiBhbnlbXTtcbiAgICByb3dzOiBhbnlbXTtcbiAgICBhY3Rpb25zOiBhbnlbXTtcbiAgICBzdGF0dXNDb2xvcnM6IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH07XG4gIH0+IHtcbiAgICByZXR1cm4gdGhpcy5odHRwLmdldDxhbnk+KGNvbmZpZy51cmwpLnBpcGUoXG4gICAgICBtYXAoZGF0YSA9PiAoe1xuICAgICAgICBjb2x1bW5zOiBkYXRhW2NvbmZpZy5jb2x1bW5zS2V5IHx8ICdjb2x1bW5zJ10gfHwgW10sXG4gICAgICAgIHJvd3M6IGRhdGFbY29uZmlnLnJvd3NLZXkgfHwgJ3Jvd3MnXSB8fCBbXSxcbiAgICAgICAgYWN0aW9uczogZGF0YVtjb25maWcuYWN0aW9uc0tleSB8fCAnYWN0aW9ucyddIHx8IFtdLFxuICAgICAgICBzdGF0dXNDb2xvcnM6IGRhdGFbY29uZmlnLnN0YXR1c0NvbG9yc0tleSB8fCAnc3RhdHVzQ29sb3JzJ10gfHwge30sXG4gICAgICB9KSksXG4gICAgICBjYXRjaEVycm9yKGVyciA9PiB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0NsYXJpdXNEYXRhU2VydmljZSBmZXRjaCBlcnJvcjonLCBlcnIpO1xuICAgICAgICByZXR1cm4gb2YoeyBjb2x1bW5zOiBbXSwgcm93czogW10sIGFjdGlvbnM6IFtdLCBzdGF0dXNDb2xvcnM6IHt9IH0pO1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIEZldGNoIGp1c3Qgcm93cyBmcm9tIGFuIEFQSSAoY29sdW1ucy9hY3Rpb25zIGRlZmluZWQgaW4gY29kZSwgcm93cyBmcm9tIEFQSSkuXG4gICAqL1xuICBmZXRjaFJvd3ModXJsOiBzdHJpbmcpOiBPYnNlcnZhYmxlPGFueVtdPiB7XG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQ8YW55W10+KHVybCkucGlwZShcbiAgICAgIGNhdGNoRXJyb3IoZXJyID0+IHtcbiAgICAgICAgY29uc29sZS5lcnJvcignQ2xhcml1c0RhdGFTZXJ2aWNlIGZldGNoUm93cyBlcnJvcjonLCBlcnIpO1xuICAgICAgICByZXR1cm4gb2YoW10pO1xuICAgICAgfSlcbiAgICApO1xuICB9XG59XG4iXX0=
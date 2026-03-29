import { Component, Input, Output, EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "../button/button.component";
export class ClariusDashboardComponent {
    constructor() {
        this.greeting = '';
        this.actionLabel = '';
        this.actionIcon = '';
        this.actionClicked = new EventEmitter();
    }
}
ClariusDashboardComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: ClariusDashboardComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
ClariusDashboardComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.3.0", type: ClariusDashboardComponent, selector: "clarius-dashboard", inputs: { greeting: "greeting", actionLabel: "actionLabel", actionIcon: "actionIcon" }, outputs: { actionClicked: "actionClicked" }, ngImport: i0, template: "<div class=\"dashboard\">\n\n  <div class=\"dashboard-header\">\n    <span class=\"greeting\">{{ greeting }}</span>\n    <clarius-button *ngIf=\"actionLabel\"\n      [label]=\"actionLabel\"\n      [icon]=\"actionIcon\"\n      (buttonClick)=\"actionClicked.emit()\">\n    </clarius-button>\n  </div>\n\n  <div class=\"widget-grid\">\n    <ng-content></ng-content>\n  </div>\n\n</div>\n", styles: [".dashboard{padding:2.5rem;font-family:Noto Sans,sans-serif}.dashboard-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:1.5rem}.greeting{font-weight:600;font-size:24px;line-height:29px;color:#fff}.widget-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem;margin-top:1rem}\n"], dependencies: [{ kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i2.ClariusButtonComponent, selector: "clarius-button", inputs: ["label", "size", "iconMode", "state", "icon", "type", "primary"], outputs: ["buttonClick"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.3.0", ngImport: i0, type: ClariusDashboardComponent, decorators: [{
            type: Component,
            args: [{ selector: 'clarius-dashboard', template: "<div class=\"dashboard\">\n\n  <div class=\"dashboard-header\">\n    <span class=\"greeting\">{{ greeting }}</span>\n    <clarius-button *ngIf=\"actionLabel\"\n      [label]=\"actionLabel\"\n      [icon]=\"actionIcon\"\n      (buttonClick)=\"actionClicked.emit()\">\n    </clarius-button>\n  </div>\n\n  <div class=\"widget-grid\">\n    <ng-content></ng-content>\n  </div>\n\n</div>\n", styles: [".dashboard{padding:2.5rem;font-family:Noto Sans,sans-serif}.dashboard-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:1.5rem}.greeting{font-weight:600;font-size:24px;line-height:29px;color:#fff}.widget-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem;margin-top:1rem}\n"] }]
        }], propDecorators: { greeting: [{
                type: Input
            }], actionLabel: [{
                type: Input
            }], actionIcon: [{
                type: Input
            }], actionClicked: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGFzaGJvYXJkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NsYXJpdXMtdWkvc3JjL2xpYi9kYXNoYm9hcmQvZGFzaGJvYXJkLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NsYXJpdXMtdWkvc3JjL2xpYi9kYXNoYm9hcmQvZGFzaGJvYXJkLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7QUFPdkUsTUFBTSxPQUFPLHlCQUF5QjtJQUx0QztRQU1XLGFBQVEsR0FBRyxFQUFFLENBQUM7UUFDZCxnQkFBVyxHQUFHLEVBQUUsQ0FBQztRQUNqQixlQUFVLEdBQUcsRUFBRSxDQUFDO1FBQ2Ysa0JBQWEsR0FBRyxJQUFJLFlBQVksRUFBUSxDQUFDO0tBQ3BEOztzSEFMWSx5QkFBeUI7MEdBQXpCLHlCQUF5Qiw4TENQdEMsa1lBZ0JBOzJGRFRhLHlCQUF5QjtrQkFMckMsU0FBUzsrQkFDRSxtQkFBbUI7OEJBS3BCLFFBQVE7c0JBQWhCLEtBQUs7Z0JBQ0csV0FBVztzQkFBbkIsS0FBSztnQkFDRyxVQUFVO3NCQUFsQixLQUFLO2dCQUNJLGFBQWE7c0JBQXRCLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjbGFyaXVzLWRhc2hib2FyZCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9kYXNoYm9hcmQuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9kYXNoYm9hcmQuY29tcG9uZW50LmNzcyddLFxufSlcbmV4cG9ydCBjbGFzcyBDbGFyaXVzRGFzaGJvYXJkQ29tcG9uZW50IHtcbiAgQElucHV0KCkgZ3JlZXRpbmcgPSAnJztcbiAgQElucHV0KCkgYWN0aW9uTGFiZWwgPSAnJztcbiAgQElucHV0KCkgYWN0aW9uSWNvbiA9ICcnO1xuICBAT3V0cHV0KCkgYWN0aW9uQ2xpY2tlZCA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcbn1cbiIsIjxkaXYgY2xhc3M9XCJkYXNoYm9hcmRcIj5cblxuICA8ZGl2IGNsYXNzPVwiZGFzaGJvYXJkLWhlYWRlclwiPlxuICAgIDxzcGFuIGNsYXNzPVwiZ3JlZXRpbmdcIj57eyBncmVldGluZyB9fTwvc3Bhbj5cbiAgICA8Y2xhcml1cy1idXR0b24gKm5nSWY9XCJhY3Rpb25MYWJlbFwiXG4gICAgICBbbGFiZWxdPVwiYWN0aW9uTGFiZWxcIlxuICAgICAgW2ljb25dPVwiYWN0aW9uSWNvblwiXG4gICAgICAoYnV0dG9uQ2xpY2spPVwiYWN0aW9uQ2xpY2tlZC5lbWl0KClcIj5cbiAgICA8L2NsYXJpdXMtYnV0dG9uPlxuICA8L2Rpdj5cblxuICA8ZGl2IGNsYXNzPVwid2lkZ2V0LWdyaWRcIj5cbiAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gIDwvZGl2PlxuXG48L2Rpdj5cbiJdfQ==
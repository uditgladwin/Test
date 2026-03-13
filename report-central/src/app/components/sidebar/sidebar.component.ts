import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, Subscription } from 'rxjs';
import { ReportService } from '../../services/report.service';
import { SidebarItem } from '../../models/report.model';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnDestroy {
  sidebarItems$: Observable<SidebarItem[]>;
  private subscription = new Subscription();

  sidebarIcons: string[] = [
    'grid', 'users', 'sitemap', 'car', 'bell', 'shield',
    'key', 'phone', 'clipboard', 'headset'
  ];

  constructor(private reportService: ReportService) {
    this.sidebarItems$ = this.reportService.sidebarItems$;
  }

  selectItem(label: string, index: number): void {
    this.reportService.setActiveSidebarItem(label, index);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

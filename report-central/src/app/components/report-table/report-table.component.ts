import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { ReportService } from '../../services/report.service';
import { Report, ReportTab } from '../../models/report.model';

@Component({
  selector: 'app-report-table',
  imports: [CommonModule, FormsModule],
  templateUrl: './report-table.component.html',
  styleUrl: './report-table.component.scss'
})
export class ReportTableComponent implements OnDestroy {
  filteredReports$: Observable<Report[]>;
  activeReportTab$: Observable<ReportTab>;
  paginationInfo$: Observable<{ start: number; end: number; total: number }>;
  searchQuery = '';
  private subscription = new Subscription();

  oneTimeCount: number;
  subscriptionCount: number;

  constructor(private reportService: ReportService) {
    this.filteredReports$ = this.reportService.filteredReports$;
    this.activeReportTab$ = this.reportService.activeReportTab$;
    this.paginationInfo$ = this.reportService.paginationInfo$;
    this.oneTimeCount = this.reportService.oneTimeCount;
    this.subscriptionCount = this.reportService.subscriptionCount;
  }

  onSearch(query: string): void {
    this.reportService.setSearchQuery(query);
  }

  setTab(tab: ReportTab): void {
    this.reportService.setActiveReportTab(tab);
  }

  nextPage(): void {
    this.reportService.nextPage();
  }

  previousPage(): void {
    this.reportService.previousPage();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest, map } from 'rxjs';
import { Report, SidebarItem, CategoryTab, ReportTab } from '../models/report.model';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private reportsSubject = new BehaviorSubject<Report[]>([
    { requestId: '55698517587', reportGenerationTime: '00 Jun 2024, 88 : 79 : 49 AM PDT', reportPeriod: '02 Nov 2022 - 04 Nov 2022', status: 'in_progress' },
    { requestId: '05791001824', reportGenerationTime: '09 Jun 2024, 58 : 82 : 46 AM PDT', reportPeriod: '02 Nov 2022 - 04 Nov 2022', status: 'ready' },
    { requestId: '55698517587', reportGenerationTime: '09 Jun 2024, 90 : 32 : 62 AM PDT', reportPeriod: '02 Nov 2022 - 04 Nov 2022', status: 'ready' },
    { requestId: '55698517587', reportGenerationTime: '01 Jun 2024, 15 : 46 : 80 AM PDT', reportPeriod: '02 Nov 2022 - 04 Nov 2022', status: 'ready' },
    { requestId: '55698517587', reportGenerationTime: '05 Jun 2024, 47 : 04 : 65 AM PDT', reportPeriod: '02 Nov 2022 - 04 Nov 2022', status: 'ready' },
    { requestId: '55698517587', reportGenerationTime: '05 Jun 2024, 66 : 35 : 95 AM PDT', reportPeriod: '02 Nov 2022 - 04 Nov 2022', status: 'ready' },
    { requestId: '55698517587', reportGenerationTime: '06 Jun 2024, 80 : 63 : 88 AM PDT', reportPeriod: '02 Nov 2022 - 04 Nov 2022', status: 'in_progress' },
    { requestId: '55698517587', reportGenerationTime: '07 Jun 2024, 22 : 15 : 33 AM PDT', reportPeriod: '02 Nov 2022 - 04 Nov 2022', status: 'ready' },
    { requestId: '55698517587', reportGenerationTime: '08 Jun 2024, 44 : 55 : 12 AM PDT', reportPeriod: '02 Nov 2022 - 04 Nov 2022', status: 'ready' },
    { requestId: '55698517587', reportGenerationTime: '10 Jun 2024, 11 : 22 : 33 AM PDT', reportPeriod: '02 Nov 2022 - 04 Nov 2022', status: 'ready' },
  ]);

  private searchQuerySubject = new BehaviorSubject<string>('');
  private activeCategorySubject = new BehaviorSubject<CategoryTab>('Fleet Safety');
  private activeReportTabSubject = new BehaviorSubject<ReportTab>('one_time');
  private activeSidebarItemSubject = new BehaviorSubject<string>('All Alerts Report');
  private currentPageSubject = new BehaviorSubject<number>(1);
  private pageSizeSubject = new BehaviorSubject<number>(20);

  private sidebarItemsSubject = new BehaviorSubject<SidebarItem[]>([
    { label: 'All Alerts Report', active: true },
    { label: 'Device Management', active: false },
    { label: 'Device Health Report', active: false },
    { label: 'All Alerts Report', active: false },
    { label: 'Event Summary', active: false },
    { label: 'Device Management', active: false },
    { label: 'Device Health Report', active: false },
    { label: 'Coaching Efficacy', active: false },
  ]);

  readonly reports$: Observable<Report[]> = this.reportsSubject.asObservable();
  readonly searchQuery$: Observable<string> = this.searchQuerySubject.asObservable();
  readonly activeCategory$: Observable<CategoryTab> = this.activeCategorySubject.asObservable();
  readonly activeReportTab$: Observable<ReportTab> = this.activeReportTabSubject.asObservable();
  readonly activeSidebarItem$: Observable<string> = this.activeSidebarItemSubject.asObservable();
  readonly sidebarItems$: Observable<SidebarItem[]> = this.sidebarItemsSubject.asObservable();
  readonly currentPage$: Observable<number> = this.currentPageSubject.asObservable();
  readonly pageSize$: Observable<number> = this.pageSizeSubject.asObservable();

  readonly totalReports = 857;
  readonly oneTimeCount = 34;
  readonly subscriptionCount = 5;

  readonly filteredReports$: Observable<Report[]> = combineLatest([
    this.reports$,
    this.searchQuery$
  ]).pipe(
    map(([reports, query]) => {
      if (!query.trim()) {
        return reports;
      }
      const lowerQuery = query.toLowerCase();
      return reports.filter(r =>
        r.requestId.toLowerCase().includes(lowerQuery) ||
        r.reportGenerationTime.toLowerCase().includes(lowerQuery) ||
        r.reportPeriod.toLowerCase().includes(lowerQuery)
      );
    })
  );

  readonly paginationInfo$: Observable<{ start: number; end: number; total: number }> = combineLatest([
    this.currentPage$,
    this.pageSize$
  ]).pipe(
    map(([page, size]) => ({
      start: (page - 1) * size + 1,
      end: Math.min(page * size, this.totalReports),
      total: this.totalReports
    }))
  );

  setSearchQuery(query: string): void {
    this.searchQuerySubject.next(query);
  }

  setActiveCategory(category: CategoryTab): void {
    this.activeCategorySubject.next(category);
  }

  setActiveReportTab(tab: ReportTab): void {
    this.activeReportTabSubject.next(tab);
  }

  setActiveSidebarItem(label: string, index: number): void {
    this.activeSidebarItemSubject.next(label);
    const items = this.sidebarItemsSubject.value.map((item, i) => ({
      ...item,
      active: i === index
    }));
    this.sidebarItemsSubject.next(items);
  }

  nextPage(): void {
    const current = this.currentPageSubject.value;
    const maxPage = Math.ceil(this.totalReports / this.pageSizeSubject.value);
    if (current < maxPage) {
      this.currentPageSubject.next(current + 1);
    }
  }

  previousPage(): void {
    const current = this.currentPageSubject.value;
    if (current > 1) {
      this.currentPageSubject.next(current - 1);
    }
  }
}

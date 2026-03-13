import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { ReportService } from '../../services/report.service';
import { CategoryTab } from '../../models/report.model';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  activeCategory$: Observable<CategoryTab>;
  categories: CategoryTab[] = ['All', 'Premium', 'Fleet Safety', 'Fleet Management'];

  constructor(private reportService: ReportService) {
    this.activeCategory$ = this.reportService.activeCategory$;
  }

  setCategory(category: CategoryTab): void {
    this.reportService.setActiveCategory(category);
  }
}

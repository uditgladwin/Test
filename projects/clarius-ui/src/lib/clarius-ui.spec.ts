import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClariusUi } from './clarius-ui';

describe('ClariusUi', () => {
  let component: ClariusUi;
  let fixture: ComponentFixture<ClariusUi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClariusUi],
    }).compileComponents();

    fixture = TestBed.createComponent(ClariusUi);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

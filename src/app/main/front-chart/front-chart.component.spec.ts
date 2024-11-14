import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontChartComponent } from './front-chart.component';

describe('FrontChartComponent', () => {
  let component: FrontChartComponent;
  let fixture: ComponentFixture<FrontChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrontChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrontChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

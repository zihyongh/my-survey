import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyWriteComponent } from './survey-write.component';

describe('SurveyWriteComponent', () => {
  let component: SurveyWriteComponent;
  let fixture: ComponentFixture<SurveyWriteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SurveyWriteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SurveyWriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

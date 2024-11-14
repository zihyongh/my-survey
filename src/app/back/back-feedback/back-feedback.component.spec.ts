import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackFeedbackComponent } from './back-feedback.component';

describe('BackFeedbackComponent', () => {
  let component: BackFeedbackComponent;
  let fixture: ComponentFixture<BackFeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackFeedbackComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BackFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

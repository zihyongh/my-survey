import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackListComponent } from './back-list.component';

describe('BackListComponent', () => {
  let component: BackListComponent;
  let fixture: ComponentFixture<BackListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BackListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

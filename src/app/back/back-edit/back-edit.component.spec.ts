import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackEditComponent } from './back-edit.component';

describe('BackEditComponent', () => {
  let component: BackEditComponent;
  let fixture: ComponentFixture<BackEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BackEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

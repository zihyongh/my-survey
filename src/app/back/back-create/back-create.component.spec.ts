import { ComponentFixture, TestBed } from '@angular/core/testing';

import { backCreateComponent } from './back-create.component';

describe('backCreateComponent', () => {
  let component: backCreateComponent;
  let fixture: ComponentFixture<backCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [backCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(backCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

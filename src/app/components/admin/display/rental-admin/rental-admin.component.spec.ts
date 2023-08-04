import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentalAdminComponent } from './rental-admin.component';

describe('RentalAdminComponent', () => {
  let component: RentalAdminComponent;
  let fixture: ComponentFixture<RentalAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RentalAdminComponent]
    });
    fixture = TestBed.createComponent(RentalAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

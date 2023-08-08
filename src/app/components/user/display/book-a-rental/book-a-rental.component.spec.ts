import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookARentalComponent } from './book-a-rental.component';

describe('BookARentalComponent', () => {
  let component: BookARentalComponent;
  let fixture: ComponentFixture<BookARentalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookARentalComponent]
    });
    fixture = TestBed.createComponent(BookARentalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

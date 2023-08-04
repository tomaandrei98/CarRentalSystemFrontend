import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftBarExpandComponent } from './left-bar-expand.component';

describe('LeftBarExpandComponent', () => {
  let component: LeftBarExpandComponent;
  let fixture: ComponentFixture<LeftBarExpandComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LeftBarExpandComponent]
    });
    fixture = TestBed.createComponent(LeftBarExpandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompdashComponent } from './compdash.component';

describe('CompdashComponent', () => {
  let component: CompdashComponent;
  let fixture: ComponentFixture<CompdashComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompdashComponent]
    });
    fixture = TestBed.createComponent(CompdashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

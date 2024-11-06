import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgDefaultsComponent } from './ng-defaults.component';

describe('NgDefaultsComponent', () => {
  let component: NgDefaultsComponent;
  let fixture: ComponentFixture<NgDefaultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgDefaultsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgDefaultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

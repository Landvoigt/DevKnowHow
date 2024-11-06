import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgSetupComponent } from './ng-setup.component';

describe('NgSetupComponent', () => {
  let component: NgSetupComponent;
  let fixture: ComponentFixture<NgSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgSetupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

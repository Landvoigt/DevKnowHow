import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BashComponent } from './bash.component';

describe('BashComponent', () => {
  let component: BashComponent;
  let fixture: ComponentFixture<BashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BashComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EszakComponent } from './eszak.component';

describe('EszakComponent', () => {
  let component: EszakComponent;
  let fixture: ComponentFixture<EszakComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EszakComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EszakComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

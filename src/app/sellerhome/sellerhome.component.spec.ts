import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerhomeComponent } from './sellerhome.component';

describe('SellerhomeComponent', () => {
  let component: SellerhomeComponent;
  let fixture: ComponentFixture<SellerhomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SellerhomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SellerhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

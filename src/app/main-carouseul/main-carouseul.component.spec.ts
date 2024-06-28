import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainCarouseulComponent } from './main-carouseul.component';

describe('MainCarouseulComponent', () => {
  let component: MainCarouseulComponent;
  let fixture: ComponentFixture<MainCarouseulComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainCarouseulComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MainCarouseulComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

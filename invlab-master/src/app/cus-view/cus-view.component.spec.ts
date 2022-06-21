import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CusViewComponent } from './cus-view.component';

describe('CusViewComponent', () => {
  let component: CusViewComponent;
  let fixture: ComponentFixture<CusViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CusViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CusViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

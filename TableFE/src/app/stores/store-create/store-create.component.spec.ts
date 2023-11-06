import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreCreateComponent } from './store-create.component';

describe('StoreCreateComponent', () => {
  let component: StoreCreateComponent;
  let fixture: ComponentFixture<StoreCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StoreCreateComponent]
    });
    fixture = TestBed.createComponent(StoreCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

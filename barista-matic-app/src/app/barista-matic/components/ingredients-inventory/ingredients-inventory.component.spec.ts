import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientsInventoryComponent } from './ingredients-inventory.component';

describe('IngredientsInventoryComponent', () => {
  let component: IngredientsInventoryComponent;
  let fixture: ComponentFixture<IngredientsInventoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IngredientsInventoryComponent]
    });
    fixture = TestBed.createComponent(IngredientsInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

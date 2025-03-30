import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuComponent } from './menu.component';
import { Drink } from '../../model/machine-drinks.model';
import { BaristaMaticService } from '../../service/barista-matic.service';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;
  let coffee: Drink;
  let service: BaristaMaticService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenuComponent]
    });
    fixture = TestBed.createComponent(MenuComponent);
    service = TestBed.inject(BaristaMaticService);
    component = fixture.componentInstance;
    fixture.detectChanges();

    coffee = { id: 1, name: "Coffee", 
      recipe: {
        coffee: 3,
        sugar: 1,
        cream: 1,
      },
    };
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should restock ingredients to 10 units", () => {
    service.getIngredients().subscribe((ingredients) => {
      let canMake = component.canMakeDrink(coffee, ingredients);
      expect(canMake).toBeTrue();
    });
  });
});

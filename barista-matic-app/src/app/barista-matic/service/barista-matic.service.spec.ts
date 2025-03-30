import { TestBed } from '@angular/core/testing';

import { BaristaMaticService } from './barista-matic.service';
import { DRINKS } from '../data/drinks-data';
import { Drink } from '../model/machine-drinks.model';

describe('BaristaMaticService', () => {
  let service: BaristaMaticService;
  let coffee: Drink;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BaristaMaticService);

    coffee = { id: 1, name: "Coffee", 
      recipe: {
        coffee: 3,
        sugar: 1,
        cream: 1,
      },
    };
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it("should calculate drink cost correctly", () => {
    const cost = service.calculateDrinkCost(coffee);
    expect(cost).toEqual(3 * 0.75 + 0.25 + 0.25);
  });

  it("should update inventory when dispensing a drink", () => {
    service.dispenseDrink(coffee);

    service.getIngredients().subscribe((updatedIngredients) => {
      setTimeout(() => {
        expect(updatedIngredients.coffee.inventory).toEqual(7);
        expect(updatedIngredients.sugar.inventory).toEqual(9);
        expect(updatedIngredients.cream.inventory).toEqual(9);
      }, 2000);
    });
  });

  it("should restock ingredients to 10 units", () => {
    service.restockIngredients();

    service.getIngredients().subscribe((updatedIngredients) => {
      for(const ingredient of Object.values(updatedIngredients)) {
        expect(ingredient.inventory).toEqual(10);
      }
    });
  });

});

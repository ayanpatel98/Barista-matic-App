import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Ingredient } from '../model/ingredients.model';
import { Drink } from '../model/machine-drinks.model';
import { INGREDIENTS } from '../data/ingredients-data';
import { DRINKS } from '../data/drinks-data';

@Injectable({
  providedIn: 'root'
})
export class BaristaMaticService {
  private ingredients = INGREDIENTS;
  private ingredientsSubject = new BehaviorSubject<{ [key: string]: Ingredient }>(this.ingredients);
  private dispensingSubject = new BehaviorSubject<boolean>(false);
  private currentDrinkSubject = new BehaviorSubject<Drink | null>(null);

  constructor() {}

  getIngredients(): Observable<{ [key: string]: Ingredient }> {
    return this.ingredientsSubject.asObservable();
  }

  getDispensing(): Observable<boolean> {
    return this.dispensingSubject.asObservable();
  }

  getCurrentDrink(): Observable<Drink | null> {
    return this.currentDrinkSubject.asObservable();
  }

  getDrinks(): Drink[] {
    return DRINKS;
  }

  calculateDrinkCost(drink: Drink): number {
    let cost = 0
    for (const [ingredientKey, amount] of Object.entries(drink.recipe)) {
      cost += this.ingredients[ingredientKey].cost * amount;
    }
    return Number.parseFloat(cost.toFixed(2));
  }

  canMakeDrink(drink: Drink): boolean {
    for (const [ingredientKey, amount] of Object.entries(drink.recipe)) {
      if (this.ingredients[ingredientKey].inventory < amount) {
        return false;
      }
    }
    return true;
  }

  dispenseDrink(drink: Drink): void {
    if (!this.canMakeDrink(drink)) {
      return;
    }

    this.dispensingSubject.next(true);
    this.currentDrinkSubject.next(drink);

    // Update inventory
    const updatedIngredients = { ...this.ingredients };
    for (const [ingredientKey, amount] of Object.entries(drink.recipe)) {
      updatedIngredients[ingredientKey] = {
        ...updatedIngredients[ingredientKey],
        inventory: updatedIngredients[ingredientKey].inventory - amount,
      }
    }

    // Simulate dispensing time
    setTimeout(() => {
      this.ingredients = updatedIngredients;
      this.ingredientsSubject.next(this.ingredients);
      this.dispensingSubject.next(false);
      this.currentDrinkSubject.next(null);
    }, 2000)
  }

  restockIngredients(): void {
    const restockedIngredients = { ...this.ingredients };
    for (const key of Object.keys(restockedIngredients)) {
      restockedIngredients[key] = {
        ...restockedIngredients[key],
        inventory: 10,
      }
    }
    this.ingredients = restockedIngredients;
    this.ingredientsSubject.next(this.ingredients);
  }
}

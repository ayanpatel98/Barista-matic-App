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
  private ingredientsSubject = new BehaviorSubject<{ [key: string]: Ingredient }>(this.ingredients); // stores ingredients data
  private dispensingSubject = new BehaviorSubject<boolean>(false); // manages dispensing loader
  private currentDrinkSubject = new BehaviorSubject<Drink | null>(null); // stores current drink

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

  /**
   * Returns the list of all available drinks
   *
   * @return {Drink[]} Array of all drinks
   */
  getDrinks(): Drink[] {
    return DRINKS;
  }

  /**
   * Calculates the cost of a drink based on its recipe and ingredient costs
   *
   * @param {Drink} drink - The drink to calculate cost for
   * @return {number} The calculated cost of the drink
   */
  calculateDrinkCost(drink: Drink): number {
    let cost = 0
    for (const [ingredientKey, amount] of Object.entries(drink.recipe)) {
      cost += this.ingredients[ingredientKey].cost * amount;
    }
    return Number.parseFloat(cost.toFixed(2));
  }

  /**
   * Dispenses a drink by updating inventory and triggering dispensing state
   *
   * @param {Drink} drink - The drink to dispense
   */
  dispenseDrink(drink: Drink): void {
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

  /**
   * Restocks all ingredients to their maximum capacity (10 units)
   */
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

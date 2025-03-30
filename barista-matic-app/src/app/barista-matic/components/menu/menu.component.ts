import { Component } from '@angular/core';
import { Drink } from '../../model/machine-drinks.model';
import { Ingredient } from '../../model/ingredients.model';
import { BaristaMaticService } from '../../service/barista-matic.service';

interface DrinksInfo {
  drink: Drink;
  cost: number;
  recipeString: string;
  canMake: boolean;
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  drinksInfoList: DrinksInfo[] = [];
  isDispensing: boolean = false;
  currentDrink: Drink | null = null

  constructor(private baristaMaticService: BaristaMaticService) {}

  ngOnInit(): void {
    this.baristaMaticService.getDispensing().subscribe(dispensingSubject => this.isDispensing = dispensingSubject);
    this.baristaMaticService.getCurrentDrink().subscribe(currentDrinkSubject => this.currentDrink = currentDrinkSubject);

    this.baristaMaticService.getIngredients().subscribe((ingredients) => {
      this.drinksInfoList = this.baristaMaticService.getDrinks().map(drink=>({
        drink: drink, 
        cost: this.getDrinkCost(drink), 
        recipeString: this.getRecipeString(drink), 
        canMake: this.canMakeDrink(drink, ingredients)
      }));
    })
  }

  /**
   * calculate cost of the drink
   *
   * @param {Drink} drink - The drink to check
   * @return {number} returns the cost of the drink
   */
  getDrinkCost(drink: Drink): number {
    return this.baristaMaticService.calculateDrinkCost(drink);
  }

  /**
   * Checks if a drink can be made with the current inventory
   *
   * @param {Drink} drink - The drink to check
   * @param {{ [key: string]: Ingredient }} ingredients - Current inventory of ingredients
   * @return {boolean} True if the drink can be made, false otherwise
   */
  canMakeDrink(drink: Drink, ingredients: { [key: string]: Ingredient }): boolean {
    for (const [ingredientKey, amount] of Object.entries(drink.recipe)) {
      if (ingredients[ingredientKey].inventory < amount) {
        return false
      }
    }
    return true
  }

  /**
   * Initiates the process of dispensing a drink
   *
   * @param {Drink} drink - The drink to be dispensed
   */
  dispenseDrink(drink: Drink): void {
    this.baristaMaticService.dispenseDrink(drink);
  }

  /**
   * generates a string describing the recipe of a drink
   *
   * @param {Drink} drink - The drink to generate a recipe string for
   * @return {string} A formatted string describing the recipe
   */
  getRecipeString(drink: Drink): string {
    return Object.entries(drink.recipe).map(([key, value]) => `${value} ${key.trim()}`).join(", ");
  }

}

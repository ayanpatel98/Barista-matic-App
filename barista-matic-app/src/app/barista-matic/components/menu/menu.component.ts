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

  getDrinkCost(drink: Drink): number {
    return this.baristaMaticService.calculateDrinkCost(drink);
  }

  canMakeDrink(drink: Drink, ingredients: { [key: string]: Ingredient }): boolean {
    for (const [ingredientKey, amount] of Object.entries(drink.recipe)) {
      if (ingredients[ingredientKey].inventory < amount) {
        return false
      }
    }
    return true
  }

  dispenseDrink(drink: Drink): void {
    this.baristaMaticService.dispenseDrink(drink);
  }

  getRecipeString(drink: Drink): string {
    return Object.entries(drink.recipe).map(([key, value]) => `${value} ${key.trim()}`).join(", ");
  }

}

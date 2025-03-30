import { Component } from '@angular/core';
import { Ingredient } from '../../model/ingredients.model';
import { Observable } from 'rxjs';
import { BaristaMaticService } from '../../service/barista-matic.service';

@Component({
  selector: 'app-ingredients-inventory',
  templateUrl: './ingredients-inventory.component.html',
  styleUrls: ['./ingredients-inventory.component.css']
})
export class IngredientsInventoryComponent {
  ingredients: { [key: string]: Ingredient } = {};

  constructor(private baristaMaticService: BaristaMaticService) {}

  ngOnInit(): void {
    this.baristaMaticService.getIngredients().subscribe(ingredientsSubject => this.ingredients = ingredientsSubject);
  }
  
  /**
   * Restocks all ingredients to their maximum capacity
   */
  restock(): void {
    this.baristaMaticService.restockIngredients();
  }
}

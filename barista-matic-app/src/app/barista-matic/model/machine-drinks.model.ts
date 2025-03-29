export interface DrinkRecipe {
  [key: string]: number;
}
  
export interface Drink {
  id: number;
  name: string;
  recipe: DrinkRecipe;
}
import { Ingredient } from "../model/ingredients.model";

export const INGREDIENTS: { [key: string]: Ingredient } = {
  coffee: { name: "Coffee", cost: 0.75, inventory: 10 },
  decafCoffee: { name: "Decaf Coffee", cost: 0.75, inventory: 10 },
  sugar: { name: "Sugar", cost: 0.25, inventory: 10 },
  cream: { name: "Cream", cost: 0.25, inventory: 10 },
  steamedMilk: { name: "Steamed Milk", cost: 0.35, inventory: 10 },
  foamedMilk: { name: "Foamed Milk", cost: 0.35, inventory: 10 },
  espresso: { name: "Espresso", cost: 1.1, inventory: 10 },
  cocoa: { name: "Cocoa", cost: 0.9, inventory: 10 },
  whippedCream: { name: "Whipped Cream", cost: 1.0, inventory: 10 },
}
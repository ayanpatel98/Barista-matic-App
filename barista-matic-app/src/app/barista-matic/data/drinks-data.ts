import { Drink } from "../model/machine-drinks.model";

export const DRINKS: Drink[] = [
  {
    id: 1,
    name: "Coffee",
    recipe: {
      coffee: 3,
      sugar: 1,
      cream: 1,
    },
  },
  {
    id: 2,
    name: "Decaf Coffee",
    recipe: {
      decafCoffee: 3,
      sugar: 1,
      cream: 1,
    },
  },
  {
    id: 3,
    name: "Caffe Latte",
    recipe: {
      espresso: 2,
      steamedMilk: 1,
    },
  },
  {
    id: 4,
    name: "Caffe Americano",
    recipe: {
      espresso: 3,
    },
  },
  {
    id: 5,
    name: "Caffe Mocha",
    recipe: {
      espresso: 1,
      cocoa: 1,
      steamedMilk: 1,
      whippedCream: 1,
    },
  },
  {
    id: 6,
    name: "Cappuccino",
    recipe: {
      espresso: 2,
      steamedMilk: 1,
      foamedMilk: 1,
    },
  },
]
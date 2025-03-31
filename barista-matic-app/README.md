## Application overview
Barista-matic machine maintains an inventory of drink ingredients, and is able to dispense a fixed set of possible drinks by combining these ingredients in different amounts. The cost of a drink is determined by its component ingredients. The user can order the drinks which updates the inventory ingredients automatically, and can restock the igredients in the inventory when needed. The UI also provides visual feedback while dispensing the drink and prevents the user from ordering the drink which has not enough ingredients available in the inventory.

## Installation
- Clone the repository from GitHub.
- Navigate to the project directory.
- Run `npm install` to install all dependencies.

## Technical Specifications
The application is built using Angular 16 with TypeScript and Bootstrap is used as the CSS framework for styling providing a responsive UI with minimal CSS. The application structure follows Angular best practices with a clear separation between components, services, models and modules.

## Testing
The application includes both unit and integration tests:

### Unit Tests
Unit tests focus on the BaristaService and MenuComponent. These tests are written using Jasmine.

To run the tests:

- Run `ng test` to execute all tests with Karma.

## Running the Application
### Development Environment
To run the application locally in development mode:
- Run `npm start`.
- Navigate to `http://localhost:4200`.

### Production Build
To create and run a production build:
- Run `ng build --configuration production` to create an optimized build.
- Navigate to the `dist/barista-matic-app` directory.
- Run the `npm install -g http-server` to install http-server globally.
- Run `http-server -p 8080`.
- Navigate to `http://localhost:8080` or `http://127.0.0.1:8080`.

## Adding New Drinks
The application is created to be flexible, which allows new drinks to be added without extensive code changes.

To add a new drink:
- Open the `src/app/barista-matic/data/drink-data.ts` file.
- Add a new entry to the `DRINKS` array.
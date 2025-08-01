# playwright-mcp-demo

This project contains Playwright end-to-end tests for the [Sauce Demo](https://www.saucedemo.com/v1/) web application.

## Project Structure
- `tests/` - Main test suite for Sauce Demo features
  - `saucedemo-cart-total.spec.ts`: Validates cart total matches sum of product prices
- `resources/` - Test data and expected results
  - `expected-grid-items.json`: Reference data for grid item validation
- `playwright.config.ts` - Playwright configuration
- `playwright-report/` - Test run reports
- `test-results/` - Raw test results

## Getting Started
1. Install dependencies:
   ```bash
   npm install
   ```
2. Run all tests:
   ```bash
   npx playwright test
   ```
3. View test reports:
   ```bash
   npx playwright show-report
   ```

## Example Test Scenarios
- **Login and Cart Validation:**
  - Logs in with demo credentials
  - Adds random items to cart
  - Checks that cart total matches sum of item prices
- **Grid Item Validation:**
  - Compares grid items on the page to expected data from JSON
  - Ignores order of items
- **Sidebar Validation:**
  - Checks sidebar menu items after login

## Credentials
Use the following demo credentials for Sauce Demo:
- Username: `standard_user`
- Password: `secret_sauce`

## Resources
- [Playwright Documentation](https://playwright.dev/)
- [Sauce Demo](https://www.saucedemo.com/v1/)

---
Feel free to add more tests or update expected data in the `resources/` folder.

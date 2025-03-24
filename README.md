# E-commerce Test Automation

This project contains automated tests for an e-commerce website using Playwright.

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd fastWhiteCat
```

2. Install dependencies:
```bash
npm install
```

3. Configure test credentials:
   - Copy `e2e/config.example.json` to `e2e/config.secret.json`
   - Update the credentials in `config.secret.json` with your test account details

## Running Tests

To run tests in headed mode (with browser visible):
```bash
npx playwright test e2e/4f.spec.ts --headed
```

To run tests in headless mode:
```bash
npx playwright test e2e/4f.spec.ts
```

To view the HTML report:
```bash
npx playwright show-report test-reports
```

## Test Structure

The test suite includes:
- Product selection and cart operations
- User authentication
- Cart quantity updates
- Price verification

## Project Structure

```
fastWhiteCat/
├── e2e/
│   ├── pages/           # Page Object Models
│   ├── config.secret.json  # Test credentials (not in repo)
│   ├── config.example.json # Example configuration
│   └── 4f.spec.ts       # Test specifications
├── test-reports/        # Test execution reports
└── playwright.config.ts # Playwright configuration
``` 
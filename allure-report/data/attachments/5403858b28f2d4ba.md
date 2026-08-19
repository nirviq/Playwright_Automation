# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: record1_demo.spec.js >> record demo test
- Location: tests/record1_demo.spec.js:3:5

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('[data-test="login-buttonASIF"]')

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - generic [ref=e4]: Swag Labs
  - generic [ref=e5]:
    - generic [ref=e9]:
      - textbox "Username" [ref=e11]: standard_user
      - textbox "Password" [active] [ref=e13]: secret_sauce
      - button "Login" [ref=e15] [cursor=pointer]
    - generic [ref=e17]:
      - generic [ref=e18]:
        - heading "Accepted usernames are:" [level=4] [ref=e19]
        - text: standard_user
        - text: locked_out_user
        - text: problem_user
        - text: performance_glitch_user
        - text: error_user
        - text: visual_user
      - generic [ref=e20]:
        - heading "Password for all users:" [level=4] [ref=e21]
        - text: secret_sauce
```

# Test source

```ts
  1 | import { test, expect } from '@playwright/test';
  2 | 
  3 | test('record demo test', async ({ page }) => {
  4 |   await page.goto('https://www.saucedemo.com/');
  5 |   await page.locator('[data-test="username"]').click();
  6 |   await page.locator('[data-test="username"]').fill('standard_user');
  7 |   await page.locator('[data-test="password"]').fill('secret_sauce');
> 8 |   await page.locator('[data-test="login-buttonASIF"]').click();
    |                                                        ^ Error: locator.click: Test timeout of 30000ms exceeded.
  9 | });
```
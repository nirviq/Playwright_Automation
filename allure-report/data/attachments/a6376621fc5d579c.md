# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: test-1.spec.ts >> test
- Location: tests/test-1.spec.ts:3:5

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('iframe[name="a-bmfu7lfokq9"]').contentFrame().getByRole('checkbox', { name: 'I\'m not a robot' })

```

# Page snapshot

```yaml
- generic [ref=e2]:
  - separator [ref=e3]
  - iframe [ref=e8]:
    - generic [ref=f1e2]:
      - generic [ref=f1e3]:
        - checkbox "I'm not a robot" [ref=f1e7]
        - generic [ref=f1e11]: I'm not a robot
      - generic [ref=f1e15]: reCAPTCHA
  - separator [ref=e9]
  - generic [ref=e10]:
    - text: About this page
    - text: Our systems have detected unusual traffic from your computer network. This page checks to see if it's really you sending the requests, and not a robot.
    - link "Why did this happen?" [ref=e11] [cursor=pointer]:
      - /url: "#"
    - generic [ref=e12]:
      - text: "IP address: 70.27.1.139"
      - text: "Time: 2026-08-18T20:39:24Z"
      - text: "URL: https://www.google.com/search?q=cloudtesting.con&oq=cloudtesting.con&gs_lcrp=EgZjaHJvbWUyBggAEEUYOdIBCTExNTg1ajBqMqgCALACAQ&sourceid=chrome&ie=UTF-8&sei=nLyEapuIHorEruEP0fHt8Qg"
```

# Test source

```ts
  1 | import { test, expect } from '@playwright/test';
  2 | 
  3 | test('test', async ({ page }) => {
  4 |   await page.goto('https://www.google.com/', { waitUntil: 'domcontentloaded' });
> 5 |   await expect(page.getByRole('img', { name: 'Google' })).toBeVisible();
    |                                                                                                                         ^ Error: locator.click: Test timeout of 30000ms exceeded.
  6 |   await expect(page).toHaveTitle(/Google/);
  7 | });
```
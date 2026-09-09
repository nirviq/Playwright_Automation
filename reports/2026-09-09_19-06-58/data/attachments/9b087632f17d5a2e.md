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
      - text: "Time: 2026-08-18T20:16:44Z"
      - text: "URL: https://www.google.com/search?q=cloudtesting.con&oq=cloudtesting.con&gs_lcrp=EgZjaHJvbWUyBggAEEUYOdIBCTExNTg1ajBqMqgCALACAQ&sourceid=chrome&ie=UTF-8&sei=nLyEapuIHorEruEP0fHt8Qg"
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test('test', async ({ page }) => {
  4  |   await page.goto('https://www.google.com/sorry/index?continue=https://www.google.com/search%3Fq%3Dcloudtesting.con%26oq%3Dcloudtesting.con%26gs_lcrp%3DEgZjaHJvbWUyBggAEEUYOdIBCTExNTg1ajBqMqgCALACAQ%26sourceid%3Dchrome%26ie%3DUTF-8%26sei%3DnLyEapuIHorEruEP0fHt8Qg&q=EgRGGwGLGJz5ktQGIjBYk6wJl0Rs4I0dmooBvlJwIcfs5DOojTLquCYxtZnOFdShO4q-rIR0B31wg8QxJP0yAVJaAUM');
> 5  |   await page.locator('iframe[name="a-bmfu7lfokq9"]').contentFrame().getByRole('checkbox', { name: 'I\'m not a robot' }).click();
     |                                                                                                                         ^ Error: locator.click: Test timeout of 30000ms exceeded.
  6  |   await page.locator('iframe[name="c-bmfu7lfokq9"]').contentFrame().locator('[id="8"]').click();
  7  |   await page.locator('iframe[name="c-bmfu7lfokq9"]').contentFrame().locator('[id="9"]').click();
  8  |   await page.locator('iframe[name="c-bmfu7lfokq9"]').contentFrame().locator('[id="5"]').click();
  9  |   await page.locator('iframe[name="c-bmfu7lfokq9"]').contentFrame().getByRole('button', { name: 'Verify' }).click();
  10 |   await page.getByRole('link', { name: 'Go to Google Home' }).click();
  11 |   await page.getByRole('img', { name: 'Google' }).c
  12 |   await expect(page.getByRole('img', { name: 'Google' })).toBeVisible();
  13 |   await expect(page.locator('body')).toContainText('What\'s on your mind? Google');
  14 |   await page.getByText('GmailImagesSign in').click();lick();
  15 |   await page.getByRole('img', { name: 'Google' }).click();
  16 | });
```
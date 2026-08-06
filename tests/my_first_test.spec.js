const { test, expect } = require ('@playwright/test');
// import { test, expect } from '@playwright/test'
// const { hello, helloworld } = require('./demo/hello.js');

// // MacBook-Pro:Playwright_Automation asifzaman$ node ./tests/my_first_test.spec.js
// console.log(hello());
// console.log(helloworld());

// //MacBook-Pro:Playwright_Automation asifzaman$ npx playwright test ./tests/my_first_test.spec.js
// test('hello test', async () => {
//   hello();
// });

// test('helloworld test', async () => {
//   helloworld();
// });

test('My first test', async ({page}) => {
  await page.goto('https://google.com/');
  await expect(page).toHaveTitle(/Google/);
})
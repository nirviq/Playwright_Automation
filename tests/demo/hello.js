exports.hello = function f1() {
    return "Hello"
}

exports.helloworld = function f2() {
    return "Hello Worlds"
}


import {test, expect} from '@playwright/test';

test('test demo', async ({page}) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').click();
